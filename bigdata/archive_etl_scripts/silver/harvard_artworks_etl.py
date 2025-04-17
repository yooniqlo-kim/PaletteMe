from pyspark.sql import SparkSession
from pyspark.sql.functions import (
    col, lit, expr, size, regexp_replace, trim, lower, current_date,
    when, regexp_extract
)

# Spark 세션 시작
spark = SparkSession.builder.config("spark.executor.memory", "2g").getOrCreate()

# 1. 원본 JSON 로드 (Harvard Art Museum의 bronze 레이어 데이터)
input_path = "hdfs:///user/hadoop/bronze/harvard/Artworks.json"
df = spark.read.option("multiline", "true").json(input_path)

# 2. 유효한 이미지 URL이 있는 레코드만 필터링
df = df.filter(
    col("primaryimageurl").isNotNull() &
    (trim(col("primaryimageurl")) != "") &
    (lower(trim(col("primaryimageurl"))) != "null")
)

# 3. 작품명 정제: 특수문자 제거, 비어있으면 "Untitled"로 대체
df = df.withColumn(
    "original_title",
    when(
        col("title").isNull() |
        (trim(col("title")) == "") |
        (lower(trim(col("title"))) == "null"),
        lit("무제")
    ).when(
        lower(trim(col("title"))) == "untitled",  # 제목이 딱 Untitled인 경우
        lit("무제")
    ).otherwise(
        regexp_replace(trim(col("title")), r"[\[\]]", "")  # 대괄호만 제거
    )
)

# 4. 화가명 추출 및 정제: people.role = 'Artist' 조건으로 필터, 없으면 "unknown artist"
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
    ).otherwise((trim(col("en_artist_raw"))))
).drop("en_artist_raw")  # 임시 컬럼 제거

# 5. 이미지 URL 정제 (공백 제거)
df = df.withColumn("image_url", trim(col("primaryimageurl")))

# 6. 작품 설명 정제: HTML 태그 제거 및 양쪽 공백 제거
df = df.withColumn("description", trim(regexp_replace(col("description"), "<[^>]*>", "")))

# 7. 원산지 정제: culture 컬럼 값, 없다면 Null
df = df.withColumn("country_origin", when(col("culture").isNull(), None).otherwise(trim(col("culture"))))

# 8. 제작 연도 추출
#  - 4자리 숫자 연도 먼저 추출
#  - "19th century"와 같은 형식은 해당 세기를 100 곱해 연도로 변환
df = df.withColumn(
    "created_year",
    when(regexp_extract(col("dated"), r"(\d{4})", 1) != "", regexp_extract(col("dated"), r"(\d{4})", 1).cast("int"))
    .when(regexp_extract(col("dated"), r"(\d{1,2})(st|nd|rd|th)\s+century", 1) != "",
          ((regexp_extract(col("dated"), r"(\d{1,2})(st|nd|rd|th)\s+century", 1).cast("int") - 1) * 100).cast("int"))
    .otherwise(None)
)

# 9. 재료 정보 정제 (medium 컬럼)
df = df.withColumn("materials", when(col("medium").isNull(), None).otherwise(trim(col("medium"))))

# 10. 색상 정보 추출 (colors 배열의 첫 번째 요소의 hue 값)
df = df.withColumn("color", col("colors").getItem(0).getField("hue"))

# 11. 수집 날짜 삽입
df = df.withColumn("ingest_date", current_date())

# 12. SILVER 모델에 맞는 컬럼만 선택 (정제 후)
df_silver = df.select(
    lit("Harvard Art Museum").alias("museum"),  # 기관명 상수 처리
    "original_title",
    "original_artist",
    "image_url",
    "description",
    "country_origin",
    "created_year",
    "materials",
    "color",
    "ingest_date"
)

df_silver = df_silver.dropDuplicates(["image_url"])

# 13. 결과를 HDFS silver 레이어에 저장 (Parquet 형식)
output_path = "hdfs:///user/hadoop/silver/harvard_artworks.parquet"
df_silver.write.mode("overwrite").parquet(output_path)

# 14. 결과 파일 읽어서 확인
df_parquet = spark.read.parquet(output_path)
df_parquet.show(1, truncate=False)
print("레코드 수:", df_parquet.count())

# 15. 샘플 레코드 상세 출력 (key-value 형식으로 보기 좋게)
for row in df_parquet.limit(1).collect():
    record = row.asDict()
    for key, value in record.items():
        print(f"{key}: {value}")
    print("=" * 40)

# 16. 세션 종료
spark.stop()
