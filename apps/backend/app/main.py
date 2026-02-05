from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from app.lib.utils.logger_setup import logger
from app.core.config import settings
from app.api.api_router import api_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Handles startup and shutdown events.
    Ideal for managing DB connection pools or caches.
    """
    logger.info(f"Starting {settings.app_name} - Version: {settings.image_tag}")
    # You can initialize your DB engine here if not handled by deps
    yield
    logger.info(f"Shutting down {settings.app_name} API")


def create_application() -> FastAPI:
    """
    Factory function to initialize the FastAPI app.
    Implements security, middleware, and routing.
    """
    application = FastAPI(
        title=settings.app_name,
        version=settings.image_tag,
        lifespan=lifespan,
        docs_url="/docs" if settings.ENVIRONMENT != "production" else None,
        redoc_url=None,
    )

    # 1. Middleware - Essential for Frontend integration
    application.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # 2. Global Exception Handler
    @application.exception_handler(Exception)
    async def global_exception_handler(request: Request, exc: Exception):
        logger.error(f"Unhandled error: {exc}", exc_info=True)
        return JSONResponse(
            status_code=500,
            content={
                "detail": "Internal Server Error",
                "error_type": type(exc).__name__,
            },
        )

    # 3. Routing
    application.include_router(api_router, prefix=settings.API_V1_STR)

    return application


app = create_application()


@app.get("/", tags=["Health"])
async def read_root():
    """
    Root endpoint for health checks.
    """
    logger.info("Health check accessed")
    return {
        "status": "online",
        "app_name": settings.app_name,
        "environment": settings.ENVIRONMENT,
    }


@app.get("/__test_crash__")
async def test_crash():
    raise Exception("Database Connection Failed")


@app.get("/seed_data")
async def seed_data():
    from app.lib.utils.seed_services import seed_services

    await seed_services()
    return {"detail": "Data seeding initiated"}
