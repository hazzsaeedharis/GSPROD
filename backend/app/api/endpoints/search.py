from fastapi import APIRouter, Query, HTTPException
from typing import Optional
from app.models.business import SearchResponse, BusinessSearchResult, Business
from app.services.business_service import BusinessService
import os

router = APIRouter()

# Get data file path
DATA_FILE = os.path.join(
    os.path.dirname(__file__),
    "../../../..",
    "data/raw/gsbestand-559.json"
)

# Initialize service
business_service = BusinessService(DATA_FILE)


@router.get("/search", response_model=SearchResponse)
async def search_businesses(
    keyword: Optional[str] = Query(None, description="Search keyword (business name, category, etc.)"),
    location: Optional[str] = Query(None, description="City name or postcode"),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(20, ge=1, le=100, description="Results per page")
):
    """
    Search for businesses by keyword and/or location
    
    - **keyword**: Search term for business name or category
    - **location**: City name or postal code
    - **page**: Page number (starts at 1)
    - **page_size**: Number of results per page (max 100)
    """
    try:
        results, total = business_service.search_businesses(
            keyword=keyword,
            location=location,
            page=page,
            page_size=page_size
        )
        
        return SearchResponse(
            total=total,
            results=results,
            page=page,
            page_size=page_size
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search error: {str(e)}")


@router.get("/business/{business_id}", response_model=Business)
async def get_business(business_id: str):
    """
    Get detailed business information by ID
    
    - **business_id**: Unique business identifier
    """
    business = business_service.get_business_by_id(business_id)
    
    if not business:
        raise HTTPException(status_code=404, detail="Business not found")
    
    return business


@router.get("/geocode")
async def geocode_location(location: str = Query(..., description="City name or address")):
    """
    Geocode a location to get lat/lon coordinates
    
    - **location**: City name or address to geocode
    """
    from geopy.geocoders import Nominatim
    
    geocoder = Nominatim(user_agent="gelbeseiten_app")
    
    try:
        result = geocoder.geocode(location, timeout=5)
        
        if result:
            return {
                "location": location,
                "latitude": result.latitude,
                "longitude": result.longitude,
                "display_name": result.address
            }
        else:
            raise HTTPException(status_code=404, detail="Location not found")
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Geocoding error: {str(e)}")
