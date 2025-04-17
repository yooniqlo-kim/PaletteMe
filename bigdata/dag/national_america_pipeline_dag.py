from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.operators.bash import BashOperator
from airflow.models import Variable
from datetime import datetime, timedelta
from pendulum import timezone

from fetch.national_america_fetch import (
    download_national_america_objects,
    download_national_america_images,
)

local_tz = timezone("Asia/Seoul")

default_args = {
    'owner': 'airflow',
    'email': ['yoon73337@gmail.com'],
    'email_on_failure': True,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

common_env = {
    "HADOOP_USER_NAME": Variable.get("HADOOP_USER_NAME"),
    "JAVA_HOME": Variable.get("JAVA_HOME"),
    "PATH": Variable.get("PATH"),
}

with DAG(
    dag_id='national_america_pipeline_dag',
    default_args=default_args,
    description='미국 국립 미술관 데이터 수집 및 전처리 DAG',
    schedule_interval='@daily',
    start_date=datetime(2025, 3, 31, tzinfo=local_tz),
    catchup=False,
) as dag:

    fetch_objects = PythonOperator(
        task_id='fetch_objects_csv',
        python_callable=download_national_america_objects,
    )

    fetch_images = PythonOperator(
        task_id='fetch_images_csv',
        python_callable=download_national_america_images,
    )

    mkdir_hdfs = BashOperator(
        task_id='make_hdfs_bronze_national_dir',
        env=common_env,
        bash_command='hdfs dfs -mkdir -p /user/hadoop/bronze/national_america',
    )

    upload_objects = BashOperator(
        task_id='upload_objects_to_hdfs',
        env=common_env,
        bash_command='hdfs dfs -put -f /tmp/national_america_objects.csv /user/hadoop/bronze/national_america/objects.csv',
    )

    upload_images = BashOperator(
        task_id='upload_images_to_hdfs',
        env=common_env,
        bash_command='hdfs dfs -put -f /tmp/national_america_images.csv /user/hadoop/bronze/national_america/images.csv',
    )

    preprocess = BashOperator(
        task_id='spark_preprocess_national_america',
        bash_command='spark-submit /opt/airflow/dags/preprocess/national_america_preprocess.py',
    )

    [fetch_objects, fetch_images] >> mkdir_hdfs >> [upload_objects, upload_images] >> preprocess
