from airflow import DAG
from airflow.operators.bash import BashOperator
from airflow.sensors.external_task import ExternalTaskSensor
from airflow.utils.trigger_rule import TriggerRule
from datetime import datetime, timedelta
from pendulum import timezone

local_tz = timezone("Asia/Seoul")

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'retries': 0,
    'retry_delay': timedelta(minutes=3),
    'email': ['yoon73337@gmail.com'],
    'email_on_failure': True,
    'email_on_retry': False,
}

dag = DAG(
    dag_id='gold_pipeline_dag',
    default_args=default_args,
    description='전처리 데이터 통합 및 테이블 생성 DAG',
    schedule_interval=None,
    start_date=datetime(2025, 4, 17, tzinfo=local_tz),
    catchup=False,
)

env = {
    "HADOOP_USER_NAME": Variable.get("HADOOP_USER_NAME"),
    "JAVA_HOME": Variable.get("JAVA_HOME"),
    "PATH": Variable.get("PATH"),
}

wait_harvard = ExternalTaskSensor(
    task_id='wait_for_harvard_preprocess',
    external_dag_id='harvard_pipeline_dag',
    external_task_id='spark_preprocess_harvard',
    mode='poke',
    timeout=600,
    poke_interval=30,
    dag=dag,
)

wait_met = ExternalTaskSensor(
    task_id='wait_for_met_preprocess',
    external_dag_id='met_pipeline_dag',
    external_task_id='spark_preprocess_met',
    mode='poke',
    timeout=600,
    poke_interval=30,
    dag=dag,
)

wait_moma = ExternalTaskSensor(
    task_id='wait_for_moma_preprocess',
    external_dag_id='moma_pipeline_dag',
    external_task_id='spark_preprocess_moma',
    mode='poke',
    timeout=600,
    poke_interval=30,
    dag=dag,
)

wait_america = ExternalTaskSensor(
    task_id='wait_for_america_preprocess',
    external_dag_id='national_america_pipeline_dag',
    external_task_id='spark_preprocess_national_america',
    mode='poke',
    timeout=600,
    poke_interval=30,
    dag=dag,
)

wait_korea = ExternalTaskSensor(
    task_id='wait_for_korea_preprocess',
    external_dag_id='national_korea_pipeline_dag',
    external_task_id='spark_preprocess_national_korea',
    mode='poke',
    timeout=600,
    poke_interval=30,
    dag=dag,
)

# GOLD 작업 시작
merge = BashOperator(
    task_id='merge_artworks',
    bash_command='spark-submit /opt/airflow/dags/postprocess/merge_artworks.py',
    env=env,
    dag=dag,
)

artwork_id = BashOperator(
    task_id='generate_artwork_id',
    bash_command='spark-submit /opt/airflow/dags/postprocess/generate_artwork_id.py',
    env=env,
    dag=dag,
)

museum = BashOperator(
    task_id='generate_museum_table',
    bash_command='spark-submit /opt/airflow/dags/postprocess/generate_museum_table.py',
    env=env,
    dag=dag,
)

artist = BashOperator(
    task_id='generate_artist_table',
    bash_command='spark-submit /opt/airflow/dags/postprocess/generate_artist_table.py',
    env=env,
    dag=dag,
)

era = BashOperator(
    task_id='generate_era_table',
    bash_command='spark-submit /opt/airflow/dags/postprocess/generate_era_table.py',
    env=env,
    dag=dag,
)

[wait_harvard, wait_met, wait_moma, wait_america, wait_korea] >> merge
merge >> artwork_id >> museum >> artist >> era