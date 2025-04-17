from pyspark.sql import SparkSession
from pyspark.sql.functions import (
    col, lit, regexp_replace, trim, lower, current_date,
    when, regexp_extract
)

spark = SparkSession.builder.config("spark.executor.memory", "2g").getOrCreate()

input_path = "hdfs:///user/hadoop/bronze/met/Artworks.json"
df = spark.read.option("multiline", "true").json(input_path)

df = df.filter(
    col("primaryImage").isNotNull() &
    (trim(col("primaryImage")) != "") &
    (lower(trim(col("primaryImage"))) != "null")
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
    ).otherwise(
        regexp_replace(
            regexp_replace(trim(col("Title")), r"<[^>]+>", ""),
            r"[\[\]]", ""
        )
    )
)

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

df = df.withColumn("image_url", trim(col("primaryImage")))
df = df.withColumn("description", lit(None).cast("string"))

df = df.withColumn(
    "created_year",
    when(regexp_extract(col("objectDate"), r"(\d{4})", 1) != "", regexp_extract(col("objectDate"), r"(\d{4})", 1).cast("int"))
    .otherwise(
        when(col("objectBeginDate").cast("int").isNotNull(), col("objectBeginDate").cast("int"))
        .otherwise(None)
    )
)

df = df.withColumn(
    "materials",
    when(col("medium").isNull() | (trim(col("medium")) == ""), None)
    .otherwise(trim(col("medium")))
)

df = df.withColumn(
    "country_origin",
    when(col("country").isNull() | (trim(col("country")) == ""), lit("Unknown"))
    .otherwise(regexp_replace(trim(col("country")), r"[^a-zA-Z0-9\s]", ""))
)

df = df.withColumn("color", lit(None).cast("string"))
df = df.withColumn("museum", lit("The Metropolitan Museum of Art"))
df = df.withColumn("ingest_date", current_date())

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
).dropDuplicates(["image_url"])

output_path = "hdfs:///user/hadoop/silver/met_artworks.parquet"
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
