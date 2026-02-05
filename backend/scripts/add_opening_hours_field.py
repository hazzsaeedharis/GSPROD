#!/usr/bin/env python3
"""
Add opening_hours field to businesses table if it doesn't exist
"""
import psycopg2
import psycopg2.extras
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import json

# Database connection parameters
DB_CONFIG = {
    'dbname': 'events_db',
    'user': 'postgres',
    'password': 'password',
    'host': 'localhost',
    'port': 5432
}

def add_opening_hours_field():
    """Add opening_hours JSONB field to businesses table"""
    try:
        # Connect to database
        conn = psycopg2.connect(**DB_CONFIG)
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cursor = conn.cursor()
        
        print("=" * 80)
        print("🔧 ADDING OPENING_HOURS FIELD TO BUSINESSES TABLE")
        print("=" * 80)
        
        # Check if column already exists
        cursor.execute("""
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'businesses' 
            AND column_name = 'opening_hours';
        """)
        
        if cursor.fetchone():
            print("\n✅ Column 'opening_hours' already exists in businesses table")
            print("   No changes needed.")
        else:
            print("\n📝 Adding 'opening_hours' column...")
            
            # Add the column
            cursor.execute("""
                ALTER TABLE businesses 
                ADD COLUMN opening_hours JSONB;
            """)
            
            print("✅ Column 'opening_hours' added successfully!")
            
            # Create an index for better query performance
            print("\n📝 Creating index on opening_hours column...")
            cursor.execute("""
                CREATE INDEX IF NOT EXISTS idx_businesses_opening_hours 
                ON businesses USING GIN (opening_hours);
            """)
            
            print("✅ Index created successfully!")
            
            # Add a comment to the column
            cursor.execute("""
                COMMENT ON COLUMN businesses.opening_hours IS 
                'Opening hours in JSONB format: {"Montag": "09:00-18:00", "Dienstag": "09:00-18:00", ...}';
            """)
            
            print("✅ Column comment added!")
        
        # Show sample data structure
        print("\n" + "=" * 80)
        print("📋 OPENING HOURS DATA STRUCTURE")
        print("=" * 80)
        print("""
Expected JSON format:
{
  "Montag": "09:00-18:00",
  "Dienstag": "09:00-18:00",
  "Mittwoch": "09:00-18:00",
  "Donnerstag": "09:00-18:00",
  "Freitag": "09:00-17:00",
  "Samstag": "10:00-14:00",
  "Sonntag": "Geschlossen"
}

Or for businesses with multiple time slots:
{
  "Montag": "09:00-12:00, 14:00-18:00",
  "Dienstag": "09:00-12:00, 14:00-18:00",
  ...
}
        """)
        
        # Example: Update a sample business with opening hours
        print("\n" + "=" * 80)
        print("📝 EXAMPLE: Adding opening hours to a sample business")
        print("=" * 80)
        
        cursor.execute("""
            SELECT id, name FROM businesses 
            WHERE opening_hours IS NULL 
            LIMIT 1;
        """)
        
        sample_business = cursor.fetchone()
        
        if sample_business:
            business_id, business_name = sample_business
            print(f"\nSample business: {business_name} (ID: {business_id})")
            print("Adding example opening hours...")
            
            example_hours = {
                "Montag": "09:00-18:00",
                "Dienstag": "09:00-18:00",
                "Mittwoch": "09:00-18:00",
                "Donnerstag": "09:00-18:00",
                "Freitag": "09:00-17:00",
                "Samstag": "Geschlossen",
                "Sonntag": "Geschlossen"
            }
            
            cursor.execute("""
                UPDATE businesses 
                SET opening_hours = %s::jsonb 
                WHERE id = %s;
            """, (json.dumps(example_hours), business_id))
            
            print(f"✅ Example opening hours added to business ID {business_id}")
            print(f"   You can view it at: http://localhost:3000/gsbiz/{business_id}")
        else:
            print("\nℹ️  No businesses found to add example opening hours")
        
        print("\n" + "=" * 80)
        print("✅ MIGRATION COMPLETED SUCCESSFULLY!")
        print("=" * 80)
        print("\nNext steps:")
        print("1. Opening hours can now be stored in the database")
        print("2. Update your data import scripts to include opening hours")
        print("3. The frontend modal will automatically display opening hours when available")
        
        cursor.close()
        conn.close()
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    add_opening_hours_field()
