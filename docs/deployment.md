# Deployment Guide - Fast Scriptures

This project uses Render for both frontend and backend deployment with automatic deployments on code pushes.

## 🎯 Deployment Strategy

### **Platform**: Render (Exclusive)
- **Backend**: FastAPI Web Service with SQLite
- **Frontend**: Static Site hosting
- **Database**: SQLite (embedded, no persistence needed)
- **CI/CD**: Render Auto-Deploy

### **Why Render-Only?**
- ✅ **Single platform**: Everything in one place
- ✅ **Free tier**: 750 hours/month for both services
- ✅ **Ephemeral storage**: Perfect for static scripture data
- ✅ **Simple setup**: One set of credentials
- ✅ **GitHub integration**: Automatic deployments

## 📋 Render Service Setup

### **1. Backend Service (FastAPI)**

**Service Type**: Web Service

**Configuration**:
- **Build Command**: `uv sync && python setup_database.py`
- **Start Command**: `uv run uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- **Environment Variables**:
  - `RENDER=true`
  - `PYTHON_VERSION=3.11`

**Features**:
- SQLite database embedded in deployment
- Ephemeral storage (resets on each deployment)
- Automatic restarts on code changes

### **2. Frontend Service (React)**

**Service Type**: Static Site

**Configuration**:
- **Build Command**: `cd frontend && npm ci && npm run build`
- **Publish Directory**: `frontend/dist`
- **Environment Variables**:
  - `VITE_API_URL=https://your-backend-service.onrender.com`

**Features**:
- Built React app served as static files
- Global CDN distribution
- Automatic rebuilds on code changes

## 🔧 Render Auto-Deployment

### **Deployment Process**:
- **Automatic**: Render detects code pushes and deploys automatically
- **No Configuration**: No GitHub Actions or secrets needed
- **Simple**: Just push to main branch and Render handles the rest
- **Includes Submodules**: SQLite database is automatically included

## 🚀 Setup Instructions

### **Step 1: Create Render Services**

1. **Backend Service**:
   - Go to Render Dashboard
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Set build command: `uv sync && python setup_database.py`
   - Set start command: `uv run uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Add environment variable: `RENDER=true`

2. **Frontend Service**:
   - Go to Render Dashboard
   - Click "New +" → "Static Site"
   - Connect your GitHub repository
   - Set build command: `npm ci && npm run build`
   - Set publish directory: `dist`
   - Add environment variable: `VITE_API_URL=https://your-backend-service.onrender.com`

### **Step 2: Configure CORS**

1. **Get your frontend domain** from Render Dashboard (e.g., `https://your-app-name.onrender.com`)
2. **Update CORS configuration** in `backend/app/utils/config.py`:
   ```python
   CORS_ORIGINS = [
       "http://localhost:5173",  # Vite dev server
       "http://localhost:3000",  # Alternative dev port
       "http://127.0.0.1:5173",
       "http://127.0.0.1:3000",
       "https://your-frontend-domain.onrender.com",  # Add your frontend domain here
   ]
   ```
3. **Commit and push** the changes to trigger a new backend deployment

### **Step 3: Test Deployment**

1. Push changes to `main` branch
2. Check Render Dashboard for deployment status
3. Verify both services are running on Render
4. Test the frontend to ensure it can call the backend API

## 🔄 Deployment Flow

### **Automatic Deployment**:
1. **Push to main branch** → Render detects changes
2. **Backend deploys** → FastAPI service updates
3. **Frontend deploys** → React app rebuilds with new API URL
4. **Services restart** → New code is live

### **Manual Deployment**:
- Backend: Push changes to `backend/` or `submodules/`
- Frontend: Push changes to `frontend/`
- Both: Push changes to root files

## 📊 Monitoring

### **Render Dashboard**:
- Service status and logs
- Build history
- Environment variables
- Custom domains

### **Render Dashboard**:
- Deployment status
- Build logs
- Error tracking

## 🛠️ Troubleshooting

### **Common Issues**:

1. **Backend won't start**:
   - Check `uvicorn` is in requirements
   - Verify `$PORT` environment variable
   - Check SQLite database path

2. **Frontend build fails**:
   - Check Node.js version compatibility
   - Verify all dependencies in `package.json`
   - Check `VITE_API_URL` is set correctly

3. **API calls fail**:
   - Verify `VITE_API_URL` points to correct backend
   - Check CORS configuration in backend
   - Ensure backend service is running

4. **CORS errors**:
   - Verify frontend domain is in `CORS_ORIGINS` list
   - Check browser console for specific CORS error messages
   - Ensure backend has been redeployed after CORS changes
   - Test API endpoint directly to confirm it's working

### **Logs**:
- Backend logs: Render Dashboard → Service → Logs
- Frontend build logs: Render Dashboard → Frontend service
- API errors: Backend service logs

## 💰 Cost Considerations

### **Free Tier Limits**:
- **750 hours/month** (enough for 24/7 for one service)
- **Shared CPU** (sufficient for scripture reading app)
- **Ephemeral storage** (perfect for static data)

### **Upgrade Options**:
- **$7/month**: Dedicated CPU + persistent disk
- **$25/month**: Professional plan with more resources
- **Custom domains**: Free with any plan

## 🔒 Security

### **Environment Variables**:
- Never commit secrets to Git
- Use GitHub Secrets for sensitive data
- Rotate API tokens regularly

### **CORS Configuration**:
- Backend configured for frontend domain
- **Important**: After deploying your frontend, update `backend/app/utils/config.py` to add your frontend domain to `CORS_ORIGINS`:
  ```python
  CORS_ORIGINS = [
      "http://localhost:5173",  # Vite dev server
      "http://localhost:3000",  # Alternative dev port
      "http://127.0.0.1:5173",
      "http://127.0.0.1:3000",
      "https://your-frontend-domain.onrender.com",  # Add your frontend domain here
  ]
  ```
- Commit and push the changes to trigger a new backend deployment
- Add production domains to CORS origins
- Restrict to specific domains in production

## 📈 Scaling

### **When to Upgrade**:
- High traffic (>1000 requests/minute)
- Need persistent storage
- Custom domain requirements
- Advanced monitoring needs

### **Migration Path**:
- Start with free tier
- Upgrade individual services as needed
- Add custom domains when ready
- Consider CDN for global distribution
