# 224d24cb-8859-4e2b-9f6d-1a8e41468356

from  .base import BaseCRUD
from app.lib.db.models import Order
from app.lib.db.schemas import (
    OrderCreateSchema,
    OrderUpdateSchema,
)
from ..utils.logging import logger

class OrderCRUD(BaseCRUD[Order, OrderCreateSchema, OrderUpdateSchema]):
    """CRUD operations for Order model."""

    model = Order

    async def create_order(self, db, *, obj_in: OrderCreateSchema) -> Order:
        """Create a new order."""
        db_obj = await self.create(db, obj_in=obj_in)
        logger.info(f"Created new order with id: {db_obj.id}")
        await db.commit()
        return db_obj


order_crud = OrderCRUD(Order)