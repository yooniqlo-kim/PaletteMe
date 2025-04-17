from airflow import DAG
from airflow.operators.bash import BashOperator
from datetime import datetime, timedelta
from pendulum import timezone

local_tz = timezone("Asia/Seoul")

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

dag = DAG(
    dag_id='fetch_national_america_artworks',
    default_args=default_args,
    description='Download National Museum of American History CSVs and store in HDFS bronze layer',
    schedule_interval='@daily',
    start_date=datetime(2025, 3, 31, tzinfo=local_tz),
    catchup=False,
)

# Local 저장 경로
objects_local = '/tmp/national_america_objects.csv'
images_local = '/tmp/national_america_images.csv'

# 원본 데이터 URL
objects_url = 'https://raw.githubusercontent.com/NationalGalleryOfArt/opendata/main/data/objects.csv'
images_url = 'https://raw.githubusercontent.com/NationalGalleryOfArt/opendata/main/data/published_images.csv'

# HDFS 경로
hdfs_dir = '/user/hadoop/bronze/national_america'
objects_hdfs = f'{hdfs_dir}/objects.csv'
images_hdfs = f'{hdfs_dir}/images.csv'

# 공통 환경 변수
common_env = {
    "HADOOP_USER_NAME": "root",
    "JAVA_HOME": "/opt/java",
    "PATH": "/opt/hadoop/bin:/opt/java/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
}

# 1. 데이터 다운로드
download_objects = BashOperator(
    task_id='download_objects_csv',
    bash_command=f'wget -O {objects_local} {objects_url}',
    dag=dag,
)

download_images = BashOperator(
    task_id='download_images_csv',
    bash_command=f'wget -O {images_local} {images_url}',
    dag=dag,
)

# 2. HDFS 디렉토리 생성
mkdir_task = BashOperator(
    task_id='make_hdfs_bronze_national_dir',
    env=common_env,
    bash_command=f'hdfs dfs -mkdir -p {hdfs_dir}',
    dag=dag,
)

# 3. HDFS 업로드
upload_objects = BashOperator(
    task_id='upload_objects_to_hdfs',
    env=common_env,
    bash_command=f'hdfs dfs -put -f {objects_local} {objects_hdfs}',
    dag=dag,
)

upload_images = BashOperator(
    task_id='upload_images_to_hdfs',
    env=common_env,
    bash_command=f'hdfs dfs -put -f {images_local} {images_hdfs}',
    dag=dag,
)

# DAG 흐름 연결
[download_objects, download_images] >> mkdir_task >> [upload_objects, upload_images]