"""
Enhanced Search Service using PostgreSQL + Elasticsearch
Replaces the basic NDJSON file-based search
"""

from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from sqlalchemy import func, or_
from geoalchemy2.functions import ST_DWithin, ST_GeogFromText, ST_Distance
from app.database import Business
import json
import math
from app.elasticsearch_client import search_businesses_es, autocomplete_location
from app.models.business import BusinessSearchResult


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


def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """
    Calculate the great circle distance between two points on Earth (in km)
    using the Haversine formula.
    """
    if not all([lat1, lon1, lat2, lon2]):
        return None
    
    # Radius of Earth in kilometers
    R = 6371.0
    
    # Convert latitude and longitude from degrees to radians
    lat1_rad = math.radians(lat1)
    lon1_rad = math.radians(lon1)
    lat2_rad = math.radians(lat2)
    lon2_rad = math.radians(lon2)
    
    # Haversine formula
    dlat = lat2_rad - lat1_rad
    dlon = lon2_rad - lon1_rad
    
    a = math.sin(dlat / 2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    
    distance = R * c
    return round(distance, 1)  # Round to 1 decimal place


class SearchServiceV2:
    """Advanced search service with PostgreSQL + Elasticsearch"""
    
    def __init__(self, db: Session, use_elasticsearch: bool = True):
        self.db = db
        self.use_elasticsearch = use_elasticsearch
    
    def search_businesses(
        self,
        keyword: Optional[str] = None,
        location: Optional[str] = None,
        lat: Optional[float] = None,
        lon: Optional[float] = None,
        radius_km: float = 50,
        page: int = 1,
        page_size: int = 20,
        sort_by: str = "relevance"  # relevance, distance, rating, name
    ) -> tuple[List[BusinessSearchResult], int]:
        """
        Search businesses with advanced features
        
        Args:
            keyword: Search term (business name, category)
            location: City or postcode
            lat/lon: Coordinates for geo-search
            radius_km: Search radius in kilometers
            page: Page number
            page_size: Results per page
            sort_by: Sort criteria
        
        Returns:
            Tuple of (results, total_count)
        """
        
        # Use Elasticsearch if available and enabled
        if self.use_elasticsearch:
            try:
                es_results = search_businesses_es(
                    keyword=keyword,
                    location=location,
                    lat=lat,
                    lon=lon,
                    radius_km=radius_km,
                    page=page,
                    page_size=page_size
                )
                
                # Convert to BusinessSearchResult
                results = []
                for business in es_results['results']:
                    # Build full address with street
                    address_parts = []
                    if business.get('street'):
                        address_parts.append(business['street'])
                    if business.get('postcode'):
                        address_parts.append(business['postcode'])
                    if business.get('city'):
                        address_parts.append(business['city'])
                    
                    full_address = ", ".join(filter(None, address_parts)) if address_parts else ""
                    
                    # Calculate distance if search center coordinates are provided
                    business_lat = business.get('location', {}).get('lat')
                    business_lon = business.get('location', {}).get('lon')
                    distance_km = None
                    if lat and lon and business_lat and business_lon:
                        distance_km = haversine_distance(lat, lon, business_lat, business_lon)
                    
                    result = BusinessSearchResult(
                        id=business['id'],
                        name=business['name'],
                        address=full_address,
                        city=business['city'],
                        postcode=business['postcode'],
                        phone=business.get('phone'),
                        website=business.get('website'),
                        branches=business.get('branch_ids', []),
                        lat=business_lat,
                        lon=business_lon,
                        distance_km=distance_km
                    )
                    results.append(result)
                
                return results, es_results['total']
            
            except Exception as e:
                # Silently fall back to PostgreSQL if Elasticsearch is unavailable
                # Connection errors are expected if Elasticsearch is not running, so we don't log them
                error_type = type(e).__name__
                if "Connection" not in error_type and "NewConnectionError" not in str(e):
                    print(f"Elasticsearch search failed, falling back to PostgreSQL: {e}")
                # Fall through to PostgreSQL search
        
        # PostgreSQL search (fallback or if ES disabled)
        query = self.db.query(Business)
        
        # Keyword filter (fuzzy match with trigram similarity)
        if keyword:
            keyword_lower = f"%{keyword.lower()}%"
            query = query.filter(
                or_(
                    Business.name.ilike(keyword_lower),
                    Business.city.ilike(keyword_lower)
                )
            )
        
        # Location filter (skip if location is "standort" and we have coordinates)
        # "standort" is a placeholder for geolocation-based search
        if location and location.lower() != "standort":
            location_lower = f"%{location.lower()}%"
            query = query.filter(
                or_(
                    Business.city.ilike(location_lower),
                    Business.postal_code.like(f"{location}%")
                )
            )
        # If location is "standort" but no coordinates provided, return empty results
        elif location and location.lower() == "standort" and not (lat and lon):
            return [], 0
        
        # Geo-distance filter (if coordinates provided)
        if lat and lon and Business.geometry is not None:
            point = ST_GeogFromText(f'POINT({lon} {lat})')
            # Filter by radius
            query = query.filter(
                ST_DWithin(Business.geometry, point, radius_km * 1000)  # meters
            )
            
            # Add distance for sorting
            if sort_by == "distance":
                query = query.order_by(ST_Distance(Business.geometry, point))
        
        # Sort by name if requested
        if sort_by == "name":
            query = query.order_by(Business.name)
        
        # Get total count (only for first page to avoid expensive COUNT on every request)
        # For subsequent pages, frontend can use the total from page 1
        if page == 1:
            total = query.count()
        else:
            # For page > 1, estimate or return a large number
            # Frontend already has the total from page 1
            total = page * page_size  # Rough estimate
        
        # Pagination
        results = query.offset((page - 1) * page_size).limit(page_size).all()
        
        # Convert to BusinessSearchResult
        search_results = []
        for business in results:
            # Use latitude/longitude fields directly (no need to extract from geometry)
            lat_val = business.latitude
            lon_val = business.longitude
            
            # Parse categories from JSON text field
            branches = []
            if business.categories:
                try:
                    branches = json.loads(business.categories) if isinstance(business.categories, str) else business.categories
                except:
                    branches = []
            
            # Build full address with street (cleaned to remove duplicate house numbers)
            cleaned_street = clean_street_address(business.street_address)
            address_parts = []
            if cleaned_street:
                address_parts.append(cleaned_street)
            if business.postal_code:
                address_parts.append(business.postal_code)
            if business.city:
                address_parts.append(business.city)
            
            full_address = ", ".join(filter(None, address_parts)) if address_parts else ""
            
            # Calculate distance if search center coordinates are provided
            distance_km = None
            if lat and lon and lat_val and lon_val:
                distance_km = haversine_distance(lat, lon, lat_val, lon_val)
            
            result = BusinessSearchResult(
                id=str(business.id),
                name=business.name,
                address=full_address,
                city=business.city or "",
                postcode=business.postal_code or "",
                phone=business.phone,
                website=business.website,
                branches=branches if isinstance(branches, list) else [],
                lat=lat_val,
                lon=lon_val,
                distance_km=distance_km
            )
            search_results.append(result)
        
        return search_results, total
    
    def get_business_by_id(self, business_id: str) -> Optional[Business]:
        """Get business by ID from PostgreSQL"""
        return self.db.query(Business).filter(Business.id == business_id).first()
    
    def autocomplete_cities(self, prefix: str, limit: int = 10) -> List[str]:
        """Get city autocomplete suggestions"""
        
        # Try Elasticsearch first
        if self.use_elasticsearch:
            try:
                return autocomplete_location(prefix, limit)
            except:
                pass
        
        # PostgreSQL fallback
        results = self.db.query(Business.city).filter(
            Business.city.ilike(f"{prefix}%")
        ).distinct().limit(limit).all()
        
        return [r[0] for r in results]


def run_migration(ndjson_file: str, max_records: Optional[int] = None):
    """Run the migration"""
    migrator = DataMigrator(ndjson_file)
    migrator.migrate(max_records=max_records)


if __name__ == "__main__":
    # Example usage
    data_file = "../data/raw/gsbestand-559.json"
    
    print("🚀 Starting migration...")
    print("⚠️  This will take a while for large datasets")
    print("💡 Tip: Use --limit 1000 for testing")
    print()
    
    import sys
    if len(sys.argv) > 1 and sys.argv[1] == "--help":
        print("Usage: python migrate_data_to_db.py [--limit N]")
        print()
        print("Options:")
        print("  --limit N    Migrate only first N records (for testing)")
        print()
        sys.exit(0)
    
    limit = None
    if "--limit" in sys.argv:
        idx = sys.argv.index("--limit")
        if idx + 1 < len(sys.argv):
            limit = int(sys.argv[idx + 1])
    
    run_migration(data_file, max_records=limit)
