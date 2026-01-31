from fastapi import APIRouter, HTTPException, Depends
from sqlmodel.ext.asyncio.session import AsyncSession

from app.lib.db.schemas import UserCreateSchema, OrderRequestSchema, OrderCreateSchema
from app.lib.db.session import get_session
from app.lib.utils.logging import logger
from app.lib.crud.user import user_crud
from app.lib.crud.orders import order_crud


router = APIRouter(
    prefix="/orders",
    tags=["orders"],
    responses={404: {"description": "Not found"}},
)


@router.get("/", summary="Retrieve a list of orders")
async def get_orders(db: AsyncSession = Depends(get_session)):
    orders = await order_crud.get_multi(db, skip=0, limit=100)
    return orders


@router.post("/", summary="Create a new order")
async def create_order(
    db_obj: OrderRequestSchema, db: AsyncSession = Depends(get_session)
):
    user = await user_crud.get_by_email(db, email=db_obj.email)
    if not user:
        logger.info(f"User with email {db_obj.email} not found. Creating new user.")

        user_data = UserCreateSchema(
            **db_obj.model_dump(exclude={"service_id", "status"})
        )
        logger.debug(f"Creating user with data: {user_data}")
        user = await user_crud.create(db, obj_in=user_data)
        await db.commit()
        logger.info(f"Created user: {user}")

    if not user:
        raise HTTPException(
            status_code=500, detail="Failed to create or retrieve user."
        )

    order_data = OrderCreateSchema(
        user_id=user.id,
        service_id=db_obj.service_id,
        status=db_obj.status,
    )

    order = await order_crud.create_order(db, obj_in=order_data)
    if not order:
        raise HTTPException(status_code=500, detail="Failed to create order.")

    return order
