# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-19

### Added
- Complete scripture reading functionality with navigation tree
- Advanced search with volume filtering and term highlighting
- Random scripture generator
- Responsive design optimized for mobile and desktop
- Fast navigation with Previous/Next chapter buttons
- LDS volume toggle (OT/NT vs All volumes)
- API documentation access via [API] button
- Auto-scroll to content on mobile devices
- Search results with volume-based filtering
- Clean, modern UI with Cursor theme styling

### Technical Features
- FastAPI backend with SQLite database
- React frontend with TypeScript
- Responsive Tailwind CSS styling
- Search term highlighting in results
- Volume-based search filtering
- Mobile-first responsive design
- Deployed and ready to use on Render

### Fixed
- Mobile responsiveness issues in header, search form, and results
- Navigation button functionality and state management
- CORS configuration for proper frontend-backend communication
- Database path resolution for deployment

---

## [1.1.0] - 2025-01-05

### Added
- LDS volume control for random scripture endpoint (`include_lds` parameter)
- Smart defaults for random scripture (OT/NT only by default)
- Separate loading states for random and search functionality
- Custom book-themed favicon with lightning bolt design
- Enhanced mobile experience with optimized spacing

### Changed
- Random scripture now defaults to non-LDS volumes (OT/NT only)
- Frontend random scripture calls now include LDS content by default
- Removed borders around chapter contents for better text visibility
- Improved loading state management for better user feedback

### Technical Improvements
- Enhanced database service with volume filtering for random scriptures
- New optional `include_lds` query parameter on `/api/scriptures/random` endpoint
- Updated API documentation to reflect new parameters
- Improved TypeScript integration with new API parameters
- Better error handling for random scripture requests

### Fixed
- Loading state conflicts between random and search operations
- Mobile screen space utilization for better content visibility
- API backward compatibility maintained

---

## [1.2.0] - 2025-01-05

### Added
- New Relic Application Performance Monitoring (APM) for FastAPI backend
- New Relic Real User Monitoring (RUM) for React frontend
- Distributed tracing across frontend and backend
- Comprehensive error tracking and monitoring
- Synthetic monitoring with GitHub Actions (15-minute intervals)
- Enhanced health check endpoint with database warm-up
- Custom metrics for scripture usage patterns and user behavior
- Performance monitoring for API response times and database queries

### Technical Improvements
- Updated Python package management to use `uv` instead of `pip`
- Added `newrelic>=10.15.0` dependency with explicit initialization
- New Relic Browser agent integration in frontend
- Environment variable configuration for New Relic monitoring
- Automated monitoring with warm-up strategy for Render cold starts
- Enhanced observability with business intelligence metrics

### Monitoring Features
- Backend APM with response time tracking (p50, p95, p99)
- Frontend RUM with Core Web Vitals monitoring
- Database performance and connection health monitoring
- User interaction and feature usage tracking
- Error rate monitoring and alerting capabilities
- Cold start detection and performance impact analysis

### Fixed
- Render cold start performance issues with warm-up strategy
- Database connection reliability with enhanced health checks
- Package management consistency with `uv` integration

---

## [1.3.0] - 2025-01-25

### Added
- Comprehensive testing infrastructure with Vitest (frontend) and Pytest (backend)
- DSLC (Development, Security, and Lifecycle) paradigm implementation
- CI/CD pipeline with automated testing across Python 3.9-3.12
- Modern ESLint flat config with TypeScript 5.3.3 support
- Automated code quality gates (Black, isort, Flake8)
- Security scanning with Bandit and npm audit
- Test coverage reporting with v8 provider (frontend) and XML (backend)
- Submodule support in CI for database access
- Automated database setup in CI environment

### Technical Improvements
- Migrated from `.eslintrc.json` to modern `eslint.config.js` flat config
- Updated TypeScript to version 5.3.3 for better ESLint compatibility
- Enhanced CI/CD pipeline with quality gates and parallel testing
- Comprehensive test suite with 14 backend test cases
- React Testing Library integration for user-centric frontend testing
- Async testing support for FastAPI endpoints
- Real database integration in CI environment
- Pre-commit hooks with automated quality checks

### Testing Features
- Frontend component testing with Vitest and React Testing Library
- Backend API endpoint testing with real SQLite database
- Error scenario and edge case testing
- Performance and response time validation
- Health check and connectivity testing
- Multi-environment testing across Python versions
- Automated coverage reporting and quality metrics

### DSLC Implementation
- Standardized development workflow with automated quality enforcement
- Security scanning and vulnerability detection
- Lifecycle management with semantic versioning
- Quality gates and automated enforcement in CI/CD
- Comprehensive documentation and knowledge sharing
- Monitoring and observability integration

### Fixed
- CI/CD pipeline failures due to missing database file
- ESLint configuration conflicts between Black and isort
- Submodule checkout issues in GitHub Actions
- TypeScript version compatibility with ESLint
- Import sorting and code formatting consistency

---

## [Unreleased]

### Planned Features
- Swipe gestures for mobile chapter navigation
- Bookmarking functionality
- Reading progress tracking
- Dark/light theme toggle
- Offline reading capabilities
- End-to-end testing with Playwright or Cypress
- Performance testing and load testing
- Visual regression testing
- Advanced accessibility testing
