from pyspark.sql import SparkSession
from pyspark.sql.functions import (
    col, lit, expr, regexp_replace, trim, lower, current_date,
    when, regexp_extract
)

spark = SparkSession.builder.config("spark.executor.memory", "2g").getOrCreate()

input_path = "hdfs:///user/hadoop/bronze/harvard/Artworks.json"
df = spark.read.option("multiline", "true").json(input_path)

df = df.filter(
    col("primaryimageurl").isNotNull() &
    (trim(col("primaryimageurl")) != "") &
    (lower(trim(col("primaryimageurl"))) != "null")
)

df = df.withColumn(
    "original_title",
    when(
        col("title").isNull() |
        (trim(col("title")) == "") |
        (lower(trim(col("title"))) == "null"),
        lit("무제")
    ).when(
        lower(trim(col("title"))) == "untitled",
        lit("무제")
    ).otherwise(
        regexp_replace(trim(col("title")), r"[\[\]]", "")
    )
)

df = df.withColumn(
    "en_artist_raw",
    expr("filter(people, x -> x.role = 'Artist')[0].name")
).withColumn(
    "original_artist",
    when(
        col("en_artist_raw").isNull() |
        (trim(col("en_artist_raw")) == "") |
        (lower(trim(col("en_artist_raw"))) == "null") |
        (lower(trim(col("en_artist_raw"))) == "unidentified artist"),
        lit("작가 미상")
    ).otherwise(trim(col("en_artist_raw")))
).drop("en_artist_raw")

df = df.withColumn("image_url", trim(col("primaryimageurl")))
df = df.withColumn("description", trim(regexp_replace(col("description"), "<[^>]*>", "")))
df = df.withColumn("country_origin", when(col("culture").isNull(), None).otherwise(trim(col("culture"))))

df = df.withColumn(
    "created_year",
    when(regexp_extract(col("dated"), r"(\d{4})", 1) != "", regexp_extract(col("dated"), r"(\d{4})", 1).cast("int"))
    .when(regexp_extract(col("dated"), r"(\d{1,2})(st|nd|rd|th)\s+century", 1) != "",
          ((regexp_extract(col("dated"), r"(\d{1,2})(st|nd|rd|th)\s+century", 1).cast("int") - 1) * 100).cast("int"))
    .otherwise(None)
)

df = df.withColumn("materials", when(col("medium").isNull(), None).otherwise(trim(col("medium"))))
df = df.withColumn("color", col("colors").getItem(0).getField("hue"))
df = df.withColumn("ingest_date", current_date())

df_silver = df.select(
    lit("Harvard Art Museum").alias("museum"),
    "original_title", "original_artist", "image_url",
    "description", "country_origin", "created_year",
    "materials", "color", "ingest_date"
).dropDuplicates(["image_url"])

output_path = "hdfs:///user/hadoop/silver/harvard_artworks.parquet"
df_silver.write.mode("overwrite").parquet(output_path)

df_parquet = spark.read.parquet(output_path)
df_parquet.show(1, truncate=False)
print("레코드 수:", df_parquet.count())

for row in df_parquet.limit(1).collect():
    for key, value in row.asDict().items():
        print(f"{key}: {value}")
    print("=" * 40)

spark.stop()
