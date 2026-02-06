from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlmodel.ext.asyncio.session import AsyncSession

from app.lib.db.session import engine
from app.lib.utils.logger_setup import logger
from app.core.config import settings
from app.api.api_router import api_router
from app.api.deps import (
    get_session,
)  # Assuming engine is exported from deps or db config


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Handles startup and shutdown events.
    Verifies database connectivity before allowing the app to start.
    """
    logger.info(f"Starting {settings.app_name} - Version: {settings.image_tag}")

    # 1. Connectivity Check (Fail-Fast)
    try:
        async with AsyncSession(engine) as session:
            # Simple query to verify DB is alive and reachable
            await session.execute(text("SELECT 1"))
            logger.info("Database connectivity verified.")
    except Exception as e:
        logger.critical(f"Database connection failed during startup: {e}")
        # Raising an exception here prevents the app from starting
        raise RuntimeError(
            "Could not connect to the database. Aborting startup."
        ) from e

    yield
    logger.info(f"Shutting down {settings.app_name} API")


def create_application() -> FastAPI:
    """
    Factory function to initialize the FastAPI app.
    """
    application = FastAPI(
        title=settings.app_name,
        version=settings.image_tag,
        lifespan=lifespan,
        docs_url="/docs" if settings.ENVIRONMENT != "production" else None,
        redoc_url=None,
    )

    # 1. Middleware
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


@app.get("/__test_crash__")
async def test_crash():
    raise Exception("Database Connection Failed")


@app.get("/health", tags=["System"])
async def health_check(session: AsyncSession = Depends(get_session)):
    """
    Deep health check verifying database availability.
    Utilizes the standard get_session dependency.
    """
    try:
        # Perform a low-overhead query
        await session.exec(text("SELECT 1"))
        return {
            "status": "healthy",
            "version": settings.image_tag,
            "database": "connected",
        }
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        raise HTTPException(status_code=503, detail="Database connection unhealthy")


@app.get("/seed_data", tags=["System"])
async def seed_data():
    from app.lib.utils.seed_services import seed_services

    await seed_services()
    return {"detail": "Data seeding initiated"}
