import os
import subprocess

def fetch_moma_artworks():
    local_repo = "/tmp/collection"
    local_csv = "/tmp/moma_artworks.csv"

    if os.path.exists(local_repo):
        subprocess.run(["rm", "-rf", local_repo])

    subprocess.run(["git", "clone", "https://github.com/MuseumofModernArt/collection.git", local_repo])
    subprocess.run(["cp", f"{local_repo}/Artworks.csv", local_csv])
