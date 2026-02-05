#!/bin/bash
# Monitor migration and test API when complete

echo "🔍 Monitoring migration progress..."
echo "========================================"

TARGET_COUNT=2983205
LAST_COUNT=0
STABLE_COUNT=0

while true; do
    # Get current count
    CURRENT=$(python3 -c "
import psycopg2
from urllib.parse import quote_plus
password_encoded = quote_plus('S2nCV&a7NFF*4@DN40fAK@yj2%qVtxStGZSm')
dsn = f'postgresql://postgres.kwikmyspjxwzmfwhlrfy:{password_encoded}@aws-1-eu-central-1.pooler.supabase.com:6543/postgres'
conn = psycopg2.connect(dsn)
cursor = conn.cursor()
cursor.execute('SELECT COUNT(*) FROM businesses;')
count = cursor.fetchone()[0]
print(count)
cursor.close()
conn.close()
" 2>/dev/null)
    
    if [ -z "$CURRENT" ]; then
        echo "❌ Database connection error"
        sleep 30
        continue
    fi
    
    # Calculate percentage
    PERCENT=$(echo "scale=2; $CURRENT * 100 / $TARGET_COUNT" | bc)
    
    # Format with thousands separator
    FORMATTED=$(printf "%'d" $CURRENT)
    
    echo "[$(date '+%H:%M:%S')] Progress: $FORMATTED / 2,983,205 ($PERCENT%)"
    
    # Check if count is stable (migration complete)
    if [ "$CURRENT" -eq "$LAST_COUNT" ]; then
        ((STABLE_COUNT++))
    else
        STABLE_COUNT=0
    fi
    
    LAST_COUNT=$CURRENT
    
    # If count hasn't changed for 3 checks (90 seconds), migration is complete
    if [ $STABLE_COUNT -ge 3 ]; then
        echo ""
        echo "✅ Migration appears to be complete!"
        echo "📊 Final count: $FORMATTED businesses"
        break
    fi
    
    # If we've reached target count, migration is complete
    if [ "$CURRENT" -ge "$TARGET_COUNT" ]; then
        echo ""
        echo "🎉 Migration complete! All $FORMATTED businesses migrated!"
        break
    fi
    
    sleep 30
done

echo ""
echo "========================================"
echo "🧪 Running API Tests..."
echo "========================================"
echo ""

API_URL="https://gelbeseitanreplica-production.up.railway.app"

# Test 1: Health Check
echo "1️⃣  Testing Health Endpoint..."
echo "   GET $API_URL/health"
curl -s "$API_URL/health" | python3 -m json.tool
echo ""
echo ""

# Test 2: Stats
echo "2️⃣  Testing Stats Endpoint..."
echo "   GET $API_URL/api/v2/stats"
curl -s "$API_URL/api/v2/stats" | python3 -m json.tool
echo ""
echo ""

# Test 3: Search by keyword
echo "3️⃣  Testing Search (keyword: restaurant)..."
echo "   GET $API_URL/api/v2/search?keyword=restaurant"
curl -s "$API_URL/api/v2/search?keyword=restaurant&page_size=3" | python3 -m json.tool
echo ""
echo ""

# Test 4: Search by location
echo "4️⃣  Testing Search (location: Berlin)..."
echo "   GET $API_URL/api/v2/search?location=berlin"
curl -s "$API_URL/api/v2/search?location=berlin&page_size=3" | python3 -m json.tool
echo ""
echo ""

# Test 5: Combined search
echo "5️⃣  Testing Search (keyword + location)..."
echo "   GET $API_URL/api/v2/search?keyword=café&location=münchen"
curl -s "$API_URL/api/v2/search?keyword=café&location=münchen&page_size=3" | python3 -m json.tool
echo ""
echo ""

# Test 6: Geo search
echo "6️⃣  Testing Geo Search (Berlin coordinates)..."
echo "   GET $API_URL/api/v2/search?lat=52.520&lon=13.405&radius=10"
curl -s "$API_URL/api/v2/search?lat=52.520&lon=13.405&radius=10&page_size=3" | python3 -m json.tool
echo ""
echo ""

# Test 7: Get specific business
echo "7️⃣  Testing Business Detail..."
FIRST_ID=$(curl -s "$API_URL/api/v2/search?page_size=1" | python3 -c "import json,sys; data=json.load(sys.stdin); print(data['results'][0]['id'] if data['results'] else '')")
if [ -n "$FIRST_ID" ]; then
    echo "   GET $API_URL/api/v2/business/$FIRST_ID"
    curl -s "$API_URL/api/v2/business/$FIRST_ID" | python3 -m json.tool
else
    echo "   ⚠️  No businesses found to test detail endpoint"
fi
echo ""
echo ""

echo "========================================"
echo "✅ All API tests completed!"
echo "========================================"
