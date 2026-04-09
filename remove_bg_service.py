"""
Background removal service using remove.bg API.
Processes all JPGs in the objects/ directory and saves PNGs to objects_new/.
"""

import asyncio
import os
from pathlib import Path

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.responses import JSONResponse

load_dotenv()

API_KEY = os.getenv("REMOVE_BG_API_KEY")
REMOVE_BG_URL = "https://api.remove.bg/v1.0/removebg"

BASE_DIR = Path(__file__).parent
INPUT_DIR = BASE_DIR / "objects"
OUTPUT_DIR = BASE_DIR / "objects_new"

app = FastAPI(title="Background Removal Service")

# Track job status in memory
job_status: dict[str, dict] = {}


def get_jpg_files() -> list[Path]:
    return sorted(INPUT_DIR.glob("*.jpg")) + sorted(INPUT_DIR.glob("*.JPG"))


async def remove_background(client: httpx.AsyncClient, jpg_path: Path) -> dict:
    output_path = OUTPUT_DIR / (jpg_path.stem + ".png")

    with open(jpg_path, "rb") as f:
        response = await client.post(
            REMOVE_BG_URL,
            headers={"X-Api-Key": API_KEY},
            files={"image_file": (jpg_path.name, f, "image/jpeg")},
            data={
                "size": "full",       # highest resolution (up to 25MP)
                "format": "png",      # PNG preserves transparency
                "type": "auto",       # let remove.bg detect subject type
            },
            timeout=120.0,
        )

    if response.status_code == 200:
        OUTPUT_DIR.mkdir(exist_ok=True)
        output_path.write_bytes(response.content)
        credits = response.headers.get("X-Credits-Charged", "?")
        return {"file": jpg_path.name, "status": "ok", "output": str(output_path), "credits_charged": credits}
    elif response.status_code == 402:
        return {"file": jpg_path.name, "status": "error", "detail": "Insufficient remove.bg credits"}
    elif response.status_code == 429:
        retry_after = response.headers.get("Retry-After", "unknown")
        return {"file": jpg_path.name, "status": "error", "detail": f"Rate limited — retry after {retry_after}s"}
    else:
        try:
            msg = response.json().get("errors", [{}])[0].get("title", response.text)
        except Exception:
            msg = response.text
        return {"file": jpg_path.name, "status": "error", "detail": msg}


async def process_all_task(job_id: str):
    if not API_KEY:
        job_status[job_id] = {"status": "failed", "detail": "REMOVE_BG_API_KEY not set in .env"}
        return

    files = get_jpg_files()
    if not files:
        job_status[job_id] = {"status": "done", "results": [], "detail": "No JPGs found in objects/"}
        return

    job_status[job_id] = {"status": "running", "total": len(files), "completed": 0, "results": []}

    # remove.bg rate limit: ~500 images/min for small images; process concurrently with a semaphore
    semaphore = asyncio.Semaphore(5)

    async def bounded(client, path):
        async with semaphore:
            try:
                result = await remove_background(client, path)
            except Exception as e:
                result = {"file": path.name, "status": "error", "detail": str(e)}
            job_status[job_id]["completed"] += 1
            job_status[job_id]["results"].append(result)
            return result

    async with httpx.AsyncClient() as client:
        await asyncio.gather(*[bounded(client, f) for f in files])

    job_status[job_id]["status"] = "done"


@app.get("/")
def root():
    files = get_jpg_files()
    return {
        "input_dir": str(INPUT_DIR),
        "output_dir": str(OUTPUT_DIR),
        "jpgs_found": len(files),
        "files": [f.name for f in files],
    }


@app.post("/process")
async def process_all(background_tasks: BackgroundTasks):
    """Kick off background removal for every JPG in objects/. Returns a job_id to poll."""
    if not API_KEY:
        raise HTTPException(status_code=500, detail="REMOVE_BG_API_KEY not set in .env")

    job_id = f"job_{len(job_status) + 1}"
    job_status[job_id] = {"status": "queued"}
    background_tasks.add_task(process_all_task, job_id)
    return {"job_id": job_id, "message": f"Processing {len(get_jpg_files())} files in background."}


@app.get("/status/{job_id}")
def get_status(job_id: str):
    """Poll job status and per-file results."""
    if job_id not in job_status:
        raise HTTPException(status_code=404, detail="Job not found.")
    return job_status[job_id]


@app.post("/process/sync")
async def process_sync():
    """Synchronously process all JPGs and return results. Blocks until done."""
    if not API_KEY:
        raise HTTPException(status_code=500, detail="REMOVE_BG_API_KEY not set in .env")

    files = get_jpg_files()
    if not files:
        return {"results": [], "detail": "No JPGs found in objects/"}

    semaphore = asyncio.Semaphore(5)
    results = []

    async def bounded(client, path):
        async with semaphore:
            try:
                return await remove_background(client, path)
            except Exception as e:
                return {"file": path.name, "status": "error", "detail": str(e)}

    async with httpx.AsyncClient() as client:
        results = await asyncio.gather(*[bounded(client, f) for f in files])

    ok = sum(1 for r in results if r["status"] == "ok")
    return {"total": len(results), "succeeded": ok, "failed": len(results) - ok, "results": list(results)}
