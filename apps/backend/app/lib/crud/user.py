from typing import Optional

from pydantic import EmailStr
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from .base import BaseCRUD
from app.lib.db.models import User
from app.lib.db.schemas import UserCreateSchema, UserUpdateSchema


class UserCRUD(BaseCRUD[User, UserCreateSchema, UserUpdateSchema]):
    """CRUD operations for User model."""

    model = User

    async def get_by_email(
        self,
        db: AsyncSession,
        email: EmailStr,
    ) -> Optional[User]:
        stmt = select(self.model).where(self.model.email == email)
        result = await db.exec(stmt)
        user = result.first()

        return user if user else None


user_crud = UserCRUD(User)
