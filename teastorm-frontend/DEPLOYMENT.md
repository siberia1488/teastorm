# TeaStorm — Deployment Guide

## Prerequisites

- Node.js 20+
- PostgreSQL database (Supabase recommended)
- Stripe account with live keys
- SMTP email credentials

---

## 1. Set environment variables

Copy `.env.production.example` to `.env.local` and fill in every value:

```bash
cp .env.production.example .env.local
```

Key variables to set before deploying:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `STRIPE_SECRET_KEY` | Stripe live secret key (`sk_live_...`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe live publishable key (`pk_live_...`) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret (`whsec_...`) |
| `STRIPE_SHIPPING_RATE_ID` | Shipping rate ID from Stripe dashboard |
| `NEXT_PUBLIC_BASE_URL` | Your production domain (e.g. `https://teastorm.com`) |
| `NEXTAUTH_URL` | Same as `NEXT_PUBLIC_BASE_URL` |
| `NEXTAUTH_SECRET` | Random secret — run `openssl rand -base64 32` |
| `EMAIL_HOST` / `EMAIL_USER` / `EMAIL_PASS` | SMTP credentials for order emails |
| `ADMIN_EMAIL` | Email address that receives order notifications |

---

## 2. Install dependencies

```bash
npm install
```

## 3. Generate Prisma client

Run this before every build — it regenerates the Prisma client from `prisma/schema.prisma`:

```bash
npx prisma generate
```

## 4. Run database migrations

Apply pending migrations to the production database:

```bash
npx prisma migrate deploy
```

> Do **not** run `prisma migrate dev` in production — it is for local development only.

## 5. Build

```bash
npm run build
```

The build will fail fast if any required TypeScript types are wrong or ESLint rules are violated.

## 6. Start

```bash
npm run start
```

This starts the Next.js production server on port 3000 by default.
To use a different port: `npm run start -- -p 8080`

---

## Stripe webhook setup

After deploying, register the webhook endpoint in the Stripe Dashboard:

- **URL**: `https://your-domain.com/api/checkout/stripe/webhook`
- **Events to listen for**: `checkout.session.completed`
- **Copy the signing secret** into `STRIPE_WEBHOOK_SECRET`

The webhook updates the order status to `paid` and sends confirmation emails.

---

## Stripe success / cancel URLs

Stripe redirects the customer to:
- **Success**: `NEXT_PUBLIC_BASE_URL/success?orderId=...&session_id=...`
- **Cancel**: `NEXT_PUBLIC_BASE_URL/shop`

`NEXT_PUBLIC_BASE_URL` **must** be set to your real production domain — not `localhost`.

---

## Checklist before going live

- [ ] `NEXT_PUBLIC_BASE_URL` points to production domain
- [ ] `NEXTAUTH_URL` matches production domain
- [ ] `NEXTAUTH_SECRET` is a strong random value (not `dev-secret-change-later`)
- [ ] Live Stripe keys are in place (`sk_live_...` / `pk_live_...`)
- [ ] Stripe webhook is registered and `STRIPE_WEBHOOK_SECRET` is set
- [ ] Database migrations have been applied (`prisma migrate deploy`)
- [ ] Email credentials are configured and tested
- [ ] `.env.local` (or hosting env vars) is **not** committed to git

---

## Quick reference

```bash
# Full deploy sequence
npm install
npx prisma generate
npx prisma migrate deploy
npm run build
npm run start
```
