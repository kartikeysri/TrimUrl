# Quick Start Guide - 5 Minutes to Running

## Fastest Way: Using Docker (Recommended)

```bash
# 1. Clone/navigate to project
cd trimurl-app

# 2. Start everything with one command
docker-compose up --build

# 3. Open browser
Frontend: http://localhost:5173
Backend: http://localhost:8080/api
```

That's it! ✅

---

## Manual Setup (Without Docker)

### Prerequisites Check (2 min)
```bash
# Verify Java
java -version

# Verify Node
node -v
npm -v

# Verify PostgreSQL is running
psql --version
```

### Step 1: Database (1 min)
```bash
# Open PostgreSQL
psql -U postgres

# Run in psql:
CREATE DATABASE trimurl_db;
CREATE USER trimurl_user WITH PASSWORD 'trimurl123';
ALTER ROLE trimurl_user CREATEDB;
\q

# Load schema
psql -U trimurl_user -d trimurl_db -f database/schema.sql
```

### Step 2: Backend (1 min)
```bash
cd backend

# Create .env file with:
# DATABASE_URL=jdbc:postgresql://localhost:5432/trimurl_db
# DATABASE_USER=trimurl_user
# DATABASE_PASSWORD=trimurl123
# JWT_SECRET=your-secret-key

# Run
mvn clean install
mvn spring-boot:run

# Wait for: Started TrimUrlApplication
```

### Step 3: Frontend (1 min)
```bash
cd frontend

# Install & run
npm install
npm run dev

# Visit: http://localhost:5173
```

---

## What You Get

✅ **Frontend**
- Modern React app with Tailwind CSS
- Pages: Home, Login, Signup, Dashboard
- Features: Dark mode, multiple languages, animations
- Ready to use: No login needed for home page

✅ **Backend**
- Spring Boot REST API
- JWT authentication
- Database integration
- Automatic schema creation

✅ **Database**
- PostgreSQL with schema
- Users and URLs tables
- Indexes for performance

---

## First Test

### 1. Register User
Go to http://localhost:5173
Click "Sign Up"
Fill form:
- Email: test@test.com
- Password: password123

### 2. Create Short URL
After login, go to Dashboard
Enter URL: https://www.example.com/very/long/url
Click "Create URL"

### 3. Check Result
See shortened URL in list
Copy and open it to test

---

## Common Issues

| Issue | Solution |
|-------|----------|
| Port 8080 in use | `lsof -i :8080` then `kill -9 <PID>` |
| Database connection failed | Check `psql -U trimurl_user -d trimurl_db` |
| Frontend can't find backend | Check `VITE_API_URL` in .env |
| Backend won't start | Check Java version is 17+ |
| npm install fails | Delete node_modules, try again |

---

## Next Steps

1. ✅ App is running
2. 📝 Read [README.md](README.md) for full documentation
3. 🔧 Read [LOCAL_SETUP.md](LOCAL_SETUP.md) for detailed setup
4. 🚀 Read [DEPLOYMENT.md](DEPLOYMENT.md) to deploy live
5. 📖 Read [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for API details

---

## Project Structure at a Glance

```
├── frontend/          👈 React + Vite
│   └── src/
│       ├── pages/     (Home, Login, Signup, Dashboard)
│       ├── components/ (Navbar, Footer, Cards)
│       ├── services/   (API calls)
│       └── App.jsx    (Main app)
│
├── backend/           👈 Spring Boot
│   ├── controller/    (REST endpoints)
│   ├── service/       (Business logic)
│   ├── entity/        (Database models)
│   └── security/      (JWT & Auth)
│
└── database/          👈 PostgreSQL
    └── schema.sql    (Tables & indexes)
```

---

## Useful Commands

```bash
# Frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview build

# Backend
mvn spring-boot:run  # Start server
mvn clean install    # Build
mvn test             # Run tests

# Database
psql -U trimurl_user -d trimurl_db  # Connect
\dt                                   # List tables
\q                                    # Exit
```

---

## Feature Overview

### 🔐 Authentication
- Email/password registration
- JWT tokens
- Secure password hashing

### 🔗 URL Shortening
- Create short URLs instantly
- Custom codes (optional)
- Auto-generated codes
- Click tracking

### 📊 Analytics
- View all your URLs
- Track clicks per URL
- Total statistics
- Creation date tracking

### 🎨 Design
- Dark/light mode
- Multiple languages
- Mobile responsive
- Modern animations

### 🚀 Ready to Deploy
- Free hosting compatible
- Environment-based config
- Production optimized
- Security best practices

---

## Support & Resources

📚 **Documentation**
- [README.md](README.md) - Full guide
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API reference
- [LOCAL_SETUP.md](LOCAL_SETUP.md) - Detailed setup
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deploy guide

🛠️ **Setup Guides**
- [DATABASE_SETUP.md](database/DATABASE_SETUP.md) - Database setup
- [DOCKER_SETUP.md](DOCKER_SETUP.md) - Docker guide

💬 **Need Help?**
1. Check the documentation
2. Review error messages
3. Check database connection
4. Verify environment variables
5. Check logs

---

## Architecture Overview

```
User Browser
     ↓
  [React Frontend]
     ↓ (API calls)
  [Spring Boot Backend]
     ↓ (SQL queries)
  [PostgreSQL Database]
```

All communication is HTTPS-ready and uses JWT for security.

---

## Ready?

**Choose your path:**

- 🐳 **Docker**: `docker-compose up --build`
- 📚 **Manual**: Follow the 3 steps above
- 🚀 **Deploy**: Read [DEPLOYMENT.md](DEPLOYMENT.md)

**Happy coding! 🎉**
