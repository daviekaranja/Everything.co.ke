from __future__ import annotations

from typing import List
from pydantic import AnyHttpUrl, TypeAdapter, SecretStr, Field, BaseModel
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
    allowed_origins: str
    data_protection: bool

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


# ──────────────────────────────────────────────
# Config – you can create this manually or from .env
# ──────────────────────────────────────────────
class MpesaConfig(BaseModel):
    consumer_key: SecretStr
    consumer_secret: SecretStr
    shortcode: str = Field(..., description="PayBill or Till Number")
    passkey: SecretStr | None = None  # Required only for STK Push
    environment: str = "sandbox"  # sandbox | production
    callback_base_url: str  # https://yourdomain.com/api/v1

    @property
    def api_base(self) -> str:
        base = (
            "https://sandbox.safaricom.co.ke"
            if self.environment == "sandbox"
            else "https://api.safaricom.co.ke"
        )
        return base

    @property
    def oauth_url(self) -> str:
        return f"{self.api_base}/oauth/v1/generate?grant_type=client_credentials"

    @property
    def register_url(self) -> str:
        return f"{self.api_base}/mpesa/c2b/v1/registerurl"

    @property
    def stk_push_url(self) -> str:
        return f"{self.api_base}/mpesa/stkpush/v1/processrequest"

    @property
    def stk_query_url(self) -> str:
        return f"{self.api_base}/mpesa/stkpushquery/v1/query"


class MpesaSettings(MpesaConfig, BaseSettings):  # ← for .env only
    model_config = SettingsConfigDict(
        env_prefix="MPESA_", extra="ignore", env_file=(".env", ".env.local")
    )
