import pytest
from uuid import UUID

from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from fastapi import HTTPException

from app.lib.crud.service import service_crud
from app.lib.db.models import Service
from app.lib.db.schemas import ServiceCreateSchema, ServiceUpdateSchema
from app.lib.data import services

test_data = services[0]  # pick first service from seed/test data


@pytest.mark.asyncio
async def test_service_crud_full(db_session: AsyncSession):
    # --- CREATE ---
    test_data["published"] = True
    obj_in = ServiceCreateSchema.model_validate(test_data, from_attributes=True)
    created = await service_crud.create_service(db_session, obj_in=obj_in)

    assert isinstance(created.id, UUID)
    assert created.name == obj_in.name
    assert created.available is True

    # --- GET BY SLUG ---
    fetched_slug = await service_crud.get_by_slug(db_session, created.slug)
    assert fetched_slug is not None
    assert fetched_slug.id == created.id

    # --- UPDATE BY SLUG (Partial) ---
    update_payload = {"name": "Updated via Slug"}
    update_schema = ServiceUpdateSchema.model_validate(update_payload)

    updated_by_slug = await service_crud.update_by_slug(
        db_session, slug=created.slug, obj_in=update_schema
    )

    assert updated_by_slug is not None
    assert updated_by_slug.id == created.id
    assert updated_by_slug.name == "Updated via Slug"

    # --- UPDATE BY SLUG (No fields) ---
    with pytest.raises(HTTPException) as exc:
        empty_update = ServiceUpdateSchema()
        await service_crud.update_by_slug(
            db_session, slug=created.slug, obj_in=empty_update
        )

    assert exc.value.status_code == 400

    # --- SOFT DELETE ---
    await service_crud.delete_by_slug(db_session, created.slug)

    # Public API should NOT see it
    public_fetch = await service_crud.get_by_slug(db_session, created.slug)
    assert public_fetch is None

    # DB-level verification (bypass filters)
    statement = select(Service).where(Service.slug == created.slug)
    result = await db_session.exec(statement)
    soft_deleted = result.one_or_none()

    assert soft_deleted is not None  # row still exists
    assert soft_deleted.available is False
    assert soft_deleted.published is False
    assert soft_deleted.searchable is False
    assert soft_deleted.deleted_at is not None

    # --- PUBLISHED SLUGS SHOULD EXCLUDE SOFT-DELETED ---
    slugs = await service_crud.get_published_slugs(db_session)
    assert created.slug not in slugs
