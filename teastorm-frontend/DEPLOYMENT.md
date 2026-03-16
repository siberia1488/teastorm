# TeaStorm — Production Deployment Guide

## Architecture overview

```
Internet → NGINX (80/443, SSL termination, gzip, headers)
               ↓
         Next.js app (port 3000, Docker container)
               ↓
         Supabase PostgreSQL (external managed DB)
               ↓
         Stripe (payments, webhooks)
```

---

## Server requirements

| Requirement | Minimum |
|---|---|
| OS | Ubuntu 22.04 LTS |
| RAM | 1 GB (2 GB recommended) |
| CPU | 1 vCPU |
| Disk | 20 GB |
| Software | Docker, Docker Compose, NGINX, Certbot |

---

## Step 1 — Provision the server

```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker

# Install Docker Compose plugin
sudo apt install -y docker-compose-plugin

# Install NGINX and Certbot
sudo apt install -y nginx certbot python3-certbot-nginx
```

---

## Step 2 — Clone the repository

```bash
git clone https://github.com/your-org/teastorm.git /opt/teastorm
cd /opt/teastorm/teastorm-frontend
```

---

## Step 3 — Create production environment file

```bash
cp .env.production.example .env.production
nano .env.production   # fill in every value
```

**Required variables:**

| Variable | Description |
|---|---|
| `DATABASE_URL` | Supabase PostgreSQL connection string |
| `STRIPE_SECRET_KEY` | Live Stripe secret key (`sk_live_...`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Live Stripe publishable key (`pk_live_...`) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret (`whsec_...`) |
| `STRIPE_SHIPPING_RATE_ID` | Shipping rate ID from Stripe dashboard |
| `NEXT_PUBLIC_BASE_URL` | `https://teastorm.com` — no trailing slash |
| `NEXTAUTH_URL` | Same as `NEXT_PUBLIC_BASE_URL` |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` |
| `EMAIL_HOST` / `EMAIL_PORT` / `EMAIL_USER` / `EMAIL_PASS` | SMTP credentials |
| `EMAIL_FROM` | Sender address (e.g. `orders@teastorm.com`) |
| `ADMIN_EMAIL` | Admin email for order notifications |
| `PRISMA_CLIENT_ENGINE_TYPE` | `binary` |

> `.env.production` must **never** be committed to git. It is in `.gitignore`.

---

## Step 4 — Run database migrations

Run this from the host (not inside Docker) so you have direct shell output:

```bash
# One-time: install node_modules on the host for the Prisma CLI
npm install
npx prisma generate
npx prisma migrate deploy
```

Or run inside Docker:

```bash
docker compose run --rm app npx prisma migrate deploy
```

---

## Step 5 — Build and start the app container

```bash
docker compose up -d --build
```

Check it started:

```bash
docker compose ps
docker compose logs -f app
curl http://localhost:3000/api/health
# → {"status":"ok","service":"teastorm","timestamp":"..."}
```

---

## Step 6 — Configure NGINX

```bash
# Copy the bundled config
sudo cp nginx/teastorm.conf /etc/nginx/sites-available/teastorm

# Edit the server_name if your domain is different
sudo nano /etc/nginx/sites-available/teastorm

# Enable the site
sudo ln -sf /etc/nginx/sites-available/teastorm /etc/nginx/sites-enabled/teastorm

# Remove the default placeholder (if present)
sudo rm -f /etc/nginx/sites-enabled/default

# Test and reload
sudo nginx -t && sudo systemctl reload nginx
```

At this point `http://teastorm.com` should proxy to the app.

---

## Step 7 — SSL with Let's Encrypt

```bash
sudo certbot --nginx -d teastorm.com -d www.teastorm.com
```

Certbot will:
1. Verify domain ownership via HTTP
2. Obtain the certificate
3. Automatically edit `/etc/nginx/sites-available/teastorm` to add SSL blocks
4. Reload NGINX

**Test auto-renewal:**

```bash
sudo certbot renew --dry-run
```

Certbot installs a systemd timer that renews certificates automatically when they are within 30 days of expiry.

---

## Step 8 — Register Stripe webhook

In the [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks):

- **Endpoint URL**: `https://teastorm.com/api/checkout/stripe/webhook`
- **Events**: `checkout.session.completed`
- Copy the **Signing secret** → set it as `STRIPE_WEBHOOK_SECRET` in `.env.production`
- Restart the container: `docker compose restart app`

---

## Step 9 — Verify the full flow

```bash
# Health check
curl https://teastorm.com/api/health

# Visit the storefront
open https://teastorm.com

# Place a test order (use Stripe test card if you switch to test keys)
# Confirm order appears in admin dashboard
# Confirm confirmation email arrives
```

---

## Ongoing operations

### View live logs

```bash
docker compose logs -f app
```

### Restart the app

```bash
docker compose restart app
```

### Deploy a new version

```bash
git pull
docker compose up -d --build
```

### Apply database migrations after a schema change

```bash
docker compose run --rm app npx prisma migrate deploy
docker compose restart app
```

---

## Pre-launch checklist

- [ ] `NEXT_PUBLIC_BASE_URL` = production domain (not `localhost`)
- [ ] `NEXTAUTH_URL` = production domain
- [ ] `NEXTAUTH_SECRET` is a strong random value
- [ ] Live Stripe keys are set (`sk_live_...` / `pk_live_...`)
- [ ] Stripe webhook is registered; `STRIPE_WEBHOOK_SECRET` is correct
- [ ] Database migrations applied (`prisma migrate deploy`)
- [ ] SMTP email credentials are set and tested
- [ ] SSL certificate is valid (`https://` works, no browser warnings)
- [ ] `/api/health` returns `{"status":"ok"}`
- [ ] `/success` page loads without errors after a test checkout
- [ ] `.env.production` is NOT in git history

---

## Security notes

- Secrets are injected via `.env.production` at runtime — never baked into the Docker image
- The app container runs as a non-root user (`nextjs:nodejs`)
- NGINX enforces HSTS, X-Frame-Options, and other security headers
- Checkout endpoint is rate-limited to 10 requests / IP / minute
- Stripe webhook signature is verified on every request
- Database credentials never reach the client — Prisma is server-only
