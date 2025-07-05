# Fast Scriptures Backend

A FastAPI backend for the LDS scripture reading application.

## Setup

1. Install dependencies:
```bash
uv sync
```

2. Run the development server:
```bash
uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## API Endpoints

- `GET /` - Root endpoint with API info
- `GET /health` - Health check
- `GET /docs` - Interactive API documentation (Swagger UI)
- `GET /redoc` - Alternative API documentation

### Scripture Endpoints

- `GET /api/scriptures/volumes` - Get all volumes
- `GET /api/scriptures/volumes/{volume_id}/books` - Get books by volume
- `GET /api/scriptures/books/{book_id}/chapters` - Get chapters by book
- `GET /api/scriptures/chapters/{chapter_id}/verses` - Get verses by chapter
- `GET /api/scriptures/search?q={query}` - Search scriptures
- `GET /api/scriptures/reference/{book_title}/{chapter}` - Get scripture by reference
- `GET /api/scriptures/random` - Get random scripture

## Database

The application uses the SQLite database located at `../submodules/lds-scriptures/sqlite/lds-scriptures-sqlite.db`.

## Development

The backend is structured as follows:

- `app/main.py` - FastAPI application entry point
- `app/models/` - Pydantic models for data validation
- `app/routes/` - API route handlers
- `app/services/` - Business logic and database operations
- `app/utils/` - Configuration and utilities 