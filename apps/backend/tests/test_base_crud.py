import pytest
from fastapi import HTTPException
from sqlmodel.ext.asyncio.session import AsyncSession
from uuid import UUID

from app.lib.crud.base import BaseCRUD
from app.lib.db.models import Service
from app.lib.db.schemas import ServiceCreateSchema, ServiceUpdateSchema
from app.lib.data import services

crud = BaseCRUD[Service, ServiceCreateSchema, ServiceUpdateSchema](Service)
test_data = services[0]


@pytest.mark.asyncio
async def test_service_crud_full(db_session: AsyncSession):
    # --- CREATE ---
    obj_in = ServiceCreateSchema.model_validate(test_data, from_attributes=True)
    created = await crud.create(db_session, obj_in=obj_in)
    assert isinstance(created.id, UUID)
    assert created.name == obj_in.name

    # --- GET BY ID ---
    fetched = await crud.get(db_session, created.id)
    assert fetched is not None
    assert fetched.id == created.id
    assert fetched.name == obj_in.name

    # --- GET MULTI ---
    all_objs = await crud.get_multi(db_session)
    assert len(all_objs) >= 1
    assert any(o.id == created.id for o in all_objs)

    # --- GET BY ATTRIBUTES ---
    filtered_by_name = await crud.get_by_attributes(
        db_session, filters={"name": obj_in.name}
    )
    assert len(filtered_by_name) >= 1
    assert filtered_by_name[0].name == obj_in.name

    filtered_by_category = await crud.get_by_attributes(
        db_session, filters={"category": obj_in.category}, descending=True
    )
    assert len(filtered_by_category) >= 1
    # Descending check: first ID >= last ID
    assert filtered_by_category[0].id >= filtered_by_category[-1].id

    # --- UPDATE ---
    # Use the DB object attributes as source for the update, only override what you want

    # update_data = {"name": "Updated Name"}
    update_in = ServiceUpdateSchema(name="Updated Name")
    updated = await crud.update(db_session, db_obj=created, obj_in=update_in)
    assert updated.name == "Updated Name"

    # --- REMOVE ---
    removed = await crud.remove(db_session, id=created.id)
    assert removed.id == created.id
    assert await crud.get(db_session, created.id) is None

    # --- ERROR CASES ---
    with pytest.raises(HTTPException):
        await crud.get_by_attributes(db_session, filters={"nonexistent_field": "test"})

    with pytest.raises(HTTPException):
        await crud.get_by_attributes(db_session, filters={"name": 123})  # wrong type
