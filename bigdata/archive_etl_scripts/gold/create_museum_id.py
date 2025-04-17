from pyspark.sql import SparkSession
from pyspark.sql.functions import col, row_number, count, trim
from pyspark.sql.window import Window

# 0. Spark 세션 시작
spark = SparkSession.builder.appName("Split Museums Table").getOrCreate()

# 1. Gold 테이블 로드 (artworks_with_id 포함)
df = spark.read.parquet("hdfs:///user/hadoop/gold/artworks_with_id.parquet")

# 2. museum 테이블 생성
# - 공백 제거된 museum 이름 기준 groupBy
# - 작품 수 집계 (artwork_cnt)
# - museum_id 생성 (오름차순 정렬 기반 row_number 사용)
museum_df = df.withColumn("museum_trimmed", trim(col("museum"))) \
              .groupBy("museum_trimmed") \
              .agg(count("*").alias("artwork_cnt")) \
              .withColumn("museum_id", row_number().over(Window.orderBy("museum_trimmed")))

# 3. 컬럼 정리 및 저장 (museum_name으로 컬럼명 명확화)
museum_table = museum_df.select(
    "museum_id",
    col("museum_trimmed").alias("museum_name"),
    "artwork_cnt"
)

# 확인용 출력
museum_table.show()

# 4. museum_table 저장 → HDFS (정규화된 museums 테이블)
museum_table.write.mode("overwrite").parquet("hdfs:///user/hadoop/gold/museums.parquet")

# 5. artworks 데이터에 museum_id 조인
# - 기존 museum 이름 기준으로 museum_id 매핑
df_with_museum_id = df.join(
    museum_table,
    df.museum == museum_table.museum_name,
    "left"
).drop("museum")  # 기존 museum 문자열 컬럼 제거

# 6. museum_id 포함된 artworks 저장 → HDFS
df_with_museum_id.write.mode("overwrite").parquet("hdfs:///user/hadoop/gold/artworks_with_museum_id.parquet")

# 7. ERD 순서에 맞춰 컬럼 정렬 (미술관 ID 포함)
ordered_columns = [
    "artwork_id",
    "museum_id",
    "era",               # 현재는 string, 추후 era 테이블과 조인 예정
    "original_artist",   # 현재는 string, 추후 artist 테이블과 조인 예정
    "original_title",
    "image_url",
    "description",
    "country_origin",
    "created_year",
    "materials",
    "color"
]

# 컬럼 정렬된 DataFrame 생성
df_ordered = df_with_museum_id.select(*ordered_columns)

# 8. 최종 artworks 테이블 저장 (ERD 구조 반영)
output_path = "hdfs:///user/hadoop/gold/artworks.parquet"
df_ordered.write.mode("overwrite").parquet(output_path)
