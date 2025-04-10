from pyspark.sql import SparkSession
from pyspark.sql.functions import col, when, row_number, count
from pyspark.sql.window import Window

# 1. Spark 세션 시작
spark = SparkSession.builder \
    .appName("Final Era Matching") \
    .config("spark.executor.memory", "2g") \
    .getOrCreate()

# 2. 작품 데이터 로드 (era는 일부 null 또는 "None")
df = spark.read.parquet("hdfs:///user/hadoop/gold/artworks_with_artist_id.parquet")

# 3. created_year가 4자리 숫자인 작품 중 era가 없을 경우 → derived_era 생성
df_filtered = df.filter(
    ((col("era").isNull()) | (col("era") == "None")) & (col("created_year").rlike(r"^\d{4}$"))
).withColumn("created_year_int", col("created_year").cast("int"))

# 4. derived_era 생성 로직
df_classified = df_filtered.withColumn(
    "derived_era",
    when(col("created_year_int") <= 400, "고대 미술")
    .when((col("created_year_int") > 400) & (col("created_year_int") <= 1300), "중세 미술")
    .when((col("created_year_int") > 1300) & (col("created_year_int") <= 1600), "르네상스")
    .when((col("created_year_int") > 1600) & (col("created_year_int") <= 1750), "바로크")
    .when((col("created_year_int") > 1720) & (col("created_year_int") <= 1780), "로코코")
    .when((col("created_year_int") > 1750) & (col("created_year_int") <= 1850), "신고전주의 & 낭만주의")
    .when((col("created_year_int") > 1850) & (col("created_year_int") <= 1900), "사실주의 & 인상주의")
    .when((col("created_year_int") > 1900) & (col("created_year_int") <= 1945), "근대 미술")
    .when(col("created_year_int") > 1945, "동시대 미술")
    .otherwise(None)
)

# 5. derived_era를 원본 데이터와 병합
df_with_derived = df.join(
    df_classified.select("artwork_id", "derived_era"),
    on="artwork_id",
    how="left"
)

# 6. 최종 시대 final_era 컬럼 생성: era가 있으면 그대로, 없으면 derived_era 사용
df_final = df_with_derived.withColumn(
    "final_era",
    when(col("era").isNotNull() & (col("era") != "None"), col("era"))
    .otherwise(col("derived_era"))
)

# 7. final_era 기준 고유한 시대 목록 추출
era_union_df = df_final.select("final_era").filter(col("final_era").isNotNull()).distinct()

# 8. final_era 기준으로 작품 수 집계
era_counts = df_final.groupBy("final_era").agg(count("*").alias("era_cnt"))

# 9. 시대 테이블 생성: era_id 부여
eras_df = era_union_df.join(
    era_counts,
    on="final_era",
    how="left"
).select(
    "final_era", "era_cnt"
).withColumn(
    "era_id", row_number().over(Window.orderBy("final_era"))
).select(
    "era_id",
    col("final_era").alias("era"),
    "era_cnt"
)

# 10. artworks 테이블에 era_id 매핑
df_with_era_id = df_final.join(
    eras_df,
    df_final["final_era"] == eras_df["era"],
    how="left"
).select(
    "artwork_id", "museum_id", "era_id", "artist_id", "original_title", "image_url",
    "description", "country_origin", "created_year", "materials", "color"
)

# 11. 저장
df_with_era_id.write.mode("overwrite").parquet("hdfs:///user/hadoop/gold/artworks_with_era_id.parquet")
eras_df.write.mode("overwrite").parquet("hdfs:///user/hadoop/gold/eras.parquet")

print("✅ artworks_with_era_id.parquet 저장 완료")
print("✅ eras.parquet 저장 완료")

# 샘플 레코드 출력
for row in df_with_era_id.limit(1).collect():
    record = row.asDict()
    for key, value in record.items():
        print(f"{key}: {value}")
    print("=" * 40)
