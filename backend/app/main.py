from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import scriptures
from .utils.config import API_TITLE, API_DESCRIPTION, API_VERSION, CORS_ORIGINS

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
    """Health check endpoint"""
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 