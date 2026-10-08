import os
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    APP_NAME: str = "InkFolio Editorial API"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    SECRET_KEY: str = "inkfolio_secret_key_default"
    DATABASE_URL: str = "sqlite:///./inkfolio.db"
    CORS_ORIGINS: str = (
        "http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173,"
        "http://localhost:4173,https://inkfolio.sneha251206.workers.dev,"
        "https://inkfolio.onrender.com"
    )
    # Brevo Transactional Email Configuration
    BREVO_API_KEY: str = ""
    BREVO_SENDER_EMAIL: str = "noreply@inkfolio.org"
    BREVO_SENDER_NAME: str = "InkFolio Editorial"
    FRONTEND_URL: str = "https://inkfolio.sneha251206.workers.dev"

    @property
    def cors_origins_list(self) -> List[str]:
        origins = [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]
        # Ensure production worker domain is always included
        if "https://inkfolio.sneha251206.workers.dev" not in origins:
            origins.append("https://inkfolio.sneha251206.workers.dev")
        return origins

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()
