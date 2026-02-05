#!/bin/bash
# Quick setup script for local PostgreSQL (no Docker needed)

echo "🟡 Gelbe Seiten - Local PostgreSQL Setup"
echo "========================================"
echo ""

# Check if PostgreSQL is running
if ! systemctl is-active --quiet postgresql; then
    echo "⚠️  PostgreSQL is not running. Starting..."
    sudo systemctl start postgresql
fi

echo "✅ PostgreSQL is running"
echo ""

# Create database and extensions
echo "📊 Creating database and extensions..."
sudo -u postgres psql << 'EOF'
-- Create database
CREATE DATABASE gelbeseiten;

-- Create user
CREATE USER gs_user WITH PASSWORD 'gs_password_123';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE gelbeseiten TO gs_user;
ALTER DATABASE gelbeseiten OWNER TO gs_user;

-- Connect and create extensions
\c gelbeseiten

CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS btree_gin;

-- Show extensions
\dx
EOF

echo ""
echo "✅ Database 'gelbeseiten' created"
echo "✅ User 'gs_user' created"
echo "✅ Extensions enabled: postgis, pg_trgm, btree_gin"
echo ""

# Run schema
echo "📋 Running database schema..."
sudo -u postgres psql -d gelbeseiten < sql/init.sql

echo ""
echo "✅ Database schema created"
echo ""

# Verify
echo "🔍 Verifying setup..."
sudo -u postgres psql -d gelbeseiten << 'EOF'
SELECT 'Businesses table: ' || COUNT(*) FROM information_schema.tables WHERE table_name = 'businesses';
SELECT 'Branches table: ' || COUNT(*) FROM information_schema.tables WHERE table_name = 'branches';
SELECT 'PostGIS version: ' || PostGIS_Version();
EOF

echo ""
echo "========================================"
echo "✅ Setup Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. pip install -r requirements-full.txt"
echo "2. python scripts/migrate_data_to_db.py --limit 100"
echo ""
echo "Database connection:"
echo "postgresql://gs_user:gs_password_123@localhost:5432/gelbeseiten"
echo ""
