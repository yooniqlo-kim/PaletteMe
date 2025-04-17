from pyspark.sql import SparkSession
from pyspark.sql.functions import col, lit, regexp_replace, trim, lower, current_date, when, regexp_extract

spark = SparkSession.builder.config("spark.executor.memory", "2g").getOrCreate()

input_path = "hdfs:///user/hadoop/bronze/moma/Artworks.csv"
df = spark.read.option("header", "true").option("inferSchema", "true").option("quote", "\"").option("escape", "\"").option("multiLine", "true").option("mode", "PERMISSIVE").csv(input_path)

df = df.filter(
    col("ImageURL").isNotNull() & 
    (trim(col("ImageURL")) != "") & 
    (lower(trim(col("ImageURL"))) != "null")
)

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
    ).otherwise(trim(col("Title")))
)

df = df.withColumn(
    "original_artist",
    when(
        col("Artist").isNull() | 
        (trim(col("Artist")) == "") | 
        (lower(trim(col("Artist"))) == "null") |
        (lower(trim(col("Artist"))) == "unidentified artist") |
        (lower(trim(col("Artist"))) == "unidentified designer"),
        lit("작가 미상")
    ).otherwise(trim(col("Artist")))
)

df = df.withColumn("image_url", trim(col("ImageURL")))
df = df.withColumn("description", lit(None).cast("string"))
df = df.withColumn(
    "country_origin",
    when(
        col("Nationality").isNull() | (trim(col("Nationality")) == ""),
        lit("Unknown")
    ).otherwise(regexp_replace(trim(col("Nationality")), r"[^a-zA-Z0-9\s]", ""))
)

df = df.withColumn(
    "created_year",
    when(regexp_extract(col("Date"), r"(\d{4})", 1) != "", regexp_extract(col("Date"), r"(\d{4})", 1).cast("int"))
    .when(
        regexp_extract(col("Date"), r"(\d{1,2})(st|nd|rd|th)\s+century", 1) != "",
        ((regexp_extract(col("Date"), r"(\d{1,2})(st|nd|rd|th)\s+century", 1).cast("int") - 1) * 100).cast("int")
    ).otherwise(None)
)

df = df.withColumn(
    "materials",
    when(col("Medium").isNull() | (trim(col("Medium")) == ""), None)
    .otherwise(trim(col("Medium")))
)

df = df.withColumn("museum", lit("MOMA"))
df = df.withColumn("color", lit(None).cast("string"))
df = df.withColumn("ingest_date", current_date())

df_silver = df.select(
    "museum", "original_title", "original_artist", "image_url",
    "description", "country_origin", "created_year",
    "materials", "color", "ingest_date"
).dropDuplicates(["image_url"])

output_path = "hdfs:///user/hadoop/silver/moma_artworks.parquet"
df_silver.write.mode("overwrite").parquet(output_path)

df_parquet = spark.read.parquet(output_path)
df_parquet.show(1, truncate=False)
print("총 레코드 수:", df_parquet.count())

for row in df_parquet.limit(1).collect():
    record = row.asDict()
    for key, value in record.items():
        print(f"{key:20}: {value}")
    print("=" * 40)

spark.stop()
