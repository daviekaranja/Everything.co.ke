from datetime import datetime
from typing import Optional

from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.lib.crud.base import BaseCRUD
from app.lib.db.models import MpesaTransaction
from app.lib.db.schemas import (
    TransactionCreate,
    TransactionUpdate,
    TransactionRead,
    OrderStatus,
)
from app.lib.utils.logger_setup import logger


class PaymentCRUD(BaseCRUD[MpesaTransaction, TransactionCreate, TransactionUpdate]):
    """CRUD operations for Service model with optimized search and delivery logic."""

    model = MpesaTransaction

    async def get_or_create_transaction(
        self, db: AsyncSession, db_obj: TransactionCreate
    ) -> MpesaTransaction:
        """Get existing or create new pending transaction."""
        stmt = select(self.model).where(
            MpesaTransaction.checkout_request_id == db_obj.checkout_request_id
        )
        result = await db.exec(stmt)
        transaction = result.first()

        if not transaction:
            transaction = await self.create(db, obj_in=db_obj)
            await db.commit()
            await db.refresh(transaction)

        return transaction

    async def get_by_checkout_id(
        self, db: AsyncSession, checkout_request_id: str
    ) -> Optional[TransactionRead]:
        stmt = select(self.model).where(
            self.model.checkout_request_id == checkout_request_id
        )
        result = await db.exec(stmt)
        return result.first()

    async def update_from_stk_callback(
        self, db: AsyncSession, callback_body: dict
    ) -> Optional[MpesaTransaction]:
        """
        Updates an existing transaction based on STK callback.
        Returns None if no transaction was found.
        """
        callback = callback_body.get("Body", {}).get("stkCallback", {})
        checkout_request_id = callback.get("CheckoutRequestID")

        if not checkout_request_id:
            return None

        # Find existing transaction
        stmt = select(self.model).where(
            self.model.checkout_request_id == checkout_request_id
        )
        result = await db.exec(stmt)
        transaction = result.first()

        if not transaction:
            # Log warning — callback for unknown transaction
            logger.error(
                f"Warning: Callback received for unknown checkout_request_id: {checkout_request_id}"
            )
            return None

        # Update fields
        transaction.result_code = callback.get("ResultCode", 1)
        transaction.result_desc = callback.get("ResultDesc")

        metadata = callback.get("CallbackMetadata", {}).get("Item", [])
        transaction.status = (
            OrderStatus.PAID if transaction.result_code == 0 else OrderStatus.CANCELLED
        )

        for item in metadata:
            name = item.get("Name")
            value = item.get("Value")

            if name == "MpesaReceiptNumber":
                transaction.mpesa_receipt_number = value
            elif name == "Amount":
                transaction.amount = float(value)  # just in case it differs
            elif name == "TransactionDate":
                try:
                    transaction.transaction_date = datetime.strptime(
                        str(value), "%Y%m%d%H%M%S"
                    )
                except (ValueError, TypeError):
                    pass

        # Optional: set status enum or other business fields
        # transaction.status = "COMPLETED" if transaction.result_code == 0 else "FAILED"

        db.add(transaction)
        await db.commit()
        await db.refresh(transaction)

        return transaction


payment_crud = PaymentCRUD(MpesaTransaction)
