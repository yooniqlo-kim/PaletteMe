from pyspark.sql import SparkSession
from pyspark.sql.functions import (
    col, lit, regexp_replace, trim, lower, current_date,
    when, regexp_extract, length
)

# 0. Spark 세션 시작
spark = SparkSession.builder.config("spark.executor.memory", "2g").getOrCreate()

# 1. 원본 JSON 로드 (National Korea 데이터)
input_path = "hdfs:///user/hadoop/bronze/korea/Artworks.json"
df = spark.read.option("multiline", "true").json(input_path)

# 2. 이미지가 존재하는 행 필터링 (referenceIdentifier 존재 + 공백 제거)
df = df.filter(
    col("referenceIdentifier").isNotNull() &
    (trim(col("referenceIdentifier")) != "") &
    (lower(trim(col("referenceIdentifier"))) != "null")
)

# 3. original_title
df = df.withColumn(
    "original_title",
    when(
        col("title").isNull() |
        (trim(col("title")) == "") |
        (lower(trim(col("title"))) == "null"),
        lit("무제")
    ).otherwise(
        regexp_replace(trim(col("title")), r"[^ㄱ-ㅎ가-힣a-zA-Z0-9\s]", "")
    )
)

# 4. original_artist
df = df.withColumn(
    "original_artist",
    when(
        col("person").isNull() |
        (trim(col("person")) == "") |
        (lower(trim(col("person"))) == "null") |
        (lower(trim(col("person"))) == "작자 미상") |
        (regexp_extract(col("person"), r"\d", 0) != "")
    , lit("작가 미상"))
    .otherwise(lower(trim(col("person"))))
)

# 5. image_url: referenceIdentifier 컬럼 사용 (trim)
df = df.withColumn("image_url", trim(col("referenceIdentifier")))

# 6. description: HTML 태그 제거 및 공백 제거
df = df.withColumn("description", trim(regexp_replace(col("description"), "<[^>]*>", "")))

# 7. created_year: 무조건 None
df = df.withColumn("created_year", lit(None).cast("string"))

# 8. era: temporal 컬럼 사용 (없으면 null)
df = df.withColumn(
    "era",
    when(col("temporal").isNull() | (trim(col("temporal")) == ""), None)
    .otherwise(trim(col("temporal")))
)

# 9. materials: medium 컬럼 trim 처리 (없으면 Null)
df = df.withColumn(
    "materials",
    when(col("medium").isNull() | (trim(col("medium")) == ""), None)
    .otherwise(trim(col("medium")))
)

# 10. country_origin: 고정값 "Korea"
df = df.withColumn("country_origin", lit("Korea"))

# 11. color: 해당 정보 없음 → null
df = df.withColumn("color", lit(None).cast("string"))

# 12. museum: creator 컬럼 trim (없으면 "Unknown Museum")
df = df.withColumn("museum", lit("국립중앙박물관"))


# 13. ingest_date: 현재 날짜
df = df.withColumn("ingest_date", current_date())

# 14. 컬럼 선택 (정렬 포함)
df_silver = df.select(
    "museum",
    "original_title",
    "original_artist",
    "image_url",
    "description",
    "country_origin",
    "created_year",
    "era", 
    "materials",
    "color",
    "ingest_date"
)

df_silver = df_silver.dropDuplicates(["image_url"])

# 13. 저장 (HDFS silver 레이어 - Parquet 형식)
output_path = "hdfs:///user/hadoop/silver/national_korea_artworks.parquet"
df_silver.write.mode("overwrite").parquet(output_path)

# 14. 결과 확인
df_parquet = spark.read.parquet(output_path)
df_parquet.show(1, truncate=False)
print("레코드 수:", df_parquet.count())

# 15. 샘플 출력
for row in df_parquet.limit(1).collect():
    record = row.asDict()
    for key, value in record.items():
        print(f"{key:20}: {value}")
    print("=" * 40)

spark.stop()
