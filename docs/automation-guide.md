# Makefiles Guide

## 🎯 Overview

This project uses **Makefiles** to standardize and simplify development workflows. Instead of remembering complex commands, you can use simple `make` commands that work consistently across your team and CI/CD pipeline.

## 📁 Makefile Structure

The project has **3 Makefiles** that work together:

```
fast-scriptures/
├── Makefile              # Root orchestrator
├── backend/Makefile      # Python/FastAPI tasks
└── frontend/Makefile     # React/TypeScript tasks
```

## 🚀 Root Makefile (`/Makefile`)

The root Makefile is your **"command center"** - it coordinates both frontend and backend operations.

### **Quick Start Commands**

```bash
make help          # Show all available commands
make install       # Install all dependencies
make dev           # Start both development servers
make test          # Run all tests
make quality       # Run all quality checks
make clean         # Clean all build artifacts
```

### **Available Commands**

| Command | Description | What it does |
|---------|-------------|--------------|
| `make help` | Show all commands | Displays colored help with descriptions |
| `make install` | Install dependencies | Runs `uv sync` + `npm install` |
| `make dev` | Start development | Starts backend (8000) + frontend (5173) |
| `make test` | Run all tests | Runs pytest + vitest |
| `make test-coverage` | Run tests with coverage | Generates coverage reports |
| `make quality` | Run quality checks | Linting, formatting, security |
| `make build` | Build for production | Creates production build |
| `make clean` | Clean artifacts | Removes cache and build files |
| `make setup` | Complete setup | Install + helpful messages |
| `make prod-prep` | Production prep | Build + deployment instructions |

### **Individual Component Commands**

```bash
# Backend only
make install-backend
make dev-backend
make test-backend
make quality-backend
make clean-backend

# Frontend only
make install-frontend
make dev-frontend
make test-frontend
make quality-frontend
make clean-frontend
```

## 🔧 Backend Makefile (`/backend/Makefile`)

Handles **Python/FastAPI** specific development tasks.

### **Development Commands**

```bash
make dev              # Start FastAPI with hot reload
make start            # Start production server
make test             # Run pytest
make test-coverage    # Run tests with coverage
make test-watch       # Run tests in watch mode
```

### **Code Quality Commands**

```bash
make format           # Format code with black
make format-check     # Check formatting (CI)
make lint             # Run flake8 linter
make typecheck        # Run mypy type checker
make security         # Run bandit security scan
make sort             # Sort imports with isort
make sort-check       # Check import sorting (CI)
```

### **Quality Workflows**

```bash
make quality          # Run all quality checks + fix issues
make quality-check    # Run all quality checks (read-only)
make test-full        # Quality checks + tests + coverage
```

### **Pre-commit Integration**

```bash
make pre-commit-install    # Install pre-commit hooks
make pre-commit-run        # Run on all files
make pre-commit-update     # Update hooks
```

## ⚛️ Frontend Makefile (`/frontend/Makefile`)

Handles **React/TypeScript** specific development tasks.

### **Development Commands**

```bash
make dev              # Start Vite dev server
make build            # Build for production
make preview          # Preview production build
make test             # Run Vitest tests
make test-coverage    # Run tests with coverage
make test-watch       # Run tests in watch mode
```

### **Code Quality Commands**

```bash
make lint             # Run ESLint
make lint-fix         # Fix ESLint issues
make typecheck        # Run TypeScript checker
make format           # Format with Prettier
make format-check     # Check formatting (CI)
```

### **Installation Commands**

```bash
make install          # Install all dependencies
make install-prod     # Install production only
```

### **Quality Workflows**

```bash
make quality          # Run all quality checks + fix issues
make quality-check    # Run all quality checks (read-only)
make test-full        # Quality checks + tests + coverage
```

## 🎯 Common Development Workflows

### **Daily Development**

```bash
# Start development
make dev

# In another terminal, run tests
make test

# Check code quality
make quality
```

### **Before Committing**

```bash
# Ensure code meets standards
make quality

# Run all tests
make test

# Check for security issues
cd backend && make security
cd frontend && npm audit
```

### **CI/CD Integration**

Your GitHub Actions use the same commands:

```yaml
- name: Run backend tests
  run: make test-backend

- name: Run frontend tests
  run: make test-frontend

- name: Quality checks
  run: make quality
```

### **Production Deployment**

```bash
# Build for production
make build

# Clean old artifacts
make clean

# Install production dependencies
make install
```

## 🔍 How It Works

### **Command Delegation**

The root Makefile **delegates** to specific Makefiles:

```makefile
test-backend: ## Run backend tests
	cd backend && make test
```

When you run `make test-backend`:
1. Changes to `backend/` directory
2. Runs `make test` in backend Makefile
3. Which runs `uv run pytest`

### **Help System**

All Makefiles include a help system. Run `make help` in any directory:

```bash
# Root level
make help

# Backend specific
cd backend && make help

# Frontend specific
cd frontend && make help
```

### **Cross-Platform Compatibility**

Makefiles work on:
- ✅ **Linux** (Ubuntu, CentOS, etc.)
- ✅ **macOS** (with built-in make)
- ✅ **Windows** (with WSL, Git Bash, or MinGW)

## 🚀 Benefits

### **For Developers**

- **Faster Development**: No need to remember complex commands
- **Fewer Mistakes**: Standardized workflows
- **Better Onboarding**: New developers can just run `make help`
- **Consistent Environment**: Same commands work everywhere

### **For Teams**

- **Standardized Workflows**: Everyone uses the same commands
- **Reduced Friction**: No "it works on my machine" issues
- **Professional Practices**: Enterprise-grade development workflow
- **Clear Documentation**: Commands are self-documenting

### **For CI/CD**

- **Reliable Automation**: Same commands locally and in CI
- **Easy Maintenance**: Update commands in one place
- **Clear Integration**: Commands map directly to CI steps

## 🛠️ Customization

### **Adding New Commands**

To add a new command to the root Makefile:

```makefile
new-task: ## Description of what this does
	@echo "Running new task..."
	cd backend && make some-backend-task
	cd frontend && make some-frontend-task
```

### **Environment Variables**

You can use environment variables in Makefiles:

```makefile
dev-backend: ## Start backend development server
	cd backend && PORT=${PORT:-8000} make dev
```

### **Conditional Commands**

```makefile
test-backend: ## Run backend tests
	cd backend && make test
	@if [ "$(COVERAGE)" = "true" ]; then \
		cd backend && make test-coverage; \
	fi
```

## 📋 Best Practices

### **Command Naming**

- Use **descriptive names**: `test-coverage` not `tc`
- Use **hyphens for separation**: `test-backend` not `test_backend`
- Use **consistent patterns**: All test commands start with `test-`

### **Documentation**

- Always include **descriptions** with `##`
- Use **clear, concise language**
- Include **examples** in help text

### **Error Handling**

```makefile
test-backend: ## Run backend tests
	cd backend && make test || (echo "Backend tests failed" && exit 1)
```

### **Performance**

- Use **parallel execution** where possible
- **Cache results** when appropriate
- **Minimize dependencies** between commands

## 🔧 Troubleshooting

### **Common Issues**

**Command not found:**
```bash
# Ensure you're in the right directory
pwd
ls Makefile

# Check if make is installed
make --version
```

**Permission denied:**
```bash
# Make sure files are executable
chmod +x scripts/*.sh
```

**Different behavior on different systems:**
```bash
# Use explicit paths
cd backend && /usr/bin/python3 -m pytest
```

### **Debugging Makefiles**

```bash
# Run with verbose output
make -d dev

# Show what would be executed
make -n dev

# Debug specific target
make --debug=b dev
```

## 📚 Related Documentation

- [Development Workflow](./development-workflow.md) - Overall development process
- [API Standards](./api-standards.md) - Backend API guidelines
- [Deployment Guide](./deployment.md) - Production deployment
- [Testing Strategy](./development-workflow.md#testing-strategy) - Testing approach

## 🎯 Quick Reference

### **Essential Commands**

```bash
make help          # See all commands
make install       # Install dependencies
make dev           # Start development
make test          # Run tests
make quality       # Quality checks
make build         # Build for production
make clean         # Clean artifacts
```

### **Development Workflow**

```bash
# 1. Setup
make install

# 2. Development
make dev

# 3. Testing
make test

# 4. Quality
make quality

# 5. Build
make build
```

The Makefiles essentially turn your complex development workflow into simple, memorable commands that work consistently across your entire team and CI/CD pipeline!
