# Using Your Local PostgreSQL (No Docker Needed!)

## ✅ Quick Setup (5 minutes)

### Step 1: Create Database
```bash
# Connect to PostgreSQL
sudo -u postgres psql

# Or if you have your own user:
psql -U your_username postgres
```

Inside `psql`:
```sql
-- Create database
CREATE DATABASE gelbeseiten;

-- Create user (or use your existing user)
CREATE USER gs_user WITH PASSWORD 'your_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE gelbeseiten TO gs_user;

-- Connect to the database
\c gelbeseiten

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS btree_gin;

-- List extensions to verify
\dx

-- Exit
\q
```

### Step 2: Run Database Schema
```bash
cd backend

# Run the initialization SQL
psql -U gs_user -d gelbeseiten < sql/init.sql

# Or with sudo:
sudo -u postgres psql -d gelbeseiten < sql/init.sql
```

### Step 3: Update Database Connection

Edit `backend/app/database.py` and update the connection string (line 10):

```python
# If using gs_user:
DATABASE_URL = "postgresql://gs_user:your_password@localhost:5432/gelbeseiten"

# Or use your existing PostgreSQL user:
DATABASE_URL = "postgresql://your_username:your_password@localhost:5432/gelbeseiten"
```

### Step 4: Install Python Dependencies
```bash
cd backend
source venv/bin/activate

# Install full dependencies (PostgreSQL, Elasticsearch, etc.)
pip install -r requirements-full.txt
```

### Step 5: Test Migration (100 records)
```bash
python scripts/migrate_data_to_db.py --limit 100
```

**Expected output:**
```
============================================================
Gelbe Seiten Data Migration
NDJSON → PostgreSQL + Elasticsearch
============================================================

📊 Initializing PostgreSQL...
✅ Database tables created successfully!

📖 Reading data from: ../data/raw/gsbestand-559.json
============================================================
✅ Processed: 100 | Inserted: 98 | Skipped: 2

============================================================
📊 Migration Summary
============================================================
Total Processed: 100
Total Inserted:  98
Total Skipped:   2
Unique Branches: 45
============================================================
✅ Migration completed successfully!
```

---

## 🔧 Configuration Options

### Option 1: Use Existing PostgreSQL User
```python
# In app/database.py
DATABASE_URL = "postgresql://hazzsaeedharis:@localhost:5432/gelbeseiten"
# (no password if using peer authentication)
```

### Option 2: Environment Variable
```bash
# Set environment variable
export DATABASE_URL="postgresql://your_user:your_pass@localhost:5432/gelbeseiten"

# Then run migration
python scripts/migrate_data_to_db.py --limit 100
```

### Option 3: Config File
Create `backend/config.py`:
```python
DATABASE_URL = "postgresql://your_user:your_pass@localhost:5432/gelbeseiten"
```

---

## ✅ Verify Setup

### Check PostgreSQL Connection
```bash
# Test connection
psql -U gs_user -d gelbeseiten -c "SELECT version();"

# Should show PostgreSQL version
```

### Check Extensions
```bash
psql -U gs_user -d gelbeseiten -c "\dx"

# Should show:
# postgis
# pg_trgm
# btree_gin
```

### Check Tables After Migration
```bash
psql -U gs_user -d gelbeseiten << 'EOF'
SELECT COUNT(*) FROM businesses;
SELECT COUNT(*) FROM branches;
SELECT * FROM businesses LIMIT 3;
EOF
```

---

## 🚀 Skip Elasticsearch (Optional)

If you don't want to install Elasticsearch, you can skip it:

### Option A: Just PostgreSQL (Simpler)
```bash
# Elasticsearch is optional
# PostgreSQL alone is still 50x faster than NDJSON!

# Migration will work without Elasticsearch
python scripts/migrate_data_to_db.py --limit 100

# Search will use PostgreSQL only (still very fast)
```

### Option B: Install Elasticsearch Later
```bash
# You can add Elasticsearch anytime later
# For now, PostgreSQL is enough!

# To disable ES in the code, set:
USE_ELASTICSEARCH = False  # in app/elasticsearch_client.py
```

---

## 📊 What You Get (PostgreSQL Only)

Even without Elasticsearch, you still get:

✅ **50x faster** than NDJSON file  
✅ **Geo-distance search** (PostGIS)  
✅ **Fuzzy matching** (pg_trgm extension)  
✅ **Indexed search** (fast)  
✅ **Scalable** (millions of records)  

Elasticsearch adds:
- Better fuzzy matching
- Full-text search with stemming  
- Autocomplete
- Search analytics

But PostgreSQL alone is already a huge upgrade!

---

## 🎯 Recommended: PostgreSQL Only First

```bash
# 1. Create database (see Step 1 above)
sudo -u postgres psql
# Run SQL commands from Step 1

# 2. Run init script
psql -U gs_user -d gelbeseiten < sql/init.sql

# 3. Update connection string in app/database.py

# 4. Install dependencies
pip install -r requirements-full.txt

# 5. Test migration
python scripts/migrate_data_to_db.py --limit 100

# 6. If successful, run full migration
python scripts/migrate_data_to_db.py
```

**No Docker needed!** Just your local PostgreSQL. 🎉

---

## ⚡ Quick Start Commands

```bash
# Create database (run once)
sudo -u postgres psql -c "CREATE DATABASE gelbeseiten;"
sudo -u postgres psql -d gelbeseiten -c "CREATE EXTENSION postgis;"
sudo -u postgres psql -d gelbeseiten -c "CREATE EXTENSION pg_trgm;"

# Run schema
sudo -u postgres psql -d gelbeseiten < sql/init.sql

# Test migration
cd backend
source venv/bin/activate
pip install -r requirements-full.txt
python scripts/migrate_data_to_db.py --limit 100
```

That's it! No Docker required. ✨
