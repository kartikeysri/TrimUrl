# TrimUrl - URL Shortener Database Setup

## PostgreSQL Installation

### Windows
1. Download PostgreSQL from https://www.postgresql.org/download/windows/
2. Run the installer
3. Remember the password you set for the `postgres` user
4. Complete the installation

### macOS
```bash
brew install postgresql@15
brew services start postgresql@15
```

### Linux (Ubuntu/Debian)
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start
```

## Database Setup

### 1. Connect to PostgreSQL
```bash
# Windows/macOS/Linux
psql -U postgres
```

### 2. Create Database User (Optional but Recommended)
```sql
CREATE USER trimurl_user WITH PASSWORD 'your_secure_password';
ALTER ROLE trimurl_user CREATEDB;
```

### 3. Create Database
```sql
CREATE DATABASE trimurl_db OWNER trimurl_user;
```

### 4. Run Schema
```bash
# Connect to the database
psql -U trimurl_user -d trimurl_db -f schema.sql

# Or for postgres user
psql -U postgres -d trimurl_db -f schema.sql
```

## Environment Variables

Create a `.env` file or set the following environment variables:

### Backend (.env)
```
DATABASE_URL=jdbc:postgresql://localhost:5432/trimurl_db
DATABASE_USER=trimurl_user
DATABASE_PASSWORD=your_secure_password
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRATION=86400000
SERVER_PORT=8080
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8080/api
VITE_APP_NAME=TrimUrl
```

## Verify Setup

```bash
# Connect to database
psql -U trimurl_user -d trimurl_db

# List tables
\dt

# Should see: urls, users
```

## Troubleshooting

### Port Already in Use
PostgreSQL default port is 5432. If busy:
```bash
psql -U postgres -p 5433
```

### Connection Refused
- Ensure PostgreSQL is running
- Check database credentials
- Verify DATABASE_URL in environment variables

### Permission Denied
```sql
-- Grant all permissions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO trimurl_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO trimurl_user;
GRANT USAGE ON SCHEMA public TO trimurl_user;
```
