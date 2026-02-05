#!/usr/bin/env python3
"""
Data Migration Script
Migrates business data from NDJSON file to PostgreSQL + Elasticsearch
"""

import json
import sys
import os
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from sqlalchemy.orm import Session
from geoalchemy2 import WKTElement
from app.database import engine, Business, Branch, SessionLocal, init_db
from app.elasticsearch_client import init_elasticsearch, bulk_index_businesses, es_client
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut
import time


class DataMigrator:
    """Migrate data from NDJSON to PostgreSQL + Elasticsearch"""
    
    def __init__(self, ndjson_file: str):
        self.ndjson_file = ndjson_file
        self.geocoder = Nominatim(user_agent="gelbeseiten_migration")
        self.geocode_cache = {}
        self.branch_cache = {}
        
    def geocode_address(self, postcode: str, city: str) -> tuple:
        """Geocode address to lat/lon with caching"""
        cache_key = f"{postcode}_{city}"
        
        if cache_key in self.geocode_cache:
            return self.geocode_cache[cache_key]
        
        try:
            address = f"{postcode} {city}, Germany"
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
    
    def migrate(self, max_records: int = None):
        """Main migration function"""
        
        print("=" * 60)
        print("Gelbe Seiten Data Migration")
        print("NDJSON → PostgreSQL + Elasticsearch")
        print("=" * 60)
        
        # Database should already be set up via Alembic
        print("\n📊 Connecting to PostgreSQL...")
        # Tables created via: alembic upgrade head
        
        # Initialize Elasticsearch
        print("\n🔍 Initializing Elasticsearch...")
        es_available = False
        try:
            init_elasticsearch()
            es_available = True
        except Exception as e:
            print(f"⚠️  Elasticsearch not available, skipping")
            print("ℹ️  Migration will continue with PostgreSQL only")
        
        # Open database session
        db: Session = SessionLocal()
        
        # Counters
        total_processed = 0
        total_inserted = 0
        total_skipped = 0
        businesses_for_es = []
        
        print(f"\n📖 Reading data from: {self.ndjson_file}")
        print("=" * 60)
        
        try:
            with open(self.ndjson_file, 'r', encoding='utf-8') as f:
                for line_num, line in enumerate(f, 1):
                    if max_records and total_processed >= max_records:
                        break
                    
                    try:
                        data = json.loads(line.strip())
                        
                        # Extract data
                        business_id = data.get('_id')
                        verlagsdaten = data.get('verlagsdaten', {})
                        kontakt = verlagsdaten.get('kontaktinformationen', {})
                        person_list = kontakt.get('personListe', [])
                        adresse = kontakt.get('adresse', {})
                        eintrag = data.get('eintragsinformationen', {})
                        verlagsinfo = verlagsdaten.get('verlagsinformationen', {})
                        
                        # Get business name
                        name = person_list[0]['name'] if person_list else f"Business_{business_id}"
                        
                        # Get address components
                        postcode = adresse.get('postleitzahl', '')
                        city = adresse.get('ortsname', '')
                        kgs = adresse.get('kgs')
                        street = adresse.get('strasse')
                        house_number = adresse.get('hausnummer')
                        
                        # Get contact info
                        phone = kontakt.get('telefon')
                        email = kontakt.get('email')
                        website = kontakt.get('website')
                        
                        # Geocode
                        lat, lon = self.geocode_address(postcode, city) if postcode and city else (None, None)
                        
                        # Create PostGIS point
                        location_wkt = None
                        if lat and lon:
                            location_wkt = WKTElement(f'POINT({lon} {lat})', srid=4326)
                        
                        # Check if business already exists (handle duplicates)
                        existing = db.query(Business).filter(Business.id == business_id).first()
                        
                        if existing:
                            # Skip duplicates
                            total_skipped += 1
                            continue
                        
                        # Create Business object
                        business = Business(
                            id=business_id,
                            name=name,
                            street=street,
                            house_number=house_number,
                            postcode=postcode,
                            city=city,
                            kgs=kgs,
                            phone=phone,
                            email=email,
                            website=website,
                            location=location_wkt,
                            verlag=verlagsinfo.get('verlag'),
                            verlagskunde=verlagsinfo.get('verlagskunde', False),
                            kooperationspartner=eintrag.get('kooperationspartner'),
                            buchnummer=eintrag.get('buchnummer')
                        )
                        
                        # Add to database
                        db.add(business)
                        
                        # Handle branches
                        branch_ids = verlagsdaten.get('branchenIdListe', [])
                        for branch_id in branch_ids:
                            if branch_id not in self.branch_cache:
                                # Check if branch exists
                                branch = db.query(Branch).filter(Branch.id == branch_id).first()
                                if not branch:
                                    branch = Branch(id=branch_id, name=f"Branch {branch_id}")
                                    db.add(branch)
                                    db.flush()
                                self.branch_cache[branch_id] = branch
                            
                            business.branches.append(self.branch_cache[branch_id])
                        
                        # Prepare for Elasticsearch
                        es_doc = {
                            "id": business_id,
                            "name": name,
                            "street": street,
                            "house_number": house_number,
                            "postcode": postcode,
                            "city": city,
                            "phone": phone,
                            "email": email,
                            "website": website,
                            "branch_ids": branch_ids,
                            "branches": [f"Branch {bid}" for bid in branch_ids]
                        }
                        
                        if lat and lon:
                            es_doc["location"] = {"lat": lat, "lon": lon}
                        
                        businesses_for_es.append(es_doc)
                        
                        total_inserted += 1
                        total_processed += 1
                        
                        # Commit in batches
                        if total_processed % 100 == 0:
                            db.commit()
                            
                            # Bulk index to Elasticsearch (if available)
                            if es_available and businesses_for_es:
                                try:
                                    bulk_index_businesses(businesses_for_es)
                                except:
                                    pass  # Skip ES errors
                                businesses_for_es = []
                            
                            print(f"✅ Processed: {total_processed} | Inserted: {total_inserted} | Skipped: {total_skipped}")
                        
                    except Exception as e:
                        print(f"❌ Error on line {line_num}: {e}")
                        total_skipped += 1
                        continue
            
            # Final commit
            db.commit()
            
            # Final Elasticsearch bulk index (if available)
            if es_available and businesses_for_es:
                try:
                    bulk_index_businesses(businesses_for_es)
                except:
                    pass  # Skip ES errors
            
            print("\n" + "=" * 60)
            print("📊 Migration Summary")
            print("=" * 60)
            print(f"Total Processed: {total_processed}")
            print(f"Total Inserted:  {total_inserted}")
            print(f"Total Skipped:   {total_skipped}")
            print(f"Unique Branches: {len(self.branch_cache)}")
            print("=" * 60)
            print("✅ Migration completed successfully!")
            
        except Exception as e:
            print(f"\n❌ Migration failed: {e}")
            db.rollback()
            raise
        finally:
            db.close()


def main():
    """Run migration"""
    import argparse
    
    parser = argparse.ArgumentParser(description='Migrate Gelbe Seiten data to PostgreSQL + Elasticsearch')
    parser.add_argument('--file', type=str, default='../data/raw/gsbestand-559.json', help='NDJSON file path')
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
    
    migrator = DataMigrator(str(file_path))
    migrator.migrate(max_records=args.limit)


if __name__ == "__main__":
    main()
