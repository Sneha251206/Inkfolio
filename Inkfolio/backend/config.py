import os
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    APP_NAME: str = "InkFolio Editorial API"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    SECRET_KEY: str = "inkfolio_secret_key_default"
    DATABASE_URL: str = "sqlite:///./inkfolio.db"
    CORS_ORIGINS: str = "http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173"

    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()
