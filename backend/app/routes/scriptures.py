from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from ..models.scripture import Volume, Book, Chapter, Verse, Scripture, ScriptureResponse
from ..services.database import DatabaseService

router = APIRouter(prefix="/api/scriptures", tags=["scriptures"])
db_service = DatabaseService()

@router.get("/volumes", response_model=List[Volume])
async def get_volumes():
    """Get all volumes"""
    try:
        return db_service.get_volumes()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@router.get("/volumes/{volume_id}/books", response_model=List[Book])
async def get_books_by_volume(volume_id: int):
    """Get all books for a specific volume"""
    try:
        return db_service.get_books_by_volume(volume_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@router.get("/books/{book_id}/chapters", response_model=List[Chapter])
async def get_chapters_by_book(book_id: int):
    """Get all chapters for a specific book"""
    try:
        return db_service.get_chapters_by_book(book_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@router.get("/chapters/{chapter_id}/verses", response_model=List[Verse])
async def get_verses_by_chapter(chapter_id: int):
    """Get all verses for a specific chapter"""
    try:
        return db_service.get_verses_by_chapter(chapter_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@router.get("/search", response_model=ScriptureResponse)
async def search_scriptures(
    q: str = Query(..., description="Search query"),
    limit: int = Query(50, ge=1, le=100, description="Number of results to return"),
    offset: int = Query(0, ge=0, description="Number of results to skip"),
    volume_id: Optional[int] = Query(None, description="Filter by volume ID")
):
    """Search scriptures by text content with optional volume filter"""
    try:
        scriptures, total = db_service.search_scriptures(q, limit, offset, volume_id)
        return ScriptureResponse(
            scriptures=scriptures,
            total=total,
            limit=limit,
            offset=offset
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@router.get("/search/volumes", response_model=List[dict])
async def get_search_volume_counts(q: str = Query(..., description="Search query")):
    """Get search result counts grouped by volume"""
    try:
        volume_counts = db_service.get_search_counts_by_volume(q)
        return [{"volume": volume, "count": count} for volume, count in volume_counts]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@router.get("/reference/{book_title}/{chapter}", response_model=List[Scripture])
async def get_scripture_by_reference(
    book_title: str,
    chapter: int,
    verse: Optional[int] = Query(None, description="Specific verse number")
):
    """Get scripture by book, chapter, and optional verse"""
    try:
        return db_service.get_scripture_by_reference(book_title, chapter, verse)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@router.get("/random", response_model=Scripture)
async def get_random_scripture():
    """Get a random scripture verse"""
    try:
        return db_service.get_random_scripture()
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}") 