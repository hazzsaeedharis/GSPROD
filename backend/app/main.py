from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.api.endpoints import search
from app.api.endpoints import search_v2
from app.middleware import RateLimitMiddleware, LoggingMiddleware
from app.database import SessionLocal
from app.config import settings
from contextlib import asynccontextmanager
import logging

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("🚀 Starting Gelbe Seiten API v2.0.0...")
    print("📊 Database: PostgreSQL (Alembic managed)")
    print("🔍 Search: PostgreSQL + Elasticsearch (if available)")
    print("⚡ Rate Limiting: Enabled")
    print("📝 Logging: Enabled")
    yield
    # Shutdown
    print("👋 Shutting down...")

# Create FastAPI app
app = FastAPI(
    title="Gelbe Seiten API",
    description="Business search and directory API - Production Ready with PostgreSQL",
    version="2.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# Add middleware (order matters!)
app.add_middleware(LoggingMiddleware)
app.add_middleware(RateLimitMiddleware, calls=60, period=60)  # 60 requests per minute

# CORS middleware - using settings from config
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(search.router, prefix="/api/v1", tags=["search-v1-legacy"])
app.include_router(search_v2.router, prefix="/api/v2", tags=["search-v2-database"])


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Gelbe Seiten API",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    """
    Health check endpoint for AWS load balancer
    Checks database connectivity
    """
    try:
        db = SessionLocal()
        from sqlalchemy import text
        db.execute(text("SELECT 1"))
        db.close()
        
        return {
            "status": "healthy",
            "database": "connected",
            "version": "2.0.0"
        }
    except Exception as e:
        return JSONResponse(
            status_code=503,
            content={
                "status": "unhealthy",
                "database": "disconnected",
                "error": str(e)
            }
        )


@app.get("/api/v2/stats")
async def get_stats():
    """Database statistics"""
    try:
        db = SessionLocal()
        from sqlalchemy import text
        
        total = db.execute(text("SELECT COUNT(*) FROM businesses")).scalar()
        active = db.execute(text("SELECT COUNT(*) FROM businesses WHERE is_active = true")).scalar()
        with_coords = db.execute(text("SELECT COUNT(*) FROM businesses WHERE latitude IS NOT NULL AND longitude IS NOT NULL")).scalar()
        
        db.close()
        
        return {
            "total_businesses": total,
            "active_businesses": active,
            "businesses_with_coords": with_coords,
            "geocoding_coverage": round((with_coords / total * 100), 2) if total > 0 else 0,
            "database": "events_db",
            "search_engine": "postgresql" if not getattr(search_v2, 'USE_ELASTICSEARCH', False) else "elasticsearch"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
