from typing import List
from pydantic import AnyHttpUrl, TypeAdapter
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=(".env", ".env.local"),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # Basic App Settings
    app_name: str = "EverthingKe API"
    app_version: str = "0.1.0"
    image_tag: str = "latest"

    # Environment control: 'development', 'staging', 'production'
    ENVIRONMENT: str = "development"

    # API Routing
    API_V1_STR: str = "/api/v1"

    # CORS Settings
    # Input should be a comma-separated string: "http://localhost:3000,https://everything.ke"

    BACKEND_CORS_ORIGINS: str = ""

    @property
    def cors_origins(self) -> List[str]:
        """
        Parses comma-separated strings into a list of validated URLs.
        Uses TypeAdapter for Pydantic V2 strict validation.
        """
        if not self.BACKEND_CORS_ORIGINS or not self.BACKEND_CORS_ORIGINS.strip():
            return []

        # Split and clean raw strings
        raw_origins = [
            item.strip().replace('"', "").replace("'", "")
            for item in self.BACKEND_CORS_ORIGINS.split(",")
            if item.strip()
        ]

        # Validate each origin using AnyHttpUrl
        # We convert back to str for the FastAPI middleware compatibility
        adapter = TypeAdapter(AnyHttpUrl)
        validated_origins = []

        for origin in raw_origins:
            try:
                # This ensures the URL is syntactically correct (e.g., has http/https)
                url = adapter.validate_python(origin)
                validated_origins.append(str(url))
            except Exception:
                # Log or skip invalid URLs to keep the app running
                continue

        return validated_origins

    # Database Settings
    postgres_user: str
    postgres_password: str
    postgres_host: str
    postgres_db: str
    postgres_port: int = 5432

    @property
    def async_database_url(self) -> str:
        return (
            f"postgresql+asyncpg://{self.postgres_user}:"
            f"{self.postgres_password}@{self.postgres_host}:"
            f"{self.postgres_port}/{self.postgres_db}"
        )

    @property
    def database_url(self) -> str:
        return (
            f"postgresql://{self.postgres_user}:"
            f"{self.postgres_password}@{self.postgres_host}:"
            f"{self.postgres_port}/{self.postgres_db}"
        )


settings = Settings()
