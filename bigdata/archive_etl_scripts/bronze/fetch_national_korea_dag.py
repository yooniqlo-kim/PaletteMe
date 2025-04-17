import asyncio
import aiohttp
import json
import time
import logging
from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.operators.bash import BashOperator
from airflow.models.variable import Variable
from datetime import datetime, timedelta
from pendulum import timezone

local_tz = timezone("Asia/Seoul")
DAILY_LIMIT = 100000

def parse_xml(xml_data):
    import xml.etree.ElementTree as ET
    root = ET.fromstring(xml_data)
    items = []
    for item in root.findall(".//item"):
        record = {child.tag: child.text for child in item}
        items.append(record)
    return items

def fetch_kcisa_data():
    BASE_URL = "http://api.kcisa.kr/openapi/service/rest/convergence/conver7"
    API_KEY = Variable.get("national_korea_api_key")
    LIMIT = 100
    CONCURRENT_REQUESTS = 5

    PARAMS = {
        "serviceKey": API_KEY,
        "pageNo": 1,
        "numOfRows": LIMIT
    }

    all_data = []

    async def fetch_page(session, page, max_retries=3):
        for attempt in range(max_retries):
            try:
                start_time = time.time()
                params = PARAMS.copy()
                params["pageNo"] = page

                async with session.get(BASE_URL, params=params, timeout=10) as response:
                    response.raise_for_status()
                    xml_data = await response.text()
                    records = parse_xml(xml_data)
                    elapsed_time = time.time() - start_time

                    if not records:
                        logging.info(f"🚨 [Page {page}] 데이터 없음 (⏱ {elapsed_time:.2f}초)")
                        return None

                    logging.info(f"✅ [Page {page}] {len(records)}개 수집 완료 (⏱ {elapsed_time:.2f}초)")
                    return records
            except Exception as e:
                logging.error(f"🚨 [Page {page}] 요청 실패: {e}")
                await asyncio.sleep(2 ** attempt)
        return []

    async def fetch_all_pages():
        nonlocal all_data
        start_time = time.time()
        page = 1

        async with aiohttp.ClientSession() as session:
            while True:
                tasks = [fetch_page(session, p) for p in range(page, page + CONCURRENT_REQUESTS)]
                results = await asyncio.gather(*tasks)

                for records in results:
                    if records is None:
                        return
                    all_data.extend(records)
                    if len(all_data) >= DAILY_LIMIT:
                        break

                if len(all_data) >= DAILY_LIMIT or results[-1] is None:
                    break

                page += CONCURRENT_REQUESTS
                await asyncio.sleep(3)

        elapsed = time.time() - start_time
        logging.info(f"🎭 총 {len(all_data)}개 수집 완료 (⏱ {elapsed:.2f}초)")

        with open("/tmp/national_korea.json", "w", encoding="utf-8") as f:
            json.dump(all_data[:DAILY_LIMIT], f, ensure_ascii=False, indent=4)

    asyncio.run(fetch_all_pages())

# DAG 정의
default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

dag = DAG(
    dag_id='fetch_national_korea_artworks',
    default_args=default_args,
    description='KCISA API 수집 → HDFS 업로드',
    schedule_interval='@daily',
    start_date=datetime(2025, 3, 31, tzinfo=local_tz),
    catchup=False,
)

# 경로 설정
local_path = '/tmp/national_korea.json'
hdfs_dir = '/user/hadoop/bronze/korea'
hdfs_file = f'{hdfs_dir}/Artworks.json'

# 공통 환경변수
common_env = {
    "HADOOP_USER_NAME": "root",
    "JAVA_HOME": "/opt/java",
    "PATH": "/opt/hadoop/bin:/opt/java/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
}

# 1. API 데이터 수집
fetch_kcisa_task = PythonOperator(
    task_id='fetch_national_korea_artworks',
    python_callable=fetch_kcisa_data,
    dag=dag,
)

# 2. HDFS 디렉토리 생성
mkdir_task = BashOperator(
    task_id='make_hdfs_bronze_korea_dir',
    env=common_env,
    bash_command=f'hdfs dfs -mkdir -p {hdfs_dir}',
    dag=dag,
)

# 3. HDFS 업로드
upload_task = BashOperator(
    task_id='upload_national_korea_to_hdfs',
    env=common_env,
    bash_command=f'hdfs dfs -put -f {local_path} {hdfs_file}',
    dag=dag,
)

# DAG 연결
fetch_kcisa_task >> mkdir_task >> upload_task
