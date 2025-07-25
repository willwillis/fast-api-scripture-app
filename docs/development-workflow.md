# Development Workflow Guide

## 🚀 **Getting Started**

### **Prerequisites**
- Python 3.9+ with `uv`
- Node.js 18+ with `npm`
- Git with proper configuration
- IDE with Python/TypeScript support

### **Initial Setup**
```bash
# Clone repository
git clone <repository-url>
cd fast-scriptures

# Backend setup
cd backend
uv sync
uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Frontend setup (new terminal)
cd frontend
npm install
npm run dev
```

## 🔄 **Development Workflow**

### **1. Feature Development**
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
# Run tests
cd backend && uv run pytest
cd frontend && npm run test

# Commit changes
git add .
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/new-feature
```

### **2. Code Quality Checks**
```bash
# Backend
cd backend
uv run black app tests
uv run isort app tests
uv run flake8 app tests
uv run mypy app

# Frontend
cd frontend
npm run lint
npm run test
npx tsc --noEmit
```

### **3. Pre-commit Hooks**
```bash
# Install pre-commit hooks
cd backend
uv run pre-commit install

# Run manually
uv run pre-commit run --all-files
```

## 📋 **Commit Message Standards**

### **Conventional Commits**
```
type(scope): description

[optional body]

[optional footer]
```

### **Types**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test additions/changes
- `chore`: Build/tooling changes

### **Examples**
```
feat(api): add user authentication endpoints
fix(frontend): resolve search input validation issue
docs(readme): update deployment instructions
test(backend): add comprehensive API tests
```

## 🧪 **Testing Strategy**

### **Backend Testing**
```bash
# Run all tests
uv run pytest

# Run with coverage
uv run pytest --cov=app --cov-report=html

# Run specific test
uv run pytest tests/test_api.py::TestScriptureEndpoints::test_get_volumes

# Run integration tests
uv run pytest -m integration
```

### **Frontend Testing**
```bash
# Run all tests
npm run test

# Run with coverage
npm run test:coverage

# Run tests in watch mode
npm run test -- --watch

# Run specific test file
npm run test -- App.test.tsx
```

### **E2E Testing**
```bash
# Run monitoring script
python scripts/monitor.py --url http://localhost:8000

# Test production endpoints
python scripts/monitor.py --url https://your-api.onrender.com
```

## 🔍 **Code Review Process**

### **Pull Request Checklist**
- [ ] Tests pass locally
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] No security vulnerabilities
- [ ] Performance impact considered
- [ ] Backward compatibility maintained

### **Review Guidelines**
- Focus on logic and architecture
- Check for security issues
- Verify error handling
- Ensure proper testing
- Review documentation updates

## 🚀 **Deployment Process**

### **Staging Deployment**
```bash
# Create staging branch
git checkout -b staging/v1.2.1

# Test locally
cd backend && uv run pytest
cd frontend && npm run test && npm run build

# Push to staging
git push origin staging/v1.2.1
```

### **Production Deployment**
```bash
# Merge to main
git checkout main
git merge staging/v1.2.1

# Create release tag
git tag -a v1.2.1 -m "Release v1.2.1"
git push origin v1.2.1

# Push to main (triggers Render deployment)
git push origin main
```

## 🔧 **Development Tools**

### **Recommended Extensions**
- **VS Code**: Python, TypeScript, ESLint, Prettier
- **PyCharm**: Python development
- **WebStorm**: JavaScript/TypeScript development

### **Useful Commands**
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

## 🐛 **Debugging**

### **Backend Debugging**
```bash
# Run with debug logging
DEBUG=true uv run uvicorn app.main:app --reload

# Use Python debugger
import pdb; pdb.set_trace()

# Check logs
tail -f backend/logs/app.log
```

### **Frontend Debugging**
```bash
# Browser developer tools
# React Developer Tools extension
# Network tab for API calls
# Console for errors
```

## 📊 **Performance Monitoring**

### **Local Performance Testing**
```bash
# Backend performance
uv run pytest tests/test_performance.py

# Frontend bundle analysis
npm run build
npx vite-bundle-analyzer dist

# API response times
python scripts/monitor.py --url http://localhost:8000
```

### **Production Monitoring**
- New Relic APM dashboard
- Render service logs
- GitHub Actions synthetic monitoring
- Error tracking and alerting

## 🔒 **Security Best Practices**

### **Code Security**
- Never commit secrets
- Use environment variables
- Validate all inputs
- Sanitize database queries
- Keep dependencies updated

### **Security Scanning**
```bash
# Backend security scan
uv run bandit -r app/

# Frontend security audit
npm audit
npm audit fix
```

## 📚 **Learning Resources**

### **Backend**
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Pydantic Documentation](https://pydantic.dev/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)

### **Frontend**
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)

### **Testing**
- [pytest Documentation](https://docs.pytest.org/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Vitest Documentation](https://vitest.dev/)
