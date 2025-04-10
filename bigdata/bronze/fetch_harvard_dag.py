from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.operators.bash import BashOperator
from airflow.models.variable import Variable
from datetime import datetime, timedelta
from pendulum import timezone
import asyncio
import aiohttp
import json
import time
import logging

local_tz = timezone("Asia/Seoul")

def fetch_harvard_artworks():
    """
    Harvard Art Museums API를 통해 데이터를 비동기로 수집하고,
    /tmp/harvard_artworks.json 파일에 저장하는 함수.
    """
    BASE_URL = "https://api.harvardartmuseums.org/object"
    API_KEY = Variable.get("harvard_api_key")  # Harvard API 키
    LIMIT = 100  # 한 번 요청 시 가져올 데이터 개수
    CONCURRENT_REQUESTS = 5  # 동시에 실행할 요청 수

    logging.info(f"[DEBUG] Harvard API Key = {API_KEY}")

    PARAMS = {
        "apikey": API_KEY,
        "size": LIMIT
    }

    all_data = []

    async def fetch_page(session, page, max_retries=3):
        """특정 페이지 데이터를 가져오는 비동기 함수 (최대 max_retries회 재시도)"""
        for attempt in range(max_retries):
            try:
                start_time = time.time()
                params = PARAMS.copy()
                params["page"] = page

                async with session.get(BASE_URL, params=params, timeout=10) as response:
                    response.raise_for_status()
                    data = await response.json()
                    records = data.get("records", [])
                    elapsed_time = time.time() - start_time

                    if not records:
                        logging.info(f"🚨 [Page {page}] 데이터 없음 (⏱ {elapsed_time:.2f}초) → 수집 종료.")
                        return None

                    logging.info(f"✅ [Page {page}] {len(records)}개 수집 완료 (⏱ {elapsed_time:.2f}초)")
                    return records
            except Exception as e:
                logging.error(f"🚨 [Page {page}] 요청 실패 (시도 {attempt+1}/{max_retries}): {e}")
                await asyncio.sleep(2 ** attempt)
        return []  # 재시도 후에도 실패하면 빈 리스트 반환

    async def fetch_all_pages():
        nonlocal all_data
        start_time = time.time()
        page = 1

        async with aiohttp.ClientSession() as session:
            while True:
                logging.info(f"\n🚀 요청 중: {page} ~ {page + CONCURRENT_REQUESTS - 1} 페이지...")
                tasks = [fetch_page(session, p) for p in range(page, page + CONCURRENT_REQUESTS)]
                results = await asyncio.gather(*tasks)

                for records in results:
                    if records is None:  # 데이터 없음 → 종료
                        logging.info("✅ 모든 데이터를 수집 완료!")
                        break
                    all_data.extend(records)

                logging.info(f"📊 현재까지 수집된 총 데이터 개수: {len(all_data)}")
                page += CONCURRENT_REQUESTS

                if results[-1] is None:
                    break

        elapsed = time.time() - start_time
        logging.info(f"\n🎨 총 {len(all_data)}개의 작품 데이터를 수집 완료! (소요 시간: {elapsed:.2f}초)")

        with open("/tmp/harvard_artworks.json", "w", encoding="utf-8") as f:
            json.dump(all_data, f, ensure_ascii=False, indent=4)

    asyncio.run(fetch_all_pages())

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

dag = DAG(
    dag_id='fetch_harvard_artworks',
    default_args=default_args,
    description='Harvard Art Museums API 데이터 수집 후 HDFS Bronze 레이어에 저장',
    schedule_interval='@daily',
    start_date=datetime(2025, 3, 31, tzinfo=local_tz),
    catchup=False,
)

# 1. Harvard API 데이터 수집 (PythonOperator)
fetch_harvard_task = PythonOperator(
    task_id='fetch_harvard_artworks',
    python_callable=fetch_harvard_artworks,
    dag=dag,
)

# HDFS 관련 설정
hdfs_dir = '/user/hadoop/bronze/harvard'
hdfs_file = f'{hdfs_dir}/Artworks.json'

common_env = {
    "HADOOP_USER_NAME": "root",
    "JAVA_HOME": "/opt/java",
    "PATH": "/opt/hadoop/bin:/opt/java/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
}


mkdir_task = BashOperator(
    task_id='make_hdfs_bronze_harvard_dir',
    env=common_env,
    bash_command=f'hdfs dfs -mkdir -p {hdfs_dir}',
    dag=dag,
)

upload_task = BashOperator(
    task_id='upload_harvard_artworks_to_hdfs',
    env=common_env,
    bash_command=f'hdfs dfs -put -f /tmp/harvard_artworks.json {hdfs_file}',
    dag=dag,
)

fetch_harvard_task >> mkdir_task >> upload_task
