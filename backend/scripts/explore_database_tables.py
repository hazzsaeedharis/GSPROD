#!/usr/bin/env python3
"""
Explore all tables in events_db database
"""
import psycopg2
from psycopg2.extras import RealDictCursor

# Connect to existing database
try:
    conn = psycopg2.connect(
        dbname="events_db",
        user="postgres",
        password="password",
        host="localhost",
        port=5432
    )
    
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    print("=" * 80)
    print("🔍 EXPLORING events_db DATABASE")
    print("=" * 80)
    
    # Get all tables
    cursor.execute("""
        SELECT table_name, 
               pg_size_pretty(pg_total_relation_size(quote_ident(table_name)::regclass)) as size
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE'
        ORDER BY pg_total_relation_size(quote_ident(table_name)::regclass) DESC;
    """)
    
    tables = cursor.fetchall()
    
    print(f"\n📊 Found {len(tables)} tables:\n")
    print(f"{'Table Name':<40} {'Size':<15} {'Row Count'}")
    print("-" * 80)
    
    table_details = []
    
    for table in tables:
        table_name = table['table_name']
        size = table['size']
        
        # Get row count
        try:
            cursor.execute(f"SELECT COUNT(*) as count FROM {table_name};")
            count = cursor.fetchone()['count']
        except:
            count = 0
        
        print(f"{table_name:<40} {size:<15} {count:,}")
        table_details.append({
            'name': table_name,
            'size': size,
            'count': count
        })
    
    print("\n" + "=" * 80)
    print("📋 DETAILED TABLE STRUCTURES")
    print("=" * 80)
    
    for table_detail in table_details:
        table_name = table_detail['name']
        
        print(f"\n{'='*80}")
        print(f"TABLE: {table_name}")
        print(f"Size: {table_detail['size']} | Rows: {table_detail['count']:,}")
        print(f"{'='*80}")
        
        # Get columns
        cursor.execute("""
            SELECT 
                column_name, 
                data_type, 
                is_nullable,
                column_default,
                character_maximum_length
            FROM information_schema.columns
            WHERE table_name = %s
            ORDER BY ordinal_position;
        """, (table_name,))
        
        columns = cursor.fetchall()
        
        print(f"\n{'Column':<30} {'Type':<25} {'Nullable':<10} {'Default'}")
        print("-" * 80)
        for col in columns:
            col_type = col['data_type']
            if col['character_maximum_length']:
                col_type = f"{col_type}({col['character_maximum_length']})"
            nullable = 'YES' if col['is_nullable'] == 'YES' else 'NO'
            default = str(col['column_default'])[:30] if col['column_default'] else ''
            print(f"{col['column_name']:<30} {col_type:<25} {nullable:<10} {default}")
        
        # Get indexes
        cursor.execute("""
            SELECT
                indexname,
                indexdef
            FROM pg_indexes
            WHERE tablename = %s;
        """, (table_name,))
        
        indexes = cursor.fetchall()
        if indexes:
            print(f"\n📌 Indexes ({len(indexes)}):")
            for idx in indexes:
                print(f"   - {idx['indexname']}")
        
        # Get foreign keys
        cursor.execute("""
            SELECT
                tc.constraint_name,
                kcu.column_name,
                ccu.table_name AS foreign_table_name,
                ccu.column_name AS foreign_column_name
            FROM information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu
                ON tc.constraint_name = kcu.constraint_name
            JOIN information_schema.constraint_column_usage AS ccu
                ON ccu.constraint_name = tc.constraint_name
            WHERE tc.constraint_type = 'FOREIGN KEY'
            AND tc.table_name = %s;
        """, (table_name,))
        
        foreign_keys = cursor.fetchall()
        if foreign_keys:
            print(f"\n🔗 Foreign Keys ({len(foreign_keys)}):")
            for fk in foreign_keys:
                print(f"   - {fk['column_name']} → {fk['foreign_table_name']}.{fk['foreign_column_name']}")
        
        # Sample data
        if table_detail['count'] > 0:
            print(f"\n📝 Sample Record:")
            try:
                cursor.execute(f"SELECT * FROM {table_name} LIMIT 1;")
                sample = cursor.fetchone()
                if sample:
                    for key, value in sample.items():
                        value_str = str(value)[:100] if value else 'NULL'
                        print(f"   {key}: {value_str}")
            except Exception as e:
                print(f"   ⚠️  Could not fetch sample: {e}")
    
    print("\n" + "=" * 80)
    print("✅ Database exploration completed!")
    print("=" * 80)
    
    cursor.close()
    conn.close()
    
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
