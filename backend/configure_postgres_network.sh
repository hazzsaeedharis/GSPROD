#!/bin/bash
# Script to configure PostgreSQL for local network access

echo "🔧 Configuring PostgreSQL for network access..."
echo ""

# Backup original configs
echo "📦 Creating backups..."
sudo cp /etc/postgresql/16/main/postgresql.conf /etc/postgresql/16/main/postgresql.conf.backup
sudo cp /etc/postgresql/16/main/pg_hba.conf /etc/postgresql/16/main/pg_hba.conf.backup
echo "✓ Backups created"
echo ""

# Configure postgresql.conf to listen on all interfaces
echo "🌐 Configuring postgresql.conf to listen on all network interfaces..."
sudo sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/" /etc/postgresql/16/main/postgresql.conf
sudo sed -i "s/listen_addresses = 'localhost'/listen_addresses = '*'/" /etc/postgresql/16/main/postgresql.conf
echo "✓ postgresql.conf updated"
echo ""

# Add network access rule to pg_hba.conf
echo "🔐 Configuring pg_hba.conf to allow local network connections..."
# Check if rule already exists
if ! sudo grep -q "192.168.12.0/24" /etc/postgresql/16/main/pg_hba.conf; then
    # Add rule for local network (adjust subnet if needed)
    echo "# Allow connections from local network" | sudo tee -a /etc/postgresql/16/main/pg_hba.conf > /dev/null
    echo "host    all             all             192.168.12.0/24         scram-sha-256" | sudo tee -a /etc/postgresql/16/main/pg_hba.conf > /dev/null
    echo "✓ pg_hba.conf updated"
else
    echo "✓ Network rule already exists in pg_hba.conf"
fi
echo ""

# Restart PostgreSQL
echo "🔄 Restarting PostgreSQL service..."
sudo systemctl restart postgresql
sleep 2
echo "✓ PostgreSQL restarted"
echo ""

# Check if PostgreSQL is running
if sudo systemctl is-active --quiet postgresql; then
    echo "✅ PostgreSQL is running and configured for network access!"
    echo ""
    echo "📊 PostgreSQL is now listening on:"
    sudo ss -tlnp | grep 5432 || echo "   Port 5432 (all interfaces)"
    echo ""
    echo "🌐 Your database connection string should be:"
    echo "   postgresql://postgres:password@192.168.12.214:5432/events_db"
    echo ""
    echo "🔒 Security Note: Make sure your firewall allows port 5432"
    echo "   To allow port 5432: sudo ufw allow 5432/tcp"
else
    echo "❌ Error: PostgreSQL failed to start"
    echo "Check logs: sudo journalctl -u postgresql -n 50"
fi
