from typing import List

from fastapi import APIRouter
from fastapi.params import Depends
from pydantic import EmailStr
from sqlmodel.ext.asyncio.session import AsyncSession


from app.api.deps import get_session
from app.lib.crud.user import user_crud
from app.lib.db.schemas import UserCreateSchema, UserRead
from app.lib.utils.logger_setup import logger

router = APIRouter()


@router.get("/", response_model=UserRead | List[UserRead])
async def read_users(
    user_id: str = None,
    email: EmailStr = None,
    limit: int = 50,
    db: AsyncSession = Depends(get_session),
):
    if email is not None:
        return await user_crud.get_by_email(db, email)

    if user_id is not None:
        return await user_crud.get(db, id=user_id)

    return await user_crud.get_multi(db=db, limit=limit)


@router.post("/register")
async def create_user(
    db_obj: UserCreateSchema, db: AsyncSession = Depends(get_session)
):
    # check is the user exist
    user = await user_crud.get_by_email(db, email=db_obj.email)
    if user:
        logger.debug(f"User with email: {db_obj.email} Found")
        return user

    user = await user_crud.create(db, obj_in=db_obj)
    await db.commit()
    return user
