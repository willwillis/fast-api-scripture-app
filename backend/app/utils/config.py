import os
import shutil
from pathlib import Path

# Database configuration
# Try multiple possible locations for the database file
possible_paths = [
    Path.cwd() / "lds-scriptures-sqlite.db",  # Copied file in current directory
    Path.cwd() / "submodules" / "lds-scriptures" / "sqlite" / "lds-scriptures-sqlite.db",  # Submodules from current directory
    Path(__file__).parent.parent / "lds-scriptures-sqlite.db",  # Relative to app directory
    Path(__file__).parent.parent.parent / "submodules" / "lds-scriptures" / "sqlite" / "lds-scriptures-sqlite.db",  # Original submodules path
    Path.cwd().parent / "submodules" / "lds-scriptures" / "sqlite" / "lds-scriptures-sqlite.db",  # Submodules from parent directory
]

DATABASE_PATH = None
for path in possible_paths:
    if path.exists():
        DATABASE_PATH = path
        break

if DATABASE_PATH is None:
    print(f"ERROR: Database file not found. Tried paths:")
    for i, path in enumerate(possible_paths):
        print(f"  {i+1}. {path} (exists: {path.exists()})")
    raise FileNotFoundError(f"Database file not found. Tried paths: {[str(p) for p in possible_paths]}")

print(f"Using database at: {DATABASE_PATH}")

DATABASE_URL = f"sqlite:///{DATABASE_PATH}"

# Debug: Print database path for troubleshooting
print(f"Database path: {DATABASE_PATH}")
print(f"Database exists: {DATABASE_PATH.exists()}")
print(f"Current working directory: {Path.cwd()}")

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
    # Add your Cloudflare Pages domain here
    "https://fast-scriptures-frontend.pages.dev",
] 