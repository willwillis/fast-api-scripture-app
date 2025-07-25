# Operations Guide

This comprehensive guide covers monitoring, observability, and Site Reliability Engineering (SRE) practices for the Fast Scriptures application.

## 🎯 Overview

Fast Scriptures requires robust monitoring to ensure optimal performance for scripture readers worldwide. This guide covers everything from basic health checks to advanced SRE practices.

## 🔧 Monitoring Components

### 1. Health Check System
**Location**: `backend/app/main.py`
**Endpoint**: `/health`

**Features**:
- Database connection warm-up
- Volume count verification
- Warm-up status reporting
- Detailed health information

**Response Format**:
```json
{
  "status": "healthy",
  "warmed_up": true,
  "database": "connected",
  "volumes_count": 5,
  "timestamp": "2025-01-05T00:00:00Z"
}
```

### 2. Synthetic Monitoring (GitHub Actions)
**Location**: `.github/workflows/synthetic-monitoring.yml`
**Schedule**: Every 15 minutes

**Features**:
- 5-minute warm-up period for cold starts
- Core endpoint testing
- Performance metrics collection
- Response validation
- Manual trigger support

**GitHub Actions Limitations**:
- Maximum job time: 6 hours (free tier)
- Cron frequency: Minimum 5 minutes
- Resource usage: 2,000 minutes/month (free tier)
- Our setup: 15-minute intervals = 96 runs/day = 2,880 minutes/month

### 3. Local Monitoring Script
**Location**: `scripts/monitor.py`

**Features**:
- Local testing capabilities
- Configurable warm-up time
- Performance metrics
- JSON output support
- Command-line interface

## 🚀 Quick Start

### Local Testing Setup

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

### GitHub Actions Setup

1. **Update the API URL** in `.github/workflows/synthetic-monitoring.yml`:
   ```yaml
   echo "API_URL=https://scriptures-fast-api.onrender.com" >> $GITHUB_ENV
   ```

2. **Enable GitHub Actions** in your repository settings

3. **Monitor the workflow**:
   - Go to Actions tab in GitHub
   - Check "Synthetic Monitoring" workflow
   - Runs every 15 minutes automatically

## 🔄 Cold Start Management

### Understanding Cold Starts
- **Problem**: Render free tier scales down after inactivity
- **Impact**: First request can take 30+ seconds
- **Solution**: Proactive warm-up strategy

### Warm-up Process
1. **Initial Request**: Triggers cold start
2. **5-minute Wait**: Allows full warm-up
3. **Testing**: All endpoints tested
4. **Validation**: Response validation
5. **Metrics**: Performance data collection

### Customizing Warm-up
```yaml
# In .github/workflows/synthetic-monitoring.yml
sleep 300  # 5 minutes
# Change to: sleep 180  # 3 minutes
```

## 📊 Current Monitoring Implementation

### What's Actually Implemented

**✅ Health Check Endpoint**
- Location: `/health` endpoint in FastAPI
- Returns database status and system health
- Used by GitHub Actions for monitoring

**✅ GitHub Actions Synthetic Monitoring**
- Automated testing every 15 minutes
- Tests critical API endpoints
- Validates response times and content
- Handles cold start scenarios

**✅ Manual Monitoring Script**
- `scripts/monitor.py` for local testing
- Configurable warm-up periods
- JSON output for analysis
- Production endpoint testing

## 📈 Metrics Currently Tracked

### GitHub Actions Monitoring
- **API Response Times** - For health, search, and random endpoints
- **HTTP Status Codes** - Success/failure rates
- **Cold Start Detection** - Response times > 30 seconds
- **Endpoint Availability** - Core functionality validation

### Manual Monitoring Script
- **Response Time Metrics** - Detailed timing for each endpoint
- **Database Connectivity** - Health check validation
- **Performance Trends** - JSON output for analysis
- **Production vs Local** - Comparative testing

## 🔮 Future Monitoring Enhancements

### Potential Additions (Not Currently Implemented)

**Application Performance Monitoring (APM)**
- Consider New Relic, DataDog, or Sentry for detailed performance insights
- Add custom metrics for scripture-specific events (searches, random clicks)
- Implement user analytics for popular books/chapters

**Advanced Alerting**
- Email/Slack notifications for service outages
- Performance threshold alerts
- Database connectivity monitoring

**Business Intelligence**
- Usage pattern analysis
- Popular scripture tracking
- Search term analytics

## 🎯 Performance Targets (Based on Current Monitoring)

### Response Time Expectations
- **Health Check**: < 2 seconds (accounting for cold starts)
- **Scripture Search**: < 5 seconds
- **Random Scripture**: < 3 seconds
- **Cold Start Recovery**: < 30 seconds

### Availability Goals
- **API Availability**: > 99% (monitored via GitHub Actions)
- **Critical Endpoints**: Health, search, random scripture
- **Acceptable Downtime**: Render free tier limitations acknowledged

## 🚨 Current Alert System

### GitHub Actions Alerts
When synthetic monitoring fails, GitHub provides:
- **Email notifications** to repository maintainers
- **GitHub UI indicators** on the Actions tab
- **Workflow failure badges** in repository

### Manual Alerting
Currently relies on:
- **Manual script execution** for detailed diagnostics
- **GitHub Actions history** for trend analysis
- **Render service logs** for infrastructure issues

### Future Alert Enhancements
```yaml
# Example: Add Slack/Discord notifications (not implemented)
- name: Notify on failure
  if: failure()
  run: |
    curl -X POST -H 'Content-type: application/json' \
      --data '{"text":"Scripture App monitoring failed!"}' \
      $SLACK_WEBHOOK_URL
```

## 📊 Dashboard Design

### Executive Dashboard
- Daily active users
- Total scripture reads
- System uptime
- User satisfaction metrics
- Revenue impact (if applicable)

### Technical Dashboard
- API performance metrics
- Database health
- Frontend performance
- Error rates and trends
- Infrastructure costs

### User Behavior Dashboard
- Most read scriptures
- Search patterns
- Feature usage
- User journey flows
- Geographic usage patterns

### Grafana Dashboard Queries
```sql
-- Average response time by endpoint
SELECT endpoint, AVG(response_time)
FROM monitoring_metrics
GROUP BY endpoint

-- Cold start detection
SELECT COUNT(*)
FROM monitoring_metrics
WHERE response_time > 30

-- Popular scripture tracking
SELECT book, chapter, COUNT(*) as reads
FROM scripture_access_log
GROUP BY book, chapter
ORDER BY reads DESC
```

## 🔧 Advanced Monitoring Features

### 1. Distributed Tracing
```python
# Add to FastAPI for request tracing
from opentelemetry import trace
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor

tracer = trace.get_tracer(__name__)

@app.get("/api/scriptures/search")
async def search_scriptures(q: str):
    with tracer.start_as_current_span("search_scriptures") as span:
        span.set_attribute("query", q)
        # Search logic here
        return results
```

### 2. Log Aggregation
```python
# Structured logging
import structlog

logger = structlog.get_logger()

@app.get("/api/scriptures/random")
async def random_scripture():
    logger.info("random_scripture_requested",
                user_agent=request.headers.get("user-agent"),
                ip=request.client.host)
```

### 3. Custom Metrics Endpoint
```python
@app.get("/metrics")
async def custom_metrics():
    return {
        "scripture_reads_today": get_daily_reads(),
        "popular_books": get_popular_books(),
        "search_queries_count": get_search_count(),
        "user_sessions_active": get_active_sessions()
    }
```

## ✅ What's Implemented vs 🔮 Future Plans

### Currently Implemented
- ✅ **Health check endpoint** (`/health`)
- ✅ **GitHub Actions synthetic monitoring** (15-minute intervals)
- ✅ **Local monitoring script** (`scripts/monitor.py`)
- ✅ **Cold start detection and warm-up** strategy
- ✅ **Basic performance tracking** (response times, status codes)
- ✅ **Production endpoint testing**

### Future Enhancement Ideas
- 🔮 **Error tracking** with Sentry or similar
- 🔮 **Real-time dashboards** with Grafana or New Relic
- 🔮 **Custom business metrics** (user behavior, popular scriptures)
- 🔮 **Advanced alerting** (Slack/Discord notifications)
- 🔮 **Log aggregation** for better debugging
- 🔮 **Performance budgets** and SLO tracking

## 🐛 Troubleshooting

### Common Issues

**1. Cold Start Timeouts**:
- Increase timeout values in monitoring
- Extend warm-up period
- Consider upgrading to paid hosting tier
- Implement keep-alive strategies

**2. GitHub Actions Failures**:
- Check API URL is correct
- Verify endpoint availability
- Review workflow logs
- Ensure proper authentication

**3. Local Script Issues**:
- Install requests: `pip install requests`
- Check backend is running
- Verify URL accessibility
- Review firewall settings

### Debug Commands
```bash
# Test health endpoint manually
curl -v http://localhost:8000/health

# Check GitHub Actions logs
# Go to Actions tab in GitHub repository

# Test monitoring script with verbose output
python scripts/monitor.py --url http://localhost:8000 --verbose

# Check database connectivity
cd backend && python -c "from app.services.database import get_database_connection; print(get_database_connection())"
```

## 📋 Current Monitoring Checklist

### ✅ Currently Monitored
- [x] **API endpoint response times** (health, search, random)
- [x] **Basic availability** (HTTP status codes)
- [x] **Cold start detection** (response times > 30s)
- [x] **Database connectivity** (via health check)
- [x] **Production vs development** comparison

### 🔮 Future Monitoring Opportunities
- [ ] **Detailed error rates** by endpoint
- [ ] **Memory and CPU usage** tracking
- [ ] **User interaction metrics** and analytics
- [ ] **Frontend performance** (Core Web Vitals)
- [ ] **Business metrics** (search patterns, popular books)
- [ ] **Security event tracking**
- [ ] **Database query performance**

## 📚 Useful Resources

### GitHub Actions Monitoring
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Monitoring and troubleshooting workflows](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows)

### FastAPI Monitoring
- [FastAPI Monitoring](https://fastapi.tiangolo.com/tutorial/middleware/)
- [Health check patterns](https://fastapi.tiangolo.com/advanced/health-checks/)

### Future Learning (When Implementing Advanced Features)
- [Google SRE Book](https://sre.google/sre-book/table-of-contents/) - SRE best practices
- [Sentry Documentation](https://docs.sentry.io/) - Error tracking
- [New Relic APM](https://docs.newrelic.com/docs/apm/) - Application monitoring

---

**Last Updated**: January 2025
**Maintained By**: DevOps Team
**Review Schedule**: Monthly
**Next Review**: February 2025

**Quick Links:** [Documentation Index](./README.md) | [Developer Guide](./developer-guide.md) | [API Standards](./api-standards.md) | [Deployment Guide](./deployment.md)
