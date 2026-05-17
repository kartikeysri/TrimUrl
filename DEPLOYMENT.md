# Production Deployment Guide

## Frontend Deployment

### Option 1: Netlify (Recommended for Beginners)

#### Step 1: Prepare Frontend
```bash
cd frontend

# Build the application
npm run build

# Make sure dist folder is created
```

#### Step 2: Deploy to Netlify
```bash
# Install Netlify CLI (optional)
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

Or manually through Netlify Dashboard:
1. Go to https://netlify.com
2. Sign up/Login
3. Click "New site from Git"
4. Connect your GitHub repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Environment variables:
     - `VITE_API_URL`: Your backend API URL
     - `VITE_APP_NAME`: TrimUrl

#### Step 3: Configure Environment Variables
In Netlify Dashboard:
1. Go to Site settings → Build & deploy → Environment
2. Add environment variables:
   ```
   VITE_API_URL=https://your-backend-url/api
   VITE_APP_NAME=TrimUrl
   ```

### Option 2: Vercel

#### Step 1: Prepare Repository
Push your code to GitHub

#### Step 2: Deploy
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - Framework: Vite
   - Root Directory: ./frontend
   - Build Command: npm run build
   - Output Directory: dist

#### Step 3: Environment Variables
1. Go to Settings → Environment Variables
2. Add:
   ```
   VITE_API_URL=https://your-backend-url/api
   VITE_APP_NAME=TrimUrl
   ```

### Option 3: GitHub Pages

#### Step 1: Modify vite.config.js
```javascript
export default defineConfig({
  base: '/trimurl-app/', // Replace with your repo name
  // ... rest of config
})
```

#### Step 2: Build and Deploy
```bash
npm run build
npm install -D gh-pages
npm run build
npx gh-pages -d dist
```

#### Step 3: Repository Settings
- Go to Settings → Pages
- Select branch: gh-pages
- Select folder: / (root)

## Backend Deployment

### Option 1: Railway (Recommended)

#### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub

#### Step 2: Deploy Backend
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Connect your repository
4. Select backend folder
5. Configure environment variables:
   ```
   JWT_SECRET=very-long-random-secret-key
   SERVER_PORT=8080
   CORS_ALLOWED_ORIGINS=https://your-frontend-domain
   ```

#### Step 3: Add PostgreSQL Database
1. In Railway project, click "+ Create"
2. Select "PostgreSQL"
3. Note the database credentials

#### Step 4: Update Backend Environment Variables
```
DATABASE_URL=your-railway-postgres-url
DATABASE_USER=your-db-user
DATABASE_PASSWORD=your-db-password
JWT_SECRET=your-jwt-secret
SERVER_PORT=8080
CORS_ALLOWED_ORIGINS=https://your-frontend-url
```

### Option 2: Fly.io

#### Step 1: Install Fly CLI
```bash
# Windows
iwr https://fly.io/install.ps1 -useb | iex

# macOS/Linux
curl -L https://fly.io/install.sh | sh
```

#### Step 2: Create Fly App
```bash
cd backend

# Login
flyctl auth login

# Launch app
flyctl launch
```

#### Step 3: Add PostgreSQL Database
```bash
flyctl postgres create
```

#### Step 4: Deploy
```bash
flyctl deploy
```

#### Step 5: Set Secrets
```bash
flyctl secrets set \
  JWT_SECRET=your-secret-key \
  DATABASE_URL=your-postgres-url \
  CORS_ALLOWED_ORIGINS=https://your-frontend-url
```

### Option 3: Heroku (Free tier limited)

#### Step 1: Install Heroku CLI
https://devcenter.heroku.com/articles/heroku-cli

#### Step 2: Create Heroku Account
https://www.heroku.com/

#### Step 3: Deploy Backend
```bash
cd backend

# Login
heroku login

# Create app
heroku create your-trimurl-backend

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Deploy
git push heroku main
```

#### Step 4: Set Environment Variables
```bash
heroku config:set JWT_SECRET=your-secret-key
heroku config:set CORS_ALLOWED_ORIGINS=https://your-frontend-url
```

### Option 4: Render

#### Step 1: Create Account
Go to https://render.com and sign up

#### Step 2: Create PostgreSQL Database
1. Click "+ New"
2. Select "PostgreSQL"
3. Choose Free tier
4. Note connection details

#### Step 3: Deploy Backend
1. Click "+ New"
2. Select "Web Service"
3. Connect GitHub repository
4. Configure:
   - Build Command: `mvn clean package`
   - Start Command: `java -jar target/trimurl-backend-1.0.0.jar`
   - Environment Variables:
     ```
     DATABASE_URL=your-postgres-url
     JWT_SECRET=your-secret-key
     CORS_ALLOWED_ORIGINS=https://your-frontend-url
     ```

## Database Deployment

### PostgreSQL Hosting Options

#### Option 1: Railway
- Included with backend deployment
- Automatic backups
- Simple setup

#### Option 2: Neon (PostgreSQL as a Service)
1. Go to https://neon.tech
2. Sign up
3. Create project
4. Get connection string
5. Use as DATABASE_URL

#### Option 3: ElephantSQL (Now Aiven)
1. Go to https://www.aiven.io/
2. Sign up
3. Create PostgreSQL database
4. Get connection details

#### Option 4: AWS RDS (Small free tier)
1. Create AWS account
2. Go to RDS
3. Create PostgreSQL instance
4. Configure security groups
5. Get endpoint

## Post-Deployment Configuration

### 1. Update CORS Settings
Edit backend CORS configuration with your frontend URL:
```
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com
```

### 2. Update Frontend API URL
Update environment variables:
```
VITE_API_URL=https://your-backend-domain.com/api
```

### 3. Test APIs
```bash
# Test backend health
curl https://your-backend-url/api/health

# Test login
curl -X POST https://your-backend-url/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password"}'
```

### 4. Configure Domain (Optional)
- Use custom domain from domain registrar
- Point DNS to deployment platform
- Enable HTTPS (usually automatic)

## Security Checklist

- [ ] Changed JWT_SECRET from default
- [ ] Set strong database password
- [ ] Enabled HTTPS
- [ ] Configured CORS correctly
- [ ] Set environment variables securely
- [ ] Backed up database
- [ ] Set up monitoring/logging
- [ ] Configured rate limiting
- [ ] Enabled database encryption
- [ ] Regular security updates

## Environment Variables Checklist

### Backend Production
```bash
DATABASE_URL=postgresql://user:pass@host:port/db
DATABASE_USER=your_db_user
DATABASE_PASSWORD=your_db_password
JWT_SECRET=very-long-random-complex-secret-key
JWT_EXPIRATION=86400000
SERVER_PORT=8080
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com
```

### Frontend Production
```bash
VITE_API_URL=https://your-backend-domain.com/api
VITE_APP_NAME=TrimUrl
```

## Monitoring & Maintenance

### Logs
- Railway: View in dashboard
- Fly.io: `flyctl logs`
- Render: View in dashboard
- Heroku: `heroku logs --tail`

### Database Backups
```bash
# Manual backup
pg_dump postgresql://user:pass@host/db > backup.sql

# Restore
psql postgresql://user:pass@host/db < backup.sql
```

### Performance Monitoring
- Monitor API response times
- Check database query performance
- Monitor error rates
- Set up alerting

## Troubleshooting Production Issues

### Backend won't start
```bash
# Check logs
flyctl logs  # or platform-specific command

# Common issues:
# - Database connection failed
# - Missing environment variables
# - Java version mismatch
```

### Frontend won't load
```bash
# Check browser console for errors
# Check network tab for API calls
# Verify VITE_API_URL is correct
```

### Database connection issues
```bash
# Test connection
psql postgresql://user:pass@host/db

# Check connection string format
# Check firewall rules
# Verify credentials
```

### CORS errors
```bash
# Update CORS_ALLOWED_ORIGINS
# Include trailing slash if needed
# Check exact domain/port match
```

## Cost Estimation

- **Frontend**: Free (Netlify, Vercel, GitHub Pages)
- **Backend**: $5-7/month (Railway, Fly.io)
- **Database**: $15/month (Railway PostgreSQL) or free tier available
- **Total**: $20-22/month for small-scale deployment

## Scaling for Production

As traffic grows:
1. Enable caching
2. Add CDN for frontend
3. Optimize database queries
4. Consider database replication
5. Load balance backend servers
6. Add monitoring and alerting
7. Implement rate limiting
8. Add API documentation

## Additional Resources

- [Railway Documentation](https://docs.railway.app)
- [Fly.io Deployment](https://fly.io/docs/getting-started/)
- [Netlify Docs](https://docs.netlify.com/)
- [Vercel Docs](https://vercel.com/docs)
- [Spring Boot Deployment](https://spring.io/guides/gs/spring-boot/)
