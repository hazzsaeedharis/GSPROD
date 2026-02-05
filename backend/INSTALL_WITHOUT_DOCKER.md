# Install PostgreSQL + Elasticsearch Without Docker

## PostgreSQL + PostGIS Installation

### Ubuntu/Debian
```bash
# Add PostgreSQL repository
sudo apt update
sudo apt install -y postgresql-15 postgresql-15-postgis-3

# Start PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql << 'EOF'
CREATE DATABASE gelbeseiten;
CREATE USER gs_user WITH PASSWORD 'gs_password_change_in_production';
GRANT ALL PRIVILEGES ON DATABASE gelbeseiten TO gs_user;

\c gelbeseiten
CREATE EXTENSION postgis;
CREATE EXTENSION pg_trgm;
CREATE EXTENSION btree_gin;
EOF

# Run initialization SQL
sudo -u postgres psql -d gelbeseiten < sql/init.sql
```

## Elasticsearch Installation

### Ubuntu/Debian
```bash
# Import Elasticsearch GPG key
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo gpg --dearmor -o /usr/share/keyrings/elasticsearch-keyring.gpg

# Add repository
echo "deb [signed-by=/usr/share/keyrings/elasticsearch-keyring.gpg] https://artifacts.elastic.co/packages/8.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-8.x.list

# Install
sudo apt update
sudo apt install elasticsearch

# Configure for single-node (development)
sudo tee -a /etc/elasticsearch/elasticsearch.yml << 'EOF'
discovery.type: single-node
xpack.security.enabled: false
EOF

# Start Elasticsearch
sudo systemctl start elasticsearch
sudo systemctl enable elasticsearch

# Test (wait 30 seconds first)
sleep 30
curl http://localhost:9200
```

## Redis Installation

```bash
# Install Redis
sudo apt update
sudo apt install redis-server

# Start Redis
sudo systemctl start redis-server
sudo systemctl enable redis-server

# Test
redis-cli ping
# Should return: PONG
```

## Verify Installation

```bash
# Check PostgreSQL
sudo systemctl status postgresql
sudo -u postgres psql -d gelbeseiten -c "SELECT version();"

# Check Elasticsearch
sudo systemctl status elasticsearch
curl http://localhost:9200

# Check Redis
sudo systemctl status redis-server
redis-cli ping
```

## Update Database Connection

The script will now connect to your local PostgreSQL:
```python
# Default connection in app/database.py
DATABASE_URL = "postgresql://gs_user:gs_password_change_in_production@localhost:5432/gelbeseiten"
```

## Run Migration

```bash
cd backend
source venv/bin/activate
pip install -r requirements-full.txt
python scripts/migrate_data_to_db.py --limit 100
```

---

## Quick Option C: SQLite (Simplest, No Docker/PostgreSQL Needed)

For testing only, use SQLite:

```bash
# Just change DATABASE_URL in app/database.py:
DATABASE_URL = "sqlite:///./gelbeseiten.db"

# Install lighter dependencies
pip install sqlalchemy alembic

# Run migration (without PostGIS features)
python scripts/migrate_data_to_db.py --limit 100 --skip-geocoding
```

**Note**: SQLite doesn't support PostGIS (no geo-distance queries), but works for basic testing.
