-- Fix PostgreSQL permissions for Gelbe Seiten database
-- Run this as the postgres superuser

-- First, connect to the gelbeseiten database
\c gelbeseiten;

-- Grant privileges to the test user (or whatever user you're using)
-- Replace 'test@email.com' with your actual PostgreSQL username if different
GRANT ALL PRIVILEGES ON DATABASE gelbeseiten TO "test@email.com";
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO "test@email.com";
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO "test@email.com";
GRANT USAGE ON SCHEMA public TO "test@email.com";

-- Also grant to postgres user (just in case)
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;

-- Make sure future objects are also accessible
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO "test@email.com";
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO "test@email.com";

-- Verify the grants
\dt
SELECT grantee, privilege_type 
FROM information_schema.table_privileges 
WHERE table_schema = 'public' 
AND table_name = 'business_branches';
