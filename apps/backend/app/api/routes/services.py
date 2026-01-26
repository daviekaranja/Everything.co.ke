from fastapi import APIRouter, Depends
from sqlmodel.ext.asyncio.session import AsyncSession

from app.lib.crud.service import service_crud
from app.lib.db.schemas import ServiceCreateSchema
from app.lib.db.session import get_session

router = APIRouter(
    prefix="/services",
    tags=["services"],
    responses={404: {"description": "Not found"}},
)

@router.get("/", summary="Retrieve a list of services")
async def get_services(db: AsyncSession = Depends(get_session), skip: int = 0, limit: int = 100, service_id: int = None):
    if service_id:
        service = await service_crud.get(db, id=service_id)
        return service
    services = await service_crud.get_multi(db, skip=skip, limit=limit)
    return services

@router.post("/create", summary="Create a new service")
async def create_service(db: AsyncSession = Depends(get_session), *, db_obj: ServiceCreateSchema):
    service = await service_crud.create_service(db=db, obj_in=db_obj)
    return service
