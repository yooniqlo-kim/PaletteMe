import asyncio, aiohttp, json, logging, time
from airflow.models import Variable

def fetch_harvard_artworks():
    BASE_URL = "https://api.harvardartmuseums.org/object"
    API_KEY = Variable.get("harvard_api_key")
    LIMIT = 100
    CONCURRENT_REQUESTS = 5
    PARAMS = {"apikey": API_KEY, "size": LIMIT}
    all_data = []

    async def fetch_page(session, page, max_retries=3):
        for attempt in range(max_retries):
            try:
                params = PARAMS.copy()
                params["page"] = page
                async with session.get(BASE_URL, params=params, timeout=10) as response:
                    response.raise_for_status()
                    data = await response.json()
                    records = data.get("records", [])
                    if not records:
                        return None
                    return records
            except Exception as e:
                logging.error(f"[Page {page}] 실패 ({attempt+1}): {e}")
                await asyncio.sleep(2 ** attempt)
        return []

    async def fetch_all_pages():
        nonlocal all_data
        page = 1
        async with aiohttp.ClientSession() as session:
            while True:
                tasks = [fetch_page(session, p) for p in range(page, page + CONCURRENT_REQUESTS)]
                results = await asyncio.gather(*tasks)
                for records in results:
                    if records is None:
                        break
                    all_data.extend(records)
                page += CONCURRENT_REQUESTS
                if results[-1] is None:
                    break

        with open("/tmp/harvard_artworks.json", "w", encoding="utf-8") as f:
            json.dump(all_data, f, ensure_ascii=False, indent=4)

    asyncio.run(fetch_all_pages())
