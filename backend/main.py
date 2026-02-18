from fastapi import APIRouter, FastAPI

app = FastAPI(title="AI Web Scraper Backend")
router = APIRouter()

@router.get("/")
def health():
    return {"status": "ok"}

app.include_router(router)