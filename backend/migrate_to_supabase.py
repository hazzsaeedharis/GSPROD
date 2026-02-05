#!/usr/bin/env python3
"""
Migrate data from local PostgreSQL to Supabase
Copies businesses table from events_db to Supabase
"""

import psycopg2
from psycopg2.extras import execute_batch
import os
from urllib.parse import quote_plus

# Source database (local)
SOURCE_CONFIG = {
    'host': 'localhost',
    'database': 'events_db',
    'user': 'postgres',
    'password': 'password'
}

# Target database (Supabase) - with URL-encoded password
password_encoded = quote_plus('S2nCV&a7NFF*4@DN40fAK@yj2%qVtxStGZSm')
TARGET_DSN = f'postgresql://postgres.kwikmyspjxwzmfwhlrfy:{password_encoded}@aws-1-eu-central-1.pooler.supabase.com:6543/postgres'


def migrate_data(batch_size=1000, max_records=None, clear_existing=False):
    """Migrate data from local to Supabase"""
    
    print("=" * 70)
    print("Data Migration: Local PostgreSQL → Supabase")
    print("=" * 70)
    
    # Connect to source
    print("\n📊 Connecting to local database...")
    source_conn = psycopg2.connect(**SOURCE_CONFIG)
    source_cursor = source_conn.cursor()
    
    # Connect to target
    print("☁️  Connecting to Supabase...")
    target_conn = psycopg2.connect(TARGET_DSN)
    target_conn.autocommit = False
    target_cursor = target_conn.cursor()
    
    try:
        # Get total count
        source_cursor.execute("SELECT COUNT(*) FROM businesses;")
        total_count = source_cursor.fetchone()[0]
        records_to_migrate = min(total_count, max_records) if max_records else total_count
        
        print(f"\n📈 Total records in source: {total_count:,}")
        print(f"📤 Records to migrate: {records_to_migrate:,}")
        print(f"📦 Batch size: {batch_size:,}")
        print("=" * 70)
        
        # Check if target has data
        target_cursor.execute("SELECT COUNT(*) FROM businesses;")
        existing_count = target_cursor.fetchone()[0]
        
        if existing_count > 0:
            print(f"\n⚠️  Warning: Target database already has {existing_count:,} records")
            if clear_existing:
                print("🗑️  Clearing existing data...")
                target_cursor.execute("TRUNCATE TABLE businesses RESTART IDENTITY CASCADE;")
                target_conn.commit()
                print("✅ Existing data cleared")
            else:
                print("⚠️  Will skip duplicate IDs (use --clear to remove existing data)")
        
        # Prepare SELECT query
        limit_clause = f"LIMIT {max_records}" if max_records else ""
        source_cursor.execute(f"""
            SELECT 
                id, name, street_address, postal_code, city, district,
                categories, phone, email, website, latitude, longitude,
                ST_AsText(geometry) as geometry_wkt, search_vector::text,
                is_active, embedding, opening_hours
            FROM businesses
            ORDER BY id
            {limit_clause};
        """)
        
        # Prepare INSERT query
        insert_query = """
            INSERT INTO businesses (
                id, name, street_address, postal_code, city, district,
                categories, phone, email, website, latitude, longitude,
                geometry, is_active, embedding, opening_hours
            ) VALUES (
                %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,
                ST_GeomFromText(%s, 4326), %s, %s, %s
            )
            ON CONFLICT (id) DO NOTHING;
        """
        
        # Migrate in batches
        migrated = 0
        skipped = 0
        batch = []
        
        print(f"\n🚀 Starting migration...")
        
        for row in source_cursor:
            # Prepare row (exclude search_vector as it's auto-generated)
            id_val, name, street_addr, postal, city, district, categories, \
            phone, email, website, lat, lon, geom_wkt, search_vec, \
            is_active, embedding, opening_hours = row
            
            batch.append((
                id_val, name, street_addr, postal, city, district, categories,
                phone, email, website, lat, lon, geom_wkt, is_active, embedding, opening_hours
            ))
            
            # Execute batch
            if len(batch) >= batch_size:
                try:
                    execute_batch(target_cursor, insert_query, batch)
                    target_conn.commit()
                    migrated += len(batch)
                    print(f"✅ Migrated: {migrated:,} / {records_to_migrate:,} ({migrated/records_to_migrate*100:.1f}%)")
                except Exception as e:
                    print(f"⚠️  Batch error: {e}")
                    target_conn.rollback()
                    skipped += len(batch)
                
                batch = []
        
        # Insert remaining records
        if batch:
            try:
                execute_batch(target_cursor, insert_query, batch)
                target_conn.commit()
                migrated += len(batch)
                print(f"✅ Migrated: {migrated:,} / {records_to_migrate:,} (100%)")
            except Exception as e:
                print(f"⚠️  Final batch error: {e}")
                target_conn.rollback()
                skipped += len(batch)
        
        # Summary
        print("\n" + "=" * 70)
        print("📊 Migration Summary")
        print("=" * 70)
        print(f"✅ Successfully migrated: {migrated:,} records")
        if skipped > 0:
            print(f"⚠️  Skipped (duplicates/errors): {skipped:,} records")
        print("=" * 70)
        
        # Verify
        target_cursor.execute("SELECT COUNT(*) FROM businesses;")
        final_count = target_cursor.fetchone()[0]
        print(f"\n✅ Supabase now has {final_count:,} businesses")
        
        print("\n🎉 Migration completed successfully!")
        
    except Exception as e:
        print(f"\n❌ Migration failed: {e}")
        import traceback
        traceback.print_exc()
        target_conn.rollback()
        raise
    
    finally:
        source_cursor.close()
        source_conn.close()
        target_cursor.close()
        target_conn.close()


if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description='Migrate businesses from local PostgreSQL to Supabase')
    parser.add_argument('--batch-size', type=int, default=1000, help='Batch size for inserts (default: 1000)')
    parser.add_argument('--limit', type=int, default=None, help='Limit number of records to migrate (for testing)')
    parser.add_argument('--all', action='store_true', help='Migrate all 2.9M records (takes time!)')
    parser.add_argument('--clear', action='store_true', help='Clear existing data before migration')
    
    args = parser.parse_args()
    
    if not args.all and not args.limit:
        print("⚠️  Warning: Migrating 2,983,205 records will take significant time!")
        print("   Use --limit 1000 for testing or --all to confirm full migration")
        print("\nExample usage:")
        print("  python migrate_to_supabase.py --limit 1000        # Test with 1000 records")
        print("  python migrate_to_supabase.py --all              # Migrate all records")
        exit(1)
    
    max_records = args.limit if args.limit else None
    
    migrate_data(batch_size=args.batch_size, max_records=max_records, clear_existing=args.clear)
