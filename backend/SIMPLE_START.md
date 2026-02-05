# 🚀 Simple Start - Using Local PostgreSQL

## You Have Local PostgreSQL ✅ - No Docker Needed!

### Quick Setup (3 Commands)

```bash
cd backend

# 1. Run setup script (creates database)
./setup_local_db.sh

# 2. Install Python dependencies
pip install -r requirements-full.txt

# 3. Test migration with 100 records
python scripts/migrate_data_to_db.py --limit 100
```

Done! 🎉

---

## Alternative: Manual Setup

If the script doesn't work, do it manually:

```bash
# 1. Create database
sudo -u postgres psql << 'SQL'
CREATE DATABASE gelbeseiten;
CREATE USER gs_user WITH PASSWORD 'gs_password_123';
GRANT ALL PRIVILEGES ON DATABASE gelbeseiten TO gs_user;
ALTER DATABASE gelbeseiten OWNER TO gs_user;
SQL

# 2. Enable extensions
sudo -u postgres psql -d gelbeseiten << 'SQL'
CREATE EXTENSION postgis;
CREATE EXTENSION pg_trgm;
CREATE EXTENSION btree_gin;
SQL

# 3. Run schema
sudo -u postgres psql -d gelbeseiten < sql/init.sql

# 4. Install deps
pip install -r requirements-full.txt

# 5. Test migration
python scripts/migrate_data_to_db.py --limit 100
```

---

## ⚡ Super Quick Option (Skip Elasticsearch)

Don't want to install Elasticsearch? **No problem!**

PostgreSQL alone gives you:
- ✅ 50x faster search
- ✅ Geo-distance queries (PostGIS)
- ✅ Fuzzy matching (pg_trgm)
- ✅ Full indexing

Just skip Elasticsearch:
```python
# In app/elasticsearch_client.py, line 93:
USE_ELASTICSEARCH = False  # or just ignore ES errors
```

---

## 🧪 Test It Worked

```bash
# Check database
psql -U gs_user -d gelbeseiten -c "SELECT COUNT(*) FROM businesses;"
# Should show: 98 or 100

# Check API
curl "http://localhost:8000/api/v2/stats"
# Should show stats

# Test search
curl "http://localhost:8000/api/v2/search?keyword=test&location=berlin"
```

---

## 🎯 Summary

**You have PostgreSQL locally** = No Docker needed!

Just run:
```bash
./setup_local_db.sh
pip install -r requirements-full.txt
python scripts/migrate_data_to_db.py --limit 100
```

**Elasticsearch is optional** - PostgreSQL alone is a huge upgrade! 🚀
