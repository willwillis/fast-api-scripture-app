import os
from pathlib import Path

# Database configuration
DATABASE_PATH = Path(__file__).parent.parent.parent.parent / "submodules" / "lds-scriptures" / "sqlite" / "lds-scriptures-sqlite.db"
DATABASE_URL = f"sqlite:///{DATABASE_PATH}"

# API configuration
API_TITLE = "Fast Scriptures API"
API_DESCRIPTION = "A FastAPI backend for LDS scripture reading application"
API_VERSION = "1.0.0"

# CORS configuration
CORS_ORIGINS = [
    "http://localhost:5173",  # Vite dev server
    "http://localhost:3000",  # Alternative dev port
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
] 