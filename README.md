# Gelbe Seiten Replica

A full-stack replica of the Gelbe Seiten (Yellow Pages) business directory platform with modern web technologies.

## 📋 Project Overview

This project is a complete rebuild of the Gelbe Seiten business directory, featuring:
- **Backend API**: FastAPI-powered RESTful API with PostgreSQL/Elasticsearch
- **Frontend**: Modern Next.js + TypeScript web application
- **Data**: Business directory with 3m+ German businesses
- **Search**: Advanced search with geocoding and location-based results

## 🏗️ Architecture

```
GSPROD/
├── backend/          # FastAPI backend service (port 8000)
├── frontend/         # Next.js frontend application (port 3000)
├── data/             # Business data (JSON)
├── gsbiz/            # Original HTML/CSS/JS assets
└── README.md         # This file
```

**Note:** This is a monorepo structure. Frontend and backend are separate projects with their own dependencies.

## 🚀 Quick Start

### Prerequisites

- Python 3.12+
- Node.js 18+
- PostgreSQL 14+ (optional)
- Elasticsearch 8+ (optional)

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Backend will be available at `http://localhost:8000`

**API Documentation**: 
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at `http://localhost:3000`

## 📚 Documentation

- **Backend**: See [backend/README.md](./backend/README.md)
- **Frontend**: See [frontend/README.md](./frontend/README.md)
- **Database Setup**: See [backend/DATABASE_SETUP.md](./backend/DATABASE_SETUP.md)
- **Network Access**: See [NETWORK_ACCESS_SETUP.md](./NETWORK_ACCESS_SETUP.md)

## 🎯 Features

### Backend Features
- ✅ RESTful API with FastAPI
- ✅ Business search by keyword and location
- ✅ Geocoding with OpenStreetMap (Nominatim)
- ✅ PostgreSQL database with Alembic migrations
- ✅ Elasticsearch integration for advanced search
- ✅ CORS enabled for frontend integration
- ✅ Comprehensive API documentation

### Frontend Features
- ✅ Server-side rendering (SSR) with Next.js
- ✅ TypeScript for type safety
- ✅ Responsive design
- ✅ Modern React components
- ✅ Search functionality (What/Where)
- ✅ Business detail pages
- ✅ Branch/category browsing
- ✅ SEO optimized

### Data
- 500K+ German business records
- Business name, address, phone, website
- Branch/category classifications
- Geographic coordinates (lat/lon)

## 🛠️ Technology Stack

### Backend
- **Framework**: FastAPI
- **Database**: PostgreSQL 14
- **Search**: Elasticsearch 8
- **ORM**: SQLAlchemy
- **Migrations**: Alembic
- **API Docs**: OpenAPI/Swagger

### Frontend
- **Framework**: Next.js 14
- **Language**: TypeScript
- **UI Library**: React 18
- **Styling**: CSS (original preserved)
- **Maps**: Leaflet / React-Leaflet

### DevOps
- **Containerization**: Docker & Docker Compose
- **Database**: PostgreSQL with pgAdmin
- **Reverse Proxy**: Nginx (optional)

## 📡 API Endpoints

### Search
```
GET /api/v1/search?keyword={keyword}&location={location}
GET /api/v2/search?what={what}&where={where}
```

### Business Details
```
GET /api/v1/business/{business_id}
```

### Geocoding
```
GET /api/v1/geocode?location={location}
```

## 🗄️ Database

The project supports multiple database configurations:

1. **JSON File** (Development): Direct file access
2. **PostgreSQL** (Production): Full database with migrations
3. **Elasticsearch** (Advanced Search): Full-text search capabilities

### Database Migration

```bash
cd backend
source venv/bin/activate
alembic upgrade head
```

## 🐳 Docker Deployment

```bash
cd backend
docker-compose up -d
```

Services:
- **Backend API**: `http://localhost:8000`
- **PostgreSQL**: `localhost:5432`
- **pgAdmin**: `http://localhost:5050`

## 🌐 Frontend Pages

- `/` - Homepage with search
- `/branchen/[keyword]/[location]` - Search results by category/location
- `/gsbiz/[id]` - Business detail page
- `/branchenbuch` - Business directory overview

## 📊 Data Structure

### Business Model
```json
{
  "id": "9191131878501130",
  "name": "Business Name",
  "address": "Street Address",
  "city": "City",
  "postcode": "12345",
  "phone": "+49 123 456789",
  "website": "https://example.com",
  "branches": ["9304", "9305"],
  "lat": 52.5200,
  "lon": 13.4050,
  "opening_hours": "Mo-Fr 9:00-18:00"
}
```

## 🔧 Development

### Run Tests
```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

### Code Quality
```bash
# Backend linting
cd backend
black app/
flake8 app/

# Frontend linting
cd frontend
npm run lint
npm run type-check
```

## 📝 Environment Variables

### Backend (`backend/.env`)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/gelbeseiten
ELASTICSEARCH_HOST=localhost
ELASTICSEARCH_PORT=9200
USE_ELASTICSEARCH=false
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
```

### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Separate .env files are required for each project** - see the "Environment Variables" section for details.

## 🚀 Production Deployment

### Backend
```bash
cd backend
gunicorn app.main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Frontend
```bash
cd frontend
npm run build
npm start
```

Or deploy to Vercel:
1. Push to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Deploy automatically

## 🐛 Troubleshooting

### Backend Issues
- **Port in use**: Change port with `--port 8001`
- **Database connection**: Check PostgreSQL is running
- **Missing dependencies**: Run `pip install -r requirements.txt`

### Frontend Issues
- **Port in use**: Run `npm run dev -- -p 3001`
- **Assets missing**: Check `public/assets/` folder exists
- **TypeScript errors**: Run `npm run type-check`

## 📈 Performance

- **Backend**: FastAPI with async/await for high concurrency
- **Database**: PostgreSQL with proper indexing
- **Search**: Elasticsearch for sub-second full-text search
- **Frontend**: Next.js SSR/SSG for fast page loads
- **Caching**: Redis recommended for production

## 🔐 Security

- CORS properly configured
- SQL injection prevention with SQLAlchemy
- Input validation with Pydantic
- Environment variables for sensitive data
- Rate limiting recommended for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is for educational purposes. Ensure you have rights to use all assets and data from the original Gelbe Seiten website.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Original Gelbe Seiten design and assets
- FastAPI framework
- Next.js team
- OpenStreetMap for geocoding

## 📞 Support

For issues, questions, or contributions:
- Open an issue on GitHub
- Check existing documentation
- Review API documentation at `/docs`

---

**Built with ❤️ using FastAPI, Next.js, and TypeScript**
