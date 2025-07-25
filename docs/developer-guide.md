# Developer Guide

Welcome to Fast Scriptures! This comprehensive guide will take you from setup to shipping features like a pro.

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

# Optional: Install monitoring dependencies if you want New Relic integration
# uv sync --extra monitoring

# Set up the database (copies from submodule)
python setup_database.py

# Start the backend server
uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

✅ **Backend ready!** Visit http://localhost:8000/docs to see the API documentation

**Note**: New Relic monitoring is optional. The app runs fine without it - you'll just see a harmless import message in the logs if it's not installed.

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

## 🔄 Development Workflow

### 1. Feature Development Process
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes
# (edit files, add features, fix bugs)

# Test your changes (see Testing section below)
cd backend && uv run pytest
cd frontend && npm run test

# Commit changes with good commit message
git add .
git commit -m "feat: add your feature description"

# Push and create PR
git push -u origin feature/your-feature-name
```

### 2. Daily Development Commands
```bash
# Start development servers
cd backend && uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
cd frontend && npm run dev

# Run quality checks
cd backend && uv run black app tests && uv run isort app tests && uv run flake8 app tests
cd frontend && npm run lint

# Run tests
cd backend && uv run pytest
cd frontend && npm run test
```

### 3. Making Your First Contribution

Let's make a small change to get familiar with the workflow:

#### Step 1: Create a Feature Branch
```bash
git checkout -b improve-docs
```

#### Step 2: Make a Small Change
Edit `README.md` and add your name to a contributors section, or fix a typo you notice.

#### Step 3: Test Your Changes
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

#### Step 4: Commit Your Changes
```bash
git add .
git commit -m "docs: add contributor section to README

- Added contributors section to acknowledge project contributors
- Fixed minor typo in setup instructions"
```

#### Step 5: Push and Create a PR
```bash
git push -u origin improve-docs

# If you have GitHub CLI:
gh pr create --title "Improve documentation" --body "Small improvements to README"

# Otherwise, go to GitHub and create a PR manually
```

## 📋 Commit Message Standards

We use Conventional Commits for clear, semantic commit messages:

### Format
```
type(scope): description

[optional body]

[optional footer]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test additions/changes
- `chore`: Build/tooling changes

### Examples
```
feat(api): add user authentication endpoints
fix(frontend): resolve search input validation issue
docs(readme): update deployment instructions
test(backend): add comprehensive API tests
```

## 🧪 Testing

Testing is crucial! Here's how to run all the tests:

### Backend Testing
```bash
cd backend

# Run all tests
uv run pytest

# Run with coverage
uv run pytest --cov=app --cov-report=term-missing

# Run specific test
uv run pytest tests/test_api.py::TestScriptureEndpoints::test_get_volumes

# Run integration tests
uv run pytest -m integration
```

### Frontend Testing
```bash
cd frontend

# Run all tests
npm run test

# Run with coverage
npm run test:coverage

# Run in watch mode (for development)
npm run test -- --watch

# Run specific test file
npm run test -- App.test.tsx
```

### Quality Checks
```bash
# Backend linting and formatting
cd backend
uv run black --check app tests    # Check formatting
uv run isort --check-only app tests # Check import order
uv run flake8 app tests           # Check code style
uv run mypy app                   # Type checking

# Frontend linting
cd frontend
npm run lint                      # Check TypeScript/JavaScript
npx tsc --noEmit                 # Check TypeScript types
```

### E2E Testing
```bash
# Run monitoring script for end-to-end validation
python scripts/monitor.py --url http://localhost:8000

# Test production endpoints
python scripts/monitor.py --url https://scriptures-fast-api.onrender.com
```

### Run Everything (Like CI Does)
```bash
# Use our Makefiles for convenience
make test-backend
make test-frontend
make lint-all
```

## 🔍 Code Review Process

### Pull Request Checklist
Before submitting a PR, ensure:
- [ ] Tests pass locally
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] No security vulnerabilities
- [ ] Performance impact considered
- [ ] Backward compatibility maintained

### Review Guidelines
When reviewing code, focus on:
- Logic and architecture
- Security issues
- Error handling
- Proper testing
- Documentation updates

## 🔧 Development Tools

### Recommended IDE Extensions
- **VS Code**: Python, TypeScript, ESLint, Prettier, GitLens
- **PyCharm**: Python development with FastAPI support
- **WebStorm**: JavaScript/TypeScript development

### Useful Development Commands
```bash
# Backend development
uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
uv run pytest --cov=app --cov-report=term-missing
uv run black --check app tests

# Frontend development
npm run dev
npm run build
npm run lint -- --fix
npm run test -- --watch

# Database operations
cd backend
python setup_database.py
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

## 🔒 Security Best Practices

### Code Security
- Never commit secrets or API keys
- Use environment variables for configuration
- Validate all inputs
- Sanitize database queries
- Keep dependencies updated

### Security Scanning
```bash
# Backend security scan
cd backend
uv run bandit -r app/

# Frontend security audit
cd frontend
npm audit
npm audit fix
```

## 🐛 Debugging

### Backend Debugging
```bash
# Run with debug logging
DEBUG=true uv run uvicorn app.main:app --reload

# Use Python debugger
import pdb; pdb.set_trace()

# Check logs (if logging is configured)
tail -f backend/logs/app.log
```

### Frontend Debugging
- Use browser Developer Tools
- Install React Developer Tools extension
- Check Network tab for API calls
- Review Console for errors and warnings

## 📊 Performance Monitoring

### Local Performance Testing
```bash
# Backend performance tests
cd backend
uv run pytest tests/test_performance.py

# Frontend bundle analysis
cd frontend
npm run build
npx vite-bundle-analyzer dist

# API response times
python scripts/monitor.py --url http://localhost:8000
```

### Production Monitoring
We use several tools for production monitoring:
- New Relic APM dashboard
- Render service logs
- GitHub Actions synthetic monitoring
- Error tracking and alerting

See our [Operations Guide](./operations-guide.md) for detailed monitoring setup.

## 🤝 Getting Help

Stuck? Here are the best places to get help:

1. **Check our docs**: Browse the [documentation index](./README.md)
2. **Search issues**: Look through [GitHub issues](https://github.com/willwillis/fast-api-scripture-app/issues)
3. **Ask a question**: Create a new issue with the "question" label
4. **Review existing code**: Look at similar features in the codebase

## 📚 Next Steps & Learning Resources

### For Backend Development
- 📖 Read [API Standards](./api-standards.md) - Learn our API design principles
- 🔍 Browse `backend/app/routes/scriptures.py` - See how endpoints are built
- 🧪 Check `backend/tests/test_api.py` - See how we test APIs
- 📚 [FastAPI Documentation](https://fastapi.tiangolo.com/)
- 📚 [Pydantic Documentation](https://pydantic.dev/)

### For Frontend Development
- 🎨 Examine `frontend/src/components/` - See our React components
- 🪝 Study `frontend/src/hooks/useScriptures.ts` - Learn our data fetching
- 📱 Review the Tailwind config - Understand our theming
- 📚 [React Documentation](https://react.dev/)
- 📚 [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- 📚 [Vite Documentation](https://vitejs.dev/)

### For DevOps/Deployment
- 🚀 Read [Deployment Guide](./deployment.md) - Learn how we deploy
- 📊 Check [Operations Guide](./operations-guide.md) - See our monitoring and SRE practices

### For Testing
- 📚 [pytest Documentation](https://docs.pytest.org/)
- 📚 [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- 📚 [Vitest Documentation](https://vitest.dev/)

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

**Quick Links:** [Documentation Index](./README.md) | [API Standards](./api-standards.md) | [Operations Guide](./operations-guide.md) | [Main README](../README.md)
