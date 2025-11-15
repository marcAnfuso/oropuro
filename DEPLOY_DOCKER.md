# Deploy with Docker (DigitalOcean VPS)

Deploy Integration API using Docker on your existing VPS.

## Why Docker?

✅ **Consistent with your current setup** (you already have Docker containers)
✅ **Isolated environment** - No conflicts with other apps
✅ **Easy to manage** - docker-compose up/down
✅ **Portable** - Same setup anywhere
✅ **Resource control** - Limit CPU/memory if needed

---

## Prerequisites

- DigitalOcean VPS with Docker installed
- Docker Compose installed
- Your existing Docker containers running (they won't be affected)

---

## Quick Start

### 1. Clone Repository

```bash
cd /var/www
git clone https://github.com/YOUR_USERNAME/integration-api.git
cd integration-api
```

### 2. Configure Environment

```bash
cp .env.example .env
nano .env
```

**Add your credentials:**
```bash
KOMMO_ACCESS_TOKEN=your_token_here
KOMMO_SUBDOMAIN=lorenzogu32
KOMMO_WHATSAPP_SCOPE_ID=your_scope_id
KOMMO_USERNAME_FIELD_ID=1492038
KOMMO_PASSWORD_FIELD_ID=1492040
KOMMO_COMPROBANTE_STATUS_ID=142

PLAYER_API_TOKEN=your_bet30_token_here

# No proxy needed on VPS!
# BET30_PROXY_URL not required
```

### 3. Build and Run

```bash
# Build the image
docker-compose build

# Start the container
docker-compose up -d

# Check if it's running
docker-compose ps

# View logs
docker-compose logs -f
```

**Done!** Your API is running on `http://localhost:3000`

---

## Configure Nginx (Reverse Proxy)

### Option A: Subdomain (Recommended)

**Setup:**
```nginx
# /etc/nginx/sites-available/integration-api
server {
    listen 80;
    server_name api.tudominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Enable:**
```bash
sudo ln -s /etc/nginx/sites-available/integration-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

**HTTPS:**
```bash
sudo certbot --nginx -d api.tudominio.com
```

**Webhook URL:**
```
https://api.tudominio.com/api/create-player-from-kommo?client=bet30
```

### Option B: Path-based (Share domain with other apps)

If you want `tudominio.com/api/integration/...`:

```nginx
server {
    listen 80;
    server_name tudominio.com;

    # Your existing app
    location / {
        proxy_pass http://localhost:8080;  # Your current app
    }

    # Integration API
    location /api/integration/ {
        rewrite ^/api/integration/(.*) /api/$1 break;
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

**Webhook URL:**
```
https://tudominio.com/api/integration/create-player-from-kommo?client=bet30
```

---

## Multiple Apps Setup (Docker + Docker)

If you want all your apps in Docker Compose:

```yaml
# docker-compose.yml (all apps together)
version: '3.8'

services:
  # Your existing app 1
  app1:
    image: your-app1-image
    ports:
      - "8080:80"
    networks:
      - shared-network

  # Your existing app 2
  app2:
    image: your-app2-image
    ports:
      - "8081:80"
    networks:
      - shared-network

  # Integration API (new)
  integration-api:
    build:
      context: ./integration-api
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    env_file:
      - ./integration-api/.env
    networks:
      - shared-network
    restart: unless-stopped

networks:
  shared-network:
    driver: bridge
```

**Start all together:**
```bash
docker-compose up -d
```

---

## Useful Commands

### Container Management

```bash
# Start container
docker-compose up -d

# Stop container
docker-compose down

# Restart container
docker-compose restart

# View logs
docker-compose logs -f integration-api

# Check status
docker-compose ps

# Shell into container (debugging)
docker-compose exec integration-api sh
```

### Updates

```bash
cd /var/www/integration-api

# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Check logs
docker-compose logs -f
```

### Resource Limits (Optional)

If you want to limit resources:

```yaml
# docker-compose.yml
services:
  integration-api:
    # ... existing config ...
    deploy:
      resources:
        limits:
          cpus: '0.5'      # Max 50% of 1 CPU
          memory: 512M     # Max 512MB RAM
        reservations:
          cpus: '0.25'     # Reserved 25% CPU
          memory: 256M     # Reserved 256MB RAM
```

---

## Monitoring

### Health Check

```bash
# Check container health
docker-compose ps

# Test API endpoint
curl http://localhost:3000/api/kommo-message-received

# Or via Nginx
curl https://api.tudominio.com/api/kommo-message-received
```

**Expected response:**
```json
{
  "status": "ok",
  "message": "KOMMO message webhook endpoint",
  "timestamp": "2025-01-14T..."
}
```

### View Resource Usage

```bash
# Real-time stats
docker stats integration-api

# Disk usage
docker system df
```

---

## Troubleshooting

### Container not starting

```bash
# Check logs
docker-compose logs integration-api

# Check build errors
docker-compose build --no-cache

# Verify .env file exists
ls -la .env
```

### Port already in use

```bash
# Find what's using port 3000
sudo lsof -i :3000

# Change port in docker-compose.yml
ports:
  - "3001:3000"  # Map to different host port
```

### bet30 API errors

```bash
# Check logs for bet30 errors
docker-compose logs integration-api | grep bet30

# Verify .env has correct token
docker-compose exec integration-api cat .env
```

### Out of disk space

```bash
# Clean unused images/containers
docker system prune -a

# Remove old builds
docker-compose down --rmi local
```

---

## Backup & Restore

### Backup

```bash
# Backup environment variables
cp .env .env.backup

# Export container (optional)
docker save integration-api > integration-api-backup.tar
```

### Restore

```bash
# Restore .env
cp .env.backup .env

# Restart
docker-compose down
docker-compose up -d
```

---

## Comparison: PM2 vs Docker

| Feature | PM2 | Docker |
|---------|-----|--------|
| **Setup complexity** | Simple | Medium |
| **Consistency with your setup** | Different | ✅ Same (you use Docker) |
| **Isolation** | Process-level | Container-level |
| **Resource limits** | Via system | Via Docker |
| **Logs** | PM2 logs | Docker logs |
| **Updates** | `pm2 restart` | `docker-compose restart` |
| **Portability** | Server-specific | ✅ Works anywhere |

**Recommendation:** Use **Docker** if you're already comfortable with it and have other Docker containers running.

---

## Security Notes

- ✅ Container runs as non-root user (nextjs)
- ✅ Only port 3000 exposed
- ✅ .env file not copied to image (.dockerignore)
- ✅ Minimal Alpine-based image (~100MB)

---

## Need Help?

**Check logs first:**
```bash
docker-compose logs -f integration-api
```

Most issues are in the logs!

**Common issues:**
1. Missing .env → Copy .env.example to .env
2. Port conflict → Change port in docker-compose.yml
3. Build fails → Run `docker-compose build --no-cache`
4. bet30 blocked → Should work on VPS (dedicated IP)
