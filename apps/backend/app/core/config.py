from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # This tells Pydantic:
    # 1. Look for a .env file if it exists
    # 2. But ALWAYS prioritize actual environment variables (from Docker)
    model_config = SettingsConfigDict(
        env_file=(".env", ".env.local"),
        env_file_encoding="utf-8",
        extra="ignore",  # Prevents crashing if extra vars are in the env
    )

    app_name: str = "EverthingKe API"

    app_version: str = "0.1.0"

    # database settings
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

    # Add other settings as needed

    @property
    def database_url(self) -> str:
        return (
            f"postgresql://{self.postgres_user}:"
            f"{self.postgres_password}@{self.postgres_host}:"
            f"{self.postgres_port}/{self.postgres_db}"
        )


settings = Settings()
