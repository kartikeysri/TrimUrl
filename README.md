# TrimURL

A full-stack URL shortener. Users sign up, create short links (random or custom aliases), share them with QR codes, and track clicks from a personal dashboard. Built with a **Spring Boot REST API** secured by **JWT**, a **PostgreSQL** database, and a **React + Vite** frontend.

**Live demo:** https://trim-url-pmdz.vercel.app/

---

## Features

- **Short links** – 6-character auto-generated codes, or a custom alias of your choice; duplicates are rejected.
- **Fast redirects** – public `/r/{shortCode}` endpoint backed by a unique, indexed `short_code` column.
- **Click tracking** – every redirect increments the link's click count.
- **Dashboard** – paginated link history plus total, average and top click counts.
- **QR codes** – generated in the browser for any short link.
- **JWT authentication** – stateless register/login with BCrypt-hashed passwords; users can only view and delete their own links.
- **Dark / light theme** and **English / Spanish** UI.
- **Docker Compose** – runs the database, API and frontend with one command.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Backend | Java 17, Spring Boot 3.2, Spring Web, Spring Security, Spring Data JPA (Hibernate), Bean Validation, Lombok |
| Auth | JWT (jjwt), BCrypt |
| Database | PostgreSQL 15 |
| Frontend | React 18, Vite, React Router, Axios, Tailwind CSS, Framer Motion, qrcode.react |
| DevOps | Docker, Docker Compose, Vercel (frontend) |

## Architecture

```
React (Vercel)  ──HTTPS + JWT──▶  Spring Boot API  ──JPA──▶  PostgreSQL
                                        │
Visitor ── GET /api/r/{code} ───────────┘  looks up code → counts click → redirects
```

```
backend/src/main/java/com/trimurl/
├── controller/   AuthController, UrlController, RedirectController
├── service/      AuthService, UrlService
├── repository/   UserRepository, UrlRepository
├── entity/       User, Url
├── dto/          Request/response objects
├── security/     JwtProvider, JwtAuthenticationFilter
└── config/       Security and CORS configuration
```

**Database design**

- `urls.short_code` is unique and indexed, so each redirect is a single index lookup.
- Indexes on `urls(user_id)` and `urls(created_at DESC)` keep the dashboard's per-user, newest-first listing fast.
- Index on `users(email)` for login lookups.

Full schema: [`database/schema.sql`](database/schema.sql)

## API Endpoints

All routes are served under the `/api` context path.

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | No | Register, returns JWT |
| POST | `/api/auth/login` | No | Log in, returns JWT |
| GET | `/api/r/{shortCode}` | No | Redirect to the original URL |
| POST | `/api/urls/shorten` | Yes | Create a short link |
| GET | `/api/urls?page=0&size=10` | Yes | Your links, newest first |
| DELETE | `/api/urls/{id}` | Yes | Delete one of your links |
| GET | `/api/urls/stats/dashboard` | Yes | Total, average and max clicks |

**Example – create a short link**

```http
POST /api/urls/shorten
Authorization: Bearer <token>
Content-Type: application/json

{
  "originalUrl": "https://example.com/a/very/long/path",
  "customCode": "my-link"
}
```

`customCode` is optional; leave it out to get a generated code.

## Running Locally

### Option 1: Docker Compose

```bash
docker compose up --build
```

| Service | URL |
| --- | --- |
| Frontend | http://localhost:3000 |
| API | http://localhost:8080/api |
| PostgreSQL | localhost:5432 |

### Option 2: Manual

**Prerequisites:** Java 17, Maven, Node.js 18+, PostgreSQL

```bash
# 1. Database
createdb trimurl_db

# 2. Backend
cd backend
mvn spring-boot:run

# 3. Frontend (new terminal)
cd frontend
cp .env.example .env
npm install
npm run dev
```

### Environment Variables

**Backend**

| Variable | Default | Purpose |
| --- | --- | --- |
| `SPRING_DATASOURCE_URL` | `jdbc:postgresql://localhost:5432/trimurl_db` | Database URL |
| `SPRING_DATASOURCE_USERNAME` | `postgres` | Database user |
| `SPRING_DATASOURCE_PASSWORD` | – | Database password |
| `JWT_SECRET` | – | Token signing key, **always set in production** |
| `JWT_EXPIRATION` | `86400000` (24 h) | Token lifetime in ms |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:3000` | Allowed frontend origins |
| `SERVER_PORT` | `8080` | Server port |

**Frontend**

| Variable | Example | Purpose |
| --- | --- | --- |
| `VITE_API_URL` | `http://localhost:8080/api` | Backend base URL |

## Deployment

- **Frontend:** Vercel, with `frontend/` as the project root.
- **Backend:** any Docker host (see `backend/Dockerfile`).

Step-by-step instructions: [DEPLOYMENT.md](DEPLOYMENT.md)

## Roadmap

- Base62 encoding of database IDs for collision-free short codes
- Redis cache in front of redirect lookups
- Atomic click counter and 302 redirects for accurate analytics
- Link expiry and per-user rate limiting
- Global exception handler and integration tests

## Author

**Kartikey Srivastava** – Backend Developer (Java / Spring Boot)
[LinkedIn](https://www.linkedin.com/in/kartikey-srivastava-33a9741a0) · [GitHub](https://github.com/kartikeysri)
