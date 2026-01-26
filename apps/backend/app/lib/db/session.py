from typing import AsyncGenerator

from sqlmodel import SQLModel
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.ext.asyncio import AsyncEngine, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool

from app.core.config import settings

# ---------------------------------------------------------
# Async database URL
# ---------------------------------------------------------


# ---------------------------------------------------------
# Async Engine (SQLModel-compatible)
# ---------------------------------------------------------
engine: AsyncEngine = create_async_engine(
    settings.async_database_url,
    echo=False,
    future=True,
    poolclass=NullPool,  # 👈 prevents idle connections
    connect_args={
        "server_settings": {
            "timezone": "UTC",
        }
    },
)

# ---------------------------------------------------------
# SQLModel AsyncSession factory
# ---------------------------------------------------------
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,   # 👈 SQLModel AsyncSession
    expire_on_commit=False,
)

# ---------------------------------------------------------
# FastAPI dependency
# ---------------------------------------------------------
async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        yield session
