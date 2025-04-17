from airflow import DAG
from airflow.operators.bash import BashOperator
from airflow.operators.python import PythonOperator
from airflow.models import Variable
from datetime import datetime, timedelta
from pendulum import timezone
from fetch.moma_fetch import fetch_moma_artworks

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
    dag_id='moma_pipeline_dag',
    default_args=default_args,
    description='MOMA 미술관 데이터 수집 및 전처리 DAG',
    schedule_interval='@daily',
    start_date=datetime(2025, 3, 31, tzinfo=local_tz),
    catchup=False,
) as dag:

    fetch_task = PythonOperator(
        task_id='fetch_moma',
        python_callable=fetch_moma_artworks,
    )

    mkdir_task = BashOperator(
        task_id='make_hdfs_dir',
        bash_command='hdfs dfs -mkdir -p /user/hadoop/bronze/moma',
        env=common_env,
    )

    upload_task = BashOperator(
        task_id='upload_to_hdfs',
        bash_command='hdfs dfs -put -f /tmp/moma_artworks.csv /user/hadoop/bronze/moma/Artworks.csv',
        env=common_env,
    )

    preprocess_task = BashOperator(
        task_id='spark_preprocess_moma',
        bash_command='spark-submit /opt/airflow/dags/preprocess/moma_preprocess.py',
    )

    fetch_task >> mkdir_task >> upload_task >> preprocess_task
