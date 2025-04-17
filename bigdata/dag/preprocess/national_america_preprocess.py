from pyspark.sql import SparkSession
from pyspark.sql.functions import (
    col, lit, regexp_replace, trim, lower, current_date,
    when
)

spark = SparkSession.builder.config("spark.executor.memory", "2g").getOrCreate()

objects_path = "hdfs:///user/hadoop/bronze/national_america/objects.csv"
images_path = "hdfs:///user/hadoop/bronze/national_america/images.csv"

df_obj = spark.read.option("header", "true").option("inferSchema", "true").csv(objects_path)
df_img = spark.read.option("header", "true").option("inferSchema", "true").csv(images_path)

df_joined = df_obj.join(
    df_img,
    df_obj.objectid == df_img.depictstmsobjectid.cast("string"),
    "left"
)

df_joined = df_joined.withColumn(
    "original_title",
    when(
        col("title").isNull() | (trim(col("title")) == "") | (lower(trim(col("title"))) == "null") | (lower(trim(col("title"))) == "untitled"),
        lit("무제")
    ).otherwise(trim(col("title")))
)

df_joined = df_joined.withColumn(
    "original_artist",
    when(
        col("attribution").isNull() | (trim(col("attribution")) == "") | (lower(trim(col("attribution"))) == "null") |
        (lower(trim(col("attribution"))) == "unidentified artist") | (lower(trim(col("attribution"))) == "unidentified designer"),
        lit("작가 미상")
    ).otherwise(trim(col("attribution")))
)

df_joined = df_joined.withColumn("image_url", trim(col("iiifthumburl")))
df_joined = df_joined.withColumn("description", lit(None).cast("string"))

df_joined = df_joined.withColumn(
    "created_year",
    when(col("beginyear").rlike("^\d{4}$"), col("beginyear").cast("int")).otherwise(lit(None).cast("int"))
)

df_joined = df_joined.withColumn("materials", trim(col("medium")))
df_joined = df_joined.withColumn("country_origin", lit("Unknown"))
df_joined = df_joined.withColumn("museum", lit("National Gallery of Art"))
df_joined = df_joined.withColumn("color", lit(None).cast("string"))
df_joined = df_joined.withColumn("ingest_date", current_date())

df_joined = df_joined.filter(col("image_url").isNotNull() & (trim(col("image_url")) != ""))

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
).dropDuplicates(["image_url"])

output_path = "hdfs:///user/hadoop/silver/national_america_artworks.parquet"
df_silver.write.mode("overwrite").parquet(output_path)

df_parquet = spark.read.parquet(output_path)
df_parquet.show(1, truncate=False)
print("총 레코드 수:", df_parquet.count())

for row in df_parquet.limit(1).collect():
    for key, value in row.asDict().items():
        print(f"{key:20}: {value}")
    print("=" * 40)

spark.stop()
