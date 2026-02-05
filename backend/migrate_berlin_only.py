#!/usr/bin/env python3
"""
Migrate ONLY Berlin businesses from local PostgreSQL to Supabase.
This supplements the existing 750K records with additional Berlin data.
"""

import psycopg2
from psycopg2.extras import execute_batch
from urllib.parse import quote_plus
import sys

def migrate_berlin_businesses(batch_size=5000):
    """Migrate only Berlin businesses that aren't already in Supabase"""
    
    # Target: Supabase (with URL-encoded password)
    password_encoded = quote_plus('S2nCV&a7NFF*4@DN40fAK@yj2%qVtxStGZSm')
    target_dsn = f'postgresql://postgres.kwikmyspjxwzmfwhlrfy:{password_encoded}@aws-1-eu-central-1.pooler.supabase.com:6543/postgres'
    
    try:
        print("=" * 70)
        print("Berlin Business Migration: Local PostgreSQL → Supabase")
        print("=" * 70)
        
        # Connect to both databases
        print("\n📊 Connecting to local database...")
        source_conn = psycopg2.connect(
            host='localhost',
            port=5432,
            database='events_db',
            user='test@email.com',
            password='password'
        )
        source_cursor = source_conn.cursor()
        
        print("☁️  Connecting to Supabase...")
        target_conn = psycopg2.connect(target_dsn)
        target_cursor = target_conn.cursor()
        
        # Count Berlin businesses in source
        print("\n📈 Counting Berlin businesses in local database...")
        source_cursor.execute("""
            SELECT COUNT(*) 
            FROM businesses 
            WHERE city = 'Berlin';
        """)
        total_berlin = source_cursor.fetchone()[0]
        print(f"   Total Berlin businesses in local: {total_berlin:,}")
        
        # Count current Berlin businesses in target
        target_cursor.execute("""
            SELECT COUNT(*) 
            FROM businesses 
            WHERE city = 'Berlin';
        """)
        existing_berlin = target_cursor.fetchone()[0]
        print(f"   Berlin businesses already in Supabase: {existing_berlin:,}")
        print(f"   Potential new records: {total_berlin - existing_berlin:,}")
        
        # Count total in target before migration
        target_cursor.execute("SELECT COUNT(*) FROM businesses;")
        initial_count = target_cursor.fetchone()[0]
        print(f"   Total businesses in Supabase now: {initial_count:,}")
        
        print("=" * 70)
        print("\n🚀 Starting Berlin-only migration...")
        print(f"📦 Batch size: {batch_size:,}\n")
        
        # Fetch and migrate Berlin businesses in batches
        offset = 0
        total_migrated = 0
        total_skipped = 0
        
        while True:
            # Fetch batch of Berlin businesses
            source_cursor.execute("""
                SELECT 
                    id, name, street_address, postal_code, city, district,
                    categories, phone, email, website,
                    latitude, longitude, 
                    ST_AsText(geometry) as geometry_wkt,
                    is_active, embedding, opening_hours
                FROM businesses
                WHERE city = 'Berlin'
                ORDER BY id
                LIMIT %s OFFSET %s;
            """, (batch_size, offset))
            
            batch = source_cursor.fetchall()
            
            if not batch:
                break
            
            # Prepare insert query with ON CONFLICT to skip duplicates
            insert_query = """
                INSERT INTO businesses (
                    id, name, street_address, postal_code, city, district,
                    categories, phone, email, website,
                    latitude, longitude, geometry,
                    is_active, embedding, opening_hours
                ) VALUES (
                    %s, %s, %s, %s, %s, %s,
                    %s, %s, %s, %s,
                    %s, %s, ST_GeomFromText(%s, 4326),
                    %s, %s, %s
                )
                ON CONFLICT (id) DO NOTHING;
            """
            
            # Prepare data for batch insert
            data = []
            for row in batch:
                (id_, name, street_address, postal_code, city, district,
                 categories, phone, email, website,
                 latitude, longitude, geometry_wkt,
                 is_active, embedding, opening_hours) = row
                
                data.append((
                    id_, name, street_address, postal_code, city, district,
                    categories, phone, email, website,
                    latitude, longitude, geometry_wkt,
                    is_active, embedding, opening_hours
                ))
            
            try:
                # Execute batch insert
                execute_batch(target_cursor, insert_query, data, page_size=batch_size)
                target_conn.commit()
                
                # Count how many were actually inserted (not skipped due to duplicates)
                rowcount = target_cursor.rowcount
                total_migrated += len(batch)
                skipped_in_batch = len(batch) - max(rowcount, 0)
                total_skipped += skipped_in_batch
                
                print(f"✅ Processed: {total_migrated:,} / {total_berlin:,} ({total_migrated/total_berlin*100:.1f}%) - Skipped duplicates: {total_skipped:,}")
                
            except Exception as e:
                print(f"⚠️  Batch error at offset {offset}: {str(e)[:100]}")
                target_conn.rollback()
            
            offset += batch_size
        
        # Final statistics
        print("\n" + "=" * 70)
        print("✅ Berlin Migration Complete!")
        print("=" * 70)
        
        # Count final totals
        target_cursor.execute("SELECT COUNT(*) FROM businesses;")
        final_count = target_cursor.fetchone()[0]
        
        target_cursor.execute("SELECT COUNT(*) FROM businesses WHERE city = 'Berlin';")
        final_berlin = target_cursor.fetchone()[0]
        
        new_records = final_count - initial_count
        
        print(f"\n📊 Results:")
        print(f"   Berlin businesses processed: {total_migrated:,}")
        print(f"   Duplicate IDs skipped: {total_skipped:,}")
        print(f"   New records added: {new_records:,}")
        print(f"   Berlin businesses in Supabase: {existing_berlin:,} → {final_berlin:,} (+{final_berlin - existing_berlin:,})")
        print(f"   Total businesses in Supabase: {initial_count:,} → {final_count:,}")
        
        # Check database size
        target_cursor.execute("SELECT pg_size_pretty(pg_database_size('postgres')) as db_size;")
        db_size = target_cursor.fetchone()[0]
        print(f"   Database size: {db_size}")
        
        target_cursor.execute("SELECT pg_size_pretty(pg_total_relation_size('businesses')) as table_size;")
        table_size = target_cursor.fetchone()[0]
        print(f"   Businesses table size: {table_size}")
        
        source_cursor.close()
        source_conn.close()
        target_cursor.close()
        target_conn.close()
        
        print("\n🎉 Done!")
        
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description='Migrate only Berlin businesses to Supabase')
    parser.add_argument('--batch-size', type=int, default=5000, help='Batch size (default: 5000)')
    
    args = parser.parse_args()
    
    print(f"""
╔════════════════════════════════════════════════════════════════╗
║          Berlin Business Migration to Supabase                 ║
║                                                                ║
║  This will migrate ONLY Berlin businesses from local DB        ║
║  Duplicates will be automatically skipped (ON CONFLICT)        ║
╚════════════════════════════════════════════════════════════════╝
""")
    
    migrate_berlin_businesses(batch_size=args.batch_size)
