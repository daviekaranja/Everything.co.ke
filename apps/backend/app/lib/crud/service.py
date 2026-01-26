from .base import BaseCRUD
from app.lib.db.models import Service
from app.lib.db.schemas import (
    ServiceCreateSchema,
    ServiceUpdateSchema,
)
from ..utils.logging import logger


class ServiceCRUD(BaseCRUD[Service, ServiceCreateSchema, ServiceUpdateSchema]):
    """CRUD operations for Service model."""

    model = Service

    async def get_by_slug(self, db, slug: str) -> Service:
        """Get a service by slug."""
        query = await db.execute(
            self.model.select().where(self.model.slug == slug)
        )
        return query.scalars().first()

    async def create_service(self, db, *, obj_in: ServiceCreateSchema) -> Service:
        """Create a new service."""
        db_obj = await self.create(db, obj_in=obj_in)
        logger.info(f"Created new service with id: {db_obj.id}")
        await db.commit()
        return db_obj





service_crud = ServiceCRUD(Service)





