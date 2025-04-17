from pyspark.sql import SparkSession
from pyspark.sql.functions import (
    col, lit, regexp_replace, trim, lower, current_date,
    when, regexp_extract
)

# 0. Spark 세션 시작
spark = SparkSession.builder.config("spark.executor.memory", "2g").getOrCreate()

# 1. MoMA 원본 CSV 로드 (bronze 레이어)
input_path = "hdfs:///user/hadoop/bronze/moma/Artworks.csv"
df = spark.read.option("header", "true").option("inferSchema", "true").option("quote", "\"").option("escape", "\"").option("multiLine", "true").option("mode", "PERMISSIVE").csv(input_path)

# 2. 유효한 image URL 필터링 (ImageURL 컬럼 존재 + 공백 제거)
df = df.filter(
    col("ImageURL").isNotNull() &
    (trim(col("ImageURL")) != "") &
    (lower(trim(col("ImageURL"))) != "null")
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
        trim(col("Title"))  # 태그나 특수문자 제거 없이 원본 그대로 정제
    )
)

# 5. original_artist
df = df.withColumn(
    "original_artist",
    when(
        col("Artist").isNull() |
        (trim(col("Artist")) == "") |
        (lower(trim(col("Artist"))) == "null") |
        (lower(trim(col("Artist"))) == "unidentified artist") |
        (lower(trim(col("Artist"))) == "unidentified designer"),
        lit("작가 미상")
    ).otherwise((trim(col("Artist"))))
)

# 5. image_url: ImageURL 컬럼 그대로 사용 (trim 처리)
df = df.withColumn("image_url", trim(col("ImageURL")))

# 6. description: ArtistBio에서 HTML 태그 제거 후 trim
df = df.withColumn("description", lit(None).cast("string"))

# 7. country_origin: Nationality → 없으면 Null
df = df.withColumn(
    "country_origin",
    when(
        col("Nationality").isNull() | (trim(col("Nationality")) == ""),
        lit("Unknown")
    ).otherwise(regexp_replace(trim(col("Nationality")), r"[^a-zA-Z0-9\s]", ""))
)

# 8. created_year: Date 컬럼에서 연도 또는 세기 추출
df = df.withColumn(
    "created_year",
    when(regexp_extract(col("Date"), r"(\d{4})", 1) != "", regexp_extract(col("Date"), r"(\d{4})", 1).cast("int"))
    .when(
        regexp_extract(col("Date"), r"(\d{1,2})(st|nd|rd|th)\s+century", 1) != "",
        ((regexp_extract(col("Date"), r"(\d{1,2})(st|nd|rd|th)\s+century", 1).cast("int") - 1) * 100).cast("int")
    )
    .otherwise(None)
)

# 9. materials: Medium 컬럼 사용 → 없으면 Null
df = df.withColumn(
    "materials",
    when(col("Medium").isNull() | (trim(col("Medium")) == ""), None)
    .otherwise(trim(col("Medium")))
)

# 10. 고정 컬럼 추가
df = df.withColumn("museum", lit("MOMA"))
df = df.withColumn("color", lit(None).cast("string"))  # 색상 정보 없음
df = df.withColumn("ingest_date", current_date())

# 11. 컬럼 정렬 및 선택 (SILVER 모델 기준)
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

# 12. 저장 (HDFS silver 레이어 - Parquet 형식)
output_path = "hdfs:///user/hadoop/silver/moma_artworks.parquet"
df_silver.write.mode("overwrite").parquet(output_path)

# 13. 확인용 출력
df_parquet = spark.read.parquet(output_path)
df_parquet.show(1, truncate=False)
print("총 레코드 수:", df_parquet.count())

# 14. 각 레코드를 key-value 형식으로 깔끔하게 출력
for row in df_parquet.limit(1).collect():
    record = row.asDict()
    for key, value in record.items():
        print(f"{key:20}: {value}")
    print("=" * 40)

# Spark 세션 종료
spark.stop()