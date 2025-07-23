# Version 1.1.0 - Enhanced Random Scripture & UI Improvements

## 🎯 New Features

### Random Scripture Enhancement
* **LDS Volume Control**: Added `include_lds` parameter to random scripture endpoint
* **Smart Defaults**: Random scripture now defaults to OT/NT only (non-LDS volumes)
* **Flexible API**: Backend supports `include_lds=true` to include all volumes (BoM, D&C, PGP)
* **Frontend Integration**: Frontend now includes LDS content by default for random scriptures

## 🎨 UI/UX Improvements

### Loading States
* **Separate Loading States**: Random and Search now have independent loading indicators
* **Better User Feedback**: Improved loading state management for better user experience
* **Performance Optimization**: Isolated loading states prevent UI conflicts

### Visual Enhancements
* **Cleaner Chapter Display**: Removed borders around chapter contents for more text visibility
* **Updated Screenshots**: Added comprehensive application screenshots to README
* **Custom Favicon**: New book-themed favicon with lightning bolt design

### Mobile Experience
* **More Content**: Optimized spacing to show more scripture text on mobile screens
* **Better Navigation**: Improved chapter navigation with Previous/Next buttons

## 🔧 Technical Improvements

### Backend Enhancements
* **Database Service**: Enhanced `get_random_scripture()` with volume filtering
* **API Flexibility**: New query parameter support for LDS content control
* **Backward Compatibility**: Maintains existing API behavior while adding new features

### Frontend Updates
* **API Integration**: Updated frontend to use new `include_lds` parameter
* **Type Safety**: Improved TypeScript integration with new API parameters
* **Error Handling**: Better error handling for random scripture requests

## 📱 Responsive Design
* **Mobile-First**: Continued focus on mobile usability
* **Screen Optimization**: Better use of available screen space
* **Touch-Friendly**: Improved touch targets and navigation

## 🚀 Deployment Ready
* **Production Ready**: All changes tested and ready for deployment
* **API Documentation**: Updated API docs reflect new parameters
* **Performance**: Maintained fast loading times with new features

---

## Breaking Changes
* None - all changes are backward compatible

## Migration Notes
* Existing API calls will continue to work as before
* New `include_lds` parameter is optional and defaults to `false`
* Frontend behavior changed to include LDS content by default for random scriptures

## Technical Details
* **Database**: Enhanced random scripture queries with volume filtering
* **API**: New optional `include_lds` query parameter on `/api/scriptures/random`
* **Frontend**: Updated API service calls to include LDS content by default 