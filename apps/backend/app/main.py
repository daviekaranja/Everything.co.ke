from fastapi import FastAPI
from app.lib.utils.logging import logger
from app.core.config import settings
from app.api.api_router import api_router

app = FastAPI(title=settings.app_name, version=settings.image_tag)

logger.info("Starting EverthingKe API application")


app.include_router(api_router)


@app.get("/")
async def read_root():
    logger.info("Root endpoint accessed")
    logger.info(settings.async_database_url)
    logger.info(settings.database_url)
    return {"Hello": "World"}
