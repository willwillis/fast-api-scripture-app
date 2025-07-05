# Deployment Guide - Fast Scriptures

This project uses Render for both frontend and backend deployment with GitHub Actions for automated deployments.

## 🎯 Deployment Strategy

### **Platform**: Render (Exclusive)
- **Backend**: FastAPI Web Service with SQLite
- **Frontend**: Static Site hosting
- **Database**: SQLite (embedded, no persistence needed)
- **CI/CD**: GitHub Actions

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
- **Build Command**: `cd backend && uv sync`
- **Start Command**: `cd backend && uv run uvicorn app.main:app --host 0.0.0.0 --port $PORT`
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

## 🔧 GitHub Actions Setup

### **Workflow Files**:
- `.github/workflows/deploy.yml` - Unified deployment workflow
- `.github/workflows/frontend-deploy.yml` - Frontend-only deployment (legacy)
- `.github/workflows/backend-deploy.yml` - Backend-only deployment (legacy)

### **Deployment Logic**:
1. **Backend deploys first** (if backend/submodules changed)
2. **Frontend deploys second** (if frontend changed)
3. **Conditional deployment** (only deploys what changed)
4. **Includes submodules** (for SQLite database)

### **Required GitHub Secrets**:

```bash
# Render API Token (get from Render dashboard)
RENDER_TOKEN=your_render_api_token

# Backend Service ID (get from Render service URL)
RENDER_BACKEND_SERVICE_ID=your_backend_service_id

# Frontend Service ID (get from Render service URL)
RENDER_FRONTEND_SERVICE_ID=your_frontend_service_id

# Backend API URL for frontend
VITE_API_URL=https://your-backend-service.onrender.com
```

## 🚀 Setup Instructions

### **Step 1: Create Render Services**

1. **Backend Service**:
   - Go to Render Dashboard
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Set build command: `cd backend && uv sync`
   - Set start command: `cd backend && uv run uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Add environment variable: `RENDER=true`

2. **Frontend Service**:
   - Go to Render Dashboard
   - Click "New +" → "Static Site"
   - Connect your GitHub repository
   - Set build command: `cd frontend && npm ci && npm run build`
   - Set publish directory: `frontend/dist`
   - Add environment variable: `VITE_API_URL=https://your-backend-service.onrender.com`

### **Step 2: Get Service IDs**

1. Go to each service in Render Dashboard
2. Copy the service ID from the URL: `https://dashboard.render.com/web/srv-XXXXXXXXXXXXXX`
3. The service ID is the `srv-XXXXXXXXXXXXXX` part

### **Step 3: Get Render API Token**

1. Go to Render Dashboard → Account Settings
2. Scroll to "API Keys"
3. Create a new API key
4. Copy the token

### **Step 4: Configure GitHub Secrets**

1. Go to your GitHub repository → Settings → Secrets and variables → Actions
2. Add the following secrets:
   - `RENDER_TOKEN`
   - `RENDER_BACKEND_SERVICE_ID`
   - `RENDER_FRONTEND_SERVICE_ID`
   - `VITE_API_URL`

### **Step 5: Test Deployment**

1. Push changes to `main` branch
2. Check GitHub Actions tab for deployment status
3. Verify both services are running on Render

## 🔄 Deployment Flow

### **Automatic Deployment**:
1. **Push to main branch** → Triggers GitHub Actions
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

### **GitHub Actions**:
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

### **Logs**:
- Backend logs: Render Dashboard → Service → Logs
- Frontend build logs: GitHub Actions → Workflow runs
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