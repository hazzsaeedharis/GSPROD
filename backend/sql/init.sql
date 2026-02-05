-- Initialize Gelbe Seiten Database Schema
-- PostgreSQL with PostGIS extension

-- Enable PostGIS for geospatial queries
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pg_trgm;  -- For fuzzy text search
CREATE EXTENSION IF NOT EXISTS btree_gin; -- For better indexing

-- Create businesses table
CREATE TABLE IF NOT EXISTS businesses (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(500) NOT NULL,
    street VARCHAR(255),
    house_number VARCHAR(50),
    postcode VARCHAR(10) NOT NULL,
    city VARCHAR(255) NOT NULL,
    kgs VARCHAR(50),
    phone VARCHAR(100),
    email VARCHAR(255),
    website VARCHAR(500),
    location GEOMETRY(POINT, 4326),  -- PostGIS point for lat/lon
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Additional fields
    verlag VARCHAR(50),
    verlagskunde BOOLEAN DEFAULT FALSE,
    kooperationspartner VARCHAR(50),
    buchnummer VARCHAR(50)
);

-- Create branches (categories) table
CREATE TABLE IF NOT EXISTS branches (
    branch_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create business_branches junction table (many-to-many)
CREATE TABLE IF NOT EXISTS business_branches (
    business_id VARCHAR(255) REFERENCES businesses(id) ON DELETE CASCADE,
    branch_id VARCHAR(50) REFERENCES branches(branch_id) ON DELETE CASCADE,
    PRIMARY KEY (business_id, branch_id)
);

-- Create indexes for performance
CREATE INDEX idx_businesses_name ON businesses USING gin(name gin_trgm_ops);
CREATE INDEX idx_businesses_city ON businesses USING gin(city gin_trgm_ops);
CREATE INDEX idx_businesses_postcode ON businesses(postcode);
CREATE INDEX idx_businesses_location ON businesses USING GIST(location);
CREATE INDEX idx_business_branches_business_id ON business_branches(business_id);
CREATE INDEX idx_business_branches_branch_id ON business_branches(branch_id);

-- Create full-text search index
CREATE INDEX idx_businesses_fulltext ON businesses USING gin(
    to_tsvector('german', coalesce(name, '') || ' ' || coalesce(city, ''))
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for auto-updating updated_at
CREATE TRIGGER update_businesses_updated_at BEFORE UPDATE ON businesses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create view for business search with all details
CREATE OR REPLACE VIEW business_search_view AS
SELECT 
    b.id,
    b.name,
    b.street,
    b.house_number,
    b.postcode,
    b.city,
    b.phone,
    b.email,
    b.website,
    ST_X(b.location::geometry) as longitude,
    ST_Y(b.location::geometry) as latitude,
    array_agg(DISTINCT bb.branch_id) as branch_ids,
    array_agg(DISTINCT br.name) as branch_names
FROM businesses b
LEFT JOIN business_branches bb ON b.id = bb.business_id
LEFT JOIN branches br ON bb.branch_id = br.branch_id
GROUP BY b.id;

-- Sample data for testing (optional)
-- INSERT INTO branches (branch_id, name) VALUES 
--     ('20611', 'Ärzte: Allgemeinmedizin'),
--     ('1318', 'Banken'),
--     ('5270', 'Friseure');

-- Grant privileges
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO gs_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO gs_user;

-- Print success message
DO $$
BEGIN
    RAISE NOTICE 'Gelbe Seiten database initialized successfully!';
    RAISE NOTICE 'Tables created: businesses, branches, business_branches';
    RAISE NOTICE 'Indexes created for: name, city, postcode, location, full-text search';
    RAISE NOTICE 'PostGIS extension enabled for geospatial queries';
END $$;
