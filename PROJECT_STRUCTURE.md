# 📁 Project Structure

## Overview

This is a **monorepo** containing both frontend and backend as separate projects.

```
GSPROD/
├── backend/              # Python FastAPI backend
│   ├── app/              # Application code
│   │   ├── api/          # API endpoints
│   │   ├── models/       # Database models
│   │   └── services/     # Business logic
│   ├── alembic/          # Database migrations
│   ├── scripts/          # Utility scripts
│   ├── requirements.txt  # Python dependencies
│   ├── .env              # Backend environment variables
│   └── docker-compose.yml
│
├── frontend/             # Next.js frontend (Pages Router)
│   ├── pages/            # Next.js pages
│   │   ├── index.jsx     # Homepage
│   │   ├── branchen/     # Search results
│   │   └── gsbiz/        # Business details
│   ├── src/
│   │   └── components/   # React components
│   ├── public/           # Static assets
│   ├── package.json      # Node dependencies
│   └── next.config.js    # Next.js config
│
├── README.md             # Main documentation
├── QUICK_START.md        # Quick start guide
├── PROJECT_STRUCTURE.md  # This file
└── DEPLOYMENT.md         # Deployment instructions
```

## Environment Variables

### Backend: `backend/.env`

```env
DATABASE_URL=postgresql://user:pass@localhost:5432/gelbeseiten
ELASTICSEARCH_HOST=localhost
ELASTICSEARCH_PORT=9200
USE_ELASTICSEARCH=false
CORS_ORIGINS=http://localhost:3000
```

### Frontend: `frontend/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Running the Project

### Start Backend

```bash
cd backend
uvicorn app.main:app --reload
```

### Start Frontend

```bash
cd frontend
npm run dev
```

## Important Notes

- **Separate dependencies:** Frontend and backend have their own `package.json` and `requirements.txt`
- **Different runtimes:** Frontend (Node.js) vs Backend (Python)
- **Independent deployment:** Can deploy to different services (Vercel for frontend, Railway for backend)
- **Port allocation:** Backend on 8000, Frontend on 3000
- **Elasticsearch is optional:** Backend falls back to PostgreSQL if ES is unavailable

## Technology Stack

### Backend
- FastAPI (Python)
- PostgreSQL + SQLAlchemy
- Elasticsearch (optional)
- Alembic migrations

### Frontend
- Next.js 14 (Pages Router)
- React 18
- TypeScript/JavaScript mix
- Leaflet maps
