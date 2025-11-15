# Deploy to DigitalOcean VPS

Complete guide to deploy Integration API on DigitalOcean VPS.

## Why DigitalOcean?

✅ **Dedicated IP** - No shared IPs like Vercel
✅ **No bet30 blocking** - Direct connection works
✅ **No proxy needed** - No ngrok required
✅ **No cold starts** - Always running
✅ **Full control** - SSH access, logs, monitoring

---

## Prerequisites

- DigitalOcean VPS (Droplet) with Ubuntu 22.04+
- SSH access to your VPS
- Domain name (optional, can use IP)
- Node.js 18+ installed on VPS

---

## Step 1: Prepare VPS

### 1.1 Connect to VPS

```bash
ssh root@your-vps-ip
```

### 1.2 Install Node.js 18+

```bash
# Install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version
```

### 1.3 Install PM2 (Process Manager)

```bash
sudo npm install -g pm2

# Verify installation
pm2 --version
```

### 1.4 Install Nginx (Reverse Proxy)

```bash
sudo apt update
sudo apt install -y nginx

# Verify installation
sudo systemctl status nginx
```

---

## Step 2: Deploy Application

### 2.1 Clone Repository

```bash
# Create app directory
mkdir -p /var/www
cd /var/www

# Clone your repo
git clone https://github.com/YOUR_USERNAME/integration-api.git
cd integration-api
```

### 2.2 Install Dependencies

```bash
npm install
```

### 2.3 Configure Environment Variables

```bash
# Copy example
cp .env.example .env

# Edit with your values
nano .env
```

**Required variables:**
```bash
KOMMO_ACCESS_TOKEN=your_kommo_token_here
KOMMO_SUBDOMAIN=lorenzogu32
KOMMO_WHATSAPP_SCOPE_ID=your_scope_id
KOMMO_USERNAME_FIELD_ID=1492038
KOMMO_PASSWORD_FIELD_ID=1492040
KOMMO_COMPROBANTE_STATUS_ID=142

PLAYER_API_TOKEN=your_bet30_token_here

# NO PROXY NEEDED on VPS!
# BET30_PROXY_URL is not required
```

Save with `Ctrl+O`, exit with `Ctrl+X`.

### 2.4 Build Application

```bash
npm run build
```

This creates a standalone build in `.next/standalone/`.

### 2.5 Create Logs Directory

```bash
mkdir -p logs
```

### 2.6 Start with PM2

```bash
# Start the app
pm2 start ecosystem.config.js

# Check status
pm2 status

# View logs
pm2 logs integration-api

# Save PM2 config (auto-restart on reboot)
pm2 save
pm2 startup
# Copy and run the command it shows
```

Your API is now running on `http://localhost:3000`!

---

## Step 3: Configure Nginx (Reverse Proxy)

### 3.1 Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/integration-api
```

**Paste this config:**

```nginx
# HTTP configuration
server {
    listen 80;
    server_name your-domain.com;  # Replace with your domain or IP

    # Increase body size for file uploads (payment proofs)
    client_max_body_size 10M;

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

        # Timeout settings for long-running requests
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Health check endpoint
    location /health {
        proxy_pass http://localhost:3000/api/kommo-message-received;
        access_log off;
    }
}
```

### 3.2 Enable Site

```bash
# Create symlink
sudo ln -s /etc/nginx/sites-available/integration-api /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### 3.3 Allow Firewall

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp  # SSH (don't forget this!)
sudo ufw enable
```

---

## Step 4: Configure HTTPS (Optional but Recommended)

### 4.1 Install Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 4.2 Get SSL Certificate

```bash
sudo certbot --nginx -d your-domain.com
```

Follow prompts:
- Enter email
- Agree to ToS
- Choose "Redirect HTTP to HTTPS" (option 2)

Certbot auto-updates your Nginx config with SSL!

### 4.3 Test Auto-Renewal

```bash
sudo certbot renew --dry-run
```

---

## Step 5: Configure Webhooks in KOMMO

Now use your VPS URL (not Vercel):

**Webhook 1: Create Player**
```
URL: https://your-domain.com/api/create-player-from-kommo?client=bet30
Method: POST
Event: Triggered by Salesbot
```

**Webhook 2: Detect Payment Proof**
```
URL: https://your-domain.com/api/kommo-message-received
Method: POST
Event: Incoming message (Settings → Webhooks)
```

---

## Useful Commands

### PM2 Management

```bash
# Check status
pm2 status

# View logs
pm2 logs integration-api

# View only errors
pm2 logs integration-api --err

# Restart app
pm2 restart integration-api

# Stop app
pm2 stop integration-api

# Delete app from PM2
pm2 delete integration-api
```

### Update Application

```bash
cd /var/www/integration-api

# Pull latest code
git pull origin main

# Install new dependencies (if any)
npm install

# Rebuild
npm run build

# Restart
pm2 restart integration-api
```

### Nginx Management

```bash
# Test config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Check Application Logs

```bash
# Application logs (from PM2)
pm2 logs integration-api

# Or check log files directly
tail -f /var/www/integration-api/logs/out.log
tail -f /var/www/integration-api/logs/err.log
```

---

## Monitoring

### Health Check

```bash
# Check if API is responding
curl http://localhost:3000/api/kommo-message-received

# Or via Nginx
curl https://your-domain.com/api/kommo-message-received
```

**Expected response:**
```json
{
  "status": "ok",
  "message": "KOMMO message webhook endpoint",
  "timestamp": "2025-01-14T..."
}
```

### PM2 Monitoring

```bash
# Real-time monitoring dashboard
pm2 monit

# CPU/Memory usage
pm2 status
```

---

## Troubleshooting

### API not responding

```bash
# Check if PM2 process is running
pm2 status

# If stopped, restart
pm2 restart integration-api

# Check logs for errors
pm2 logs integration-api --err
```

### Nginx not forwarding

```bash
# Test Nginx config
sudo nginx -t

# Check Nginx is running
sudo systemctl status nginx

# Restart Nginx
sudo systemctl restart nginx
```

### bet30 API errors

```bash
# Check application logs
pm2 logs integration-api | grep bet30

# No proxy needed on VPS!
# Direct connection should work
```

### Port already in use

```bash
# Find process using port 3000
sudo lsof -i :3000

# Kill it
sudo kill -9 <PID>

# Restart app
pm2 restart integration-api
```

---

## Auto-Deploy Script (Optional)

Create a deploy script for easy updates:

```bash
nano /var/www/integration-api/deploy.sh
```

**Content:**
```bash
#!/bin/bash
set -e

echo "🚀 Deploying Integration API..."

cd /var/www/integration-api

echo "📥 Pulling latest code..."
git pull origin main

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building application..."
npm run build

echo "🔄 Restarting PM2..."
pm2 restart integration-api

echo "✅ Deploy complete!"
pm2 status
```

Make it executable:
```bash
chmod +x deploy.sh
```

**To deploy updates:**
```bash
cd /var/www/integration-api
./deploy.sh
```

---

## Cost Comparison

| Service | Cost | Pros | Cons |
|---------|------|------|------|
| **Vercel** | Free | Easy, auto-deploy | Blocked by bet30, needs proxy |
| **DigitalOcean** | $6/month | Dedicated IP, no blocking | Manual setup, manage server |
| **Railway** | $5/month | Easy, no blocking | More expensive than DO |

**Recommendation:** Use DigitalOcean since you already have it!

---

## Security Checklist

- ✅ Environment variables in `.env` (never in git)
- ✅ Firewall enabled (UFW)
- ✅ HTTPS configured (Certbot)
- ✅ SSH key authentication (disable password auth)
- ✅ Regular updates: `sudo apt update && sudo apt upgrade`
- ✅ PM2 auto-restart on crashes
- ✅ Log rotation configured

---

## Resources

- **DigitalOcean Docs:** https://docs.digitalocean.com
- **PM2 Docs:** https://pm2.keymetrics.io/docs
- **Nginx Docs:** https://nginx.org/en/docs
- **Certbot Docs:** https://certbot.eff.org

---

**Questions?** Check logs first:
```bash
pm2 logs integration-api
```

Most issues are in the logs! 🔍
