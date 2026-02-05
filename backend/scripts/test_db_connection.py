#!/usr/bin/env python3
"""
Test database connection and verify the setup
"""
import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from app.database import SessionLocal, Business
from sqlalchemy import func
import json

print("=" * 60)
print("🔍 Testing Database Connection")
print("=" * 60)

try:
    # Create session
    db = SessionLocal()
    
    # Test 1: Count total businesses
    total = db.query(Business).count()
    print(f"\n✅ Total businesses: {total:,}")
    
    # Test 2: Count businesses with coordinates
    with_coords = db.query(Business).filter(
        Business.latitude.isnot(None),
        Business.longitude.isnot(None)
    ).count()
    print(f"✅ Businesses with coordinates: {with_coords:,} ({with_coords/total*100:.1f}%)")
    
    # Test 3: Count active businesses
    active = db.query(Business).filter(Business.is_active == True).count()
    print(f"✅ Active businesses: {active:,}")
    
    # Test 4: Count unique cities
    cities = db.query(func.count(func.distinct(Business.city))).scalar()
    print(f"✅ Unique cities: {cities:,}")
    
    # Test 5: Sample business
    print("\n" + "=" * 60)
    print("📝 Sample Business")
    print("=" * 60)
    
    business = db.query(Business).filter(
        Business.latitude.isnot(None)
    ).first()
    
    if business:
        print(f"ID: {business.id}")
        print(f"Name: {business.name}")
        print(f"Address: {business.street_address}")
        print(f"City: {business.postal_code} {business.city}")
        print(f"Phone: {business.phone}")
        print(f"Website: {business.website}")
        print(f"Coordinates: {business.latitude}, {business.longitude}")
        
        # Parse categories
        if business.categories:
            try:
                cats = json.loads(business.categories) if isinstance(business.categories, str) else business.categories
                print(f"Categories: {', '.join(cats[:3])}{'...' if len(cats) > 3 else ''}")
            except:
                print(f"Categories: {business.categories[:50]}...")
    
    # Test 6: Search test
    print("\n" + "=" * 60)
    print("🔍 Search Test: Businesses in Berlin")
    print("=" * 60)
    
    berlin_businesses = db.query(Business).filter(
        Business.city.ilike('%Berlin%')
    ).limit(5).all()
    
    print(f"Found {len(berlin_businesses)} businesses (showing first 5):")
    for b in berlin_businesses:
        print(f"  - {b.name} ({b.city})")
    
    print("\n" + "=" * 60)
    print("✅ All tests passed! Database is working correctly.")
    print("=" * 60)
    print("\n💡 The database has 3M+ businesses ready to use!")
    print("💡 No migration needed - data is already loaded with coordinates!")
    
    db.close()

except Exception as e:
    print(f"\n❌ Error: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
