from fastapi import APIRouter
from app.api.routes import orders, services, system, payments, user

api_router = APIRouter()

# We include the routers without prefixes here because the
# prefix is handled at the app level in main.py (e.g., /api/v1).
# However, within the route files, you should ensure tags are applied for clean docs.
api_router.include_router(payments.router, tags=["Mpesa"], prefix="/payments")
api_router.include_router(user.router, tags=["Users"], prefix="/users")
api_router.include_router(system.router, tags=["System"], prefix="/system")

api_router.include_router(orders.router, prefix="/orders", tags=["Orders"])
api_router.include_router(services.router, tags=["Services"], prefix="/services")
