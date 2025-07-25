import pytest
from app.main import app
from fastapi.testclient import TestClient


@pytest.fixture
def client():
    """Create test client"""
    return TestClient(app)


class TestHealthEndpoint:
    """Test health check endpoint"""

    def test_health_endpoint(self, client):
        """Test health endpoint returns healthy status"""
        response = client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "database" in data
        assert "volumes_count" in data


class TestScriptureEndpoints:
    """Test scripture-related endpoints"""

    def test_get_volumes(self, client):
        """Test volumes endpoint"""
        response = client.get("/api/scriptures/volumes")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0
        assert "id" in data[0]
        assert "volume_title" in data[0]

    def test_get_books_by_volume(self, client):
        """Test books by volume endpoint"""
        # First get a volume
        volumes_response = client.get("/api/scriptures/volumes")
        volume_id = volumes_response.json()[0]["id"]

        response = client.get(f"/api/scriptures/volumes/{volume_id}/books")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0
        assert "id" in data[0]
        assert "book_title" in data[0]

    def test_get_chapters_by_book(self, client):
        """Test chapters by book endpoint"""
        # Get a book first
        volumes_response = client.get("/api/scriptures/volumes")
        volume_id = volumes_response.json()[0]["id"]
        books_response = client.get(f"/api/scriptures/volumes/{volume_id}/books")
        book_id = books_response.json()[0]["id"]

        response = client.get(f"/api/scriptures/books/{book_id}/chapters")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0
        assert "id" in data[0]
        assert "chapter_number" in data[0]

    def test_get_verses_by_chapter(self, client):
        """Test verses by chapter endpoint"""
        # Get a chapter first
        volumes_response = client.get("/api/scriptures/volumes")
        volume_id = volumes_response.json()[0]["id"]
        books_response = client.get(f"/api/scriptures/volumes/{volume_id}/books")
        book_id = books_response.json()[0]["id"]
        chapters_response = client.get(f"/api/scriptures/books/{book_id}/chapters")
        chapter_id = chapters_response.json()[0]["id"]

        response = client.get(f"/api/scriptures/chapters/{chapter_id}/verses")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0
        assert "id" in data[0]
        assert "verse_number" in data[0]
        assert "scripture_text" in data[0]

    def test_search_scriptures(self, client):
        """Test search endpoint"""
        response = client.get("/api/scriptures/search?q=love&limit=5")
        assert response.status_code == 200
        data = response.json()
        assert "scriptures" in data
        assert "total" in data
        assert isinstance(data["scriptures"], list)
        assert len(data["scriptures"]) <= 5

    def test_random_scripture(self, client):
        """Test random scripture endpoint"""
        response = client.get("/api/scriptures/random")
        assert response.status_code == 200
        data = response.json()
        assert "scripture_text" in data
        assert "verse_title" in data
        assert "book_id" in data

    def test_random_scripture_with_lds_param(self, client):
        """Test random scripture with include_lds parameter"""
        response = client.get("/api/scriptures/random?include_lds=true")
        assert response.status_code == 200
        data = response.json()
        assert "scripture_text" in data
        assert "verse_title" in data
        assert "book_id" in data


class TestErrorHandling:
    """Test error handling"""

    def test_invalid_volume_id(self, client):
        """Test invalid volume ID returns empty list"""
        response = client.get("/api/scriptures/volumes/99999/books")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) == 0

    def test_invalid_book_id(self, client):
        """Test invalid book ID returns empty list"""
        response = client.get("/api/scriptures/books/99999/chapters")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) == 0

    def test_invalid_chapter_id(self, client):
        """Test invalid chapter ID returns empty list"""
        response = client.get("/api/scriptures/chapters/99999/verses")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) == 0

    def test_empty_search_query(self, client):
        """Test empty search query returns all scriptures"""
        response = client.get("/api/scriptures/search?q=")
        assert response.status_code == 200
        data = response.json()
        assert data["total"] > 0
        assert len(data["scriptures"]) > 0


class TestPerformance:
    """Test performance characteristics"""

    def test_health_response_time(self, client):
        """Test health endpoint response time"""
        import time

        start_time = time.time()
        response = client.get("/health")
        end_time = time.time()

        assert response.status_code == 200
        assert (end_time - start_time) < 1.0  # Should respond within 1 second

    def test_search_response_time(self, client):
        """Test search endpoint response time"""
        import time

        start_time = time.time()
        response = client.get("/api/scriptures/search?q=love&limit=10")
        end_time = time.time()

        assert response.status_code == 200
        assert (end_time - start_time) < 2.0  # Should respond within 2 seconds
