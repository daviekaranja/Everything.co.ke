import pytest

from sqlmodel.ext.asyncio.session import AsyncSession


test_order = {
    "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "serviceId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
}


@pytest.mark.asyncio
async def test_order_crud_full(db_session: AsyncSession):
    pass
