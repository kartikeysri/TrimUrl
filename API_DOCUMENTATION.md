# API Documentation

## Base URL
```
http://localhost:8080/api
```

## Headers Required
```
Content-Type: application/json
Authorization: Bearer {jwt_token} (for protected routes)
```

---

## Authentication Endpoints

### 1. Register User

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Success Response (201 Created):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "createdAt": "2024-01-15T10:30:00"
}
```

**Error Response (400):**
```json
{
  "message": "Email already registered"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

---

### 2. Login User

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Success Response (200 OK):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "createdAt": "2024-01-15T10:30:00"
}
```

**Error Response (401):**
```json
{
  "message": "Invalid email or password"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

---

## URL Endpoints

### 1. Create Shortened URL

**Endpoint:** `POST /urls/shorten`

**Authentication:** Required (Bearer token)

**Request Body:**
```json
{
  "originalUrl": "https://www.example.com/very/long/url/path",
  "customCode": "mycode"  // Optional
}
```

**Success Response (201 Created):**
```json
{
  "id": 1,
  "originalUrl": "https://www.example.com/very/long/url/path",
  "shortCode": "mycode",
  "clicks": 0,
  "createdAt": "2024-01-15T10:30:00"
}
```

**Error Response (400):**
```json
{
  "message": "Short code already in use"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:8080/api/urls/shorten \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "originalUrl": "https://www.example.com/very/long/url",
    "customCode": "mycode"
  }'
```

---

### 2. Get User's URLs

**Endpoint:** `GET /urls?page=0&size=10`

**Authentication:** Required (Bearer token)

**Query Parameters:**
- `page` (optional): Page number (default: 0)
- `size` (optional): Items per page (default: 10)

**Success Response (200 OK):**
```json
{
  "content": [
    {
      "id": 1,
      "originalUrl": "https://www.example.com/very/long/url",
      "shortCode": "abc123",
      "clicks": 42,
      "createdAt": "2024-01-15T10:30:00"
    },
    {
      "id": 2,
      "originalUrl": "https://www.example.com/another/url",
      "shortCode": "xyz789",
      "clicks": 15,
      "createdAt": "2024-01-14T09:20:00"
    }
  ],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 10,
    "sort": {
      "empty": false
    },
    "offset": 0,
    "paged": true,
    "unpaged": false
  },
  "total": 2,
  "totalPages": 1
}
```

**cURL Example:**
```bash
curl -X GET 'http://localhost:8080/api/urls?page=0&size=10' \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

### 3. Delete URL

**Endpoint:** `DELETE /urls/{id}`

**Authentication:** Required (Bearer token)

**URL Parameters:**
- `id`: URL ID to delete

**Success Response (200 OK):**
```
Empty response body
```

**Error Response (401/404):**
```json
{
  "message": "Unauthorized" or "URL not found"
}
```

**cURL Example:**
```bash
curl -X DELETE http://localhost:8080/api/urls/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

### 4. Get Dashboard Statistics

**Endpoint:** `GET /urls/stats/dashboard`

**Authentication:** Required (Bearer token)

**Success Response (200 OK):**
```json
{
  "totalUrls": 5,
  "totalClicks": 127,
  "maxClicks": 42,
  "averageClicks": 25.4
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:8080/api/urls/stats/dashboard \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## Redirect Endpoint

### Redirect to Original URL

**Endpoint:** `GET /r/{shortCode}`

**Authentication:** Not required

**URL Parameters:**
- `shortCode`: Short code of the URL

**Success Response (301 Moved Permanently):**
- Redirects to original URL
- Increments click counter

**Headers:**
```
Location: https://www.example.com/very/long/url/path
```

**Error Response (404):**
```json
{
  "message": "Short URL not found"
}
```

**cURL Example:**
```bash
curl -L http://localhost:8080/api/r/abc123
```

---

## Error Handling

### Common HTTP Status Codes

| Status | Meaning |
|--------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid request data |
| 401 | Unauthorized - Invalid or missing token |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal server error |

### Error Response Format

```json
{
  "message": "Error description"
}
```

---

## Authentication Flow

### 1. Register/Login
```
POST /auth/register or /auth/login
↓
Receive JWT token
↓
Store token in localStorage
```

### 2. Protected Request
```
GET /urls
Header: Authorization: Bearer {token}
↓
Server validates token
↓
Return data if valid
```

### 3. Token Expiration
```
Token expires after 24 hours
↓
Request fails with 401
↓
User must login again
```

---

## Rate Limiting

Currently not implemented. Add to prevent abuse:

```bash
# Suggested limits:
- 100 requests per minute per IP
- 10 shortened URLs per hour per user
- 1000 API calls per day per user
```

---

## Testing with Postman

### Import Collection

1. Create new Collection: "TrimUrl API"
2. Add Environment variables:
   - `base_url`: http://localhost:8080/api
   - `token`: (leave empty, fill after login)

### Test Cases

**Register:**
```
Method: POST
URL: {{base_url}}/auth/register
Body: {
  "email": "test@test.com",
  "password": "password123"
}
```

**Login (save token):**
```
Method: POST
URL: {{base_url}}/auth/login
Body: {
  "email": "test@test.com",
  "password": "password123"
}
After response: Set {{token}} variable
```

**Shorten URL:**
```
Method: POST
URL: {{base_url}}/urls/shorten
Headers: Authorization: Bearer {{token}}
Body: {
  "originalUrl": "https://example.com/long/url",
  "customCode": "short"
}
```

**Get URLs:**
```
Method: GET
URL: {{base_url}}/urls
Headers: Authorization: Bearer {{token}}
```

---

## API Response Examples

### Successful Flow

1. **Register User**
```
POST /auth/register
→ 201 Created + JWT Token
```

2. **Shorten URL**
```
POST /urls/shorten + Token
→ 201 Created + Shortened URL
```

3. **View URLs**
```
GET /urls + Token
→ 200 OK + URL List
```

4. **Redirect**
```
GET /r/shortcode
→ 301 Moved + Click +1
```

---

## Rate Limiting Best Practices

For production deployment, add rate limiting:

```bash
# Nginx configuration
limit_req_zone $binary_remote_addr zone=api:10m rate=100r/m;
limit_req zone=api burst=20 nodelay;
```

Or in Spring Boot:
```java
@Configuration
public class RateLimitingConfig {
    // Add rate limiting configuration
}
```

---

## API Performance

### Optimization Tips

1. **Use pagination** when fetching user URLs
2. **Cache dashboard stats** (refresh every 5 minutes)
3. **Index database** on frequently queried columns
4. **Use connection pooling** for database

### Response Times (Target)
- Auth endpoints: < 200ms
- URL operations: < 100ms
- Redirect: < 50ms
- Dashboard stats: < 200ms

---

## Versioning

Current version: **1.0.0**

No versioning implemented yet. For future versions:
```
/api/v1/auth/login
/api/v2/auth/login
```

---

## Changelog

### Version 1.0.0
- Initial release
- User authentication
- URL shortening
- Click tracking
- Dashboard statistics

### Future Versions
- [ ] Bulk URL shortening
- [ ] Advanced analytics
- [ ] Custom domains
- [ ] URL expiration
- [ ] Password protection
- [ ] Rate limiting
