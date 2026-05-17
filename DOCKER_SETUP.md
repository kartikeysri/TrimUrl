# Docker Setup for TrimUrl

## Prerequisites
- Docker: https://www.docker.com/products/docker-desktop
- Docker Compose: Usually included with Docker Desktop

## Quick Start with Docker

### 1. Build and Run Everything
```bash
cd trimurl-app

# Start all services
docker-compose up --build

# Run in background
docker-compose up -d --build
```

### 2. Wait for Services
```
✅ PostgreSQL: Ready after ~5 seconds
✅ Backend: Ready after ~15-20 seconds
✅ Frontend: Ready after ~10-15 seconds
```

### 3. Access Application
- **Frontend**: http://localhost:5173 or http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **PostgreSQL**: localhost:5432

### 4. Stop Services
```bash
# Stop and remove containers
docker-compose down

# Stop but keep data
docker-compose stop

# Remove everything including volumes (WARNING: data loss)
docker-compose down -v
```

## Docker Files Required

### Backend Dockerfile

Create `backend/Dockerfile`:
```dockerfile
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY . .
RUN mvn clean package

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/trimurl-backend-1.0.0.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
```

### Frontend Dockerfile

Create `frontend/Dockerfile`:
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g http-server
COPY --from=build /app/dist dist
EXPOSE 3000
CMD ["http-server", "dist", "-p", "3000"]
```

## Commands

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres

# Follow logs
docker-compose logs -f
```

### Access Database in Container
```bash
docker-compose exec postgres psql -U trimurl_user -d trimurl_db

# List tables
\dt

# Exit
\q
```

### Rebuild Specific Service
```bash
docker-compose build --no-cache backend
docker-compose up backend
```

### Run Commands in Container
```bash
# Backend
docker-compose exec backend mvn clean package

# Frontend
docker-compose exec frontend npm run build

# Database
docker-compose exec postgres pg_dump -U trimurl_user trimurl_db > backup.sql
```

## Environment Variables in Docker

All environment variables are defined in `docker-compose.yml`. To change them:

### Edit docker-compose.yml
```yaml
environment:
  JWT_SECRET: your-new-secret-key
  # ... other variables
```

### Or use .env file
Create `.env` in project root:
```
POSTGRES_DB=trimurl_db
POSTGRES_USER=trimurl_user
POSTGRES_PASSWORD=trimurl123
JWT_SECRET=your-secret-key
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

Then use in docker-compose.yml:
```yaml
environment:
  JWT_SECRET: ${JWT_SECRET}
```

## Troubleshooting Docker

### Port Already in Use
```bash
# Check what's using port 8080
lsof -i :8080

# Kill the process
kill -9 <PID>

# Or change port in docker-compose.yml
ports:
  - "8081:8080"
```

### Container Won't Start
```bash
# Check logs
docker-compose logs backend

# Rebuild without cache
docker-compose build --no-cache

# Check resource limits
docker stats
```

### Database Connection Failed
```bash
# Check if postgres is ready
docker-compose logs postgres

# Restart postgres
docker-compose restart postgres

# Check network
docker network ls
docker network inspect trimurl_network
```

### Frontend Can't Connect to Backend
```bash
# Use service name for internal requests
VITE_API_URL=http://backend:8080/api

# From host, use localhost
VITE_API_URL=http://localhost:8080/api
```

## Data Persistence

Database data is stored in Docker volume `postgres_data`. To:

### Backup Database
```bash
docker-compose exec postgres pg_dump -U trimurl_user trimurl_db > backup.sql
```

### Restore Database
```bash
docker-compose exec postgres psql -U trimurl_user trimurl_db < backup.sql
```

### Delete Database Volume
```bash
docker volume rm trimurl_postgres_data
# Or
docker-compose down -v
```

## Advanced Docker Usage

### Run Single Service
```bash
docker-compose up backend
```

### Scale Service
```bash
docker-compose up -d --scale backend=3
```

### Attach to Container
```bash
docker-compose exec backend bash
docker-compose exec frontend sh
```

### Build Specific Image
```bash
docker-compose build backend
docker build -t trimurl-backend ./backend
```

### Push to Registry
```bash
docker tag trimurl-backend:latest your-registry/trimurl-backend
docker push your-registry/trimurl-backend
```

## Production Docker Setup

### Security Best Practices
```yaml
services:
  backend:
    environment:
      - JWT_SECRET=${JWT_SECRET}  # Use secrets
    restart: always
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

## Docker Compose Profiles

Run specific services:
```bash
# Only backend and database
docker-compose --profile backend up

# Add profiles to services
services:
  backend:
    profiles:
      - backend
```

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [Best Practices](https://docs.docker.com/develop/dev-best-practices/)
