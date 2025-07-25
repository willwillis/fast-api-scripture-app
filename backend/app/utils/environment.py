import os
from typing import Optional

from pydantic import BaseSettings, Field


class Settings(BaseSettings):
    """Application settings with environment variable support"""

    # Application
    app_name: str = Field(default="Fast Scriptures API", env="APP_NAME")
    app_version: str = Field(default="1.2.0", env="APP_VERSION")
    debug: bool = Field(default=False, env="DEBUG")

    # Database
    database_url: Optional[str] = Field(default=None, env="DATABASE_URL")

    # Security
    cors_origins: list[str] = Field(
        default=[
            "http://localhost:5173",
            "http://localhost:3000",
            "http://127.0.0.1:5173",
            "http://127.0.0.1:3000",
        ],
        env="CORS_ORIGINS",
    )

    # New Relic
    new_relic_license_key: Optional[str] = Field(
        default=None, env="NEW_RELIC_LICENSE_KEY"
    )
    new_relic_app_name: str = Field(
        default="Fast Scriptures Backend", env="NEW_RELIC_APP_NAME"
    )
    new_relic_distributed_tracing_enabled: bool = Field(
        default=True, env="NEW_RELIC_DISTRIBUTED_TRACING_ENABLED"
    )
    new_relic_log_enabled: bool = Field(default=True, env="NEW_RELIC_LOG_ENABLED")

    # API
    api_prefix: str = Field(default="/api", env="API_PREFIX")
    max_search_results: int = Field(default=100, env="MAX_SEARCH_RESULTS")
    default_search_limit: int = Field(default=50, env="DEFAULT_SEARCH_LIMIT")

    # Performance
    cache_ttl: int = Field(default=300, env="CACHE_TTL")  # 5 minutes
    rate_limit_requests: int = Field(default=100, env="RATE_LIMIT_REQUESTS")
    rate_limit_window: int = Field(default=60, env="RATE_LIMIT_WINDOW")  # 1 minute

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False


# Global settings instance
settings = Settings()


def get_settings() -> Settings:
    """Get application settings"""
    return settings


def is_production() -> bool:
    """Check if running in production"""
    return not settings.debug and os.getenv("RENDER") == "true"


def is_development() -> bool:
    """Check if running in development"""
    return settings.debug or os.getenv("RENDER") != "true"
