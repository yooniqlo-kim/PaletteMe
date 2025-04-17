from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.operators.bash import BashOperator
from fetch.fetch_national_korea import fetch_kcisa_data
from airflow.models import Variable
from datetime import datetime, timedelta
from pendulum import timezone

local_tz = timezone("Asia/Seoul")

default_args = {
    'owner': 'airflow',
    'email': ['yoon73337@gmail.com'],
    'email_on_failure': True,
    'depends_on_past': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

dag = DAG(
    dag_id='national_korea_pipeline_dag',
    default_args=default_args,
    description='국립 중앙 박물관 데이터 수집 및 전처리 DAG',
    schedule_interval='@daily',
    start_date=datetime(2025, 3, 31, tzinfo=local_tz),
    catchup=False,
)

common_env = {
    "HADOOP_USER_NAME": Variable.get("HADOOP_USER_NAME"),
    "JAVA_HOME": Variable.get("JAVA_HOME"),
    "PATH": Variable.get("PATH"),
}

# 경로 설정
local_path = "/tmp/national_korea.json"
hdfs_dir = "/user/hadoop/bronze/korea"
hdfs_file = f"{hdfs_dir}/Artworks.json"

fetch_task = PythonOperator(
    task_id='fetch_national_korea',
    python_callable=fetch_kcisa_data,
    dag=dag,
)

mkdir_task = BashOperator(
    task_id='make_hdfs_bronze_korea_dir',
    env=common_env,
    bash_command=f'hdfs dfs -mkdir -p {hdfs_dir}',
    dag=dag,
)

upload_task = BashOperator(
    task_id='upload_korea_json_to_hdfs',
    env=common_env,
    bash_command=f'hdfs dfs -put -f {local_path} {hdfs_file}',
    dag=dag,
)

preprocess_task = BashOperator(
    task_id='spark_preprocess_national_korea',
    bash_command='spark-submit /opt/airflow/dags/preprocess/national_korea_preprocess.py',
    dag=dag,
)

fetch_task >> mkdir_task >> upload_task >> preprocess_task
