# Local Development Setup Guide

## Prerequisites Installation

### 1. Node.js & npm
- Download from: https://nodejs.org/ (LTS version)
- Verify installation:
```bash
node --version
npm --version
```

### 2. Java Development Kit (JDK)
- Download from: https://adoptopenjdk.net/ or https://www.oracle.com/java/technologies/javase-jdk17-downloads.html
- Verify installation:
```bash
java -version
javac -version
```

### 3. Maven
- Download from: https://maven.apache.org/download.cgi
- Extract and add to PATH
- Verify installation:
```bash
mvn --version
```

### 4. PostgreSQL
- Download from: https://www.postgresql.org/download/
- Install and remember the postgres password
- Start PostgreSQL service
- Verify installation:
```bash
psql --version
```

### 5. Git (Optional)
- Download from: https://git-scm.com/
- Verify installation:
```bash
git --version
```

## Step-by-Step Setup

### Step 1: Create Project Directories

```bash
# Create main project folder
mkdir trimurl-app
cd trimurl-app
```

### Step 2: Clone or Copy Files

If using git:
```bash
git clone <your-repo-url>
```

Or copy the project files manually to the trimurl-app directory.

### Step 3: Setup Database

```bash
# Open PostgreSQL command line
psql -U postgres

# In PostgreSQL CLI:
CREATE DATABASE trimurl_db;
CREATE USER trimurl_user WITH PASSWORD 'trimurl123';
ALTER ROLE trimurl_user CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE trimurl_db TO trimurl_user;
```

Then run the schema:
```bash
cd database
psql -U trimurl_user -d trimurl_db -f schema.sql
```

### Step 4: Setup Backend

```bash
cd backend

# Create .env file (or set environment variables)
# Content:
# DATABASE_URL=jdbc:postgresql://localhost:5432/trimurl_db
# DATABASE_USER=trimurl_user
# DATABASE_PASSWORD=trimurl123
# JWT_SECRET=your-secret-key-here-change-in-production
# SERVER_PORT=8080

# Build
mvn clean install

# Run
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### Step 5: Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
# Content:
# VITE_API_URL=http://localhost:8080/api
# VITE_APP_NAME=TrimUrl

# Start dev server
npm run dev
```

The frontend will start on `http://localhost:5173` or `http://localhost:3000`

## Verifying Setup

### 1. Backend Health Check
```bash
curl http://localhost:8080/api/health
# Should return successful response
```

### 2. Frontend Access
Open browser and go to `http://localhost:5173`

### 3. Database Connection
```bash
psql -U trimurl_user -d trimurl_db
# Type \dt to see tables
```

## Common Issues & Solutions

### Issue: Port Already in Use

**Backend (8080):**
```bash
# Find process using port 8080
lsof -i :8080
# Kill the process
kill -9 <PID>

# Or use different port
export SERVER_PORT=8081
```

**Frontend (5173):**
```bash
# Use different port
npm run dev -- --port 3000
```

### Issue: Database Connection Failed

Check connection string:
```bash
# Test connection
psql -U trimurl_user -d trimurl_db -h localhost

# If fails, check:
# 1. PostgreSQL is running
# 2. Database exists: \l
# 3. User exists: \du
```

### Issue: Backend Won't Start

```bash
# Check Java version
java -version  # Should be 17+

# Check Maven
mvn --version

# Clean and rebuild
mvn clean
mvn install
```

### Issue: Frontend Build Fails

```bash
# Clear cache
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Try again
npm run dev
```

### Issue: CORS Error

Make sure backend CORS is configured correctly in `application.properties`:
```properties
app.cors.allowed-origins=http://localhost:3000,http://localhost:5173
```

## Development Workflow

### Making Changes

1. **Frontend Changes**
   - Edit files in `frontend/src/`
   - Changes auto-reload on save (Vite HMR)

2. **Backend Changes**
   - Edit Java files in `backend/src/main/java/`
   - Restart with: `mvn spring-boot:run`
   - Or use DevTools for auto-reload

3. **Database Changes**
   - Modify schema in `database/schema.sql`
   - Spring Boot auto-updates with `ddl-auto=update`

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
# Creates optimized dist/ folder
```

**Backend:**
```bash
cd backend
mvn clean package
# Creates trimurl-backend-1.0.0.jar
```

## Development Tools

### Frontend Dev Tools
- VS Code with ES7+ React/Redux/React-Native snippets
- React DevTools browser extension
- Redux DevTools (if using Redux)

### Backend Dev Tools
- IntelliJ IDEA Community or Spring Tool Suite
- Postman for API testing
- pgAdmin for database management

### API Testing with curl

```bash
# Register
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'

# Get token from response and use in Authorization header
```

## Useful Commands

### Frontend
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Backend
```bash
# Run the application
mvn spring-boot:run

# Build JAR file
mvn clean package

# Run tests
mvn test

# Update Maven dependencies
mvn dependency:update-sources
```

### Database
```bash
# Backup database
pg_dump -U trimurl_user trimurl_db > backup.sql

# Restore database
psql -U trimurl_user trimurl_db < backup.sql

# Drop and recreate
dropdb -U trimurl_user trimurl_db
createdb -U trimurl_user trimurl_db
psql -U trimurl_user -d trimurl_db -f schema.sql
```

## Environment Variables Reference

### Backend (application.properties)

| Variable | Description | Default |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection URL | jdbc:postgresql://localhost:5432/trimurl_db |
| DATABASE_USER | Database user | postgres |
| DATABASE_PASSWORD | Database password | password |
| JWT_SECRET | JWT signing secret | your-secret-key |
| JWT_EXPIRATION | Token expiration (ms) | 86400000 |
| SERVER_PORT | Backend port | 8080 |
| CORS_ALLOWED_ORIGINS | Allowed frontend URLs | http://localhost:3000 |

### Frontend (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | http://localhost:8080/api |
| VITE_APP_NAME | Application name | TrimUrl |

## Next Steps

1. ✅ Complete local setup
2. 📝 Customize the application (colors, logo, etc.)
3. 🧪 Test all features
4. 🚀 Deploy to production
5. 📊 Monitor analytics
6. 🔐 Set up security measures

See DEPLOYMENT.md for production deployment guide.
