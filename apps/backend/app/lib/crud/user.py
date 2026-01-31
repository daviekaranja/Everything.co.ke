from typing import Optional

from pydantic import EmailStr
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from .base import BaseCRUD
from app.lib.db.models import User
from app.lib.db.schemas import UserCreateSchema, UserUpdateSchema


from ..utils.logging import logger


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

        logger.debug(f"Queried for user by email: {user}")
        return user

    # async def create(self, db: AsyncSession, *, obj_in: UserCreateSchema) -> User:
    #     """Create a new user."""
    #     db_obj = self.model.from_orm(obj_in)
    #     db.add(db_obj)
    #     await db.commit()
    #     await db.refresh(db_obj)
    #     return db_obj


user_crud = UserCRUD(User)
