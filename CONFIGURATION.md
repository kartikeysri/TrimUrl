# Configuration Guide for TrimUrl

## Environment Variables

All environment variables should be set via `.env` files or system environment.

### Backend Configuration (application.properties)

#### Database Configuration
```properties
# PostgreSQL Connection
spring.datasource.url=jdbc:postgresql://localhost:5432/trimurl_db
spring.datasource.username=postgres
spring.datasource.password=password
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.format_sql=true
```

#### JWT Configuration
```properties
jwt.secret=your-long-random-secret-key-minimum-32-characters
jwt.expiration=86400000  # 24 hours in milliseconds
```

#### Server Configuration
```properties
server.port=8080
server.servlet.context-path=/api
server.error.include-message=always
server.error.include-stacktrace=on_param
```

#### CORS Configuration
```properties
app.cors.allowed-origins=http://localhost:3000,http://localhost:5173,https://yourdomain.com
```

#### Logging
```properties
logging.level.root=INFO
logging.level.com.trimurl=DEBUG
logging.level.org.springframework.security=DEBUG
```

### Frontend Configuration (.env)

```
# API Configuration
VITE_API_URL=http://localhost:8080/api

# App Name
VITE_APP_NAME=TrimUrl

# Optional: Analytics, Sentry, etc.
VITE_ENABLE_ANALYTICS=false
```

## Production Configuration

### Backend Production (.env)

```
# Database (Railway, Neon, AWS RDS, etc.)
DATABASE_URL=postgresql://user:password@host:5432/trimurl_db
DATABASE_USER=db_user
DATABASE_PASSWORD=strong_password_here

# JWT - VERY IMPORTANT!
JWT_SECRET=generate-with-openssl-rand-base64-32
JWT_EXPIRATION=86400000

# Server
SERVER_PORT=8080

# CORS - Only allow your frontend domain
CORS_ALLOWED_ORIGINS=https://yourdomain.com

# Optional: Application Name
APP_NAME=TrimUrl

# Optional: Monitoring
ENABLE_METRICS=true
```

### Frontend Production (.env)

```
# Production API URL
VITE_API_URL=https://api.yourdomain.com/api

# App Configuration
VITE_APP_NAME=TrimUrl

# Optional: Analytics
VITE_ANALYTICS_KEY=your-analytics-key
```

## Security Configuration

### Generating JWT Secret

```bash
# On Windows PowerShell
[System.Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))

# On Linux/macOS
openssl rand -base64 32
```

Example output: `aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890+/==`

### Password Hashing

BCrypt is used with strength 10 (default):
```java
PasswordEncoder encoder = new BCryptPasswordEncoder();
String encoded = encoder.encode("plainPassword");
```

### HTTPS Configuration

For production, always use HTTPS:
```properties
server.ssl.key-store=classpath:keystore.p12
server.ssl.key-store-password=password
server.ssl.key-store-type=PKCS12
```

## Database Configuration

### PostgreSQL Connection Strings

#### Local Development
```
jdbc:postgresql://localhost:5432/trimurl_db
```

#### Docker
```
jdbc:postgresql://postgres:5432/trimurl_db
```

#### Railway
```
postgresql://user:password@terminal.railway.app:1234/railway
```

#### Neon
```
postgresql://user:password@ec2-nnn-nnn-nnn-nnn.compute-1.amazonaws.com:5432/db
```

#### AWS RDS
```
jdbc:postgresql://trimurl.xxxxx.us-east-1.rds.amazonaws.com:5432/trimurl_db
```

## CORS Configuration

### Allowed Origins

```properties
# Development
app.cors.allowed-origins=http://localhost:3000,http://localhost:5173,http://127.0.0.1:3000

# Production
app.cors.allowed-origins=https://example.com,https://app.example.com,https://www.example.com

# Multiple environments
app.cors.allowed-origins=http://localhost:3000,https://app-staging.example.com,https://app.example.com
```

### CORS Methods

```java
configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
```

### CORS Headers

```java
configuration.setAllowedHeaders(Arrays.asList("*"));
configuration.setExposedHeaders(Arrays.asList("Authorization"));
```

## Logging Configuration

### Development Logging

```properties
logging.level.root=INFO
logging.level.com.trimurl=DEBUG
logging.level.org.springframework.web=DEBUG
logging.level.org.springframework.security=DEBUG
```

### Production Logging

```properties
logging.level.root=WARN
logging.level.com.trimurl=INFO
logging.level.org.springframework.security=WARN

# Log to file
logging.file.name=/var/log/trimurl/application.log
logging.file.max-size=10MB
logging.file.max-history=7
```

## Performance Tuning

### Database Connection Pool

```properties
# HikariCP settings
spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=20000
spring.datasource.hikari.idle-timeout=300000
spring.datasource.hikari.max-lifetime=1200000
```

### JPA Configuration

```properties
spring.jpa.properties.hibernate.jdbc.batch_size=20
spring.jpa.properties.hibernate.order_inserts=true
spring.jpa.properties.hibernate.order_updates=true
spring.jpa.properties.hibernate.jdbc.batch_versioned_data=true
```

## Monitoring & Metrics

### Spring Boot Actuator

```properties
management.endpoints.web.exposure.include=health,metrics,info
management.endpoint.health.show-details=when-authorized
```

Access metrics at:
```
http://localhost:8080/actuator/health
http://localhost:8080/actuator/metrics
```

## Cache Configuration

### Adding Cache (Future)

```java
@EnableCaching
public class CacheConfig {
    @Bean
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager("urls", "stats");
    }
}
```

## Email Configuration (Optional)

For future email notifications:

```properties
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

## Webhook Configuration (Optional)

For future integrations:

```properties
webhook.enabled=true
webhook.timeout=5000
webhook.max-retries=3
```

## Configuration Profiles

### Active Profiles

```bash
# Development (uses application-dev.properties)
java -jar app.jar --spring.profiles.active=dev

# Production (uses application-prod.properties)
java -jar app.jar --spring.profiles.active=prod
```

### Profile-Specific Properties

**application-dev.properties**
```properties
logging.level.root=DEBUG
spring.jpa.show-sql=true
app.debug=true
```

**application-prod.properties**
```properties
logging.level.root=WARN
spring.jpa.show-sql=false
app.debug=false
```

## Environment-Specific Examples

### Development (.env.dev)
```
DATABASE_URL=jdbc:postgresql://localhost:5432/trimurl_db
DATABASE_USER=postgres
DATABASE_PASSWORD=password
JWT_SECRET=dev-secret-key-change-in-production
SERVER_PORT=8080
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### Staging (.env.staging)
```
DATABASE_URL=postgresql://user:pass@staging-db.railway.app:5432/trimurl
DATABASE_USER=staging_user
DATABASE_PASSWORD=staging_password
JWT_SECRET=staging-secret-key-very-long-random-string
SERVER_PORT=443
CORS_ALLOWED_ORIGINS=https://staging.trimurl.app
```

### Production (.env.prod)
```
DATABASE_URL=postgresql://user:pass@prod-db.railway.app:5432/trimurl
DATABASE_USER=prod_user
DATABASE_PASSWORD=very_long_random_password
JWT_SECRET=extremely-long-random-secret-key-minimum-32-chars
SERVER_PORT=443
CORS_ALLOWED_ORIGINS=https://trimurl.app,https://www.trimurl.app
```

## Configuration Checklist

- [ ] Database URL is correct
- [ ] JWT secret is strong (32+ characters)
- [ ] CORS origins are configured
- [ ] Port is not in use
- [ ] Environment variables are set
- [ ] Logging level is appropriate
- [ ] Password encoder is BCrypt
- [ ] HTTPS is enabled for production
- [ ] Database credentials are secure
- [ ] Connection pool is tuned

## Troubleshooting Configuration

### Connection Refused
```
Check:
1. Database is running
2. Database URL is correct
3. Username and password are correct
4. Firewall isn't blocking connection
```

### CORS Errors
```
Check:
1. Frontend URL matches CORS_ALLOWED_ORIGINS
2. Include protocol (http/https)
3. Include port if non-standard
4. No trailing slash
```

### JWT Token Errors
```
Check:
1. JWT_SECRET is set
2. Token format: "Bearer {token}"
3. Token hasn't expired
4. Secret matches between requests
```

## Configuration Best Practices

1. **Never commit secrets** - Use .env files, environment variables
2. **Use strong secrets** - Minimum 32 characters for JWT_SECRET
3. **Separate configs** - Dev, staging, prod should be different
4. **Document changes** - Keep this guide updated
5. **Validate configs** - Test after changing configuration
6. **Use secrets manager** - For production (AWS Secrets, HashiCorp Vault)
7. **Rotate secrets** - Regularly change JWT_SECRET, database passwords
8. **Audit logs** - Track configuration changes

## Additional Resources

- [Spring Boot Configuration](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.external-config)
- [PostgreSQL Connection Strings](https://www.postgresql.org/docs/current/libpq-connect.html)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8949)
- [CORS Specification](https://fetch.spec.whatwg.org/#http-cors-protocol)
