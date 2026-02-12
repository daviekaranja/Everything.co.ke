from typing import List, Union

from fastapi import APIRouter, HTTPException, Request, Depends, Body
from sqlmodel.ext.asyncio.session import AsyncSession

from app.api.deps import get_session
from app.lib.crud.payment import payment_crud
from app.lib.db.schemas import StkRequest, TransactionCreate, TransactionRead
from app.lib.services.mpesa import mpesa_client
from app.lib.utils.helpers import utc_now
from app.lib.utils.logger_setup import logger

router = APIRouter()


@router.get(
    "/transactions", response_model=Union[TransactionRead, List[TransactionRead]]
)
async def get_trans(
    checkout_request_id: str = None,
    db: AsyncSession = Depends(get_session),
    limit: int = 50,
):
    if checkout_request_id is not None:
        return await payment_crud.get_by_checkout_id(
            db, checkout_request_id=checkout_request_id
        )
    return await payment_crud.get_multi(db, limit=limit)


@router.post("/stk-push")
async def initiate_stk_push(
    payload: StkRequest = Body(...), db: AsyncSession = Depends(get_session)
):
    """
    Triggers Lipa na M-Pesa STK Push (prompt on customer's phone)
    """
    try:
        response = await mpesa_client.stk_push(
            phone=payload.phone,
            amount=payload.amount,
            account_reference=payload.reference,
            transaction_desc=payload.description,
        )

        response_code = response.get("ResponseCode", None)

        db_obj = TransactionCreate(
            phone_number=payload.phone,
            amount=payload.amount,
            reference=payload.reference,
            merchant_request_id=response.get("MerchantRequestID", None),
            checkout_request_id=response.get("CheckoutRequestID", None),
            result_code=response_code,
            result_desc=response.get("ResponseDescription", None),
            transaction_date=utc_now(),
        )

        transaction = await payment_crud.get_or_create_transaction(db, db_obj)

        return transaction

    except ValueError as ve:
        logger.error(ve)
        # e.g. missing passkey
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        logger.error(e)
        # Network / Daraja errors
        raise HTTPException(status_code=500, detail=f"STK Push failed: {str(e)}")


@router.post("/validation", name="payments:validation")
async def c2b_validation(request: Request):
    """Optional - rarely reject, but can check AccountReference exists."""
    try:
        body = await request.json()
        # payload usually in body (no "Body" wrapper in recent versions)
        logger.debug("Validation payload:", body)
        # Return 0 to accept, 1 to reject
        return {"ResultCode": 0, "ResultDesc": "Accepted"}
    except Exception as e:
        raise HTTPException(400, "Invalid validation payload") from e


#
#
@router.post("/confirmation", name="payments:confirmation")
async def c2b_confirmation(request: Request):
    """Mandatory - save transaction here."""
    logger.debug(f"Confirmation Endpoint Hit: {utc_now()}")
    try:
        # body = await request.json()
        #
        # # Example fields: Transaction ID, Amount, MSISDN, BillRefNumber, etc.
        # # Save to DB here
        return {"ResultCode": 0, "ResultDesc": "Success"}
    except Exception as e:
        logger.debug("Confirmation error:", e)
        # Still return success to M-Pesa
        return {"ResultCode": 0, "ResultDesc": "Success"}


@router.post("/stk-callback", name="payments:stk-callback")
async def stk_callback(request: Request, db: AsyncSession = Depends(get_session)):
    """STK Push callback."""
    logger.debug(f"Stk Callback Endpoint Hit: {utc_now()}")
    try:
        body = await request.json()
        updated = await payment_crud.update_from_stk_callback(db, body)
        if updated:
            logger.debug(
                f"Updated transaction {updated.checkout_request_id} → result_code: {updated.result_code}"
            )
        return {"ResultCode": 0, "ResultDesc": "Success"}
    except Exception as e:
        logger.error("Callback error:", str(e))
        return {"ResultCode": 0, "ResultDesc": "Success"}  # always ack to Safaricom
