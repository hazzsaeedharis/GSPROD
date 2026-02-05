"""
Network Configuration for Local Network Access
Copy this to .env or use environment variables
"""

# Example environment variables for network access:
EXAMPLE_ENV_VARS = """
# Database - Network accessible PostgreSQL
DATABASE_URL=postgresql://postgres:password@192.168.12.214:5432/events_db

# API Settings
API_HOST=0.0.0.0
API_PORT=8000

# CORS - Add your network IP
CORS_ORIGINS=["http://localhost:3000","http://192.168.12.214:3000","http://192.168.12.214:3001"]

# Debug
DEBUG=True
"""

print(EXAMPLE_ENV_VARS)
