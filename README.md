# TrimUrl - Modern URL Shortener

A production-ready, full-stack URL shortener web application inspired by Bitly with a modern, dynamic UI and powerful analytics.

## 🌟 Features

- **Fast URL Shortening**: Create shortened URLs instantly
- **Custom Short Codes**: Optional custom URL codes
- **QR Code Generation**: Generate QR codes for shortened URLs
- **Detailed Analytics**: Track clicks, geographic data, and referrers
- **User Authentication**: JWT-based authentication with BCrypt password encryption
- **Dark/Light Mode**: Theme toggle for user preference
- **Multi-language Support**: English and Spanish support
- **Responsive Design**: Works seamlessly on mobile and desktop
- **Production Ready**: Deployed to free hosting platforms
- **Modern Stack**: React + Vite, Spring Boot, PostgreSQL

## 📋 Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **Lucide React** - Icons
- **QRCode.react** - QR code generation

### Backend
- **Spring Boot 3.2** - Java framework
- **Spring Security** - Authentication & authorization
- **JWT** - Token-based authentication
- **Spring Data JPA** - Database access
- **PostgreSQL** - Database
- **BCrypt** - Password encryption
- **Maven** - Build tool

### Deployment
- **Frontend**: Netlify, Vercel, or GitHub Pages
- **Backend**: Railway, Fly.io, or Heroku (free tier)
- **Database**: PostgreSQL (Railway, Fly.io, or local)

## 📁 Project Structure

```
trimurl-app/
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   ├── context/          # Context providers
│   │   ├── hooks/            # Custom hooks
│   │   ├── utils/            # Utility functions
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # Entry point
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
├── backend/
│   ├── src/main/java/com/trimurl/
│   │   ├── controller/       # REST controllers
│   │   ├── service/          # Business logic
│   │   ├── entity/           # JPA entities
│   │   ├── repository/       # Data access
│   │   ├── dto/              # Data transfer objects
│   │   ├── config/           # Spring configuration
│   │   ├── security/         # Security & JWT
│   │   └── TrimUrlApplication.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── database/
│   ├── schema.sql            # Database schema
│   └── DATABASE_SETUP.md     # Database setup guide
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Java 17+
- PostgreSQL 12+
- Maven 3.6+
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd trimurl-app
```

### 2. Database Setup
```bash
# Follow DATABASE_SETUP.md for PostgreSQL setup
cd database
psql -U postgres -d trimurl_db -f schema.sql
```

### 3. Backend Setup
```bash
cd backend

# Create .env file
# DATABASE_URL=jdbc:postgresql://localhost:5432/trimurl_db
# DATABASE_USER=postgres
# DATABASE_PASSWORD=your_password
# JWT_SECRET=your-secret-key
# SERVER_PORT=8080

# Build and run
mvn clean install
mvn spring-boot:run
```

The backend will be available at `http://localhost:8080/api`

### 4. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Create .env file
# VITE_API_URL=http://localhost:8080/api
# VITE_APP_NAME=TrimUrl

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### URLs
- `POST /api/urls/shorten` - Create shortened URL
- `GET /api/urls` - Get user's URLs
- `DELETE /api/urls/{id}` - Delete URL
- `GET /api/urls/stats/dashboard` - Get dashboard statistics

### Redirect
- `GET /api/r/{shortCode}` - Redirect to original URL

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication.

### How it works:
1. User registers/logs in with email and password
2. Password is encrypted with BCrypt
3. Server generates a JWT token
4. Client stores token in localStorage
5. Token is sent with each API request in Authorization header
6. Server validates token on protected routes

### Token Format:
```
Authorization: Bearer <your-jwt-token>
```

## 🗄️ Database Schema

### Users Table
```sql
- id (Primary Key)
- email (Unique)
- password (Hashed)
- created_at
- updated_at
```

### URLs Table
```sql
- id (Primary Key)
- original_url
- short_code (Unique)
- clicks
- user_id (Foreign Key)
- created_at
- updated_at
```

## 🎨 UI/UX Highlights

- **Modern Design**: Glassmorphism effects, gradient backgrounds, smooth animations
- **Responsive**: Mobile-first approach with breakpoints for all devices
- **Accessibility**: WCAG compliance with proper semantic HTML
- **Dark Mode**: System preference detection with manual toggle
- **Smooth Animations**: Framer Motion for fluid transitions
- **Form Validation**: Client and server-side validation
- **Password Strength**: Visual feedback for password complexity

## 📱 Pages

### 1. Landing Page (/)
- Navbar with theme and language toggle
- Hero section with URL input
- Statistics section
- Features showcase
- Testimonials
- CTA section
- Responsive footer

### 2. Login Page (/login)
- Email and password input
- Remember me checkbox
- Forgot password link (UI only)
- Google login button (UI only)
- Sign up redirect link

### 3. Signup Page (/signup)
- Email and password input
- Password strength indicator
- Confirm password field
- Terms acceptance checkbox
- Google signup button (UI only)
- Login redirect link

### 4. Dashboard (/dashboard)
- Create new URL form with custom code option
- URL list with pagination
- Search and filter functionality
- Click statistics
- QR code generation and download
- Delete URL functionality
- Copy to clipboard buttons

## 🚢 Deployment

### Frontend Deployment

#### Netlify
1. Push code to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables in Netlify dashboard

#### Vercel
1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy!

### Backend Deployment

#### Railway
1. Create Railway account
2. Connect GitHub repository
3. Add PostgreSQL plugin
4. Set environment variables
5. Deploy!

#### Fly.io
```bash
flyctl launch
flyctl secrets set JWT_SECRET=your-secret
flyctl deploy
```

### Environment Variables for Production

**Backend:**
```
DATABASE_URL=your-postgresql-url
DATABASE_USER=your-db-user
DATABASE_PASSWORD=your-db-password
JWT_SECRET=very-long-random-secret-key
JWT_EXPIRATION=86400000
SERVER_PORT=8080
CORS_ALLOWED_ORIGINS=https://yourdomain.com
```

**Frontend:**
```
VITE_API_URL=https://your-backend-url/api
VITE_APP_NAME=TrimUrl
```

## 🔧 Configuration

### JWT Configuration
Located in `backend/src/main/resources/application.properties`:
```properties
jwt.secret=your-secret-key
jwt.expiration=86400000 # 24 hours in milliseconds
```

### CORS Configuration
Edit `backend/src/main/java/com/trimurl/TrimUrlApplication.java`:
```java
configuration.setAllowedOrigins(Arrays.asList("your-frontend-url"));
```

### Database Configuration
Edit `.env` or `application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/trimurl_db
spring.datasource.username=postgres
spring.datasource.password=password
```

## 🧪 Testing

### Frontend
```bash
cd frontend
npm run lint
```

### Backend
```bash
cd backend
mvn test
```

## 📈 Performance Tips

- **Frontend**: Code splitting, lazy loading, image optimization
- **Backend**: Database indexing, connection pooling, caching
- **Database**: Proper indexes on frequently queried columns
- **CDN**: Use CloudFlare or Bunny CDN for asset delivery

## 🐛 Troubleshooting

### Frontend won't connect to backend
- Check VITE_API_URL in .env
- Ensure backend is running on the correct port
- Check CORS settings in backend

### Database connection error
- Verify PostgreSQL is running
- Check DATABASE_URL format
- Verify username and password
- Check database exists

### Authentication not working
- Verify JWT_SECRET is set
- Check token expiration time
- Clear localStorage and try again
- Check Authorization header format

## 📝 Environment File Examples

### Backend (.env)
```
DATABASE_URL=jdbc:postgresql://localhost:5432/trimurl_db
DATABASE_USER=postgres
DATABASE_PASSWORD=password
JWT_SECRET=your-super-secret-jwt-key-that-should-be-long-and-random
JWT_EXPIRATION=86400000
SERVER_PORT=8080
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8080/api
VITE_APP_NAME=TrimUrl
```

## 🎯 Future Enhancements

- [ ] Google OAuth integration
- [ ] GitHub OAuth integration
- [ ] Advanced analytics dashboard
- [ ] URL expiration dates
- [ ] Password-protected URLs
- [ ] Custom domain support
- [ ] Bulk URL shortening
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Email notifications
- [ ] Rate limiting
- [ ] Admin dashboard
- [ ] URL categories/tags

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Created as a modern, production-ready URL shortener service.

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review database setup guide
3. Check environment variables
4. Review console logs

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ - TrimUrl: Shorten Your URLs, Amplify Your Reach**
