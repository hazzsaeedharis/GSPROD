# Network Access Setup Guide

This guide explains how to make your PostgreSQL database accessible on your local network.

## Current Status

✅ **Frontend**: Running on `http://192.168.12.214:3000` (network accessible)  
✅ **Backend**: Running on `http://192.168.12.214:8000` (network accessible)  
⚠️ **Database**: Running on `localhost:5432` (NOT network accessible yet)

## Step 1: Configure PostgreSQL for Network Access

Run the configuration script:

```bash
cd backend
./configure_postgres_network.sh
```

This script will:
1. Backup your current PostgreSQL configuration
2. Configure PostgreSQL to listen on all network interfaces (0.0.0.0)
3. Add access rules for your local network (192.168.12.0/24)
4. Restart PostgreSQL service

### What the script does:

**postgresql.conf changes:**
- Changes `listen_addresses = 'localhost'` to `listen_addresses = '*'`

**pg_hba.conf changes:**
- Adds: `host all all 192.168.12.0/24 scram-sha-256`
- This allows all devices on your 192.168.12.x network to connect

## Step 2: Allow Firewall Access (if needed)

If you have UFW firewall enabled:

```bash
sudo ufw allow 5432/tcp
sudo ufw status
```

## Step 3: Update Backend Configuration

The backend is already configured to accept network connections. The CORS settings have been updated to include:
- `http://192.168.12.214:3000`
- `http://192.168.12.214:3001`

## Step 4: Restart Backend with Network Database URL

After configuring PostgreSQL, restart your backend to use the network-accessible database:

```bash
# Stop the current backend (Ctrl+C in terminal 3)
# Then restart with network database URL:
cd backend
source venv/bin/activate
export DATABASE_URL="postgresql://postgres:password@192.168.12.214:5432/events_db"
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

Or update your `.env` file with:
```
DATABASE_URL=postgresql://postgres:password@192.168.12.214:5432/events_db
```

## Step 5: Test Network Access

### From your local machine:
```bash
psql -h 192.168.12.214 -U postgres -d events_db
```

### From another device on your network:
```bash
psql -h 192.168.12.214 -U postgres -d events_db
```

## Connection Strings

**Local access (current):**
```
postgresql://postgres:password@localhost:5432/events_db
```

**Network access (after configuration):**
```
postgresql://postgres:password@192.168.12.214:5432/events_db
```

## Security Considerations

⚠️ **Important Security Notes:**

1. **Password**: The default password is `password` - change this for production!
2. **Network**: This configuration allows access from 192.168.12.0/24 subnet only
3. **Firewall**: Make sure your firewall is properly configured
4. **Production**: Never expose PostgreSQL directly to the internet without proper security

### To change PostgreSQL password:

```bash
psql -U postgres -h localhost
ALTER USER postgres WITH PASSWORD 'your-new-secure-password';
\q
```

Then update your DATABASE_URL accordingly.

## Troubleshooting

### PostgreSQL won't start after configuration:
```bash
# Check logs
sudo journalctl -u postgresql -n 50

# Restore backup
sudo cp /etc/postgresql/16/main/postgresql.conf.backup /etc/postgresql/16/main/postgresql.conf
sudo cp /etc/postgresql/16/main/pg_hba.conf.backup /etc/postgresql/16/main/pg_hba.conf
sudo systemctl restart postgresql
```

### Can't connect from other devices:
```bash
# Check if PostgreSQL is listening on all interfaces
sudo ss -tlnp | grep 5432

# Should show: 0.0.0.0:5432 or *:5432

# Check firewall
sudo ufw status
```

### Connection refused:
- Verify PostgreSQL is running: `sudo systemctl status postgresql`
- Check pg_hba.conf has the correct subnet
- Verify your device IP is in the 192.168.12.x range

## Reverting Changes

If you need to revert to localhost-only access:

```bash
sudo cp /etc/postgresql/16/main/postgresql.conf.backup /etc/postgresql/16/main/postgresql.conf
sudo cp /etc/postgresql/16/main/pg_hba.conf.backup /etc/postgresql/16/main/pg_hba.conf
sudo systemctl restart postgresql
```

## Summary

After running the configuration script, your entire stack will be accessible on the local network:

| Service | Local URL | Network URL |
|---------|-----------|-------------|
| Frontend | http://localhost:3000 | http://192.168.12.214:3000 |
| Backend | http://localhost:8000 | http://192.168.12.214:8000 |
| Database | localhost:5432 | 192.168.12.214:5432 |
| API Docs | http://localhost:8000/docs | http://192.168.12.214:8000/docs |
