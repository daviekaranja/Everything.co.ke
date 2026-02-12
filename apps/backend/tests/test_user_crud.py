import pytest
from uuid import UUID

from sqlmodel.ext.asyncio.session import AsyncSession

from app.lib.crud.user import user_crud
from app.lib.db.models import User
from app.lib.db.schemas import UserCreateSchema

test_user = {
    "firstName": "Davie",
    "secondName": "Karanja",
    "email": "user@example.com",
    "phoneNumber": "0728404490",
    "contactMethod": "WhatsApp",
}


@pytest.mark.asyncio
async def test_user_crud_full(db_session: AsyncSession):
    data = UserCreateSchema.model_validate(test_user)
    created: User = await user_crud.create(db_session, obj_in=data)

    assert isinstance(created.id, UUID)
    assert created.email == data.email
    assert created.first_name == data.first_name
    # fetch user by email
    user = await user_crud.get_by_email(db_session, email=data.email)
    assert user.email == data.email

    # fake email
    fake_user = await user_crud.get_by_email(db_session, email="fake@email.com")
    assert fake_user is None
