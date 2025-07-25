import newrelic.agent
# New Relic will auto-initialize from environment variables on Render

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import scriptures
from .utils.config import API_TITLE, API_DESCRIPTION, API_VERSION, CORS_ORIGINS
from .services.database import DatabaseService

app = FastAPI(
    title=API_TITLE,
    description=API_DESCRIPTION,
    version=API_VERSION,
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(scriptures.router)

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Fast Scriptures API",
        "version": API_VERSION,
        "docs": "/docs",
        "redoc": "/redoc"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint with database warm-up"""
    try:
        # Warm up database connection and test a simple query
        db_service = DatabaseService()
        volumes = db_service.get_volumes()
        
        return {
            "status": "healthy",
            "warmed_up": True,
            "database": "connected",
            "volumes_count": len(volumes),
            "timestamp": "2025-01-05T00:00:00Z"
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "warmed_up": False,
            "database": "error",
            "error": str(e),
            "timestamp": "2025-01-05T00:00:00Z"
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 