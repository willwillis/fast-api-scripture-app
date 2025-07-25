.PHONY: help dev build preview test test-coverage test-watch lint lint-fix typecheck format format-check clean install install-prod

help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

dev: ## Start development server
	npm run dev

build: ## Build for production
	npm run build

preview: ## Preview production build
	npm run preview

test: ## Run tests
	npm run test

test-coverage: ## Run tests with coverage
	npm run test:coverage

test-watch: ## Run tests in watch mode
	npm run test:watch

lint: ## Run ESLint
	npm run lint

lint-fix: ## Fix ESLint issues
	npm run lint:fix

typecheck: ## Run TypeScript type checker
	npm run typecheck

format: ## Format code with Prettier
	npm run format

format-check: ## Check code formatting
	npm run format:check

clean: ## Clean build artifacts
	rm -rf dist node_modules/.vite

install: ## Install dependencies
	npm install

install-prod: ## Install production dependencies only
	npm ci --only=production

# Combined quality checks
quality: ## Run all quality checks and fix issues
	npm run format && npm run lint:fix && npm run typecheck

quality-check: ## Run all quality checks (read-only)
	npm run format:check && npm run lint && npm run typecheck

# Full test suite
test-full: ## Run quality checks and tests with coverage
	npm run format:check && npm run lint && npm run typecheck && npm run test:coverage
