import sqlite3
from typing import List, Optional, Tuple
from pathlib import Path
from ..utils.config import DATABASE_PATH
from ..models.scripture import Scripture, Volume, Book, Chapter, Verse

class DatabaseService:
    def __init__(self):
        self.db_path = DATABASE_PATH
    
    def get_connection(self):
        """Get a database connection"""
        return sqlite3.connect(self.db_path)
    
    def get_volumes(self) -> List[Volume]:
        """Get all volumes"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM volumes ORDER BY id")
            rows = cursor.fetchall()
            
            volumes = []
            for row in rows:
                volumes.append(Volume(
                    id=row[0],
                    volume_title=row[1],
                    volume_long_title=row[2],
                    volume_subtitle=row[3],
                    volume_short_title=row[4],
                    volume_lds_url=row[5]
                ))
            return volumes
    
    def get_books_by_volume(self, volume_id: int) -> List[Book]:
        """Get all books for a specific volume"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM books WHERE volume_id = ? ORDER BY id", (volume_id,))
            rows = cursor.fetchall()
            
            books = []
            for row in rows:
                books.append(Book(
                    id=row[0],
                    volume_id=row[1],
                    book_title=row[2],
                    book_long_title=row[3],
                    book_subtitle=row[4],
                    book_short_title=row[5],
                    book_lds_url=row[6]
                ))
            return books
    
    def get_chapters_by_book(self, book_id: int) -> List[Chapter]:
        """Get all chapters for a specific book"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM chapters WHERE book_id = ? ORDER BY chapter_number", (book_id,))
            rows = cursor.fetchall()
            
            chapters = []
            for row in rows:
                chapters.append(Chapter(
                    id=row[0],
                    book_id=row[1],
                    chapter_number=row[2]
                ))
            return chapters
    
    def get_verses_by_chapter(self, chapter_id: int) -> List[Verse]:
        """Get all verses for a specific chapter"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM verses WHERE chapter_id = ? ORDER BY verse_number", (chapter_id,))
            rows = cursor.fetchall()
            
            verses = []
            for row in rows:
                verses.append(Verse(
                    id=row[0],
                    chapter_id=row[1],
                    verse_number=row[2],
                    scripture_text=row[3]
                ))
            return verses
    
    def search_scriptures(self, query: str, limit: int = 50, offset: int = 0, volume_id: Optional[int] = None) -> Tuple[List[Scripture], int]:
        """Search scriptures by text content with optional volume filter"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            
            # Build WHERE clause
            where_clause = "WHERE (scripture_text LIKE ? OR verse_title LIKE ?)"
            params = [f"%{query}%", f"%{query}%"]
            
            if volume_id is not None:
                where_clause += " AND volume_id = ?"
                params.append(str(volume_id))
            
            # Count total results
            cursor.execute(f"""
                SELECT COUNT(*) FROM scriptures 
                {where_clause}
            """, params)
            total = cursor.fetchone()[0]
            
            # Get paginated results
            cursor.execute(f"""
                SELECT * FROM scriptures 
                {where_clause}
                ORDER BY volume_id, book_id, chapter_id, verse_id
                LIMIT ? OFFSET ?
            """, params + [limit, offset])
            rows = cursor.fetchall()
            
            scriptures = []
            for row in rows:
                scriptures.append(Scripture(
                    volume_id=row[0],
                    book_id=row[1],
                    chapter_id=row[2],
                    verse_id=row[3],
                    volume_title=row[4],
                    book_title=row[5],
                    volume_long_title=row[6],
                    book_long_title=row[7],
                    volume_subtitle=row[8],
                    book_subtitle=row[9],
                    volume_short_title=row[10],
                    book_short_title=row[11],
                    volume_lds_url=row[12],
                    book_lds_url=row[13],
                    chapter_number=row[14],
                    verse_number=row[15],
                    scripture_text=row[16],
                    verse_title=row[17],
                    verse_short_title=row[18]
                ))
            
            return scriptures, total
    
    def get_search_counts_by_volume(self, query: str) -> List[Tuple[str, int]]:
        """Get search result counts grouped by volume"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            
            cursor.execute("""
                SELECT v.volume_short_title, COUNT(*) as count
                FROM scriptures s
                JOIN volumes v ON s.volume_id = v.id
                WHERE s.scripture_text LIKE ? OR s.verse_title LIKE ?
                GROUP BY v.id, v.volume_short_title
                ORDER BY v.id
            """, (f"%{query}%", f"%{query}%"))
            
            return cursor.fetchall()
    
    def get_scripture_by_reference(self, book_title: str, chapter: int, verse: Optional[int] = None) -> List[Scripture]:
        """Get scripture by book, chapter, and optional verse"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            
            if verse:
                cursor.execute("""
                    SELECT * FROM scriptures 
                    WHERE book_title = ? AND chapter_number = ? AND verse_number = ?
                    ORDER BY verse_id
                """, (book_title, chapter, verse))
            else:
                cursor.execute("""
                    SELECT * FROM scriptures 
                    WHERE book_title = ? AND chapter_number = ?
                    ORDER BY verse_number
                """, (book_title, chapter))
            
            rows = cursor.fetchall()
            
            scriptures = []
            for row in rows:
                scriptures.append(Scripture(
                    volume_id=row[0],
                    book_id=row[1],
                    chapter_id=row[2],
                    verse_id=row[3],
                    volume_title=row[4],
                    book_title=row[5],
                    volume_long_title=row[6],
                    book_long_title=row[7],
                    volume_subtitle=row[8],
                    book_subtitle=row[9],
                    volume_short_title=row[10],
                    book_short_title=row[11],
                    volume_lds_url=row[12],
                    book_lds_url=row[13],
                    chapter_number=row[14],
                    verse_number=row[15],
                    scripture_text=row[16],
                    verse_title=row[17],
                    verse_short_title=row[18]
                ))
            
            return scriptures
    
    def get_random_scripture(self, include_lds: bool = False) -> Scripture:
        """Get a truly random scripture verse with optional LDS filtering"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            
            # Build WHERE clause for LDS filtering
            where_clause = ""
            params = []
            
            if not include_lds:
                # Exclude LDS volumes (BoM, D&C, PGP) - only include OT and NT
                where_clause = "WHERE volume_id IN (1, 2)"
            
            # Get total count of scriptures with filter
            cursor.execute(f"SELECT COUNT(*) FROM scriptures {where_clause}", params)
            result = cursor.fetchone()
            total_count = result[0] if result else 0
            
            if total_count == 0:
                raise ValueError("No scriptures found in database with current filter")
            
            # Generate random offset
            import random
            random_offset = random.randint(0, int(total_count) - 1)
            
            # Get random scripture with filter
            cursor.execute(f"""
                SELECT * FROM scriptures 
                {where_clause}
                ORDER BY verse_id
                LIMIT 1 OFFSET ?
            """, params + [random_offset])
            
            row = cursor.fetchone()
            
            if not row:
                raise ValueError("Failed to fetch random scripture")
            
            return Scripture(
                volume_id=row[0],
                book_id=row[1],
                chapter_id=row[2],
                verse_id=row[3],
                volume_title=row[4],
                book_title=row[5],
                volume_long_title=row[6],
                book_long_title=row[7],
                volume_subtitle=row[8],
                book_subtitle=row[9],
                volume_short_title=row[10],
                book_short_title=row[11],
                volume_lds_url=row[12],
                book_lds_url=row[13],
                chapter_number=row[14],
                verse_number=row[15],
                scripture_text=row[16],
                verse_title=row[17],
                verse_short_title=row[18]
            ) 