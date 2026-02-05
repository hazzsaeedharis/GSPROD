import json
import os
from typing import List, Optional
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut
from app.models.business import Business, BusinessSearchResult


class BusinessService:
    """Service for business search and data operations"""
    
    def __init__(self, data_file_path: str):
        self.data_file_path = data_file_path
        self.geocoder = Nominatim(user_agent="gelbeseiten_app")
        self._cache = {}
    
    def load_businesses(self, max_lines: Optional[int] = None) -> List[Business]:
        """
        Load businesses from NDJSON file
        
        Args:
            max_lines: Maximum number of lines to load (for testing)
        
        Returns:
            List of Business objects
        """
        businesses = []
        
        with open(self.data_file_path, 'r', encoding='utf-8') as f:
            for i, line in enumerate(f):
                if max_lines and i >= max_lines:
                    break
                
                try:
                    data = json.loads(line.strip())
                    business = Business(**data)
                    businesses.append(business)
                except Exception as e:
                    # Skip invalid lines
                    continue
        
        return businesses
    
    def search_businesses(
        self,
        keyword: Optional[str] = None,
        location: Optional[str] = None,
        page: int = 1,
        page_size: int = 20
    ) -> tuple[List[BusinessSearchResult], int]:
        """
        Search businesses by keyword and/or location
        
        Args:
            keyword: Search keyword (business name, branch, etc.)
            location: City or postcode
            page: Page number (1-indexed)
            page_size: Number of results per page
        
        Returns:
            Tuple of (results, total_count)
        """
        # Load businesses (in production, use a database)
        businesses = self.load_businesses()
        
        # Filter by keyword
        if keyword:
            keyword_lower = keyword.lower()
            businesses = [
                b for b in businesses
                if (
                    keyword_lower in b.verlagsdaten.kontaktinformationen.personListe[0].name.lower()
                    if b.verlagsdaten.kontaktinformationen.personListe else False
                )
            ]
        
        # Filter by location
        if location:
            location_lower = location.lower()
            businesses = [
                b for b in businesses
                if (
                    location_lower in b.verlagsdaten.kontaktinformationen.adresse.ortsname.lower()
                    or location_lower in b.verlagsdaten.kontaktinformationen.adresse.postleitzahl
                )
            ]
        
        total = len(businesses)
        
        # Pagination
        start = (page - 1) * page_size
        end = start + page_size
        page_businesses = businesses[start:end]
        
        # Convert to search results
        results = []
        for business in page_businesses:
            result = self._business_to_search_result(business)
            results.append(result)
        
        return results, total
    
    def get_business_by_id(self, business_id: str) -> Optional[Business]:
        """
        Get a business by ID
        
        Args:
            business_id: Business ID
        
        Returns:
            Business object or None
        """
        # Load businesses (in production, use a database)
        with open(self.data_file_path, 'r', encoding='utf-8') as f:
            for line in f:
                try:
                    data = json.loads(line.strip())
                    if data.get('_id') == business_id:
                        return Business(**data)
                except Exception:
                    continue
        
        return None
    
    def _business_to_search_result(self, business: Business) -> BusinessSearchResult:
        """Convert Business to BusinessSearchResult"""
        kontakt = business.verlagsdaten.kontaktinformationen
        person_name = kontakt.personListe[0].name if kontakt.personListe else ""
        address = kontakt.adresse
        
        # Build address string
        address_str = f"{address.postleitzahl} {address.ortsname}"
        
        # Geocode if not cached
        cache_key = f"{address.postleitzahl}_{address.ortsname}"
        if cache_key not in self._cache:
            try:
                location = self.geocoder.geocode(address_str, timeout=5)
                if location:
                    self._cache[cache_key] = (location.latitude, location.longitude)
                else:
                    self._cache[cache_key] = (None, None)
            except (GeocoderTimedOut, Exception):
                self._cache[cache_key] = (None, None)
        
        lat, lon = self._cache[cache_key]
        
        return BusinessSearchResult(
            id=business.id,
            name=person_name,
            address=address_str,
            city=address.ortsname,
            postcode=address.postleitzahl,
            branches=business.verlagsdaten.branchenIdListe,
            lat=lat,
            lon=lon
        )
