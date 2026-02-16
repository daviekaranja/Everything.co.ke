from uuid import UUID

from fastapi import APIRouter, HTTPException, Depends
from sqlmodel.ext.asyncio.session import AsyncSession

from app.api.deps import get_session
from app.lib.db.schemas import (
    OrderRequestSchema,
    OrderCreateSchema,
    OrderStatus,
    OrderUpdateSchema,
)
from app.lib.utils.logger_setup import logger
from app.lib.crud.orders import order_crud

router = APIRouter(
    responses={404: {"description": "Not found"}},
)


@router.get("/filtered", summary="Retrieve a list of orders")
async def get_orders(
    user_id: UUID = None,
    status: OrderStatus = None,
    limit: int = 50,
    db: AsyncSession = Depends(get_session),
):
    if user_id is not None:
        logger.debug(f"fetching orders for : {user_id}")
        return await order_crud.get_user_orders_paginated(
            db=db, user_id=user_id, status=status, limit=limit
        )

    logger.debug("this must be an admin, fetching all orders unfiltered")
    orders = await order_crud.get_filtered_orders(db, status, limit)
    return orders


@router.get("/{order_id}", status_code=200)
async def get_order_id(order_id: UUID, db: AsyncSession = Depends(get_session)):
    logger.debug(f"fetching order with id: {order_id}")
    order = await order_crud.get(db, id=order_id)
    if order is None:
        raise HTTPException(status_code=404, detail="not found")
    return order


@router.post("/create", summary="Create a new order")
async def create_order(
    db_obj: OrderRequestSchema, db: AsyncSession = Depends(get_session)
):
    obj_in = OrderCreateSchema(**db_obj.model_dump())
    logger.debug(f"Creating order for service id: {obj_in.service_id}")

    order = await order_crud.create_order(db, obj_in=db_obj)
    if not order:
        raise HTTPException(status_code=500, detail="Failed to create order.")

    return order


@router.put("/update/{order_id}", status_code=200)
async def update_order(
    order_id: UUID, db_obj: OrderUpdateSchema, db: AsyncSession = Depends(get_session)
):
    logger.debug(f"updating order: {order_id}")
    order = await order_crud.get(db, id=order_id)

    if order is None:
        raise HTTPException(status_code=404, detail="not found")

    update = await order_crud.update(db, obj_in=db_obj, db_obj=order)
    await db.commit()
    return update
