from pydantic import BaseModel, Field
from typing import List, Optional


class Address(BaseModel):
    """Address information for a business"""
    kgs: Optional[str] = None
    postleitzahl: str
    ortsname: str
    strasse: Optional[str] = None
    hausnummer: Optional[str] = None


class Person(BaseModel):
    """Person information for a business"""
    name: str
    berufsbezeichnungAnzeige: bool = False


class Kontaktinformationen(BaseModel):
    """Contact information for a business"""
    personListe: List[Person]
    adresse: Address
    telefon: Optional[str] = None
    email: Optional[str] = None
    website: Optional[str] = None


class Verlagsinformationen(BaseModel):
    """Publishing information"""
    verlagskunde: bool = False
    verlag: str


class Suche(BaseModel):
    """Search-related information"""
    keywortKategorieListe: List[str] = []
    ttfKeywortListe: List[str] = []


class ExterneDatenquelle(BaseModel):
    """External data source information"""
    typ: str
    quelleId: str


class Verlagsdaten(BaseModel):
    """Publishing data for a business"""
    kontaktinformationen: Kontaktinformationen
    verlagsinformationen: Verlagsinformationen
    freitextListe: List[str] = []
    branchenIdListe: List[str] = []
    externeDatenquellenListe: List[ExterneDatenquelle] = []
    suche: Suche


class Eintragsinformationen(BaseModel):
    """Entry information"""
    kooperationspartner: str
    buchnummer: str


class Business(BaseModel):
    """Complete business record"""
    id: str = Field(alias="_id")
    verlagsdaten: Verlagsdaten
    eintragsinformationen: Eintragsinformationen
    
    class Config:
        populate_by_name = True


class BusinessSearchResult(BaseModel):
    """Simplified business search result"""
    id: str
    name: str
    address: str
    city: str
    postcode: str
    phone: Optional[str] = None
    website: Optional[str] = None
    branches: List[str] = []
    lat: Optional[float] = None
    lon: Optional[float] = None
    distance_km: Optional[float] = None  # Distance from search center in kilometers


class SearchResponse(BaseModel):
    """Search API response"""
    total: int
    results: List[BusinessSearchResult]
    page: int
    page_size: int
