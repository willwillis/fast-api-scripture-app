# Getting Started with Fast Scriptures

Welcome to Fast Scriptures! This guide will help you get up and running as a contributor, whether you're fixing a bug, adding a feature, or just exploring the codebase.

## 🎯 What is Fast Scriptures?

Fast Scriptures is a modern, mobile-first scripture reading application that lets users:
- **Search** through all LDS scriptures with full-text search
- **Browse** scriptures by volume, book, and chapter
- **Get random verses** for daily inspiration
- **Read** with a beautiful, dark Cursor-inspired interface

The app is built with FastAPI (backend) + React (frontend) and designed to be fast, accessible, and developer-friendly.

## 🛠️ Prerequisites

Before you start, make sure you have these tools installed:

### Required
- **Python 3.9+** - For the FastAPI backend
- **uv** - Fast Python package manager ([install guide](https://docs.astral.sh/uv/getting-started/installation/))
- **Node.js 18+** - For the React frontend
- **Git** - For version control

### Helpful to Have
- **Visual Studio Code** or **Cursor** - The project is optimized for these editors
- **GitHub CLI** (`gh`) - Makes creating PRs easier
- **httpie** or **curl** - For testing API endpoints

### Check Your Setup
```bash
# Verify your tools are installed
python --version    # Should be 3.9+
uv --version       # Should be latest
node --version     # Should be 18+
npm --version      # Comes with Node.js
git --version      # Any recent version
```

## 🚀 Quick Setup (5 minutes)

### 1. Clone the Repository
```bash
git clone https://github.com/willwillis/fast-api-scripture-app.git
cd fast-api-scripture-app
```

### 2. Initialize Submodules (Scripture Data)
```bash
git submodule update --init --recursive
```
*This downloads the LDS scripture database (~10MB)*

### 3. Set Up the Backend
```bash
cd backend

# Install Python dependencies (uv is much faster than pip)
uv sync

# Set up the database (copies from submodule)
python setup_database.py

# Start the backend server
uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

✅ **Backend ready!** Visit http://localhost:8000/docs to see the API documentation

### 4. Set Up the Frontend (New Terminal)
```bash
cd frontend

# Install Node.js dependencies
npm install

# Start the frontend development server
npm run dev
```

✅ **Frontend ready!** Visit http://localhost:5173 to see the application

## 🎉 You're Ready!

You should now have:
- ✅ Backend API running at http://localhost:8000
- ✅ Frontend app running at http://localhost:5173
- ✅ API docs at http://localhost:8000/docs
- ✅ Scripture database loaded and working

Try searching for "love" or clicking "Random Scripture" to test everything works!

## 🗂️ Understanding the Project Structure

Here's what you're working with:

```
fast-scriptures/
├── backend/                    # FastAPI backend
│   ├── app/
│   │   ├── main.py            # 🚪 Entry point - starts here
│   │   ├── routes/            # 🛤️  API endpoints (/api/scriptures/*)
│   │   ├── services/          # 🔧 Business logic (database queries)
│   │   ├── models/            # 📝 Data structures (what API returns)
│   │   └── utils/             # ⚙️  Configuration & helpers
│   ├── tests/                 # 🧪 Backend tests
│   └── pyproject.toml         # 📦 Python dependencies
├── frontend/                  # React frontend
│   ├── src/
│   │   ├── App.tsx            # 🏠 Main app component
│   │   ├── components/        # 🧩 UI components
│   │   ├── hooks/             # 🪝 React hooks (useScriptures)
│   │   ├── services/          # 📡 API calls to backend
│   │   └── types/             # 📝 TypeScript types
│   ├── package.json           # 📦 Node.js dependencies
│   └── tailwind.config.js     # 🎨 Styling configuration
├── submodules/
│   └── lds-scriptures/        # 📚 Scripture database (SQLite)
└── docs/                      # 📖 Documentation (you are here!)
```

### Key Files to Know

| File | What It Does | When You'd Edit It |
|------|--------------|-------------------|
| `backend/app/routes/scriptures.py` | API endpoints for scripture operations | Adding new API features |
| `backend/app/services/database.py` | Database queries and business logic | Changing how data is fetched |
| `frontend/src/components/ScriptureReader.tsx` | Main UI component | Improving the user interface |
| `frontend/src/hooks/useScriptures.ts` | React hook for API calls | Adding new frontend features |
| `frontend/src/services/api.ts` | API client functions | Adding new API endpoints |

## 🔄 Your First Contribution

Let's make a small change to get familiar with the workflow:

### 1. Create a Feature Branch
```bash
git checkout -b improve-docs
```

### 2. Make a Small Change
Edit `README.md` and add your name to a contributors section, or fix a typo you notice.

### 3. Test Your Changes
```bash
# Test backend
cd backend
uv run pytest tests/ -v

# Test frontend
cd frontend
npm run test
npm run lint

# Test both work together (manual)
# Visit http://localhost:5173 and try the app
```

### 4. Commit Your Changes
```bash
git add .
git commit -m "docs: add contributor section to README

- Added contributors section to acknowledge project contributors
- Fixed minor typo in setup instructions"
```

### 5. Push and Create a PR
```bash
git push -u origin improve-docs

# If you have GitHub CLI:
gh pr create --title "Improve documentation" --body "Small improvements to README"

# Otherwise, go to GitHub and create a PR manually
```

## 🧪 Running Tests

Testing is important! Here's how to run all the tests:

### Backend Tests
```bash
cd backend
uv run pytest tests/ -v --cov=app --cov-report=term-missing
```

### Frontend Tests
```bash
cd frontend
npm run test          # Run tests once
npm run test:coverage # Run with coverage report
npm run test -- --watch  # Run in watch mode
```

### Linting and Formatting
```bash
# Backend
cd backend
uv run black --check app tests    # Check formatting
uv run isort --check-only app tests # Check import order
uv run flake8 app tests           # Check code style

# Frontend
cd frontend
npm run lint                      # Check TypeScript/JavaScript
npm run type-check               # Check TypeScript types
```

### Run Everything (Like CI Does)
```bash
# Use our Makefiles for convenience
make test-backend
make test-frontend
make lint-all
```

## 🐛 Troubleshooting

### Backend Issues

**"Module not found" errors**
```bash
cd backend
uv sync  # Reinstall dependencies
```

**"Database not found" errors**
```bash
git submodule update --init --recursive
python setup_database.py
```

**Port 8000 already in use**
```bash
# Kill any existing process
lsof -ti:8000 | xargs kill -9
# Or use a different port
uv run uvicorn app.main:app --reload --port 8001
```

### Frontend Issues

**"Module not found" or TypeScript errors**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**Port 5173 already in use**
```bash
# Vite will automatically use next available port
# Or specify a different port
npm run dev -- --port 3000
```

**Tailwind styles not working**
```bash
# Restart the dev server
npm run dev
```

### General Issues

**Git submodule problems**
```bash
git submodule deinit --all
git submodule update --init --recursive
```

**Pre-commit hooks failing**
```bash
# Install pre-commit (if you want to use it)
pip install pre-commit
pre-commit install

# Or skip pre-commit for now
git commit --no-verify -m "your message"
```

## 🤝 Getting Help

Stuck? Here are the best places to get help:

1. **Check our docs**: Browse the [documentation index](./README.md)
2. **Search issues**: Look through [GitHub issues](https://github.com/willwillis/fast-api-scripture-app/issues)
3. **Ask a question**: Create a new issue with the "question" label
4. **Review existing code**: Look at similar features in the codebase

## 📚 Next Steps

Now that you're set up, here's what to explore next:

### For Backend Development
- 📖 Read [API Standards](./api-standards.md) - Learn our API design principles
- 🔍 Browse `backend/app/routes/scriptures.py` - See how endpoints are built
- 🧪 Check `backend/tests/test_api.py` - See how we test APIs

### For Frontend Development
- 🎨 Examine `frontend/src/components/` - See our React components
- 🪝 Study `frontend/src/hooks/useScriptures.ts` - Learn our data fetching
- 📱 Review the Tailwind config - Understand our theming

### For DevOps/Deployment
- 🚀 Read [Deployment Guide](./deployment.md) - Learn how we deploy
- 📊 Check [Monitoring Setup](./monitoring-setup.md) - See our observability
- 🔄 Review [Development Workflow](./development-workflow.md) - Our development process

### For Architecture Understanding
- 🏗️ Read [Architecture Overview](./architecture.md) *(Coming Soon)*
- 📚 Browse [Release Notes](./releases/) - See how the project evolved
- 📋 Check [API Standards](./api-standards.md) - Understand design decisions

## 🎯 Common Contribution Ideas

Looking for something to work on? Here are beginner-friendly areas:

### 🐛 Bug Fixes
- Fix typos in documentation
- Improve error messages
- Add missing TypeScript types
- Fix responsive design issues

### ✨ Small Features
- Add new search filters
- Improve keyboard navigation
- Add loading states
- Enhance accessibility

### 📖 Documentation
- Add code comments
- Create tutorials
- Improve setup instructions
- Add architecture diagrams

### 🧪 Testing
- Add test cases
- Improve test coverage
- Add integration tests
- Create visual regression tests

---

**Welcome to the Fast Scriptures community!** 🎉

We're excited to have you contribute. Start small, ask questions, and don't hesitate to open a PR even for minor improvements. Every contribution helps make the project better!

**Quick Links:** [Documentation Index](./README.md) | [Development Workflow](./development-workflow.md) | [API Standards](./api-standards.md) | [Main README](../README.md)
