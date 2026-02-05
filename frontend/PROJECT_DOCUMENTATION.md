# Gelbe Seiten Rebuild - Project Documentation

## 🎯 Project Overview

A modern Next.js rebuild of the Gelbe Seiten (Yellow Pages) business directory platform with FastAPI backend, featuring real-time search, interactive maps, and geolocation capabilities.

---

## 📦 Architecture

### Frontend (Next.js 14 + React 18)
- **Framework**: Next.js with TypeScript/JSX
- **Styling**: Original CSS preserved from legacy system
- **Maps**: React-Leaflet with OpenStreetMap
- **Components**: Modular React components

### Backend (FastAPI + Python)
- **API Framework**: FastAPI with Pydantic models
- **Geocoding**: Nominatim (OpenStreetMap)
- **Data Format**: NDJSON (Newline-Delimited JSON)
- **CORS**: Enabled for local development

---

## 🗂️ Project Structure

```
GS Rebuild/
├── frontend/                    # Next.js application
│   ├── pages/
│   │   ├── index.jsx           # Homepage
│   │   ├── branchenbuch.jsx    # Industry directory
│   │   ├── branchen/
│   │   │   └── [keyword]/
│   │   │       └── [location].tsx  # Search results page
│   │   └── gsbiz/
│   │       └── [id].tsx        # Business detail page
│   ├── src/
│   │   └── components/
│   │       ├── SearchBox.tsx   # Main search component with autocomplete & geolocation
│   │       ├── MapView.tsx     # Leaflet map component
│   │       └── ...             # Other UI components
│   └── public/
│       └── assets/
│           ├── branchen/       # Search results page assets
│           ├── gsbiz/          # Business detail page assets
│           ├── branchenbuch/   # Industry directory assets
│           ├── css/
│           ├── fonts/
│           ├── images/
│           └── js/
│
├── backend/                     # FastAPI application
│   ├── app/
│   │   ├── main.py             # FastAPI app entry
│   │   ├── models/
│   │   │   └── business.py     # Pydantic data models
│   │   ├── services/
│   │   │   └── business_service.py  # Business logic
│   │   └── api/
│   │       └── endpoints/
│   │           └── search.py   # Search API endpoints
│   └── requirements.txt
│
└── data/
    └── raw/
        └── gsbestand-559.json  # Business data (200MB+ NDJSON)
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.9+
- **Git**

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:3000`

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Backend API runs at: `http://localhost:8000`
- **API Docs**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

---

## 🔍 Features Implemented

### ✅ Homepage Search Component
- **Location**: Homepage "Dienstleister schneller finden" section
- **Features**:
  - Keyword input for business/service search
  - Location input with OSM autocomplete
  - Geolocation button to get current position
  - Smart URL generation: `/branchen/arzt/berlin`

### ✅ Search Results Page
- **URL Pattern**: `/branchen/[keyword]/[location]`
- **Features**:
  - Business listing cards
  - Interactive OpenStreetMap with markers
  - Click marker to highlight business
  - Pagination (20 results per page)
  - Quick actions: Call, Website, Route
  - Backend API integration

### ✅ Business Detail Page
- **URL Pattern**: `/gsbiz/[id]`
- **Features**:
  - Full contact information
  - Address with geocoded map
  - Action buttons (Call, Website, Route)
  - Industry categories
  - OSM route planner integration

### ✅ Backend API

#### Endpoints:

**1. Search Businesses**
```
GET /api/v1/search?keyword={keyword}&location={location}&page={page}&page_size={page_size}
```

**2. Get Business by ID**
```
GET /api/v1/business/{business_id}
```

**3. Geocode Location**
```
GET /api/v1/geocode?location={location}
```

---

## 🗺️ Map Integration

### Leaflet + OpenStreetMap
- **Library**: React-Leaflet 5.0.0
- **Tile Provider**: OpenStreetMap
- **Features**:
  - Business markers with popups
  - Auto-fit bounds to show all results
  - Click handlers for business selection
  - Responsive design

### Marker Icons
Located in `/frontend/public/assets/images/`:
- `marker-icon.png` (1x)
- `marker-icon-2x.png` (2x for retina)
- `marker-shadow.png`

---

## 📊 Data Structure

### Business Record (NDJSON)
```json
{
  "_id": "9191131878501130",
  "verlagsdaten": {
    "kontaktinformationen": {
      "personListe": [
        {"name": "Business Name", "berufsbezeichnungAnzeige": false}
      ],
      "adresse": {
        "postleitzahl": "16866",
        "ortsname": "Kolrep",
        "kgs": "12070149012"
      }
    },
    "branchenIdListe": ["9304"],
    "verlagsinformationen": {
      "verlagskunde": false,
      "verlag": "1131"
    }
  }
}
```

### Search Response
```json
{
  "total": 100,
  "results": [
    {
      "id": "...",
      "name": "...",
      "address": "...",
      "city": "...",
      "postcode": "...",
      "lat": 52.xxxx,
      "lon": 13.xxxx
    }
  ],
  "page": 1,
  "page_size": 20
}
```

---

## 🎨 Assets & Styling

### CSS Organization
- **Global**: `global_above.css`, `global_below.css`
- **Page-specific**:
  - Branchen: `trefferliste_above.css`, `trefferliste_below.css`
  - Gsbiz: `detailseite_above.css`, `detailseite_below.css`
  - Branchenbuch: `country.css`

### Fonts
- **TheSansB4** family (Light, Plain, Bold, ExtraBold)
- Located in `/frontend/public/assets/fonts/`

---

## 🔧 Configuration

### Next.js Config
```javascript
// next.config.js
{
  reactStrictMode: true,
  images: { remotePatterns: [...] },
  async rewrites() {
    return [{ source: '/webgs/:path*', destination: '/assets/:path*' }]
  }
}
```

### API CORS
```python
# backend/app/main.py
allow_origins=["http://localhost:3000", "http://localhost:3001"]
```

---

## 🧪 Testing the System

### 1. Start Backend
```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

### 2. Start Frontend
```bash
cd frontend
npm run dev
```

### 3. Test Search
1. Go to `http://localhost:3000`
2. Enter keyword: "Arzt" (Doctor)
3. Enter location: "Berlin"
4. Click "Geolocation" button to test current location feature
5. Click search → redirects to `/branchen/arzt/berlin`

### 4. Test API Directly
```bash
# Search
curl "http://localhost:8000/api/v1/search?keyword=arzt&location=berlin&page=1&page_size=10"

# Business detail
curl "http://localhost:8000/api/v1/business/9191131878501130"

# Geocode
curl "http://localhost:8000/api/v1/geocode?location=Berlin"
```

---

## 📝 API Rate Limits & Performance

### OpenStreetMap Nominatim
- **Usage Policy**: Max 1 request per second
- **User Agent**: Required (`gelbeseiten_app`)
- **Timeout**: 5 seconds
- **Caching**: Implemented in backend service

### Optimization Recommendations

1. **Database Migration**
   - Move from NDJSON file to PostgreSQL/MongoDB
   - Add full-text search indexes
   - Implement spatial indexes for geo queries

2. **Caching Layer**
   - Redis for frequently searched terms
   - Cache geocoding results permanently
   - API response caching (5-15 minutes)

3. **Search Improvements**
   - Elasticsearch for full-text search
   - Fuzzy matching for typos
   - Search suggestions/autocomplete

4. **Production Considerations**
   - API rate limiting
   - Authentication/API keys
   - CDN for static assets
   - Separate geocoding service

---

## 🐛 Known Issues & Limitations

### Current Implementation

1. **In-Memory Search**
   - Reads entire NDJSON file for each search
   - Suitable for development only
   - **Solution**: Migrate to database

2. **Limited Geocoding**
   - Only geocodes on first access
   - OSM rate limits may cause delays
   - **Solution**: Pre-geocode database, use commercial provider

3. **No Authentication**
   - API endpoints are open
   - **Solution**: Add JWT/API key authentication

4. **Basic Search Algorithm**
   - Simple substring matching
   - No fuzzy search or relevance scoring
   - **Solution**: Implement Elasticsearch

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Geolocation requires HTTPS in production
- Leaflet works on mobile browsers

---

## 🚀 Deployment Guide

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
npm start  # Production server
```

### Backend (Docker)
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY ./app ./app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Environment Variables
```env
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=https://api.gelbeseiten.de

# Backend (.env)
DATA_FILE_PATH=/app/data/gsbestand-559.json
CORS_ORIGINS=https://www.gelbeseiten.de
```

---

## 📚 Additional Resources

### Documentation
- **FastAPI**: https://fastapi.tiangolo.com/
- **Next.js**: https://nextjs.org/docs
- **React-Leaflet**: https://react-leaflet.js.org/
- **Nominatim API**: https://nominatim.org/release-docs/develop/api/Overview/

### APIs Used
- **OpenStreetMap Nominatim**: Geocoding & reverse geocoding
- **OpenStreetMap Tiles**: Map tiles for Leaflet

---

## 👥 Development Team

### Components Created
- ✅ SearchBox with autocomplete & geolocation
- ✅ MapView with Leaflet integration
- ✅ Search results page with pagination
- ✅ Business detail page with maps
- ✅ FastAPI backend with search endpoints

### Assets Migrated
- ✅ branchen_arzt_berlin → `/assets/branchen/`
- ✅ gsbiz → `/assets/gsbiz/`
- ✅ branchenbuch → `/assets/branchenbuch/`

---

## 🎯 Next Steps & Future Enhancements

### Phase 2 (Recommended)
- [ ] Database migration (PostgreSQL + PostGIS)
- [ ] Full-text search with Elasticsearch
- [ ] User authentication system
- [ ] Business reviews & ratings
- [ ] Advanced filtering (hours, ratings, distance)
- [ ] Mobile app (React Native)

### Phase 3 (Advanced)
- [ ] Premium business listings
- [ ] Advertising system
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Business claim/verification system
- [ ] Integration with social media

---

## 📞 Support & Maintenance

### Logs & Monitoring
- **Frontend**: Next.js console logs
- **Backend**: FastAPI automatic logging
- **Recommended**: Sentry for error tracking

### Backup Strategy
- Database backups (when migrated)
- Regular data file backups
- Asset backups

---

**Last Updated**: January 26, 2026
**Version**: 1.0.0
**Status**: ✅ MVP Complete - Production Ready for Testing
