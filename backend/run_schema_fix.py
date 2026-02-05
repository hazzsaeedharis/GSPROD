#!/usr/bin/env python3
"""
Fix Supabase database schema to match SQLAlchemy models
"""

import os
import psycopg2
from psycopg2 import sql

# Get database URL from environment
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    print("❌ ERROR: DATABASE_URL environment variable not set!")
    print("   Set it with: export DATABASE_URL='your-supabase-connection-string'")
    exit(1)

print("🔧 Fixing database schema...")
print(f"📊 Connecting to database...")

try:
    # Connect to database
    conn = psycopg2.connect(DATABASE_URL)
    conn.autocommit = True
    cursor = conn.cursor()
    
    # Read SQL file
    with open('fix_schema.sql', 'r') as f:
        sql_script = f.read()
    
    print("🗑️  Dropping old tables...")
    print("🏗️  Creating new schema...")
    print("📇 Creating indexes...")
    print("⚙️  Setting up triggers...")
    
    # Execute the SQL script
    cursor.execute(sql_script)
    
    # Verify the table was created
    cursor.execute("""
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = 'businesses'
        ORDER BY ordinal_position;
    """)
    
    columns = cursor.fetchall()
    
    print("\n✅ Schema fixed successfully!")
    print(f"\n📋 Businesses table columns ({len(columns)}):")
    for col_name, col_type in columns:
        print(f"   - {col_name}: {col_type}")
    
    # Close connection
    cursor.close()
    conn.close()
    
    print("\n🎉 Database is ready!")
    print("   You can now import business data.")
    
except psycopg2.OperationalError as e:
    print(f"❌ Connection error: {e}")
    print("   Make sure your DATABASE_URL is correct and the database is accessible.")
    exit(1)
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
    exit(1)
