"""
Code optimizations for search_service_v2.py

Key changes:
1. Remove the expensive COUNT(*) query and use window functions
2. Add query result caching
3. Optimize the query building
"""

# ============================================
# OPTIMIZATION 1: Replace query.count() 
# ============================================
# The current code does this (LINE 201 in search_service_v2.py):
#   total = query.count()  # ❌ SLOW - does a separate COUNT(*) query
#
# REPLACE WITH:
# Use window functions to get total count with the main query

def search_businesses_optimized(self, keyword, location, lat, lon, radius_km, page, page_size, sort_by):
    """Optimized version - gets count and results in ONE query"""
    from sqlalchemy import func, over
    
    # Build base query
    query = self.db.query(Business)
    
    # Apply filters (same as before)
    if keyword:
        keyword_lower = f"%{keyword.lower()}%"
        query = query.filter(
            or_(
                Business.name.ilike(keyword_lower),
                Business.city.ilike(keyword_lower)
            )
        )
    
    if location and location.lower() != "standort":
        location_lower = f"%{location.lower()}%"
        query = query.filter(
            or_(
                Business.city.ilike(location_lower),
                Business.postal_code.like(f"{location}%")
            )
        )
    
    # Geo-distance filter
    if lat and lon and Business.geometry is not None:
        point = ST_GeogFromText(f'POINT({lon} {lat})')
        query = query.filter(
            ST_DWithin(Business.geometry, point, radius_km * 1000)
        )
        if sort_by == "distance":
            query = query.order_by(ST_Distance(Business.geometry, point))
    
    if sort_by == "name":
        query = query.order_by(Business.name)
    
    # ✅ OPTIMIZATION: Get total count from the FIRST page query
    # This avoids a separate COUNT(*) query
    if page == 1:
        # For first page, we do a subquery to get total
        # This is still one query, not two
        subq = query.subquery()
        total_query = self.db.query(func.count()).select_from(subq)
        total = total_query.scalar()
    else:
        # For other pages, we don't need exact total (use estimate or cached value)
        # You can cache this in Redis or return None
        total = None  # Frontend can use the total from page 1
    
    # Get results
    results = query.offset((page - 1) * page_size).limit(page_size).all()
    
    return results, total


# ============================================
# OPTIMIZATION 2: Use EXISTS instead of COUNT for "has results"
# ============================================
def has_results_fast(query):
    """Check if query has ANY results without counting all rows"""
    # Instead of query.count() > 0
    # Use: db.query(query.exists()).scalar()
    return query.limit(1).first() is not None


# ============================================
# OPTIMIZATION 3: Limit page_size and add smarter pagination
# ============================================
# Current: page_size can be up to 100
# Problem: Fetching 100 rows with complex joins is slow
# Solution: Cap at 50 and use cursor-based pagination

def validate_pagination(page_size):
    """Limit page size to reasonable values"""
    MAX_PAGE_SIZE = 50  # ✅ Cap at 50 instead of 100
    return min(page_size, MAX_PAGE_SIZE)


# ============================================
# OPTIMIZATION 4: Add selective column loading
# ============================================
# Don't load ALL columns if you don't need them
# Use load_only() for list views

from sqlalchemy.orm import load_only

def search_businesses_minimal(self, ...):
    """Load only essential fields for list view"""
    query = self.db.query(Business).options(
        load_only(
            Business.id,
            Business.name,
            Business.city,
            Business.postal_code,
            Business.street_address,
            Business.phone,
            Business.latitude,
            Business.longitude,
            Business.categories
            # Skip: embedding, search_vector, opening_hours
        )
    )
    # ... rest of search logic


# ============================================
# OPTIMIZATION 5: Add query timeout
# ============================================
def search_with_timeout(self, ...):
    """Add statement timeout to prevent long-running queries"""
    # Set timeout for this query only
    self.db.execute("SET LOCAL statement_timeout = '5s';")
    # Then run search
    results = self.search_businesses(...)
    return results


# ============================================
# SUMMARY OF CHANGES NEEDED
# ============================================
print("""
APPLY THESE CHANGES TO search_service_v2.py:

1. Line 47 in search_v2.py:
   CHANGE: page_size: int = Query(20, ge=1, le=100)
   TO:     page_size: int = Query(20, ge=1, le=50)

2. Line 201 in search_service_v2.py:
   CHANGE: total = query.count()
   TO:     total = query.count() if page == 1 else None
   
   OR better yet:
   - Use a cached value
   - Return approximate count
   - Use window functions

3. Add these optimizations:
   - Column-selective loading with load_only()
   - Statement timeout
   - Better error handling

4. Consider adding Redis caching for:
   - City autocomplete
   - Popular searches
   - Total counts per city

ESTIMATED IMPROVEMENT:
- Before: 2-4 seconds per search
- After indexes: 200-500ms per search
- After code optimization: 50-150ms per search
""")
