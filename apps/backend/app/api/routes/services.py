from typing import List, Optional, Annotated
from fastapi import APIRouter, Depends, HTTPException, Query, Response
from sqlmodel.ext.asyncio.session import AsyncSession

from app.api.deps import get_session
from app.lib.crud.service import service_crud
from app.lib.db.models import ServiceCategory, ServiceProvider
from app.lib.db.schemas import (
    ServiceRead,
    ServiceCreateSchema,
    ServiceUpdateSchema,
    SuggestionsResponse,
)
from app.lib.utils.logger_setup import logger

router = APIRouter(
    responses={404: {"description": "Not found"}},
)

# Cache constants for easy maintenance
LONG_CACHE = "public, s-maxage=3600, stale-while-revalidate=59"
SHORT_CACHE = "public, s-maxage=600, stale-while-revalidate=30"


@router.get(
    "/filtered",
    summary="Retrieve services with filters",
    response_model=List[ServiceRead],
)
async def get_services(
    response: Response,
    db: AsyncSession = Depends(get_session),
    category: Optional[ServiceCategory] = None,
    provider: Optional[ServiceProvider] = None,
    skip: int = 0,
    limit: int = 100,
):
    """
    Retrieve a list of services with optional category and provider filtering.

    - **category**: Filter by service category (e.g., Taxation, Transport).
    - **provider**: Filter by service provider (e.g., KRA, NTSA).
    - **skip/limit**: Standard pagination.
    """
    try:
        response.headers["Cache-Control"] = LONG_CACHE
        return await service_crud.get_multi_filtered(
            db, category=category, provider=provider, skip=skip, limit=limit
        )
    except Exception:
        raise HTTPException(status_code=500, detail="Error fetching services list")


@router.get(
    "/by-slug/{slug}",
    summary="Get detail by slug",
    response_model=ServiceRead,
    status_code=200,
)
async def get_service_by_slug(slug: str, db: AsyncSession = Depends(get_session)):
    """
    Fetch full details for a single service using its unique slug.
    Primarily used for Next.js dynamic product pages.
    """
    service = await service_crud.get_by_slug(db, slug=slug)
    if not service:
        raise HTTPException(
            status_code=404, detail=f"Service with slug '{slug}' not found"
        )
    return service


@router.get("/search-manifest", response_model=List[SuggestionsResponse])
async def get_search_manifest(
    response: Response, db: AsyncSession = Depends(get_session), limit: int = 200
):
    """
    Returns a minified JSON list of all active services (name, slug, category, price).
    Optimized for local frontend filtering in the search bar.
    """
    response.headers["Cache-Control"] = LONG_CACHE
    manifest = await service_crud.get_search_manifest(db, limit=limit)
    if not manifest:
        return []
    return manifest


@router.get("/suggestions", response_model=List[SuggestionsResponse])
async def search_suggestions(
    q: Annotated[str, Query(min_length=3)], db: AsyncSession = Depends(get_session)
):
    """
    Fuzzy search endpoint using pg_trgm for typo tolerance.
    Only called when local manifest results are insufficient.
    """
    try:
        return await service_crud.get_search_suggestions(db, query=q)
    except Exception:
        # Log error here in production
        raise HTTPException(
            status_code=500, detail="Search engine temporarily unavailable"
        )


@router.get("/trending", response_model=List[SuggestionsResponse] | None)
async def get_trending_services(
    response: Response, db: AsyncSession = Depends(get_session), limit: int = 5
):
    """
    Fetches the highest ranked services based on popularity_score.
    Cached for a shorter duration to reflect shifting trends.
    """
    response.headers["Cache-Control"] = SHORT_CACHE
    services = await service_crud.get_trending_services(db, limit=limit)
    if services:
        return services
    return None


@router.get("/filters-manifest")
async def get_filters_manifest(
    response: Response, db: AsyncSession = Depends(get_session)
):
    """
    Provides a mapping of active Providers and Categories to drive
    the dynamic sidebar filter UI.
    """
    response.headers["Cache-Control"] = LONG_CACHE
    return await service_crud.get_filters_manifest(db)


@router.get("/services-by-provider/{provider}", response_model=List[ServiceRead])
async def get_services_by_provider(
    provider: ServiceProvider,
    response: Response,
    db: AsyncSession = Depends(get_session),
):
    """
    Fetches all services offered by a specific provider.
    Used for provider-specific landing pages.
    """
    response.headers["Cache-Control"] = LONG_CACHE
    return await service_crud.services_by_provider(db, provider)


@router.get("/published-slugs", response_model=List[str])
async def get_published_slugs(
    response: Response, db: AsyncSession = Depends(get_session), limit: int = 100
):
    """
    Returns a list of slugs for all published and available services.
    Used for Next.js static generation (SSG) of dynamic routes.
    """
    response.headers["Cache-Control"] = LONG_CACHE
    return await service_crud.get_published_slugs(db, limit=limit)


@router.post("/register", status_code=201)
async def register_service(
    db_obj: ServiceCreateSchema, db: AsyncSession = Depends(get_session)
):
    new = await service_crud.create_service(db=db, obj_in=db_obj)
    # await db.commit()
    return new


@router.post("/increment-popularity/{slug}", status_code=204)
async def increment_service_popularity(
    slug: str, db: AsyncSession = Depends(get_session)
):
    await service_crud.increment_popularity(db, slug)
    # await db.commit()
    return


@router.put("/update/{slug}", status_code=200)
async def update_service(
    slug: str, db_obj: ServiceUpdateSchema, db: AsyncSession = Depends(get_session)
):
    updated = await service_crud.update_by_slug(db, slug, db_obj)
    # await db.commit()
    logger.debug(f"Service with slug '{slug}' updated successfully.")
    return updated


@router.delete("/delete/{slug}", status_code=204)
async def delete_service(slug: str, db: AsyncSession = Depends(get_session)):
    await service_crud.delete_by_slug(db, slug)
    # await db.commit()
    return
