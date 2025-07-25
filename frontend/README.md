# Fast Scriptures Frontend

A React-based frontend for the LDS scripture reading application with a Cursor-like dark theme.

## Features

- **Dark Theme**: Cursor-like dark background with soft muted highlights
- **Mobile-First**: Responsive design optimized for mobile and desktop
- **Hacker Aesthetic**: Monospace fonts and minimalist UI
- **Scripture Search**: Full-text search across all scriptures
- **Random Scripture**: Get random scripture verses
- **Responsive**: Works on all device sizes

## Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build

To build for production:
```bash
npm run build
```

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling with custom Cursor-like theme
- **Axios** - HTTP client for API calls

## Project Structure

```
src/
├── components/          # React components
│   └── ScriptureReader.tsx
├── hooks/              # Custom React hooks
│   └── useScriptures.ts
├── services/           # API services
│   └── api.ts
├── types/              # TypeScript type definitions
│   └── scripture.ts
├── App.tsx             # Main app component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## Styling

The application uses a custom Tailwind CSS theme that mimics the Cursor editor's dark theme:

- **Background**: `#0d1117` (cursor-bg)
- **Surface**: `#161b22` (cursor-surface)
- **Border**: `#30363d` (cursor-border)
- **Text**: `#c9d1d9` (cursor-text)
- **Accent**: `#58a6ff` (cursor-accent)

## API Integration

The frontend communicates with the FastAPI backend running on `http://localhost:8000`. Make sure the backend is running before using the frontend.
