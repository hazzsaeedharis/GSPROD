"""
Production middleware - Rate limiting, logging, error handling
Best practices for AWS deployment
"""
from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse
import time
import logging
from collections import defaultdict
from datetime import datetime, timedelta

logger = logging.getLogger(__name__)


class RateLimitMiddleware(BaseHTTPMiddleware):
    """Simple rate limiting middleware"""
    
    def __init__(self, app, calls: int = 60, period: int = 60):
        super().__init__(app)
        self.calls = calls
        self.period = period
        self.clients = defaultdict(list)
    
    async def dispatch(self, request: Request, call_next):
        client_ip = request.client.host if request.client else "testclient"
        now = datetime.now()
        
        # Clean old entries
        self.clients[client_ip] = [
            req_time for req_time in self.clients[client_ip]
            if now - req_time < timedelta(seconds=self.period)
        ]
        
        # Check rate limit
        if len(self.clients[client_ip]) >= self.calls:
            return JSONResponse(
                status_code=429,
                content={"detail": "Too many requests. Please try again later."}
            )
        
        # Add current request
        self.clients[client_ip].append(now)
        
        response = await call_next(request)
        return response


class LoggingMiddleware(BaseHTTPMiddleware):
    """Log all requests"""
    
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        
        response = await call_next(request)
        
        process_time = time.time() - start_time
        client_host = request.client.host if request.client else "unknown"
        logger.info(
            f"{request.method} {request.url.path} "
            f"Status:{response.status_code} "
            f"Time:{process_time:.3f}s "
            f"Client:{client_host}"
        )
        
        response.headers["X-Process-Time"] = str(process_time)
        return response


class ErrorHandlerMiddleware(BaseHTTPMiddleware):
    """Global error handler"""
    
    async def dispatch(self, request: Request, call_next):
        try:
            response = await call_next(request)
            return response
        except Exception as e:
            logger.error(f"Unhandled error: {str(e)}", exc_info=True)
            return JSONResponse(
                status_code=500,
                content={
                    "detail": "Internal server error",
                    "type": type(e).__name__
                }
            )
