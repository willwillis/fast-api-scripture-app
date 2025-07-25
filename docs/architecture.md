# System Architecture

A practical overview of how Fast Scriptures works under the hood.

## 🔄 How It All Works Together

```
User Browser
     ↓
React Frontend (localhost:5173)
     ↓ HTTP requests
FastAPI Backend (localhost:8000)
     ↓ SQL queries
SQLite Database (lds-scriptures.db)
```

## 📁 Code Organization

### Backend Structure
```
backend/app/
├── main.py              # FastAPI app + health check
├── routes/
│   └── scriptures.py    # All API endpoints (/api/scriptures/*)
├── services/
│   └── database.py      # Database queries and business logic
├── models/
│   └── scripture.py     # Response data structures
└── utils/
    ├── config.py        # API metadata and constants
    └── environment.py   # Settings and environment variables
```

### Frontend Structure
```
frontend/src/
├── App.tsx              # Main app component
├── components/
│   ├── ScriptureReader.tsx  # Displays search results
│   ├── Navigation.tsx       # Volume/book navigation
│   └── ChapterReader.tsx    # Chapter reading view
├── hooks/
│   └── useScriptures.ts     # API calls and state management
├── services/
│   └── api.ts              # HTTP client functions
└── types/
    └── scripture.ts        # TypeScript type definitions
```

## 🔗 API Design

### Core Endpoints
- **Search**: `/api/scriptures/search?q=love` - Full-text search across all scriptures
- **Random**: `/api/scriptures/random` - Get a random verse
- **Navigation**: `/api/scriptures/volumes` → `/books/{id}` → `/chapters/{id}` - Browse hierarchy
- **Health**: `/health` - System status (used by monitoring)

### Response Pattern
All endpoints return consistent JSON with scripture data:
```json
{
  "verse_title": "John 3:16",
  "scripture_text": "For God so loved the world...",
  "book_title": "John",
  "chapter_number": 3,
  "verse_number": 16
}
```

## 💾 Data Layer

### Scripture Database
- **Source**: Git submodule from [lds-scriptures](https://github.com/bcbooks/lds-scriptures)
- **Format**: SQLite database with structured scripture text
- **Size**: ~10MB containing all LDS standard works
- **Access**: Read-only queries via SQLAlchemy

### Key Tables
- **scriptures** - Individual verses with full text
- **volumes** - Old Testament, New Testament, Book of Mormon, etc.
- **books** - Genesis, Matthew, 1 Nephi, etc.
- **chapters** - Chapter organization within books

## ⚡ Key Features Implementation

### Full-Text Search
1. User types in search box → `useScriptures.ts`
2. Debounced API call → `api.ts`
3. SQL LIKE query → `database.py`
4. Results rendered → `ScriptureReader.tsx`

### Random Scripture
1. User clicks "Random" button
2. Backend generates random verse via SQL `ORDER BY RANDOM()`
3. Single verse returned and displayed

### Cold Start Handling
- **Problem**: Render free tier sleeps after inactivity
- **Solution**: Health check endpoint warms up database connection
- **Monitoring**: GitHub Actions keeps service alive with 15-minute pings

## 🚀 Deployment Architecture

### Local Development
- Frontend: Vite dev server (localhost:5173)
- Backend: uvicorn with reload (localhost:8000)
- Database: Local SQLite file

### Production (Render)
- Frontend: Static build served by Render
- Backend: FastAPI on Render web service
- Database: SQLite file included in deployment
- Monitoring: GitHub Actions synthetic monitoring

## 🎯 Design Decisions

### Why These Technologies?

**FastAPI**: Auto-generated docs, type safety, async support
**SQLite**: Simple deployment, fast reads, scripture data rarely changes
**React + TypeScript**: Type safety, component reusability, modern development
**Tailwind**: Rapid styling, consistent design system
**Git Submodules**: Scripture data stays synchronized with upstream

### Performance Considerations
- **Database**: Read-only SQLite is fast for scripture lookup patterns
- **Frontend**: Single-page app with client-side routing
- **API**: Simple REST endpoints, no complex joins needed
- **Caching**: Browser caches API responses, no server-side caching needed

## 🔧 Development Workflow

### Making Changes
1. **Backend changes**: Edit code → tests pass → API docs auto-update
2. **Frontend changes**: Edit components → hot reload → see changes instantly
3. **Database changes**: Update submodule → run `setup_database.py`

### Testing Strategy
- **Backend**: pytest with FastAPI TestClient
- **Frontend**: Vitest with React Testing Library
- **E2E**: GitHub Actions synthetic monitoring
- **Integration**: Manual testing of full user journeys

## 🤔 Common Questions

**Q: How do I add a new API endpoint?**
A: Add to `routes/scriptures.py`, implement logic in `services/database.py`, update frontend API calls in `services/api.ts`

**Q: How do I modify the UI?**
A: Edit React components in `frontend/src/components/`, styles use Tailwind classes

**Q: How do I update scripture data?**
A: Update the git submodule: `git submodule update --remote`, then run `python setup_database.py`

**Q: How do I add monitoring/logging?**
A: Optional New Relic integration is available, or add custom metrics to the `/health` endpoint

---

**Next Steps**: [Developer Guide](./developer-guide.md) | [API Standards](./api-standards.md) | [Testing Guide](./testing-guide.md)
