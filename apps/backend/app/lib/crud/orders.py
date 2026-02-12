# 224d24cb-8859-4e2b-9f6d-1a8e41468356
from typing import Optional, List
from uuid import UUID

from fastapi import HTTPException
from sqlmodel import select, desc
from sqlmodel.ext.asyncio.session import AsyncSession

from .base import BaseCRUD
from app.lib.db.models import Order
from app.lib.db.schemas import (
    OrderCreateSchema,
    OrderUpdateSchema,
    OrderStatus,
)
from ..utils.logger_setup import logger


class OrderCRUD(BaseCRUD[Order, OrderCreateSchema, OrderUpdateSchema]):
    """CRUD operations for Order model."""

    model = Order

    async def create_order(self, db, *, obj_in: OrderCreateSchema) -> Order:
        """Create a new order."""
        db_obj = await self.create(db, obj_in=obj_in)
        if db_obj is None:
            raise HTTPException(
                status_code=500, detail="an error occurred please try again later"
            )
        logger.info(f"Created new order with id: {db_obj.id}")
        await db.commit()
        return db_obj

    async def get_user_orders_paginated(
        self,
        db: AsyncSession,
        user_id: UUID,
        *,
        status: Optional[OrderStatus] = None,
        limit: int = 20,
        offset: int = 0,
    ) -> List[Order]:
        """
        Fetch paginated orders for a user, optionally filtered by status.
        Orders are sorted by created_at descending (newest first).
        """
        stmt = (
            select(self.model)
            .where(self.model.user_id == user_id)
            .order_by(desc(self.model.created_at))
            .offset(offset)
            .limit(limit)
        )

        if status is not None:
            stmt = stmt.where(self.model.status == status)

        result = await db.exec(stmt)
        return result.all()

    async def get_filtered_orders(
        self, db: AsyncSession, status: OrderStatus, limit: int
    ):
        stmt = select(self.model).order_by(desc(self.model.created_at)).limit(limit)

        if status is not None:
            stmt = stmt.where(self.model.status == status)

        result = await db.exec(stmt)
        return result.all()


order_crud = OrderCRUD(Order)
