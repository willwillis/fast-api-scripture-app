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

## [Unreleased]

### Planned Features
- Swipe gestures for mobile chapter navigation
- Bookmarking functionality
- Reading progress tracking
- Dark/light theme toggle
- Offline reading capabilities 