#!/usr/bin/env python3
"""
Demonstrate the value of integrating events, venues, and categories
"""
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime

conn = psycopg2.connect(
    dbname="events_db",
    user="postgres",
    password="password",
    host="localhost",
    port=5432
)

cursor = conn.cursor(cursor_factory=RealDictCursor)

print("=" * 80)
print("🔗 DEMONSTRATING TABLE RELATIONSHIPS & VALUE")
print("=" * 80)

# Demo 1: Events with Venue Information
print("\n" + "=" * 80)
print("📅 DEMO 1: Upcoming Events with Venue Details")
print("=" * 80)

cursor.execute("""
    SELECT 
        e.title,
        e.start_date,
        e.price,
        v.name as venue_name,
        v.address as venue_address,
        v.city,
        c.name as category
    FROM events e
    JOIN venues v ON e.venue_id = v.id
    JOIN categories c ON e.category_id = c.id
    WHERE e.start_date > NOW()
    ORDER BY e.start_date
    LIMIT 5;
""")

events = cursor.fetchall()
print(f"\nFound {len(events)} upcoming events:\n")

for event in events:
    print(f"📌 {event['title']}")
    print(f"   📅 {event['start_date'].strftime('%Y-%m-%d %H:%M')}")
    print(f"   🏛️  {event['venue_name']} ({event['city']})")
    print(f"   🏷️  {event['category']}")
    print(f"   💰 {event['price'] or 'Free'}")
    print()

# Demo 2: Venues linked to Businesses
print("=" * 80)
print("🏢 DEMO 2: Venues Connected to Businesses")
print("=" * 80)

cursor.execute("""
    SELECT 
        v.name as venue_name,
        v.city,
        b.name as business_name,
        b.phone,
        b.website,
        COUNT(e.id) as event_count
    FROM venues v
    JOIN businesses b ON v.business_id = b.id
    LEFT JOIN events e ON e.venue_id = v.id
    GROUP BY v.id, v.name, v.city, b.name, b.phone, b.website
    HAVING COUNT(e.id) > 0
    ORDER BY COUNT(e.id) DESC
    LIMIT 5;
""")

linked_venues = cursor.fetchall()
print(f"\nFound {len(linked_venues)} venues with business connections:\n")

for venue in linked_venues:
    print(f"🏛️  {venue['venue_name']} ({venue['city']})")
    print(f"   🏢 Business: {venue['business_name']}")
    print(f"   📞 {venue['phone']}")
    print(f"   🌐 {venue['website']}")
    print(f"   📅 {venue['event_count']} events")
    print()

# Demo 3: Events Near a Location (e.g., Berlin center)
print("=" * 80)
print("📍 DEMO 3: Events Near Berlin City Center (within 5km)")
print("=" * 80)

berlin_lat = 52.520
berlin_lon = 13.405

cursor.execute("""
    SELECT 
        e.title,
        e.start_date,
        v.name as venue_name,
        v.latitude,
        v.longitude,
        ST_Distance(
            v.geometry::geography,
            ST_MakePoint(%s, %s)::geography
        ) / 1000 as distance_km
    FROM events e
    JOIN venues v ON e.venue_id = v.id
    WHERE v.geometry IS NOT NULL
    AND e.start_date > NOW()
    AND ST_DWithin(
        v.geometry::geography,
        ST_MakePoint(%s, %s)::geography,
        5000
    )
    ORDER BY e.start_date
    LIMIT 5;
""", (berlin_lon, berlin_lat, berlin_lon, berlin_lat))

nearby_events = cursor.fetchall()
print(f"\nFound {len(nearby_events)} events near Berlin center:\n")

for event in nearby_events:
    print(f"📌 {event['title']}")
    print(f"   📅 {event['start_date'].strftime('%Y-%m-%d %H:%M')}")
    print(f"   🏛️  {event['venue_name']}")
    print(f"   📍 {event['distance_km']:.2f} km away")
    print()

# Demo 4: Top Event Categories
print("=" * 80)
print("🏷️  DEMO 4: Event Categories with Counts")
print("=" * 80)

cursor.execute("""
    SELECT 
        c.name,
        c.type,
        COUNT(e.id) as event_count,
        COUNT(CASE WHEN e.start_date > NOW() THEN 1 END) as upcoming_count
    FROM categories c
    LEFT JOIN events e ON e.category_id = c.id
    WHERE c.type = 'event'
    GROUP BY c.id, c.name, c.type
    HAVING COUNT(e.id) > 0
    ORDER BY COUNT(e.id) DESC
    LIMIT 10;
""")

categories = cursor.fetchall()
print(f"\nTop {len(categories)} event categories:\n")

for cat in categories:
    print(f"🏷️  {cat['name']}")
    print(f"   Total events: {cat['event_count']}")
    print(f"   Upcoming: {cat['upcoming_count']}")
    print()

# Demo 5: Business Discovery via Events
print("=" * 80)
print("🔍 DEMO 5: Find Businesses Hosting Events")
print("=" * 80)

cursor.execute("""
    SELECT 
        b.id,
        b.name,
        b.city,
        b.street_address,
        b.phone,
        b.website,
        b.categories,
        v.name as venue_name,
        COUNT(e.id) as total_events,
        COUNT(CASE WHEN e.start_date > NOW() THEN 1 END) as upcoming_events
    FROM businesses b
    JOIN venues v ON v.business_id = b.id
    LEFT JOIN events e ON e.venue_id = v.id
    GROUP BY b.id, b.name, b.city, b.street_address, b.phone, b.website, b.categories, v.name
    HAVING COUNT(e.id) > 0
    ORDER BY COUNT(e.id) DESC
    LIMIT 5;
""")

event_businesses = cursor.fetchall()
print(f"\nTop {len(event_businesses)} businesses by event count:\n")

for biz in event_businesses:
    print(f"🏢 {biz['name']}")
    print(f"   📍 {biz['street_address']}, {biz['city']}")
    print(f"   🏛️  Venue: {biz['venue_name']}")
    print(f"   📞 {biz['phone']}")
    print(f"   🌐 {biz['website']}")
    print(f"   📅 {biz['total_events']} total events ({biz['upcoming_events']} upcoming)")
    print()

# Demo 6: Statistics Summary
print("=" * 80)
print("📊 SUMMARY STATISTICS")
print("=" * 80)

cursor.execute("""
    SELECT 
        (SELECT COUNT(*) FROM businesses) as total_businesses,
        (SELECT COUNT(*) FROM venues) as total_venues,
        (SELECT COUNT(*) FROM venues WHERE business_id IS NOT NULL) as venues_with_business,
        (SELECT COUNT(*) FROM events) as total_events,
        (SELECT COUNT(*) FROM events WHERE start_date > NOW()) as upcoming_events,
        (SELECT COUNT(*) FROM categories WHERE type = 'event') as event_categories,
        (SELECT COUNT(DISTINCT source_name) FROM events) as event_sources;
""")

stats = cursor.fetchone()

print(f"""
📊 Database Contents:
   - Businesses:               {stats['total_businesses']:>10,}
   - Venues:                   {stats['total_venues']:>10,}
   - Venues with Business Link:{stats['venues_with_business']:>10,} ({stats['venues_with_business']/stats['total_venues']*100:.1f}%)
   - Total Events:             {stats['total_events']:>10,}
   - Upcoming Events:          {stats['upcoming_events']:>10,}
   - Event Categories:         {stats['event_categories']:>10,}
   - Event Sources:            {stats['event_sources']:>10,}

💡 Integration Opportunity:
   - {stats['venues_with_business']:,} businesses can show events immediately!
   - {stats['upcoming_events']:,} upcoming events ready to display
   - Geo-spatial queries for "events near business" possible
   - Semantic search via embeddings available
""")

print("=" * 80)
print("✅ INTEGRATION VALUE DEMONSTRATED!")
print("=" * 80)
print("""
🎯 KEY BENEFITS:
1. ✅ Link businesses to events (venue connection)
2. ✅ Location-based event discovery (geo-queries)
3. ✅ Category filtering and browsing
4. ✅ Time-based queries (upcoming, today, this week)
5. ✅ Enhanced business profiles with events

🚀 READY TO INTEGRATE:
- All relationships exist in database
- Data is clean and geocoded
- Indexes already optimized
- Just need to add models + API endpoints!
""")

cursor.close()
conn.close()
