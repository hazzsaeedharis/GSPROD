# Railway Deployment Setup Guide

## Current Status
- ✅ TimescaleDB PostgreSQL database deployed and healthy
- ✅ 2.98M businesses loaded
- ⚠️ Backend service needs database connection configuration

---

## Step 1: Configure Backend Service Environment Variables

Go to your **backend service** in Railway (the FastAPI app, NOT the TimescaleDB service):

1. Click on your backend service
2. Go to **Variables** tab
3. Add the following variables:

### Required Variables

```bash
# Database Connection - Reference the TimescaleDB service
DATABASE_URL=${{TimescaleDB.DATABASE_PUBLIC_URL}}

# CORS Origins - Add your Railway frontend domain
CORS_ORIGINS=https://your-frontend-domain.up.railway.app,https://gelbesietan-production.up.railway.app,http://localhost:3000

# API Configuration
API_HOST=0.0.0.0
API_PORT=8080
WORKERS=4

# Environment
DEBUG=false
```

### Optional but Recommended

```bash
# Database Pool Settings (for production performance)
DB_POOL_SIZE=20
DB_MAX_OVERFLOW=40
DB_POOL_TIMEOUT=30
DB_POOL_RECYCLE=3600

# Rate Limiting
RATE_LIMIT_PER_MINUTE=60

# Logging
LOG_LEVEL=INFO
```

---

## Step 2: Verify Database Connection

After adding the variables, Railway will automatically redeploy. Check the logs:

Expected successful startup logs:
```
🚀 Starting Gelbe Seiten API v2.0.0...
📊 Database: PostgreSQL (Alembic managed)
🔍 Search: PostgreSQL + Elasticsearch (if available)
⚡ Rate Limiting: Enabled
📝 Logging: Enabled
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8080
```

Health check should return 200:
```
GET /health
{
  "status": "healthy",
  "database": "connected",
  "version": "2.0.0"
}
```

---

## Step 3: Test Your API

### Health Check
```bash
curl https://your-backend-domain.up.railway.app/health
```

Expected response:
```json
{
  "status": "healthy",
  "database": "connected",
  "version": "2.0.0"
}
```

### Database Stats
```bash
curl https://your-backend-domain.up.railway.app/api/v2/stats
```

Expected response:
```json
{
  "total_businesses": 2983205,
  "active_businesses": 2983205,
  "businesses_with_coords": 2983205,
  "geocoding_coverage": 100.0,
  "database": "events_db",
  "search_engine": "postgresql"
}
```

### Search API
```bash
curl "https://your-backend-domain.up.railway.app/api/v2/search?query=Berlin&city=Berlin&limit=5"
```

---

## Step 4: Configure Frontend

Update your frontend to use the Railway backend URL:

### Next.js Environment Variables

In your frontend service, set:

```bash
NEXT_PUBLIC_API_URL=https://your-backend-domain.up.railway.app
```

### Update API Calls

Make sure your frontend makes requests to:
```javascript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Example search request
const response = await fetch(`${API_URL}/api/v2/search?query=${query}&city=${city}`);
```

---

## Troubleshooting

### Issue: Health checks return 503

**Cause:** Database connection failed

**Solutions:**
1. Verify `DATABASE_URL` or `DATABASE_PUBLIC_URL` is set correctly in backend service
2. Check the database is running and accessible
3. Verify the password and connection string format
4. Check logs for detailed error messages

### Issue: CORS errors in browser

**Cause:** Frontend domain not in CORS_ORIGINS

**Solution:**
Add your frontend Railway domain to `CORS_ORIGINS`:
```bash
CORS_ORIGINS=https://your-frontend.up.railway.app,http://localhost:3000
```

### Issue: Connection timeout

**Cause:** Using internal DATABASE_URL from outside Railway's network

**Solution:**
Use `DATABASE_PUBLIC_URL` for external connections:
```bash
DATABASE_URL=${{TimescaleDB.DATABASE_PUBLIC_URL}}
```

---

## Architecture Overview

```
┌─────────────────┐
│   Frontend      │
│   (Next.js)     │
│   Port: 3000    │
└────────┬────────┘
         │ HTTPS
         │
┌────────▼────────┐
│   Backend       │
│   (FastAPI)     │
│   Port: 8080    │
└────────┬────────┘
         │ PostgreSQL
         │ Port: 47431
         │
┌────────▼────────┐
│  TimescaleDB    │
│  (PostgreSQL)   │
│  2.98M records  │
└─────────────────┘
```

---

## Database Connection Strings

### Public URL (for external connections)
```
postgresql://postgres:CA54gCGA3faAef1153gddcE6aF22g622@shuttle.proxy.rlwy.net:47431/railway
```

### Internal URL (for services in Railway network)
```
postgresql://postgres:CA54gCGA3faAef1153gddcE6aF22g622@timescaledb.railway.internal:5432/railway
```

**Use Public URL** since your backend and database are separate services.

---

## Next Steps

1. ✅ Set `DATABASE_URL` in backend service
2. ✅ Verify health endpoint returns 200
3. ✅ Test API endpoints
4. ✅ Configure frontend with backend URL
5. ✅ Add production domain to CORS
6. ✅ Monitor logs for errors

---

## Monitoring

### View Logs
```bash
railway logs --service backend
railway logs --service timescaledb
```

### Check Metrics
- Go to Railway dashboard
- Select your service
- View **Metrics** tab for CPU, memory, and request stats

---

## Security Checklist

- [ ] `SECRET_KEY` is set to a random value (not default)
- [ ] Database password is not exposed in frontend
- [ ] CORS only allows your domains (not `*`)
- [ ] Rate limiting is enabled
- [ ] HTTPS is enforced (Railway handles this automatically)
- [ ] Database backups are configured

---

## Cost Optimization

Railway pricing is based on:
- **Database storage:** ~3.2 GB
- **Network egress:** API requests
- **Compute time:** Backend running hours

Tips:
1. Use connection pooling (already configured)
2. Add caching for frequently accessed data
3. Optimize queries with indexes (already present)
4. Monitor usage in Railway dashboard
