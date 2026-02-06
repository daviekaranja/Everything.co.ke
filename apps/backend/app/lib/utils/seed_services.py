import asyncio

from sqlalchemy.ext.asyncio import create_async_engine
from sqlmodel.ext.asyncio.session import AsyncSession

from sqlmodel import select
from app.lib.utils.logger_setup import logger
from app.lib.db.schemas import ServiceCreateSchema
from app.core.config import settings
from app.lib.db.models import Service
from app.lib.data import services

DATABASE_URL = settings.async_database_url
engine = create_async_engine(DATABASE_URL, echo=False, future=True)


async def seed_services():
    async with AsyncSession(engine) as session:
        logger.debug(f"🚀 Starting seed: Processing {len(services)} services...")

        batch_objects = []

        for item in services:
            try:
                # Validate data against schema first
                obj_in = ServiceCreateSchema.model_validate(item, from_attributes=True)

                # Check if service exists by slug
                statement = select(Service).where(Service.slug == obj_in.slug)
                result = await session.exec(statement)
                existing_service = result.first()

                if existing_service:
                    logger.info(f"🔄 Updating existing service: {obj_in.name}")
                    for field, value in obj_in.model_dump().items():
                        setattr(existing_service, field, value)
                else:
                    # Create new Service object
                    new_service = Service(**obj_in.model_dump())
                    batch_objects.append(new_service)

            except Exception as e:
                logger.error(f"❌ Failed to process '{item.get('name')}': {e}")
                continue

        if batch_objects:
            session.add_all(batch_objects)
            await session.commit()
            logger.info(f"✅ Inserted {len(batch_objects)} new services in batch.")

        logger.info("✅ Seeding process finished!")


if __name__ == "__main__":
    asyncio.run(seed_services())
