from typing import Sequence, Optional, List, Dict, Any

from fastapi import HTTPException
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import text
from sqlmodel import select, desc, update, or_, and_
from sqlmodel.ext.asyncio.session import AsyncSession

from .base import BaseCRUD
from app.lib.db.models import Service, ServiceCategory, ServiceProvider
from app.lib.db.schemas import ServiceCreateSchema, ServiceUpdateSchema
from ..utils.helpers import utc_now
from ..utils.logger_setup import logger


class ServiceCRUD(BaseCRUD[Service, ServiceCreateSchema, ServiceUpdateSchema]):
    """CRUD operations for Service model with optimized search and delivery logic."""

    model = Service

    async def get_by_slug(self, db: AsyncSession, slug: str) -> Optional[Service]:
        """Fetch a single service by its slug."""
        try:
            statement = (
                select(self.model)
                .where(
                    and_(
                        self.model.slug == slug,
                        self.model.published.is_(True),
                    )
                )
                .limit(1)
            )
            result = await db.exec(statement)
            # ✅ SQLModel ScalarResult uses .one_or_none()
            return result.one_or_none()
        except SQLAlchemyError as e:
            logger.error(f"Database error fetching slug '{slug}': {e}")
            raise

    async def create_service(
        self, db: AsyncSession, *, obj_in: ServiceCreateSchema
    ) -> Service:
        """Create a new service and commit immediately."""
        try:
            db_obj = await self.create(db, obj_in=obj_in)
            await db.commit()
            logger.info(f"Service created: {db_obj.name} (ID: {db_obj.id})")
            return db_obj
        except SQLAlchemyError as e:
            await db.rollback()
            logger.error(f"Failed to create service '{obj_in.name}': {e}")
            raise

    async def get_published_slugs(
        self,
        db: AsyncSession,
        limit: int = 100,
        published: bool = True,
        available: bool = True,
    ) -> List[str]:
        """Returns slugs for build-time static generation (SSG)."""
        statement = (
            select(self.model.slug)
            .where(
                and_(
                    self.model.published == published, self.model.available == available
                )
            )
            .order_by(desc(self.model.popularity_score))
            .limit(limit)
        )
        result = await db.exec(statement)
        return list(result.all())

    async def get_multi_filtered(
        self,
        db: AsyncSession,
        *,
        skip: int = 0,
        limit: int = 100,
        category: Optional[ServiceCategory] = None,
        provider: Optional[ServiceProvider] = None,
    ) -> Sequence[Service]:
        """Dynamic filtering for category/provider listing pages."""
        statement = select(self.model)

        if category:
            statement = statement.where(self.model.category == category)
        if provider:
            statement = statement.where(self.model.provider == provider)

        statement = statement.offset(skip).limit(limit).order_by(self.model.name)

        result = await db.exec(statement)
        return result.all()

    async def get_filters_manifest(self, db: AsyncSession) -> Dict[str, List[str]]:
        """Maps Categories to available Providers for the UI filter sidebar."""
        statement = select(self.model.category, self.model.provider).distinct()
        # statement = select(self.model.provider, self.model.category).distinct()
        result = await db.exec(statement)

        manifest: Dict[str, List[str]] = {}
        for cat, prov in result.all():
            manifest.setdefault(cat, []).append(prov)
        return manifest

    async def services_by_provider(
        self,
        db: AsyncSession,
        provider: ServiceProvider,
        limit: int = 50,
        skip: int = 50,
    ) -> Sequence[Service]:
        """Maps Categories to available Providers for the UI filter sidebar."""
        # statement = select(self.model.category, self.model.provider).distinct()
        statement = select(self.model).where(self.model.provider == provider).distinct()
        # if provider:
        #     statement = statement.where(self.model.provider == provider)
        #
        # statement = statement.offset(skip).limit(limit).order_by(self.model.name)

        result = await db.exec(statement)
        return result.all()

    async def get_search_suggestions(
        self, db: AsyncSession, query: str, limit: int = 6
    ) -> List[Dict[str, Any]]:
        """Hybrid search (Trigram + ILIKE) for real-time suggestions."""
        try:
            # Lower threshold locally for shorter Kenyan terms (KRA, NHIF)
            await db.exec(text("SET LOCAL pg_trgm.similarity_threshold = 0.15"))

            statement = (
                select(
                    self.model.name,
                    self.model.slug,
                    self.model.category,
                    self.model.pricing,
                )
                .where(
                    and_(
                        self.model.published,
                        self.model.searchable,
                        or_(
                            self.model.name.ilike(f"%{query}%"),
                            text("name % :q").bindparams(q=query),
                        ),
                    )
                )
                .order_by(
                    text("name <-> :q").bindparams(q=query),
                    desc(self.model.popularity_score),
                )
                .limit(limit)
            )

            result = await db.exec(statement)
            return [
                {
                    "n": r.name,
                    "s": r.slug,
                    "c": r.category,
                    "p": r.pricing.get("total", 0)
                    if isinstance(r.pricing, dict)
                    else 0,
                }
                for r in result.all()
            ]
        except SQLAlchemyError as e:
            logger.error(f"Search suggestion error for query '{query}': {e}")
            return []

    async def increment_popularity(
        self, db: AsyncSession, slug: str, value: float = 0.5
    ) -> None:
        """Atomically increment popularity score for a service."""
        try:
            statement = (
                update(self.model)
                .where(self.model.slug == slug)
                .values(popularity_score=self.model.popularity_score + value)
            )
            await db.exec(statement)
            await db.commit()
            logger.debug(f"Popularity +0.5 for service: {slug}")
        except SQLAlchemyError as e:
            await db.rollback()
            logger.error(f"Failed to increment popularity for '{slug}': {e}")

    async def get_search_manifest(
        self, db: AsyncSession, limit: int = 200
    ) -> List[Dict[str, Any]]:
        """Small payload of all services for instant client-side filtering."""
        statement = (
            select(
                self.model.name,
                self.model.slug,
                self.model.category,
                self.model.pricing,
            )
            .where(self.model.published)
            .order_by(desc(self.model.popularity_score))
            .limit(limit)
        )
        result = await db.exec(statement)
        return [
            {
                "n": r.name,
                "s": r.slug,
                "c": r.category,
                "p": r.pricing.get("total", 0) if r.pricing else 0,
            }
            for r in result.all()
        ]

    async def get_trending_services(
        self, db: AsyncSession, limit: int = 5
    ) -> List[Dict[str, Any]]:
        """Returns top services for the 'zero-state' search UI."""
        statement = (
            select(self.model.name, self.model.slug, self.model.category)
            .where(and_(self.model.published, self.model.available))
            .order_by(desc(self.model.popularity_score))
            .limit(limit)
        )
        result = await db.exec(statement)
        return [{"n": r.name, "s": r.slug, "c": r.category} for r in result.all()]

    async def delete_by_slug(self, db: AsyncSession, slug: str) -> None:
        """Delete a service by its slug."""
        #         we implement soft delete by setting available=False to preserve historical data and avoid FK issues
        try:
            statement = (
                update(self.model)
                .where(self.model.slug == slug)
                .values(
                    available=False,
                    published=False,
                    searchable=False,
                    deleted_at=utc_now(),
                )
            )
            await db.exec(statement)
            await db.commit()
            logger.info(f"Service soft-deleted (available=False): {slug}")
        except SQLAlchemyError as e:
            await db.rollback()
            logger.error(f"Failed to delete service '{slug}': {e}")
            raise

    async def update_by_slug(
        self, db: AsyncSession, slug: str, obj_in: ServiceUpdateSchema
    ) -> Optional[Service]:
        """Update a service by its slug and return the updated row."""

        values = obj_in.model_dump(exclude_unset=True)
        if not values:
            logger.warning(f"No fields to update for service '{slug}'")
            raise HTTPException(status_code=400, detail="No fields provided for update")

        try:
            statement = (
                update(self.model)
                .where(self.model.slug == slug)
                .values(**values)
                .returning(self.model)
            )

            result = await db.exec(statement)
            updated = result.scalar_one_or_none()

            if updated is None:
                return None

            await db.commit()
            logger.info(f"Service updated: {updated.slug}")
            return updated

        except SQLAlchemyError as e:
            await db.rollback()
            logger.error(f"Failed to update service '{slug}': {e}")
            raise


service_crud = ServiceCRUD(Service)
