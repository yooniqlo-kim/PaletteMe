from pyspark.sql import SparkSession
from pyspark.sql.functions import lit
from pyspark.sql.types import StringType

# Spark 세션 시작
spark = SparkSession.builder.appName("Merge Silver Artwork Data").config("spark.executor.memory", "2g").getOrCreate()


# HARVARD
df_harvard = spark.read.parquet("/user/hadoop/silver/harvard_artworks.parquet") \
    .withColumn("era", lit(None).cast(StringType()))

# MOMA
df_moma = spark.read.parquet("/user/hadoop/silver/moma_artworks.parquet") \
    .withColumn("era", lit(None).cast(StringType()))

# MET
df_met = spark.read.parquet("/user/hadoop/silver/met_artworks.parquet") \
    .withColumn("era", lit(None).cast(StringType()))

# NATIONAL GALLERY OF AMERICA
df_america = spark.read.parquet("/user/hadoop/silver/national_america_artworks.parquet") \
    .withColumn("era", lit(None).cast(StringType()))

# NATIONAL KOREA (이미 era 있음)
df_korea = spark.read.parquet("/user/hadoop/silver/national_korea_artworks.parquet")

# 통합
full_df = df_harvard.unionByName(df_moma) \
    .unionByName(df_met) \
    .unionByName(df_america) \
    .unionByName(df_korea)

# 컬럼 정렬
full_df = full_df.select(
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

# 저장
output_path = "hdfs:///user/hadoop/gold/merge_artworks"
full_df.write.mode("overwrite").parquet(output_path)


# 샘플 레코드 출력
for row in full_df.limit(1).collect():
    record = row.asDict()
    for key, value in record.items():
        print(f"{key}: {value}")
    print("=" * 40)

# 색상 목록 보기 (중복 없이)
full_df.select("color") \
    .where(col("color").isNotNull()) \
    .distinct() \
    .show(truncate=False)

# 색상별 개수도 같이
full_df.where(col("color").isNotNull()) \
    .groupBy("color") \
    .count() \
    .orderBy("count", ascending=False) \
    .show(truncate=False)