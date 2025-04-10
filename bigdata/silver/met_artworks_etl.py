from pyspark.sql import SparkSession
from pyspark.sql.functions import (
    col, lit, regexp_replace, trim, lower, current_date,
    when, regexp_extract
)

# Spark 세션 시작
spark = SparkSession.builder.config("spark.executor.memory", "2g").getOrCreate()

# 1. 원본 JSON 로드 (MET 테스트 데이터)
input_path = "hdfs:///user/hadoop/bronze/met/Artworks.json"
df = spark.read.option("multiline", "true").json(input_path)

# 2. 유효한 이미지 필터링 (primaryImage가 존재하고 공백이 아님)
df = df.filter(
    col("primaryImage").isNotNull() &
    (trim(col("primaryImage")) != "") &
    (lower(trim(col("primaryImage"))) != "null")
)

# 3. original_title
df = df.withColumn(
    "original_title",
    when(
        col("Title").isNull() |
        (trim(col("Title")) == "") |
        (lower(trim(col("Title"))) == "null"),
        lit("무제")
    ).when(
        lower(trim(col("Title"))) == "untitled",
        lit("무제")
    ).otherwise(
        regexp_replace(
            regexp_replace(trim(col("Title")), r"<[^>]+>", ""),  # HTML 태그만 제거 (내용 보존)
            r"[\[\]]", ""  # 대괄호 제거
        )
    )
)

# 4. en_artist: 없으면 "unknown artist", 있으면 소문자 + trim
df = df.withColumn(
    "original_artist",
    when(
        col("artistDisplayName").isNull() |
        (trim(col("artistDisplayName")) == "") |
        (lower(trim(col("artistDisplayName"))) == "null") |
        (lower(trim(col("artistDisplayName"))) == "unidentified artist") |
        (lower(trim(col("artistDisplayName"))) == "unidentified designer"),
        lit("작가 미상")
    ).otherwise((trim(col("artistDisplayName"))))
)

# 5. image_url
df = df.withColumn("image_url", trim(col("primaryImage")))

# 6. description: 무조건 None
df = df.withColumn("description", lit(None).cast("string"))

# 7. created_year: objectDate → 없으면 objectBeginDate → 없으면 null
df = df.withColumn(
    "created_year",
    when(regexp_extract(col("objectDate"), r"(\d{4})", 1) != "", regexp_extract(col("objectDate"), r"(\d{4})", 1).cast("int"))
    .otherwise(
        when(col("objectBeginDate").cast("int").isNotNull(), col("objectBeginDate").cast("int"))
        .otherwise(None)
    )
)

# 8. materials
df = df.withColumn(
    "materials",
    when(col("medium").isNull() | (trim(col("medium")) == ""), None)
    .otherwise(trim(col("medium")))
)

# 9. country_origin: 없으면 Unknown, 있으면 특수문자 제거 후 trim
df = df.withColumn(
    "country_origin",
    when(col("country").isNull() | (trim(col("country")) == ""), lit("Unknown"))
    .otherwise(regexp_replace(trim(col("country")), r"[^a-zA-Z0-9\s]", ""))
)

# 10. color: 없음
df = df.withColumn("color", lit(None).cast("string"))

# 11. museum, ingest_date
df = df.withColumn("museum", lit("The Metropolitan Museum of Art"))
df = df.withColumn("ingest_date", current_date())

# 12. 컬럼 선택
df_silver = df.select(
    "museum",
    "original_title",
    "original_artist",
    "image_url",
    "description",
    "country_origin",
    "created_year",
    "materials",
    "color",
    "ingest_date"
)

df_silver = df_silver.dropDuplicates(["image_url"])

# 13. 저장
output_path = "hdfs:///user/hadoop/silver/met_artworks.parquet"
df_silver.write.mode("overwrite").parquet(output_path)

# 14. 확인
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
