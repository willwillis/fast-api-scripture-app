# Fast Scriptures

A modern, mobile-first scripture reading (and searching) application built with modern web technologies.

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

## Tech Stack

### Backend Technologies

- **[FastAPI](https://fastapi.tiangolo.com/)** - Modern, fast web framework for building APIs with Python
- **[SQLite](https://www.sqlite.org/)** - Lightweight, serverless database engine
- **[Pydantic](https://pydantic.dev/)** - Data validation and settings management using Python type annotations
- **[Uvicorn](https://www.uvicorn.org/)** - Lightning-fast ASGI server implementation
- **[uv](https://docs.astral.sh/uv/)** - Fast Python package installer and resolver

### Frontend Technologies

- **[React 18](https://react.dev/)** - JavaScript library for building user interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Typed superset of JavaScript for better developer experience
- **[Vite](https://vitejs.dev/)** - Next generation frontend tooling for fast development and building
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for rapid UI development
- **[Axios](https://axios-http.com/)** - Promise-based HTTP client for the browser and Node.js

### Development & Deployment

- **[Render](https://render.com/)** - Cloud platform for hosting web services and static sites
- **[Git](https://git-scm.com/)** - Distributed version control system

### Styling

The application uses a custom Tailwind CSS theme:

- **Background**: `#0d1117`
- **Surface**: `#161b22`
- **Border**: `#30363d`
- **Text**: `#c9d1d9`
- **Accent**: `#58a6ff`



## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the MIT License.
