from fastapi import APIRouter
from app.api.routes import orders, services


api_router = APIRouter()
api_router.include_router(orders.router)
api_router.include_router(services.router)
