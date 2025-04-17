import time
import pandas as pd
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, trim, lower, when, lit
from rapidfuzz import process, fuzz

# 1. Spark 세션 시작
spark = SparkSession.builder.appName("Split Artist Table with Invalid Handling").getOrCreate()

# 2. 데이터 로드 (artworks_with_museum_id.parquet)
df = spark.read.parquet("hdfs:///user/hadoop/gold/artworks_with_museum_id.parquet")

# 3. 작가명 정제 및 기준 컬럼 생성
# 외국 작품은 en_artist, 한국 작품은 kor_artist를 사용
df_prepared = df.withColumn(
    "artist_to_match",
    when(col("museum_id") == 5, lower(trim(col("kor_artist"))))  \
    .otherwise(lower(trim(col("en_artist"))))
)

# 4. 유효하지 않은 작가명 처리: 외국 작품에서는 "none", "null", "unknown artist" → "invalid_en"
#    한국 작품에서는 "none", "null", "작가미상" → "invalid_ko"
df_prepared = df_prepared.withColumn(
    "valid_artist",
    when(
        (col("museum_id") != 5) & (col("artist_to_match").isin("none", "null", "unknown artist")),
        lit("invalid_en")
    ).when(
        (col("museum_id") == 5) & (col("artist_to_match").isin("none", "null", "작가 미상")),
        lit("invalid_ko")
    ).otherwise(col("artist_to_match"))
)

# 5. 고유한 valid_artist 목록 추출 (Spark → Pandas)
unique_rows = df_prepared.select("valid_artist").distinct().na.drop().collect()
artist_list = [row["valid_artist"] for row in unique_rows]

total = len(artist_list)
print(f"고유 valid_artist 개수: {total}")

# 6. Fuzzy Matching: en_artist에 대해서만 진행 (단, "invalid_en"과 "invalid_ko"는 건너뜀)
clusters = {}
visited = set()
threshold = 90

start_time = time.time()
for i, name in enumerate(artist_list):
    if name in visited or name in {"invalid_en", "invalid_ko"}:
        continue
    matches = process.extract(name, artist_list, scorer=fuzz.ratio, limit=None)
    group = [match for match, score, _ in matches if score >= threshold]
    for member in group:
        visited.add(member)
        clusters[member] = name  # 대표 이름으로 name 사용
    if (i + 1) % 100 == 0 or (i + 1) == total:
        elapsed = time.time() - start_time
        print(f"[Fuzzy] Processed {i+1}/{total} names, elapsed: {elapsed:.2f}s")
total_time = time.time() - start_time
print(f"Fuzzy matching complete. Total time: {total_time:.2f}s")

# 7. mapping DataFrame 생성 (Pandas) from fuzzy matching 결과
mapping_df = pd.DataFrame(list(clusters.items()), columns=["valid_artist", "normalized_artist"])

# 8. 수동으로 invalid 값에 대한 매핑 추가:
# 외국 작품의 invalid 값은 "invalid_en" → normalized: "unknown artist"
# 한국 작품의 invalid 값은 "invalid_ko" → normalized: "작가미상"
manual_df = pd.DataFrame({
    "valid_artist": ["invalid_en", "invalid_ko"],
    "normalized_artist": ["unknown artist", "작가 미상"]
})
mapping_df = pd.concat([mapping_df, manual_df], ignore_index=True).drop_duplicates(subset=["valid_artist"])

# 9. 대표 이름(normalized_artist) 기준으로 artist_id 부여 (1부터 순차 증가)
# 단, invalid 값은 artist_id 0로 부여
valid_mask = ~mapping_df["valid_artist"].isin(["invalid_en", "invalid_ko"])
unique_reps = sorted(mapping_df[valid_mask]["normalized_artist"].unique())
rep_to_id = {rep: idx + 1 for idx, rep in enumerate(unique_reps)}

# artist_id: 유효한 경우 rep_to_id, invalid은 0
mapping_df["artist_id"] = mapping_df["normalized_artist"].apply(lambda x: rep_to_id[x] if x in rep_to_id else 0)

print("Artist mapping sample:")
print(mapping_df.head(10))

# 10. Spark DataFrame으로 변환 (artist mapping 테이블)
artist_mapping_sdf = spark.createDataFrame(mapping_df)

# 11. 원본 데이터와 매핑 정보 병합 (조인 키: artist_to_match)
df_with_artist = df_prepared.join(artist_mapping_sdf, on="artist_to_match", how="left")

# 12. 최종 artist 테이블 생성
# 여기서 en_artist 컬럼은 fuzzy matching을 통해 정규화된 normalized_artist 값을 사용
artist_table = df_with_artist.select("artist_id", "normalized_artist", "kor_artist") \
    .distinct() \
    .withColumnRenamed("normalized_artist", "en_artist")

# 13. 결과 저장
df_with_artist.write.mode("overwrite").parquet("hdfs:///user/hadoop/gold/artworks_with_artist_id.parquet")
artist_table.write.mode("overwrite").parquet("hdfs:///user/hadoop/gold/artists.parquet")

print("✅ 작업 완료: artworks_with_artist_id.parquet 및 artists.parquet 저장됨.")
