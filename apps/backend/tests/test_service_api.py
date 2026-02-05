import pytest
from app.lib.utils.logger_setup import logger
import pytest_asyncio
from app.lib.data import services
from app.lib.db.schemas import ServiceCreateSchema
from uuid import UUID

test_data = services[0]
api_str = "api/v1/services"  # Base path for service API endpoints


# ----------------------------
# Fixture to create a fresh service per test
# ----------------------------


@pytest_asyncio.fixture
async def created_service(client):
    """Create a fresh service for tests and return the created object."""
    data = test_data.copy()
    data["published"] = True
    data["available"] = True
    data["searchable"] = True

    payload = ServiceCreateSchema.model_validate(data).model_dump()
    res = await client.post(f"{api_str}/register", json=payload)
    assert res.status_code == 201

    return res.json()  # <-- return the actual dict, not a coroutine


# ----------------------------
# Tests
# ----------------------------


@pytest.mark.asyncio
async def test_register_service(client):
    data = test_data.copy()
    data["published"] = True
    payload = ServiceCreateSchema.model_validate(data).model_dump()

    res = await client.post(f"{api_str}/register", json=payload)
    assert res.status_code == 201

    created = res.json()
    assert UUID(created["id"])
    assert created["slug"] == payload.get("slug")
    assert created["published"] is True


@pytest.mark.asyncio
async def test_get_service_by_slug(client, created_service):
    slug = created_service["slug"]
    res = await client.get(f"{api_str}/by-slug/{slug}")
    assert res.status_code == 200

    data = res.json()
    assert data["slug"] == slug


@pytest.mark.asyncio
async def test_get_services_filtered(client, created_service):
    res = await client.get(
        f"{api_str}/filtered", params={"category": created_service["category"]}
    )
    assert res.status_code == 200

    data = res.json()
    assert isinstance(data, list)
    assert any(s["slug"] == created_service["slug"] for s in data)


@pytest.mark.asyncio
async def test_update_service_by_slug(client, created_service):
    slug = created_service["slug"]

    res = await client.put(
        f"{api_str}/update/{slug}",
        json={"name": "Updated Via API"},
    )
    assert res.status_code == 200

    data = res.json()
    assert data["name"] == "Updated Via API"


@pytest.mark.asyncio
async def test_increment_popularity(client, created_service):
    slug = created_service["slug"]

    res = await client.post(f"{api_str}/increment-popularity/{slug}")
    assert res.status_code == 204


@pytest.mark.asyncio
async def test_soft_delete_service(client, created_service):
    slug = created_service["slug"]

    res = await client.delete(f"{api_str}/delete/{slug}")
    assert res.status_code == 204

    # Public endpoint should NOT see it
    res = await client.get(f"{api_str}/by-slug/{slug}")
    assert res.status_code == 404


@pytest.mark.asyncio
async def test_search_manifest_excludes_deleted(client, created_service):
    # Soft delete the service first
    res = await client.delete(f"{api_str}/delete/{created_service['slug']}")
    assert res.status_code == 204

    # Fetch the search manifest from the correct endpoint
    res = await client.get(f"{api_str}/search-manifest")
    assert res.status_code == 200

    # Extract slugs
    slugs = [s["s"] for s in res.json()]
    logger.info(f"Search manifest slugs: {slugs}")

    # Assert the deleted service is not included
    assert created_service["slug"] not in slugs
