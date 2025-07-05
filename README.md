# Fast Scriptures

A modern, mobile-first scripture reading application with a Cursor-like dark theme. Built with FastAPI backend and React frontend.

## Features

- **Dark Theme**: Cursor-like dark background with soft muted highlights
- **Mobile-First**: Responsive design optimized for mobile and desktop
- **Hacker Aesthetic**: Monospace fonts and minimalist UI
- **Full-Text Search**: Search across all LDS scriptures
- **Random Scripture**: Get random scripture verses
- **RESTful API**: FastAPI backend with comprehensive endpoints
- **TypeScript**: Full type safety across the stack

## Project Structure

```
fast-scriptures/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── models/         # Pydantic models
│   │   ├── routes/         # API endpoints
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Configuration
│   │   └── main.py         # FastAPI app
│   ├── requirements.txt
│   └── README.md
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript types
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── README.md
├── submodules/              # LDS Scriptures database
│   └── lds-scriptures/
├── docker-compose.yml
└── README.md
```

## Quick Start

### Prerequisites

- Python 3.8+
- uv (Python package manager)
- Node.js 16+
- npm or yarn

### Backend Setup

1. Install Python dependencies:
```bash
cd backend
uv sync
```

2. Start the FastAPI server:
```bash
uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`
- API Documentation: `http://localhost:8000/docs`
- Alternative Docs: `http://localhost:8000/redoc`

### Frontend Setup

1. Install Node.js dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## API Endpoints

### Scripture Endpoints

- `GET /api/scriptures/volumes` - Get all volumes
- `GET /api/scriptures/volumes/{volume_id}/books` - Get books by volume
- `GET /api/scriptures/books/{book_id}/chapters` - Get chapters by book
- `GET /api/scriptures/chapters/{chapter_id}/verses` - Get verses by chapter
- `GET /api/scriptures/search?q={query}` - Search scriptures
- `GET /api/scriptures/reference/{book_title}/{chapter}` - Get scripture by reference
- `GET /api/scriptures/random` - Get random scripture

### Utility Endpoints

- `GET /` - API information
- `GET /health` - Health check

## Database

The application uses the SQLite database located at `submodules/lds-scriptures/sqlite/lds-scriptures-sqlite.db`. This contains the complete LDS scriptures in a structured format.

## Development

### Backend Development

The backend is built with:
- **FastAPI** - Modern Python web framework
- **SQLite** - Lightweight database
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

### Frontend Development

The frontend is built with:
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling with custom theme
- **Axios** - HTTP client

### Styling

The application uses a custom Tailwind CSS theme that mimics the Cursor editor:

- **Background**: `#0d1117` (cursor-bg)
- **Surface**: `#161b22` (cursor-surface)
- **Border**: `#30363d` (cursor-border)
- **Text**: `#c9d1d9` (cursor-text)
- **Accent**: `#58a6ff` (cursor-accent)

## Docker Development

You can also run the entire application using Docker Compose:

```bash
docker-compose up --build
```

This will start both the backend and frontend services.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the MIT License.
