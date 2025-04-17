import requests

def download_national_america_objects():
    url = 'https://raw.githubusercontent.com/NationalGalleryOfArt/opendata/main/data/objects.csv'
    local_path = '/tmp/national_america_objects.csv'
    response = requests.get(url)
    response.raise_for_status()
    with open(local_path, 'wb') as f:
        f.write(response.content)

def download_national_america_images():
    url = 'https://raw.githubusercontent.com/NationalGalleryOfArt/opendata/main/data/published_images.csv'
    local_path = '/tmp/national_america_images.csv'
    response = requests.get(url)
    response.raise_for_status()
    with open(local_path, 'wb') as f:
        f.write(response.content)
