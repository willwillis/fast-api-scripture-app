from pydantic import BaseModel
from typing import Optional, List

class Volume(BaseModel):
    id: int
    volume_title: str
    volume_long_title: str
    volume_subtitle: Optional[str] = None
    volume_short_title: str
    volume_lds_url: Optional[str] = None

class Book(BaseModel):
    id: int
    volume_id: int
    book_title: str
    book_long_title: str
    book_subtitle: Optional[str] = None
    book_short_title: str
    book_lds_url: Optional[str] = None

class Chapter(BaseModel):
    id: int
    book_id: int
    chapter_number: int

class Verse(BaseModel):
    id: int
    chapter_id: int
    verse_number: int
    scripture_text: str

class Scripture(BaseModel):
    volume_id: int
    book_id: int
    chapter_id: int
    verse_id: int
    volume_title: str
    book_title: str
    volume_long_title: str
    book_long_title: str
    volume_subtitle: Optional[str] = None
    book_subtitle: Optional[str] = None
    volume_short_title: str
    book_short_title: str
    volume_lds_url: Optional[str] = None
    book_lds_url: Optional[str] = None
    chapter_number: int
    verse_number: int
    scripture_text: str
    verse_title: str
    verse_short_title: str

class ScriptureSearch(BaseModel):
    query: str
    limit: int = 50
    offset: int = 0

class ScriptureResponse(BaseModel):
    scriptures: List[Scripture]
    total: int
    limit: int
    offset: int 