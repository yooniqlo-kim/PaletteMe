from pyspark.sql import SparkSession
from pyspark.sql.functions import (
    col, lit, regexp_replace, trim, lower, current_date,
    when
)

# 0. Spark 세션 시작
spark = SparkSession.builder.config("spark.executor.memory", "2g").getOrCreate()

# 1. 원본 CSV 로드
objects_path = "hdfs:///user/hadoop/bronze/national_america/objects.csv"
images_path = "hdfs:///user/hadoop/bronze/national_america/images.csv"

df_obj = spark.read.option("header", "true").option("inferSchema", "true").option("quote", "\"").option("escape", "\"").option("multiLine", "true").option("mode", "PERMISSIVE").csv(objects_path)
df_img = spark.read.option("header", "true").option("inferSchema", "true").option("quote", "\"").option("escape", "\"").option("multiLine", "true").option("mode", "PERMISSIVE").csv(images_path)

# 2. 조인: objectid == depictstmsobjectid (정수 → 문자열 캐스팅)
df_joined = df_obj.join(
    df_img,
    df_obj.objectid == df_img.depictstmsobjectid.cast("string"),
    "left"
)

# 3. original_title
df_joined = df_joined.withColumn(
    "original_title",
    when(
        col("title").isNull() |
        (trim(col("title")) == "") |
        (lower(trim(col("title"))) == "null") |
        (lower(trim(col("title"))) == "untitled"),
        lit("무제")
    ).otherwise(trim(col("title")))
)

# 4. original_artist
df_joined = df_joined.withColumn(
    "original_artist",
    when(
        col("attribution").isNull() |
        (trim(col("attribution")) == "") |
        (lower(trim(col("attribution"))) == "null") |
        (lower(trim(col("attribution"))) == "unidentified artist") |
        (lower(trim(col("attribution"))) == "unidentified designer"),
        lit("작가 미상")
    ).otherwise((trim(col("attribution"))))
)


# 5. image_url: iiifthumburl → trim 처리
df_joined = df_joined.withColumn("image_url", trim(col("iiifthumburl")))

# 6. description: 항상 None
df_joined = df_joined.withColumn("description", lit(None).cast("string"))

# 7. created_year: beginyear이 4자리 숫자면 사용
df_joined = df_joined.withColumn(
    "created_year",
    when(col("beginyear").rlike("^\d{4}$"), col("beginyear").cast("int"))
    .otherwise(lit(None).cast("int"))
)

# 8. materials: medium 사용
df_joined = df_joined.withColumn("materials", trim(col("medium")))

# 9. country_origin: 임의로 Unknown
df_joined = df_joined.withColumn("country_origin", lit("Unknown"))

# 10. museum 고정
df_joined = df_joined.withColumn("museum", lit("National Gallery of Art"))

# 11. color 없음
df_joined = df_joined.withColumn("color", lit(None).cast("string"))

# 12. ingest_date
df_joined = df_joined.withColumn("ingest_date", current_date())

# 13. image_url이 null 또는 ""인 row 제거
df_joined = df_joined.filter(
    col("image_url").isNotNull() & (trim(col("image_url")) != "")
)

# 14. 컬럼 정리
df_silver = df_joined.select(
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


# 14. 저장
output_path = "hdfs:///user/hadoop/silver/national_america_artworks.parquet"
df_silver.write.mode("overwrite").parquet(output_path)

# 15. 결과 확인
df_parquet = spark.read.parquet(output_path)
df_parquet.show(1, truncate=False)
print("총 레코드 수:", df_parquet.count())

# 16. 샘플 출력
for row in df_parquet.limit(1).collect():
    for key, value in row.asDict().items():
        print(f"{key:20}: {value}")
    print("=" * 40)

spark.stop()
