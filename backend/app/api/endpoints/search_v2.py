"""
Enhanced Search API Endpoints using PostgreSQL + Elasticsearch
"""

from fastapi import APIRouter, Query, HTTPException, Depends
from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.business import SearchResponse
from app.services.search_service_v2 import SearchServiceV2
from app.database import get_db, Business
from app.config import get_settings
import json
import re

router = APIRouter()
settings = get_settings()


def clean_street_address(street_address: str) -> str:
    """
    Remove duplicate house numbers from street address.
    Example: "Main Street 123 123" -> "Main Street 123"
    """
    if not street_address:
        return street_address
    
    # Split by spaces
    parts = street_address.split()
    
    # If we have at least 2 parts and the last two are identical numbers
    if len(parts) >= 2 and parts[-1].isdigit() and parts[-2] == parts[-1]:
        # Remove the last duplicate number
        parts = parts[:-1]
    
    return ' '.join(parts)


@router.get("/search", response_model=SearchResponse)
async def search_businesses(
    keyword: Optional[str] = Query(None, description="Search keyword"),
    location: Optional[str] = Query(None, description="City or postcode"),
    lat: Optional[float] = Query(None, description="Latitude for geo-search"),
    lon: Optional[float] = Query(None, description="Longitude for geo-search"),
    radius: Optional[float] = Query(50, description="Search radius in km"),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=50),
    sort_by: str = Query("relevance", description="Sort by: relevance, distance, name"),
    db: Session = Depends(get_db)
):
    """
    Advanced business search with PostgreSQL + Elasticsearch
    
    Features:
    - Full-text search with German stemming
    - Fuzzy matching for typos
    - Geo-distance search
    - Multiple sort options
    - Fast pagination
    """
    try:
        service = SearchServiceV2(db, use_elasticsearch=settings.USE_ELASTICSEARCH)
        
        results, total = service.search_businesses(
            keyword=keyword,
            location=location,
            lat=lat,
            lon=lon,
            radius_km=radius,
            page=page,
            page_size=page_size,
            sort_by=sort_by
        )
        
        return SearchResponse(
            total=total,
            results=results,
            page=page,
            page_size=page_size
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search error: {str(e)}")


@router.get("/autocomplete/cities")
async def autocomplete_cities(
    prefix: str = Query(..., min_length=2, description="City name prefix"),
    limit: int = Query(10, ge=1, le=50),
    db: Session = Depends(get_db)
):
    """
    City name autocomplete
    
    Returns list of city names matching the prefix
    """
    try:
        service = SearchServiceV2(db, use_elasticsearch=settings.USE_ELASTICSEARCH)
        cities = service.autocomplete_cities(prefix, limit)
        
        return {
            "prefix": prefix,
            "suggestions": cities
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Autocomplete error: {str(e)}")


@router.get("/business/{business_id}")
async def get_business(
    business_id: str,
    db: Session = Depends(get_db)
):
    """
    Get detailed business information by ID
    
    Returns complete business record from PostgreSQL including:
    - Contact information
    - Address details
    - Categories/branches
    - Opening hours (if available)
    - Location coordinates
    """
    service = SearchServiceV2(db)
    business = service.get_business_by_id(business_id)
    
    if not business:
        raise HTTPException(status_code=404, detail="Business not found")
    
    # Parse categories from JSON text field
    categories = []
    if business.categories:
        try:
            categories = json.loads(business.categories) if isinstance(business.categories, str) else business.categories
        except:
            categories = []
    
    # Parse opening hours if available (check if field exists)
    opening_hours = None
    if hasattr(business, 'opening_hours') and business.opening_hours:
        try:
            opening_hours = json.loads(business.opening_hours) if isinstance(business.opening_hours, str) else business.opening_hours
        except:
            opening_hours = None
    
    # Clean the street address to remove duplicate house numbers
    cleaned_street = clean_street_address(business.street_address)
    
    # Build full address string
    address_parts = []
    if cleaned_street:
        address_parts.append(cleaned_street)
    if business.postal_code:
        address_parts.append(business.postal_code)
    if business.city:
        address_parts.append(business.city)
    if business.district:
        address_parts.append(f"({business.district})")
    
    full_address = ", ".join(filter(None, address_parts))
    
    # Convert to response format
    return {
        "id": business.id,
        "name": business.name,
        "address": {
            "street": cleaned_street,
            "postcode": business.postal_code,
            "city": business.city,
            "district": business.district,
            "full_address": full_address
        },
        "contact": {
            "phone": business.phone,
            "email": business.email,
            "website": business.website
        },
        "categories": categories,
        "branches": categories,  # Alias for compatibility
        "opening_hours": opening_hours,
        "location": {
            "latitude": business.latitude,
            "longitude": business.longitude
        } if business.latitude and business.longitude else None,
        "is_active": business.is_active
    }


@router.get("/stats")
async def get_stats(db: Session = Depends(get_db)):
    """
    Get database statistics
    
    Returns counts and information about the database
    """
    total_businesses = db.query(Business).count()
    businesses_with_location = db.query(Business).filter(
        Business.latitude.isnot(None),
        Business.longitude.isnot(None)
    ).count()
    businesses_with_phone = db.query(Business).filter(Business.phone.isnot(None)).count()
    businesses_active = db.query(Business).filter(Business.is_active == True).count()
    
    # Get cities count
    cities_count = db.query(func.count(func.distinct(Business.city))).scalar()
    
    return {
        "total_businesses": total_businesses,
        "active_businesses": businesses_active,
        "businesses_with_location": businesses_with_location,
        "businesses_with_phone": businesses_with_phone,
        "unique_cities": cities_count,
        "geocoding_coverage": round((businesses_with_location / total_businesses * 100), 2) if total_businesses > 0 else 0
    }
