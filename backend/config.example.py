# Configuration Example
# Copy this to config.py and update with your values

class Config:
    # Database
    DATABASE_URL = "postgresql://gs_user:gs_password_change_in_production@localhost:5432/gelbeseiten"
    
    # Elasticsearch
    ELASTICSEARCH_HOST = "localhost"
    ELASTICSEARCH_PORT = 9200
    USE_ELASTICSEARCH = True
    
    # Redis
    REDIS_URL = "redis://localhost:6379"
    USE_REDIS_CACHE = True
    CACHE_TTL = 300  # seconds
    
    # API
    API_HOST = "0.0.0.0"
    API_PORT = 8000
    CORS_ORIGINS = ["http://localhost:3000", "http://localhost:3001"]
    
    # Data
    DATA_FILE_PATH = "../data/raw/gsbestand-559.json"
    
    # Geocoding
    GEOCODING_PROVIDER = "nominatim"
    GEOCODING_RATE_LIMIT = 1  # requests/second
    
    # Logging
    LOG_LEVEL = "INFO"
    LOG_FILE = "logs/app.log"
