import asyncio
import aiohttp
import json
import time
import logging
import requests
from aiolimiter import AsyncLimiter
from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.operators.bash import BashOperator
from airflow.models.variable import Variable
from datetime import datetime, timedelta
from pendulum import timezone

local_tz = timezone("Asia/Seoul")
OBJECTS_URL = "https://collectionapi.metmuseum.org/public/collection/v1/objects"
OBJECT_DETAIL_URL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/{}"
MAX_RETRIES = 3
RETRY_DELAY = 0.75
limiter = AsyncLimiter(80, 1)  # 초당 80개 제한
 
def fetch_object_ids():
    try:
        response = requests.get(OBJECTS_URL, timeout=10)
        response.raise_for_status()
        data = response.json()
        object_ids = data.get("objectIDs", [])
        with open("/tmp/metmuseum_object_ids.json", "w", encoding="utf-8") as f:
            json.dump(object_ids, f, ensure_ascii=False, indent=2)
        return object_ids
    except Exception as e:
        logging.error(f"objectID 목록 수집 실패: {e}")
        return []

async def fetch_object_detail(session, object_id):
    url = OBJECT_DETAIL_URL.format(object_id)
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            async with limiter:
                async with session.get(url, timeout=10) as response:
                    response.raise_for_status()
                    return await response.json()
        except Exception as e:
            logging.error(f"objectID {object_id} 요청 실패 (시도 {attempt}): {e}")
            if attempt < MAX_RETRIES:
                await asyncio.sleep(RETRY_DELAY * (2 ** (attempt - 1)))
            else:
                return None

async def fetch_all_object_details(object_ids, concurrent_limit=20):
    semaphore = asyncio.Semaphore(concurrent_limit)
    async with aiohttp.ClientSession() as session:
        async def fetch_with_sem(obj_id):
            async with semaphore:
                return await fetch_object_detail(session, obj_id)

        tasks = [fetch_with_sem(obj_id) for obj_id in object_ids]
        results = []
        batch_size = 100
        for i in range(0, len(tasks), batch_size):
            batch = tasks[i:i + batch_size]
            results.extend(await asyncio.gather(*batch))
            logging.info(f"{min(i+batch_size, len(tasks))}개 완료")
        return [res for res in results if res is not None]

def fetch_met_artworks():
    start_time = time.time()
    object_ids = fetch_object_ids()
    if not object_ids:
        logging.error("objectIDs 수집 실패")
        return

    # test_object_ids = object_ids[:10]   
    details = asyncio.run(fetch_all_object_details(object_ids))
    with open("/tmp/metmuseum_objects_all.json", "w", encoding="utf-8") as f:
        json.dump(details, f, ensure_ascii=False, indent=2)

    elapsed = time.time() - start_time
    logging.info(f"전체 소요 시간: {elapsed:.2f}초")

# DAG 정의
default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

dag = DAG(
    dag_id='fetch_met_artworks',
    default_args=default_args,
    description='Fetch Met Museum API data and store in HDFS bronze layer',
    schedule_interval='@daily',
    start_date=datetime(2025, 3, 31, tzinfo=local_tz),
    catchup=False,
)

# 파일 경로
ids_local = '/tmp/metmuseum_object_ids.json'
objects_local = '/tmp/metmuseum_objects_all.json'
hdfs_dir = '/user/hadoop/bronze/met'
ids_hdfs = f'{hdfs_dir}/ObjectIDs.json'
objects_hdfs = f'{hdfs_dir}/Artworks.json'

# 공통 환경 변수
common_env = {
    "HADOOP_USER_NAME": "root",
    "JAVA_HOME": "/opt/java",
    "PATH": "/opt/hadoop/bin:/opt/java/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
}

# 1. objectIDs 수집
fetch_ids_task = PythonOperator(
    task_id='fetch_met_object_ids',
    python_callable=fetch_object_ids,
    dag=dag,
)

# 2. object 세부 정보 수집
fetch_met_task = PythonOperator(
    task_id='fetch_met_artworks',
    python_callable=fetch_met_artworks,
    dag=dag,
)

# 3. HDFS 디렉토리 생성
mkdir_task = BashOperator(
    task_id='make_hdfs_bronze_met_dir',
    env=common_env,
    bash_command=f'hdfs dfs -mkdir -p {hdfs_dir}',
    dag=dag,
)

# 4. 파일 업로드
upload_ids_task = BashOperator(
    task_id='upload_met_object_ids_to_hdfs',
    env=common_env,
    bash_command=f'hdfs dfs -put -f {ids_local} {ids_hdfs}',
    dag=dag,
)

upload_objects_task = BashOperator(
    task_id='upload_met_artworks_to_hdfs',
    env=common_env,
    bash_command=f'hdfs dfs -put -f {objects_local} {objects_hdfs}',
    dag=dag,
)

# DAG 흐름
fetch_ids_task >> fetch_met_task >> mkdir_task >> [upload_ids_task, upload_objects_task]
