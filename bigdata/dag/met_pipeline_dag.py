from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.operators.bash import BashOperator
from airflow.models import Variable
from datetime import datetime, timedelta
from pendulum import timezone
from fetch.met_fetch import fetch_object_ids, fetch_met_artworks

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
    dag_id='metmuseum_pipeline_dag',
    default_args=default_args,
    description='MET 미술관 데이터 수집 및 전처리 DAG',
    schedule_interval='@daily',
    start_date=datetime(2025, 3, 31, tzinfo=local_tz),
    catchup=False,
) as dag:

    fetch_ids_task = PythonOperator(
        task_id='fetch_met_object_ids',
        python_callable=fetch_object_ids,
    )

    fetch_objects_task = PythonOperator(
        task_id='fetch_met_artworks',
        python_callable=fetch_met_artworks,
    )

    mkdir_task = BashOperator(
        task_id='make_hdfs_dir',
        bash_command='hdfs dfs -mkdir -p /user/hadoop/bronze/met',
        env=common_env,
    )

    upload_ids_task = BashOperator(
        task_id='upload_object_ids_to_hdfs',
        bash_command='hdfs dfs -put -f /tmp/metmuseum_object_ids.json /user/hadoop/bronze/met/ObjectIDs.json',
        env=common_env,
    )

    upload_artworks_task = BashOperator(
        task_id='upload_artworks_to_hdfs',
        bash_command='hdfs dfs -put -f /tmp/metmuseum_objects_all.json /user/hadoop/bronze/met/Artworks.json',
        env=common_env,
    )

    preprocess_task = BashOperator(
        task_id='spark_preprocess_met',
        bash_command='spark-submit /opt/airflow/dags/preprocess/met_preprocess.py',
    )

    # DAG Flow
    fetch_ids_task >> fetch_objects_task >> mkdir_task >> [upload_ids_task, upload_artworks_task] >> preprocess_task
