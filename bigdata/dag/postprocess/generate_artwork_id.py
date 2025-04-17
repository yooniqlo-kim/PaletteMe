from pyspark.sql import SparkSession
from pyspark.sql.functions import col, row_number, regexp_replace
from pyspark.sql.window import Window
from pyspark.sql.types import StructType, StructField, StringType
import pandas as pd
from rapidfuzz import fuzz
from tqdm import tqdm
import time

# 1. Spark 세션 시작
spark = SparkSession.builder \
    .appName("Artist Matching with RapidFuzz") \
    .config("spark.executor.memory", "2g") \
    .getOrCreate()

# 2. 데이터 로드
df = spark.read.parquet("hdfs:///user/hadoop/gold/artworks.parquet")

# ✅ 2-1. original_artist에서 특수문자 제거 (한글, 영문, 숫자, 공백, 괄호만 유지)
df = df.withColumn(
    "original_artist",
    regexp_replace(col("original_artist"), r"[^a-zA-Z0-9가-힣\s()]", "")
)

# 3. original_artist 고유값 수집
artist_list = df.select("original_artist").distinct().dropna().rdd.map(lambda r: r[0]).collect()
artist_list = sorted(set(artist_list))  # 안정적 순서
print(f"🎨 총 작가 수: {len(artist_list)}")

# 4. Fuzzy matching으로 클러스터링
start_time = time.time()  # 시작 시간
clusters = []
threshold = 90

for idx, artist in enumerate(tqdm(artist_list, desc="🔍 RapidFuzz matching 중")):
    matched = False
    for cluster in clusters:
        if fuzz.ratio(artist.lower(), cluster[0].lower()) >= threshold:
            cluster.append(artist)
            matched = True
            break
    if not matched:
        clusters.append([artist])

    if (idx + 1) % 100 == 0:
        elapsed = time.time() - start_time
        print(f"[{idx + 1}/{len(artist_list)}] 완료 - 경과 {elapsed:.1f}s, 클러스터 수: {len(clusters)}")

end_time = time.time()  # 종료 시간
total_time = end_time - start_time

print(f"✅ 매칭 완료 - 총 {len(clusters)}개 클러스터")
print(f"⏱️ 전체 클러스터링 소요 시간: {total_time:.2f}초")

# 5. 대표 작가 추출 + artist_id 부여용 mapping 생성
cluster_representatives = [group[0] for group in clusters]

# 모든 원본 artist → 대표 artist로 매핑
artist_mapping = {}
for rep in cluster_representatives:
    for group in clusters:
        if group[0] == rep:
            for a in group:
                artist_mapping[a] = rep

# 6. artists 테이블 생성
artists_df = pd.DataFrame({
    "original_artist": cluster_representatives,
    "en_artist": [None] * len(cluster_representatives),
    "kor_artist": [None] * len(cluster_representatives)
})

schema = StructType([
    StructField("original_artist", StringType(), True),
    StructField("en_artist", StringType(), True),
    StructField("kor_artist", StringType(), True),
])

spark_artists = spark.createDataFrame(artists_df, schema=schema) \
    .dropDuplicates(["original_artist"]) \
    .withColumn("artist_id", row_number().over(Window.orderBy("original_artist"))) \
    .select("artist_id", "original_artist", "kor_artist", "en_artist")

# 저장
spark_artists.write.mode("overwrite").parquet("hdfs:///user/hadoop/gold/artists.parquet")

# 7. artworks에 artist_id 조인
mapping_df = pd.DataFrame(artist_mapping.items(), columns=["original", "mapped"])
mapping_spark = spark.createDataFrame(mapping_df)

df = df.join(mapping_spark, df.original_artist == mapping_spark.original, "left") \
       .drop("original") \
       .withColumnRenamed("mapped", "normalized_artist")

df = df.join(spark_artists.select("artist_id", "original_artist"), df.normalized_artist == spark_artists.original_artist, "left") \
       .drop("normalized_artist", "original_artist") \
       .withColumnRenamed("artist_id", "artist_id")

ordered_columns = [
    "artwork_id",
    "museum_id",
    "era",
    "artist_id",
    "original_title",
    "image_url",
    "description",
    "country_origin",
    "created_year",
    "materials",
    "color"
]

df = df.select(*ordered_columns)

# 8. 저장
df.write.mode("overwrite").parquet("hdfs:///user/hadoop/gold/artworks_with_artist_id.parquet")
