# Testing Guide

Comprehensive testing strategy and practices for the Fast Scriptures application. This guide covers everything from unit tests to end-to-end monitoring.

## 🎯 Testing Philosophy

Fast Scriptures follows a testing pyramid approach:
- **Unit Tests**: Fast, isolated, comprehensive coverage
- **Integration Tests**: API endpoints and database interactions
- **E2E Tests**: Complete user journeys and system validation
- **Performance Tests**: Response times and load testing
- **Monitoring**: Continuous production validation

## 🧪 Backend Testing

### Test Structure
```
backend/tests/
├── test_api.py              # API endpoint tests
├── test_models.py           # Pydantic model tests
├── test_services.py         # Business logic tests
├── test_database.py         # Database integration tests
├── test_performance.py      # Performance benchmarks
└── conftest.py             # Pytest configuration
```

### Running Backend Tests

#### Basic Test Execution
```bash
cd backend

# Run all tests
uv run pytest

# Run with verbose output
uv run pytest -v

# Run specific test file
uv run pytest tests/test_api.py

# Run specific test class
uv run pytest tests/test_api.py::TestScriptureEndpoints

# Run specific test method
uv run pytest tests/test_api.py::TestScriptureEndpoints::test_get_volumes
```

#### Coverage Reports
```bash
# Run with coverage
uv run pytest --cov=app

# Generate HTML coverage report
uv run pytest --cov=app --cov-report=html

# Show missing lines
uv run pytest --cov=app --cov-report=term-missing

# Set coverage threshold
uv run pytest --cov=app --cov-fail-under=80
```

#### Test Categories
```bash
# Run integration tests only
uv run pytest -m integration

# Run unit tests only
uv run pytest -m "not integration"

# Run performance tests
uv run pytest tests/test_performance.py

# Skip slow tests
uv run pytest -m "not slow"
```

### Backend Test Examples

#### API Endpoint Testing
```python
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

class TestScriptureEndpoints:
    def test_get_volumes(self):
        """Test getting all scripture volumes."""
        response = client.get("/api/scriptures/volumes")
        assert response.status_code == 200

        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0
        assert "volume_title" in data[0]

    def test_search_scriptures(self):
        """Test scripture search functionality."""
        response = client.get("/api/scriptures/search?q=love&limit=5")
        assert response.status_code == 200

        data = response.json()
        assert len(data) <= 5
        for result in data:
            assert "love" in result["scripture_text"].lower()

    def test_random_scripture(self):
        """Test random scripture generation."""
        response = client.get("/api/scriptures/random")
        assert response.status_code == 200

        data = response.json()
        assert "verse_title" in data
        assert "scripture_text" in data
        assert len(data["scripture_text"]) > 0
```

#### Database Testing
```python
import pytest
from app.services.database import DatabaseService

class TestDatabaseService:
    @pytest.fixture
    def db_service(self):
        return DatabaseService()

    def test_get_volumes(self, db_service):
        """Test volume retrieval from database."""
        volumes = db_service.get_volumes()
        assert len(volumes) == 5  # Standard works

        expected_volumes = {"Old Testament", "New Testament", "Book of Mormon",
                          "Doctrine and Covenants", "Pearl of Great Price"}
        actual_volumes = {v["volume_title"] for v in volumes}
        assert actual_volumes == expected_volumes

    def test_search_performance(self, db_service):
        """Test search query performance."""
        import time

        start_time = time.time()
        results = db_service.search_scriptures("love", limit=100)
        execution_time = time.time() - start_time

        assert execution_time < 1.0  # Should complete within 1 second
        assert len(results) <= 100
```

#### Performance Testing
```python
import pytest
import time
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

class TestPerformance:
    def test_health_response_time(self):
        """Test health endpoint performance."""
        start_time = time.time()
        response = client.get("/health")
        response_time = time.time() - start_time

        assert response.status_code == 200
        assert response_time < 0.5  # Should respond within 500ms

    def test_search_response_time(self):
        """Test search endpoint performance."""
        start_time = time.time()
        response = client.get("/api/scriptures/search?q=love")
        response_time = time.time() - start_time

        assert response.status_code == 200
        assert response_time < 2.0  # Should respond within 2 seconds

    @pytest.mark.slow
    def test_concurrent_requests(self):
        """Test handling multiple concurrent requests."""
        import concurrent.futures

        def make_request():
            return client.get("/api/scriptures/random")

        with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
            futures = [executor.submit(make_request) for _ in range(50)]
            responses = [future.result() for future in futures]

        # All requests should succeed
        assert all(r.status_code == 200 for r in responses)

        # All responses should be unique (high probability)
        texts = [r.json()["scripture_text"] for r in responses]
        unique_texts = set(texts)
        assert len(unique_texts) > 40  # At least 80% unique
```

## 🎭 Frontend Testing

### Test Structure
```
frontend/src/
├── __tests__/
│   ├── App.test.tsx           # Main app component tests
│   ├── components/            # Component tests
│   ├── hooks/                 # Custom hook tests
│   └── services/              # Service tests
├── test/
│   └── setup.ts              # Test environment setup
└── vitest.config.ts          # Vitest configuration
```

### Running Frontend Tests

#### Basic Test Execution
```bash
cd frontend

# Run all tests
npm run test

# Run tests once (CI mode)
npm run test -- --run

# Run in watch mode (development)
npm run test -- --watch

# Run specific test file
npm run test -- App.test.tsx

# Run tests matching pattern
npm run test -- --grep "scripture"
```

#### Coverage Reports
```bash
# Run with coverage
npm run test:coverage

# Generate coverage report
npm run test:coverage -- --run

# View coverage in browser
open coverage/index.html
```

### Frontend Test Examples

#### Component Testing
```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';

// Mock the API service
vi.mock('../services/api', () => ({
  searchScriptures: vi.fn(),
  getRandomScripture: vi.fn(),
}));

describe('App Component', () => {
  it('renders search interface', () => {
    render(<App />);

    expect(screen.getByPlaceholderText(/search scriptures/i)).toBeInTheDocument();
    expect(screen.getByText(/random scripture/i)).toBeInTheDocument();
  });

  it('performs search when user types', async () => {
    const mockSearch = vi.fn().mockResolvedValue([
      { verse_title: 'John 3:16', scripture_text: 'For God so loved...' }
    ]);

    render(<App />);

    const searchInput = screen.getByPlaceholderText(/search scriptures/i);
    fireEvent.change(searchInput, { target: { value: 'love' } });

    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledWith('love');
    });
  });

  it('displays random scripture on button click', async () => {
    const mockRandom = vi.fn().mockResolvedValue({
      verse_title: 'Moroni 10:5',
      scripture_text: 'And by the power of the Holy Ghost...'
    });

    render(<App />);

    const randomButton = screen.getByText(/random scripture/i);
    fireEvent.click(randomButton);

    await waitFor(() => {
      expect(screen.getByText('Moroni 10:5')).toBeInTheDocument();
    });
  });
});
```

#### Hook Testing
```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useScriptures } from '../hooks/useScriptures';

// Mock the API
vi.mock('../services/api');

describe('useScriptures Hook', () => {
  it('searches scriptures correctly', async () => {
    const { result } = renderHook(() => useScriptures());

    // Test initial state
    expect(result.current.scriptures).toEqual([]);
    expect(result.current.loading).toBe(false);

    // Perform search
    result.current.searchScriptures('love');

    // Should be loading
    expect(result.current.loading).toBe(true);

    // Wait for results
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.scriptures.length).toBeGreaterThan(0);
    });
  });

  it('handles search errors gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Mock API to throw error
    vi.mocked(searchScriptures).mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useScriptures());

    result.current.searchScriptures('invalid');

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeTruthy();
    });

    consoleSpy.mockRestore();
  });
});
```

#### API Service Testing
```typescript
import { describe, it, expect, vi } from 'vitest';
import { searchScriptures, getRandomScripture } from '../services/api';

// Mock axios
vi.mock('axios');

describe('API Service', () => {
  it('searches scriptures with correct parameters', async () => {
    const mockResponse = {
      data: [
        { verse_title: 'John 3:16', scripture_text: 'For God so loved...' }
      ]
    };

    vi.mocked(axios.get).mockResolvedValue(mockResponse);

    const results = await searchScriptures('love', 10);

    expect(axios.get).toHaveBeenCalledWith('/api/scriptures/search', {
      params: { q: 'love', limit: 10 }
    });
    expect(results).toEqual(mockResponse.data);
  });

  it('gets random scripture', async () => {
    const mockResponse = {
      data: { verse_title: 'Moroni 10:5', scripture_text: 'And by the power...' }
    };

    vi.mocked(axios.get).mockResolvedValue(mockResponse);

    const result = await getRandomScripture();

    expect(axios.get).toHaveBeenCalledWith('/api/scriptures/random');
    expect(result).toEqual(mockResponse.data);
  });
});
```

## 🔄 End-to-End Testing

### Synthetic Monitoring
We use GitHub Actions for continuous E2E validation:

**Location**: `.github/workflows/synthetic-monitoring.yml`

#### Features
- Runs every 15 minutes
- Tests critical user journeys
- Validates API responses
- Monitors performance
- Handles cold start scenarios

#### Manual E2E Testing
```bash
# Run monitoring script locally
python scripts/monitor.py --url http://localhost:8000

# Test production endpoints
python scripts/monitor.py --url https://scriptures-fast-api.onrender.com

# Test with custom warm-up
python scripts/monitor.py --wait 2 --url https://scriptures-fast-api.onrender.com
```

### User Journey Tests
```python
# scripts/e2e_tests.py
import requests
import time

def test_complete_user_journey():
    """Test a complete user journey through the app."""
    base_url = "https://scriptures-fast-api.onrender.com"

    # 1. Health check
    health = requests.get(f"{base_url}/health")
    assert health.status_code == 200

    # 2. Get volumes
    volumes = requests.get(f"{base_url}/api/scriptures/volumes")
    assert volumes.status_code == 200
    assert len(volumes.json()) == 5

    # 3. Search for scriptures
    search = requests.get(f"{base_url}/api/scriptures/search?q=love&limit=5")
    assert search.status_code == 200
    assert len(search.json()) <= 5

    # 4. Get random scripture
    random = requests.get(f"{base_url}/api/scriptures/random")
    assert random.status_code == 200

    # 5. Navigate to specific chapter
    chapter = requests.get(f"{base_url}/api/scriptures/books/1/chapters")
    assert chapter.status_code == 200

    print("✅ Complete user journey test passed!")
```

## 🔍 Quality Assurance

### Code Quality Checks

#### Backend Linting
```bash
cd backend

# Check code formatting
uv run black --check app tests

# Check import order
uv run isort --check-only app tests

# Check code style
uv run flake8 app tests

# Type checking
uv run mypy app

# Security scanning
uv run bandit -r app/
```

#### Frontend Linting
```bash
cd frontend

# ESLint checking
npm run lint

# TypeScript type checking
npx tsc --noEmit

# Fix linting issues automatically
npm run lint -- --fix
```

### Pre-commit Hooks
```bash
# Install pre-commit hooks
cd backend
pip install pre-commit
pre-commit install

# Run manually
pre-commit run --all-files

# Skip hooks for emergency commits
git commit --no-verify -m "emergency fix"
```

## 📊 Test Automation

### Continuous Integration
Our GitHub Actions workflow runs comprehensive tests:

```yaml
# .github/workflows/ci.yml
- name: Run backend tests
  run: |
    cd backend
    uv run pytest tests/ -v --cov=app --cov-report=xml

- name: Run frontend tests
  run: |
    cd frontend
    npm run test -- --run
    npm run test:coverage -- --run

- name: Quality checks
  run: |
    cd backend
    uv run black --check app tests
    uv run isort --check-only app tests
    uv run flake8 app tests
```

### Test Data Management
```python
# conftest.py - Pytest fixtures
import pytest
from app.services.database import DatabaseService

@pytest.fixture(scope="session")
def test_database():
    """Provide a test database instance."""
    # Use test database or mock
    return DatabaseService(test_mode=True)

@pytest.fixture
def sample_scriptures():
    """Provide sample scripture data for testing."""
    return [
        {
            "verse_title": "John 3:16",
            "scripture_text": "For God so loved the world...",
            "book_title": "John",
            "chapter_number": 3,
            "verse_number": 16
        }
    ]
```

## 🎯 Testing Best Practices

### Test Organization
- **Arrange-Act-Assert**: Structure tests clearly
- **One assertion per test**: Keep tests focused
- **Descriptive names**: Test names should explain what they test
- **Independent tests**: Tests shouldn't depend on each other

### Performance Testing
```python
# Test response times
def test_api_performance():
    start = time.time()
    response = client.get("/api/scriptures/search?q=love")
    duration = time.time() - start

    assert response.status_code == 200
    assert duration < 2.0  # Performance requirement

# Test memory usage
def test_memory_usage():
    import psutil
    process = psutil.Process()

    initial_memory = process.memory_info().rss

    # Perform memory-intensive operation
    client.get("/api/scriptures/search?q=test")

    final_memory = process.memory_info().rss
    memory_increase = final_memory - initial_memory

    # Should not increase memory by more than 10MB
    assert memory_increase < 10 * 1024 * 1024
```

### Error Testing
```python
# Test error handling
def test_invalid_search_query():
    response = client.get("/api/scriptures/search?q=")
    assert response.status_code == 400
    assert "query" in response.json()["detail"].lower()

def test_non_existent_endpoint():
    response = client.get("/api/scriptures/nonexistent")
    assert response.status_code == 404

def test_database_connection_failure():
    # Mock database failure
    with patch('app.services.database.get_connection') as mock_conn:
        mock_conn.side_effect = Exception("Database unavailable")

        response = client.get("/api/scriptures/volumes")
        assert response.status_code == 503
```

## 🛠 Development Testing Workflow

### Local Development
```bash
# Start with tests in watch mode
cd frontend && npm run test -- --watch &
cd backend && uv run pytest --watch &

# Make changes and see immediate feedback
# Tests automatically re-run on file changes
```

### Before Committing
```bash
# Run complete test suite
make test-all

# Check code quality
make lint-all

# Run security scans
make security-check

# If all pass, commit
git commit -m "feat: add new feature with tests"
```

### Code Review Testing
```bash
# Test the PR branch
git checkout feature/new-feature
make test-all

# Test performance impact
python scripts/performance_test.py

# Test backwards compatibility
python scripts/compatibility_test.py
```

## 📚 Testing Resources

### Documentation
- [pytest Documentation](https://docs.pytest.org/)
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [FastAPI Testing](https://fastapi.tiangolo.com/tutorial/testing/)

### Best Practices
- [Test-Driven Development](https://testdriven.io/)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
- [Python Testing 101](https://automationpanda.com/python-testing-101/)

### Tools
- [Coverage.py](https://coverage.readthedocs.io/)
- [Hypothesis](https://hypothesis.readthedocs.io/) - Property-based testing
- [Playwright](https://playwright.dev/) - E2E testing (future consideration)

---

**Quick Links:** [Documentation Index](./README.md) | [Developer Guide](./developer-guide.md) | [Operations Guide](./operations-guide.md) | [API Standards](./api-standards.md)
