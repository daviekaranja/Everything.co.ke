from starlette.middleware.base import BaseHTTPMiddleware

from fastapi import Request, HTTPException

from app.core.config import settings
from app.lib.utils.logger_setup import logger


class PublicDataGuard(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # 1. Define your allowed origins
        logger.info(
            f"Incoming request from {request.url.hostname} - Path: {request.url.path}"
        )
        allowed_origins = [
            item.strip().replace('"', "").replace("'", "")
            for item in settings.allowed_origins.split(",")
            if item.strip()
        ]

        if not settings.data_protection:
            logger.info("Data protection is disabled. Allowing all requests.")
            return await call_next(request)

        # Allow local development
        if "localhost" in request.url.hostname:
            return await call_next(request)

        # 2. Get the Origin or Referer header
        origin = request.headers.get("origin")
        referer = request.headers.get("referer")

        # 3. Validation Logic
        # If it's a browser request, it MUST come from your domain
        is_valid_origin = any(o in (origin or "") for o in allowed_origins)
        is_valid_referer = any(o in (referer or "") for o in allowed_origins)

        if not (is_valid_origin or is_valid_referer):
            # This stops Postman, other websites, or CURL scripts
            # that don't manually spoof these headers.
            logger.warning(
                f"Blocked request from {request.url.hostname} - Origin: {origin}, Referer: {referer}"
            )
            raise HTTPException(status_code=404, detail="Not Found")

        response = await call_next(request)
        return response
