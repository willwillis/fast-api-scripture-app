# Monitoring Setup Guide

This guide covers the monitoring and observability setup for the Scripture App, including synthetic monitoring with warm-up strategies for cold starts.

## 🔧 **Components**

### **1. Enhanced Health Check Endpoint**
- **Location**: `backend/app/main.py`
- **Endpoint**: `/health`
- **Features**:
  - Database connection warm-up
  - Volume count verification
  - Warm-up status reporting
  - Detailed health information

### **2. GitHub Actions Synthetic Monitoring**
- **Location**: `.github/workflows/synthetic-monitoring.yml`
- **Schedule**: Every 15 minutes
- **Features**:
  - 5-minute warm-up period
  - Core endpoint testing
  - Performance metrics collection
  - Response validation
  - Manual trigger support

### **3. Local Monitoring Script**
- **Location**: `scripts/monitor.py`
- **Features**:
  - Local testing capabilities
  - Configurable warm-up time
  - Performance metrics
  - JSON output support
  - Command-line interface

## 🚀 **Quick Start**

### **Local Testing**

1. **Start the backend server**:
   ```bash
   cd backend
   uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

2. **Run the monitoring script**:
   ```bash
   # Basic monitoring with 5-minute warm-up
   python scripts/monitor.py

   # Test without warm-up
   python scripts/monitor.py --warm-up false

   # Custom warm-up time (2 minutes)
   python scripts/monitor.py --wait 2

   # Test against production URL
   python scripts/monitor.py --url https://scriptures-fast-api.onrender.com

   # Save results to file
   python scripts/monitor.py --output results.json
   ```

### **GitHub Actions Setup**

1. **Update the API URL** in `.github/workflows/synthetic-monitoring.yml`:
   ```yaml
   echo "API_URL=https://scriptures-fast-api.onrender.com" >> $GITHUB_ENV
   ```

2. **Enable GitHub Actions** in your repository settings

3. **Monitor the workflow**:
   - Go to Actions tab in GitHub
   - Check "Synthetic Monitoring" workflow
   - Runs every 15 minutes automatically

## 📊 **Monitoring Features**

### **Health Check Response**
```json
{
  "status": "healthy",
  "warmed_up": true,
  "database": "connected",
  "volumes_count": 5,
  "timestamp": "2025-01-05T00:00:00Z"
}
```

### **Performance Metrics**
- Response time tracking
- Database connection status
- Volume count verification
- Error rate monitoring

### **Alerting**
- Health check failures
- Slow response times (>5s for health, >10s for random)
- Database connection issues
- Endpoint availability

## 🔄 **Warm-up Strategy**

### **Why Warm-up?**
- Render free tier has cold starts
- Services scale down after inactivity
- First request can take 30+ seconds
- Subsequent requests are fast

### **Warm-up Process**
1. **Initial Request**: Triggers cold start
2. **5-minute Wait**: Allows full warm-up
3. **Testing**: All endpoints tested
4. **Validation**: Response validation
5. **Metrics**: Performance data collection

### **GitHub Actions Limitations**
- **Maximum job time**: 6 hours (free tier)
- **Cron frequency**: Minimum 5 minutes
- **Resource usage**: 2,000 minutes/month (free tier)
- **Our setup**: 15-minute intervals = 96 runs/day = 2,880 minutes/month

## 🛠 **Customization**

### **Modify Warm-up Time**
```yaml
# In .github/workflows/synthetic-monitoring.yml
sleep 300  # 5 minutes
# Change to: sleep 180  # 3 minutes
```

### **Add More Endpoints**
```yaml
# Add to the test section
- name: Test additional endpoints
  run: |
    curl -s "$API_URL/api/scriptures/reference/John/3"
```

### **Custom Alerting**
```yaml
# Add Slack/Discord notifications
- name: Notify on failure
  if: failure()
  run: |
    curl -X POST -H 'Content-type: application/json' \
      --data '{"text":"Scripture App monitoring failed!"}' \
      $SLACK_WEBHOOK_URL
```

## 📈 **Monitoring Dashboard Ideas**

### **Key Metrics to Track**
- **Uptime**: Service availability
- **Response Times**: p50, p95, p99
- **Cold Start Frequency**: How often services scale down
- **Error Rates**: By endpoint and type
- **User Impact**: Cold start vs warm performance

### **Grafana Dashboard Queries**
```sql
-- Average response time by endpoint
SELECT endpoint, AVG(response_time)
FROM monitoring_metrics
GROUP BY endpoint

-- Cold start detection
SELECT COUNT(*)
FROM monitoring_metrics
WHERE response_time > 30
```

## 🚨 **Troubleshooting**

### **Common Issues**

1. **Cold Start Timeouts**:
   - Increase timeout values in monitoring
   - Extend warm-up period
   - Consider upgrading to paid tier

2. **GitHub Actions Failures**:
   - Check API URL is correct
   - Verify endpoint availability
   - Review workflow logs

3. **Local Script Issues**:
   - Install requests: `pip install requests`
   - Check backend is running
   - Verify URL accessibility

### **Debug Commands**
```bash
# Test health endpoint manually
curl -v http://localhost:8000/health

# Check GitHub Actions logs
# Go to Actions tab in GitHub repository

# Test monitoring script with verbose output
python scripts/monitor.py --url http://localhost:8000
```

## 📚 **Next Steps**

### **Phase 2: Advanced Monitoring**
- [ ] Add Prometheus metrics
- [ ] Set up Grafana dashboards
- [ ] Implement distributed tracing
- [ ] Add log aggregation

### **Phase 3: SRE Practices**
- [ ] Define SLI/SLOs
- [ ] Implement error budgets
- [ ] Create incident response playbooks
- [ ] Set up chaos engineering

---

**Last Updated**: January 2025
**Maintained By**: SRE Team
**Review Schedule**: Monthly
