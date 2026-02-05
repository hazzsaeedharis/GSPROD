-- Fix database schema to match SQLAlchemy models
-- Run this in Supabase SQL Editor

-- Drop existing tables if they exist (except PostGIS system tables)
DROP TABLE IF EXISTS business_branches CASCADE;
DROP TABLE IF EXISTS branches CASCADE;
DROP TABLE IF EXISTS businesses CASCADE;

-- Create businesses table with correct schema
CREATE TABLE businesses (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    street_address VARCHAR,
    postal_code VARCHAR,
    city VARCHAR,
    district VARCHAR,
    categories TEXT,  -- JSON array stored as text
    phone VARCHAR,
    email VARCHAR,
    website VARCHAR,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    geometry GEOMETRY(POINT, 4326),
    search_vector TSVECTOR,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    embedding FLOAT[],
    opening_hours JSONB
);

-- Create indexes for better performance
CREATE INDEX idx_businesses_name ON businesses(name);
CREATE INDEX idx_businesses_city ON businesses(city);
CREATE INDEX idx_businesses_postal_code ON businesses(postal_code);
CREATE INDEX idx_businesses_phone ON businesses(phone);
CREATE INDEX idx_businesses_is_active ON businesses(is_active);
CREATE INDEX idx_businesses_geometry ON businesses USING GIST(geometry);
CREATE INDEX idx_businesses_search_vector ON businesses USING GIN(search_vector);

-- Create function to auto-update search_vector
CREATE OR REPLACE FUNCTION update_search_vector() RETURNS trigger AS $$
BEGIN
    NEW.search_vector := 
        setweight(to_tsvector('german', coalesce(NEW.name, '')), 'A') ||
        setweight(to_tsvector('german', coalesce(NEW.categories, '')), 'B') ||
        setweight(to_tsvector('german', coalesce(NEW.city, '')), 'C');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update search_vector
CREATE TRIGGER tsvector_update BEFORE INSERT OR UPDATE
    ON businesses FOR EACH ROW EXECUTE FUNCTION update_search_vector();

-- Mark as migrated (for Alembic compatibility)
DELETE FROM alembic_version WHERE version_num IS NOT NULL;
INSERT INTO alembic_version (version_num) VALUES ('b3e6d6d71b9d');
