# Gelbe Seiten Backend API

FastAPI backend for the Gelbe Seiten business directory search functionality.

## Features

- **Business Search**: Search businesses by keyword and location
- **Geocoding**: Convert addresses to lat/lon coordinates using OpenStreetMap (Nominatim)
- **RESTful API**: Clean, well-documented API endpoints
- **CORS Enabled**: Ready for frontend integration

## Setup

### 1. Create Virtual Environment

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Run the Server

```bash
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

## API Endpoints

### Search Businesses

```
GET /api/v1/search?keyword={keyword}&location={location}&page={page}&page_size={page_size}
```

**Parameters:**
- `keyword` (optional): Search term for business name or category
- `location` (optional): City name or postal code
- `page` (optional, default=1): Page number
- `page_size` (optional, default=20, max=100): Results per page

**Response:**
```json
{
  "total": 100,
  "results": [
    {
      "id": "9191131878501130",
      "name": "Mathias Meißner Landwirtschaft",
      "address": "16866 Kolrep",
      "city": "Kolrep",
      "postcode": "16866",
      "phone": null,
      "website": null,
      "branches": ["9304"],
      "lat": 52.9234,
      "lon": 12.4567
    }
  ],
  "page": 1,
  "page_size": 20
}
```

### Get Business Details

```
GET /api/v1/business/{business_id}
```

**Response:** Complete business information

### Geocode Location

```
GET /api/v1/geocode?location={location}
```

**Response:**
```json
{
  "location": "Berlin",
  "latitude": 52.5200,
  "longitude": 13.4050,
  "display_name": "Berlin, Deutschland"
}
```

## API Documentation

Interactive API documentation is available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application
│   ├── api/
│   │   ├── __init__.py
│   │   └── endpoints/
│   │       ├── __init__.py
│   │       └── search.py    # Search endpoints
│   ├── models/
│   │   ├── __init__.py
│   │   └── business.py      # Pydantic models
│   └── services/
│       ├── __init__.py
│       └── business_service.py  # Business logic
├── requirements.txt
└── README.md
```

## Data Source

The API reads business data from:
```
../data/raw/gsbestand-559.json
```

This is an NDJSON (newline-delimited JSON) file where each line is a complete business record.

## Development Notes

### Performance Considerations

- **In-Memory Search**: Currently loads data from file for each search (suitable for development)
- **Production**: Consider using a database (PostgreSQL, MongoDB) with indexing
- **Geocoding**: Results are cached to avoid redundant API calls
- **Rate Limiting**: Consider implementing rate limiting for production

### Future Enhancements

- [ ] Add PostgreSQL/MongoDB for data storage
- [ ] Implement full-text search (Elasticsearch)
- [ ] Add authentication and API keys
- [ ] Implement caching (Redis)
- [ ] Add rate limiting
- [ ] Add business categories/branches lookup
- [ ] Implement advanced filtering (by branch, rating, etc.)
- [ ] Add batch geocoding for better performance

## Environment Variables

Create a `.env` file (optional):

```env
API_PORT=8000
API_HOST=0.0.0.0
DATA_FILE_PATH=../data/raw/gsbestand-559.json
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
```

## Testing

```bash
# Test search endpoint
curl "http://localhost:8000/api/v1/search?keyword=arzt&location=berlin&page=1&page_size=10"

# Test geocoding
curl "http://localhost:8000/api/v1/geocode?location=Berlin"

# Test business details
curl "http://localhost:8000/api/v1/business/9191131878501130"
```
