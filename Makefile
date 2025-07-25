.PHONY: help install install-backend install-frontend dev dev-backend dev-frontend test test-backend test-frontend test-coverage test-coverage-backend test-coverage-frontend build build-frontend quality quality-backend quality-frontend clean clean-backend clean-frontend

help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# Installation
install: install-backend install-frontend ## Install all dependencies
install-backend: ## Install backend dependencies
	cd backend && uv sync
install-frontend: ## Install frontend dependencies
	cd frontend && npm install

# Development servers
dev: ## Start both development servers (backend + frontend)
	@echo "Starting backend and frontend development servers..."
	@echo "Backend will be available at http://localhost:8000"
	@echo "Frontend will be available at http://localhost:5173"
	@make dev-backend & make dev-frontend
dev-backend: ## Start backend development server
	cd backend && make dev
dev-frontend: ## Start frontend development server
	cd frontend && make dev

# Testing
test: test-backend test-frontend ## Run all tests
test-backend: ## Run backend tests
	cd backend && make test
test-frontend: ## Run frontend tests
	cd frontend && make test
test-coverage: test-coverage-backend test-coverage-frontend ## Run all tests with coverage
test-coverage-backend: ## Run backend tests with coverage
	cd backend && make test-coverage
test-coverage-frontend: ## Run frontend tests with coverage
	cd frontend && make test-coverage

# Building
build: build-frontend ## Build all components
build-frontend: ## Build frontend for production
	cd frontend && make build

# Code quality
quality: quality-backend quality-frontend ## Run all quality checks
quality-backend: ## Run backend quality checks
	cd backend && make quality
quality-frontend: ## Run frontend quality checks
	cd frontend && make quality

# Cleaning
clean: clean-backend clean-frontend ## Clean all build artifacts
clean-backend: ## Clean backend build artifacts
	cd backend && find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	cd backend && find . -type f -name "*.pyc" -delete 2>/dev/null || true
	cd backend && rm -rf .pytest_cache htmlcov coverage.xml 2>/dev/null || true
clean-frontend: ## Clean frontend build artifacts
	cd frontend && make clean

# Full development workflow
setup: install ## Complete project setup
	@echo "Project setup complete!"
	@echo "Run 'make dev' to start development servers"
	@echo "Run 'make test' to run all tests"
	@echo "Run 'make quality' to run all quality checks"

# Production preparation
prod-prep: build ## Prepare for production deployment
	@echo "Production build complete!"
	@echo "Backend: cd backend && make start"
	@echo "Frontend: Serve the dist/ directory from frontend/"
