# import pytest
# from httpx import AsyncClient
#
#
# @pytest.mark.asyncio
# async def test_read_root_health_check(client: AsyncClient):
#     """
#     Verifies the root endpoint returns the correct app status and settings.
#     Tests the fundamental connectivity of the FastAPI instance.
#     """
#     response = await client.get("/")
#     assert response.status_code == 200
#
#     data = response.json()
#     assert data["status"] == "online"
#     assert "app_name" in data
#     assert "environment" in data
#
#
# @pytest.mark.asyncio
# async def test_cors_headers_middleware(client: AsyncClient):
#     """
#     Verifies that CORSMiddleware is active by checking for Access-Control headers.
#     Essential for Next.js frontend integration.
#     """
#     # Simulate a preflight request from a frontend origin
#     headers = {
#         "Origin": "http://localhost:3000",
#         "Access-Control-Request-Method": "GET",
#     }
#     response = await client.options("/", headers=headers)
#
#     # If the origin is in your settings.BACKEND_CORS_ORIGINS, this should succeed
#     # Note: If BACKEND_CORS_ORIGINS is empty, this may vary based on configuration
#     assert response.status_code in [200, 204]
#
#
# @pytest.mark.asyncio
# async def test_global_exception_handler(client: AsyncClient, mocker):
#     """
#     Verifies that the global exception handler catches unhandled exceptions
#     and returns a standardized JSON response instead of a raw stack trace.
#     """
#     # We force an error by mocking the read_root to raise an exception
#     from app.main import read_root
#
#     # We use a temporary route or mock to trigger the 500 handler
#     # For a clean test, we hit a non-existent path or trigger a real error
#     # Here we simulate an error by hitting the root but mocking the logic
#     mocker.patch("app.main.read_root", side_effect=Exception("Database Connection Failed"))
#
#     response = await client.get("/")
#
#     assert response.status_code == 500
#     data = response.json()
#     assert data["detail"] == "Internal Server Error"
#     assert data["error_type"] == "Exception"
#
#
# @pytest.mark.asyncio
# async def test_api_v1_prefix_exists(client: AsyncClient):
#     """
#     Ensures the api_router is correctly included with the prefix from settings.
#     """
#     # We try to hit a known route under the prefix.
#     # Even if it's a 404 (because no data exists), it shouldn't be a 404 for the ROUTE.
#     # Note: Replace '/services/' with a valid endpoint from your api_router
#     response = await client.get("/api/v1/services/")
#
#     # If the router is correctly prefixed, we expect 200 (empty list) or 401/404 based on auth/data
#     # But NOT a 404 'Not Found' for the URL path itself if defined.
#     assert response.status_code != 404


import pytest
from httpx import AsyncClient
from app.core.config import settings


@pytest.mark.asyncio
async def test_read_root_health_check(client: AsyncClient):
    """
    Verifies the root endpoint returns the correct app status and settings.
    """
    response = await client.get("/")
    assert response.status_code == 200

    data = response.json()
    assert data["status"] == "online"
    assert data["app_name"] == settings.app_name


@pytest.mark.asyncio
async def test_cors_headers_middleware(client: AsyncClient):
    """
    Verifies that CORSMiddleware is active.
    FastAPI returns 400 if the Origin is not in the allowed list or if
    the preflight request is malformed.
    """
    # Use an origin that we know is in your .env
    origin = (
        settings.cors_origins[0] if settings.cors_origins else "http://localhost:3000"
    )

    headers = {
        "Origin": origin,
        "Access-Control-Request-Method": "GET",
        "Access-Control-Request-Headers": "Content-Type",
    }

    response = await client.options("/", headers=headers)

    # If this still fails with 400, ensure 'http://localhost:3000'
    # is exactly what is returned by settings.cors_origins
    assert response.status_code in [200, 204]
    assert response.headers.get("access-control-allow-origin") == origin


@pytest.mark.asyncio
async def test_global_exception_handler(client: AsyncClient):
    response = await client.get("/__test_crash__")

    assert response.status_code == 500
    assert response.json()["detail"] == "Internal Server Error"


@pytest.mark.asyncio
async def test_api_v1_prefix_exists(client: AsyncClient):
    """
    Ensures the api_router is correctly included with the prefix.
    """
    # Testing the prefix defined in settings (e.g., /api/v1)
    prefix = settings.API_V1_STR
    response = await client.get(f"{prefix}/services/")

    # We expect a 200 (empty list) or 401/404 based on route logic,
    # but the prefix itself must be valid.
    assert response.status_code != 404
