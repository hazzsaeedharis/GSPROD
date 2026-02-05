# Deployment Configuration

## Railway Backend

### Start Command
The backend should use this start command (now configured in `railway.toml`):
```bash
uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}
```

**Important:** 
- Use `--host 0.0.0.0` (NOT 127.0.0.1) to accept external connections
- Use `${PORT}` variable provided by Railway
- Do NOT use `--reload` in production

### Environment Variables
Add these in Railway Variables tab:

```bash
DATABASE_URL=postgresql://postgres.kwikmyspjxwzmfwhlrfy:S2nCV%26a7NFF%2A4%40DN40fAK%40yj2%25qVtxStGZSm@aws-1-eu-central-1.pooler.supabase.com:6543/postgres
CORS_ORIGINS=https://gelbe-seitan-replica.vercel.app
SECRET_KEY=your-secure-random-string-here-32chars-minimum
USE_ELASTICSEARCH=False
USE_REDIS_CACHE=False
DEBUG=False
```

**Note:** `CORS_ORIGINS` can be:
- Comma-separated string: `https://app1.com,https://app2.com`
- Or JSON array: `["https://app1.com","https://app2.com"]`

### After Configuration
1. Push changes to GitHub
2. Railway will auto-redeploy
3. Check `/health` endpoint: https://gelbeseitanreplica-production.up.railway.app/health

---

## Vercel Frontend

### Environment Variables
Add in Vercel Settings → Environment Variables:

```bash
NEXT_PUBLIC_API_URL=https://gelbeseitanreplica-production.up.railway.app
```

### After Configuration
1. Add the environment variable
2. Redeploy the frontend
3. The frontend will now connect to the Railway backend instead of localhost

---

## Testing

1. **Backend health check:**
   ```bash
   curl https://gelbeseitanreplica-production.up.railway.app/health
   ```
   Should return: `{"status": "healthy", "database": "connected"}`

2. **Frontend:**
   Visit https://gelbe-seitan-replica.vercel.app/
   Open browser console and verify API calls go to Railway, not localhost

3. **API docs:**
   Visit https://gelbeseitanreplica-production.up.railway.app/docs
