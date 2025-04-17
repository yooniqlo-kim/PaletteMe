from pyspark.sql import SparkSession
from pyspark.sql.functions import (
    col, lit, regexp_replace, trim, lower, current_date,
    when, regexp_extract
)

spark = SparkSession.builder.config("spark.executor.memory", "2g").getOrCreate()

input_path = "hdfs:///user/hadoop/bronze/korea/Artworks.json"
df = spark.read.option("multiline", "true").json(input_path)

df = df.filter(
    col("referenceIdentifier").isNotNull() &
    (trim(col("referenceIdentifier")) != "") &
    (lower(trim(col("referenceIdentifier"))) != "null")
)

df = df.withColumn(
    "original_title",
    when(
        col("title").isNull() |
        (trim(col("title")) == "") |
        (lower(trim(col("title"))) == "null"),
        lit("무제")
    ).otherwise(
        regexp_replace(trim(col("title")), r"[^ㄱ-ㅎ가-힣a-zA-Z0-9\\s]", "")
    )
)

df = df.withColumn(
    "original_artist",
    when(
        col("person").isNull() |
        (trim(col("person")) == "") |
        (lower(trim(col("person"))) == "null") |
        (lower(trim(col("person"))) == "작자 미상") |
        (regexp_extract(col("person"), r"\\d", 0) != "")
    , lit("작가 미상"))
    .otherwise(lower(trim(col("person"))))
)

df = df.withColumn("image_url", trim(col("referenceIdentifier")))
df = df.withColumn("description", trim(regexp_replace(col("description"), "<[^>]*>", "")))
df = df.withColumn("created_year", lit(None).cast("string"))
df = df.withColumn("era", when(col("temporal").isNull() | (trim(col("temporal")) == ""), None).otherwise(trim(col("temporal"))))
df = df.withColumn("materials", when(col("medium").isNull() | (trim(col("medium")) == ""), None).otherwise(trim(col("medium"))))
df = df.withColumn("country_origin", lit("Korea"))
df = df.withColumn("color", lit(None).cast("string"))
df = df.withColumn("museum", lit("국립중앙박물관"))
df = df.withColumn("ingest_date", current_date())

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
).dropDuplicates(["image_url"])

output_path = "hdfs:///user/hadoop/silver/national_korea_artworks.parquet"
df_silver.write.mode("overwrite").parquet(output_path)

df_parquet = spark.read.parquet(output_path)
df_parquet.show(1, truncate=False)
print("레코드 수:", df_parquet.count())

for row in df_parquet.limit(1).collect():
    record = row.asDict()
    for key, value in record.items():
        print(f"{key:20}: {value}")
    print("=" * 40)

spark.stop()
