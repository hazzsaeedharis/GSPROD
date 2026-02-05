#!/usr/bin/env python3
"""
Updated Data Import Script
Imports business data to PostgreSQL with correct schema
Matches the new database.py Business model
"""

import json
import sys
import os
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from sqlalchemy.orm import Session
from geoalchemy2 import WKTElement
from app.database import engine, Business, SessionLocal
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut
import time
from sqlalchemy import text


class BusinessImporter:
    """Import business data to PostgreSQL"""
    
    def __init__(self, ndjson_file: str, skip_geocoding: bool = False):
        self.ndjson_file = ndjson_file
        self.skip_geocoding = skip_geocoding
        self.geocoder = None if skip_geocoding else Nominatim(user_agent="gelbeseiten_import")
        self.geocode_cache = {}
        
    def geocode_address(self, street: str, postcode: str, city: str) -> tuple:
        """Geocode address to lat/lon with caching"""
        if self.skip_geocoding:
            return (None, None)
            
        cache_key = f"{postcode}_{city}"
        
        if cache_key in self.geocode_cache:
            return self.geocode_cache[cache_key]
        
        try:
            address = f"{street}, {postcode} {city}, Germany" if street else f"{postcode} {city}, Germany"
            location = self.geocoder.geocode(address, timeout=10)
            
            if location:
                coords = (location.latitude, location.longitude)
                self.geocode_cache[cache_key] = coords
                time.sleep(1)  # Respect Nominatim rate limit
                return coords
            else:
                self.geocode_cache[cache_key] = (None, None)
                return (None, None)
        except (GeocoderTimedOut, Exception) as e:
            print(f"Geocoding error for {cache_key}: {e}")
            self.geocode_cache[cache_key] = (None, None)
            return (None, None)
    
    def import_data(self, max_records: int = None):
        """Main import function"""
        
        print("=" * 60)
        print("Gelbe Seiten Data Import")
        print("NDJSON → PostgreSQL (Supabase)")
        print("=" * 60)
        
        # Open database session
        db: Session = SessionLocal()
        
        # Counters
        total_processed = 0
        total_inserted = 0
        total_skipped = 0
        
        print(f"\n📖 Reading data from: {self.ndjson_file}")
        print("=" * 60)
        
        try:
            with open(self.ndjson_file, 'r', encoding='utf-8') as f:
                for line_num, line in enumerate(f, 1):
                    if max_records and total_processed >= max_records:
                        break
                    
                    try:
                        data = json.loads(line.strip())
                        
                        # Extract data from NDJSON structure
                        business_id = data.get('_id')
                        verlagsdaten = data.get('verlagsdaten', {})
                        kontakt = verlagsdaten.get('kontaktinformationen', {})
                        person_list = kontakt.get('personListe', [])
                        adresse = kontakt.get('adresse', {})
                        
                        # Get business name
                        name = person_list[0]['name'] if person_list else f"Business_{business_id}"
                        
                        # Get address components
                        street = adresse.get('strasse', '')
                        house_number = adresse.get('hausnummer', '')
                        street_address = f"{street} {house_number}".strip() if street or house_number else None
                        
                        postal_code = adresse.get('postleitzahl', '')
                        city = adresse.get('ortsname', '')
                        district = adresse.get('kgs', '')  # Using KGS as district
                        
                        # Get contact info
                        phone = kontakt.get('telefon')
                        email = kontakt.get('email')
                        website = kontakt.get('website')
                        
                        # Get categories/branches
                        branch_ids = verlagsdaten.get('branchenIdListe', [])
                        categories_json = json.dumps(branch_ids) if branch_ids else None
                        
                        # Geocode
                        lat, lon = self.geocode_address(street_address, postal_code, city) if postal_code and city else (None, None)
                        
                        # Create PostGIS point
                        geometry_wkt = None
                        if lat and lon:
                            geometry_wkt = WKTElement(f'POINT({lon} {lat})', srid=4326)
                        
                        # Check if business already exists
                        existing = db.query(Business).filter(Business.id == business_id).first()
                        
                        if existing:
                            total_skipped += 1
                            continue
                        
                        # Create Business object matching new schema
                        business = Business(
                            id=business_id,
                            name=name,
                            street_address=street_address,
                            postal_code=postal_code,
                            city=city,
                            district=district,
                            categories=categories_json,  # JSON array as text
                            phone=phone,
                            email=email,
                            website=website,
                            latitude=lat,
                            longitude=lon,
                            geometry=geometry_wkt,
                            is_active=True,
                            # search_vector will be auto-generated by trigger
                            # embedding and opening_hours are optional
                        )
                        
                        # Add to database
                        db.add(business)
                        
                        total_inserted += 1
                        total_processed += 1
                        
                        # Commit in batches
                        if total_processed % 100 == 0:
                            db.commit()
                            print(f"✅ Processed: {total_processed} | Inserted: {total_inserted} | Skipped: {total_skipped}")
                        
                    except Exception as e:
                        print(f"❌ Error on line {line_num}: {e}")
                        total_skipped += 1
                        continue
            
            # Final commit
            db.commit()
            
            print("\n" + "=" * 60)
            print("📊 Import Summary")
            print("=" * 60)
            print(f"Total Processed: {total_processed}")
            print(f"Total Inserted:  {total_inserted}")
            print(f"Total Skipped:   {total_skipped}")
            print("=" * 60)
            print("✅ Import completed successfully!")
            
        except Exception as e:
            print(f"\n❌ Import failed: {e}")
            import traceback
            traceback.print_exc()
            db.rollback()
            raise
        finally:
            db.close()


def main():
    """Run import"""
    import argparse
    
    parser = argparse.ArgumentParser(description='Import Gelbe Seiten data to PostgreSQL')
    parser.add_argument('--file', type=str, required=True, help='NDJSON file path')
    parser.add_argument('--limit', type=int, default=None, help='Limit number of records (for testing)')
    parser.add_argument('--skip-geocoding', action='store_true', help='Skip geocoding (faster, no coordinates)')
    
    args = parser.parse_args()
    
    # Get absolute path
    file_path = Path(args.file).resolve()
    
    if not file_path.exists():
        print(f"❌ Error: File not found: {file_path}")
        sys.exit(1)
    
    print(f"📁 Data file: {file_path}")
    print(f"📏 File size: {file_path.stat().st_size / (1024**2):.2f} MB")
    
    if args.limit:
        print(f"⚠️  Limiting to {args.limit} records for testing")
    
    if args.skip_geocoding:
        print(f"⚠️  Geocoding disabled - coordinates will be NULL")
    
    importer = BusinessImporter(str(file_path), skip_geocoding=args.skip_geocoding)
    importer.import_data(max_records=args.limit)


if __name__ == "__main__":
    main()
