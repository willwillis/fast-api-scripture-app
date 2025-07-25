.PHONY: help dev start test test-coverage test-watch format format-check lint typecheck security sort sort-check quality quality-check test-full pre-commit-install pre-commit-run pre-commit-update

help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

dev: ## Start development server
	uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

start: ## Start production server
	uv run uvicorn app.main:app --host 0.0.0.0 --port 8000

test: ## Run tests
	uv run pytest

test-coverage: ## Run tests with coverage
	uv run pytest --cov=app --cov-report=term-missing --cov-report=html --cov-report=xml

test-watch: ## Run tests in watch mode
	uv run pytest --watch

format: ## Format code with black
	uv run black .

format-check: ## Check code formatting
	uv run black --check .

lint: ## Run flake8 linter
	uv run flake8 .

typecheck: ## Run mypy type checker
	uv run mypy .

security: ## Run bandit security checker
	uv run bandit -r .

sort: ## Sort imports with isort
	uv run isort .

sort-check: ## Check import sorting
	uv run isort --check-only .

quality: ## Run all quality checks and fix issues
	uv run black . && uv run isort . && uv run flake8 . && uv run mypy . && uv run bandit -r .

quality-check: ## Run all quality checks (read-only)
	uv run black --check . && uv run isort --check-only . && uv run flake8 . && uv run mypy . && uv run bandit -r .

test-full: ## Run quality checks and tests with coverage
	uv run black --check . && uv run isort --check-only . && uv run flake8 . && uv run mypy . && uv run bandit -r . && uv run pytest --cov=app --cov-report=term-missing --cov-report=html --cov-report=xml

pre-commit-install: ## Install pre-commit hooks
	uv run pre-commit install

pre-commit-run: ## Run pre-commit on all files
	uv run pre-commit run --all-files

pre-commit-update: ## Update pre-commit hooks
	uv run pre-commit autoupdate
