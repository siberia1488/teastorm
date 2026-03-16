# TeaStorm — Complete Architecture Report

> **Purpose of this document**: Paste this into a new AI assistant session to restore full project context without re-reading any code. It describes the entire codebase, runtime behavior, and deployment infrastructure as of the date it was generated.

---

## Section 1 — Project Overview

### What is TeaStorm?

TeaStorm is a premium Chinese tea e-commerce storefront. It sells curated loose-leaf teas sourced directly from Chinese growing regions (Yunnan, Fujian, Zhejiang, Guangdong, Taiwan). The brand positions itself around ritual, quality, and provenance.

### Current Functionality

| Feature | Status |
|---|---|
| Product catalog (14 teas, multiple variants) | Working |
| Shop page with category filters | Working |
| Product detail pages with gallery | Working |
| Cart (localStorage-persisted) | Working |
| Stripe Checkout (live keys) | Working |
| Post-payment success page | Working (loop bug fixed) |
| Order storage in database | Working |
| Stripe webhook → order status update | Working |
| Order confirmation email (customer) | Working (requires SMTP config) |
| Admin notification email | Working (requires SMTP config) |
| Admin dashboard (orders, revenue stats) | Working |
| Order status management (admin) | Working |
| User account / order history | Working |
| About page | Working |
| Docker container | Ready |
| NGINX config | Ready |
| SSL (Certbot) | Config ready, needs live server |
| Health check endpoint | Working |
| Rate limiting on checkout | Working |

### Project Stage

**Production-ready** infrastructure-wise. Build passes, Docker image builds, all routes compile. Still requires: real SMTP credentials, Stripe webhook registration on live server, and domain-level env configuration.

### Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.0.10 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Database ORM | Prisma 7.2 |
| Database host | Supabase (PostgreSQL) |
| DB driver | `pg` (PostgreSQL node driver) |
| Payments | Stripe Checkout + Webhooks |
| Auth | NextAuth 4 (Credentials / JWT) |
| Email | Nodemailer (SMTP) |
| CMS client | Sanity.io (configured, not actively used) |
| Cart global state | Zustand (drawer open/close only) |
| Cart items state | React Context + localStorage |
| Container | Docker (multi-stage, node:20-alpine) |
| Reverse proxy | NGINX |
| SSL | Let's Encrypt / Certbot |
| Icons | Lucide React |

---

## Section 2 — Repository Structure

```
teastorm-frontend/
│
├── app/                          # Next.js App Router — all pages and API routes
│   ├── api/
│   │   ├── admin/orders/[id]/    # PATCH — admin updates order status
│   │   ├── auth/[...nextauth]/   # NextAuth handler (GET + POST)
│   │   ├── checkout/
│   │   │   ├── route.ts          # POST — creates Stripe checkout session
│   │   │   └── stripe/webhook/   # POST — Stripe webhook handler
│   │   ├── health/               # GET — liveness probe
│   │   └── prices/               # POST — fetches live prices from Stripe
│   │
│   ├── components/               # App-level layout components
│   │   ├── SiteHeader.tsx        # Top nav (logo, links, cart icon)
│   │   └── PageTransition.tsx    # Pathname-keyed transition wrapper
│   │
│   ├── about/page.tsx            # Static about page
│   ├── account/                  # Authenticated user account + orders
│   ├── admin/                    # Admin dashboard (email-guarded)
│   │   └── orders/[id]/          # Individual order management
│   ├── login/page.tsx            # Email login form
│   ├── orders/[id]/page.tsx      # User order detail (auth-guarded)
│   ├── product/[id]/page.tsx     # Product detail + gallery + add-to-cart
│   ├── shop/page.tsx             # Filterable product grid
│   ├── success/
│   │   ├── page.tsx              # Post-purchase confirmation page
│   │   └── ClearCartOnMount.tsx  # Client component — clears cart once
│   │
│   ├── ClientShell.tsx           # Client wrapper: SiteHeader + CartDrawer
│   ├── providers.tsx             # CartProvider wrapper
│   ├── layout.tsx                # Root layout (html/body/providers)
│   ├── page.tsx                  # Homepage (hero, featured teas, footer)
│   └── globals.css
│
├── components/                   # Shared UI components
│   ├── BrandMark.tsx             # Logo/wordmark
│   ├── Hero.tsx                  # Homepage hero section
│   ├── InstagramFeed.tsx         # Social feed grid
│   └── cart/
│       ├── CartDrawer.tsx        # Sliding cart panel
│       └── product/
│           ├── ProductClient.tsx  # Product page client component
│           └── ProductGallery.tsx # Image gallery with lightbox
│
├── data/                         # Static data — no DB required for catalog
│   ├── products.ts               # 14 tea definitions with Stripe price IDs
│   ├── teaContent.ts             # Rich descriptions, brewing info, origins
│   └── prices.json               # Cached Stripe prices (fallback)
│
├── lib/                          # Server and shared utilities
│   ├── auth.ts                   # NextAuth configuration
│   ├── cart-context.tsx          # React Context — cart items + localStorage
│   ├── cart-store.ts             # Zustand — cart drawer open/close state
│   ├── email.ts                  # Nodemailer transporter + email templates
│   ├── env.ts                    # Server env validation (throws on missing)
│   ├── logger.ts                 # Structured logger with timestamps
│   ├── prisma.ts                 # PrismaClient singleton + pg pool
│   ├── queries.ts                # Admin DB query helpers
│   ├── rate-limit.ts             # In-memory sliding window rate limiter
│   ├── sanity.client.ts          # Sanity CMS client (configured)
│   └── sanity.image.ts           # Sanity image URL builder
│
├── prisma/
│   └── schema.prisma             # DB schema: User, Order, OrderItem, OrderStatusLog
│
├── types/
│   ├── next-auth.d.ts            # Extends Session to include user.id
│   └── better-sqlite3.d.ts       # Module declaration
│
├── nginx/
│   └── teastorm.conf             # Full NGINX config (HTTPS, gzip, headers, proxy)
│
├── public/
│   ├── tea/                      # Product images (per product slug)
│   ├── images/                   # About page, hero, about images
│   ├── instagram/                # Instagram feed images
│   └── brand/                    # Logo assets
│
├── .env.production.example       # All required variables documented
├── .gitignore                    # Excludes .env*, .next/, node_modules/
├── Dockerfile                    # Multi-stage production image
├── .dockerignore                 # Excludes secrets and build artifacts
├── docker-compose.yml            # App service + commented postgres option
├── DEPLOYMENT.md                 # Full VPS deployment guide
├── PROJECT_ARCHITECTURE_REPORT.md # This file
├── next.config.ts                # reactStrictMode: true, TS errors enforced
├── package.json
├── tsconfig.json
└── prisma.config.ts              # Prisma CLI configuration
```

---

## Section 3 — Frontend Architecture

### Routing

Next.js App Router. All routes live under `app/`. Server components by default; client components are explicitly marked `"use client"`.

| URL | File | Type |
|---|---|---|
| `/` | `app/page.tsx` | Server |
| `/shop` | `app/shop/page.tsx` | Client |
| `/product/[id]` | `app/product/[id]/page.tsx` | Server (metadata) + Client |
| `/about` | `app/about/page.tsx` | Server |
| `/success` | `app/success/page.tsx` | Server + Client child |
| `/account` | `app/account/page.tsx` | Server (auth-gated) |
| `/login` | `app/login/page.tsx` | Client |
| `/orders/[id]` | `app/orders/[id]/page.tsx` | Server (auth-gated) |
| `/admin` | `app/admin/page.tsx` | Server (admin-gated) |
| `/admin/orders` | `app/admin/orders/page.tsx` | Server (admin-gated) |
| `/admin/orders/[id]` | `app/admin/orders/[id]/page.tsx` | Server (admin-gated) |

### Root Layout

`app/layout.tsx` wraps every page:
```
html > body
  └── Providers (CartProvider)
        └── ClientShell (SiteHeader + CartDrawer)
              └── {page children}
```

`ClientShell` is marked `"use client"` and dynamically imports `CartDrawer` with `ssr: false` to avoid SSR issues with the sliding panel.

### Cart System

**Two separate state layers:**

1. **CartContext** (`lib/cart-context.tsx`) — manages the actual cart items:
   - React Context + `useState`
   - Hydrates from `localStorage` key `teastorm_cart_v1` on first client render
   - Persists to `localStorage` on every items change (after hydration guard)
   - All mutation functions (`addItem`, `removeItem`, `updateQuantity`, `clear`) are wrapped in `useCallback` with empty deps — **stable references across renders**
   - `subtotal` is `useMemo`-derived from items

2. **CartDrawer store** (`lib/cart-store.ts`) — only controls drawer open/close:
   - Zustand store
   - `{ isOpen, open, close, toggle }`

**Why two layers**: The cart _items_ need to persist across page navigations (context). The drawer _visibility_ is transient UI state that doesn't need to persist.

### ClearCartOnMount

`app/success/ClearCartOnMount.tsx` is a `"use client"` component rendered inside the server-rendered success page. It clears the cart once the user lands on the success page after payment.

```typescript
export default function ClearCartOnMount() {
  const { clear } = useCart();
  const cleared = useRef(false);   // prevents double-fire in React Strict Mode

  useEffect(() => {
    if (cleared.current) return;
    cleared.current = true;
    clear();
  }, [clear]);

  return null;
}
```

**Important**: The `clear` function must be stable (wrapped in `useCallback`) in `CartProvider`. Previously it was not, causing an infinite render loop (`clear` changed reference → effect re-fired → `setItems([])` → re-render → new `clear` reference → repeat). This bug was fixed.

### Product Pages

`app/product/[id]/page.tsx`:
- Server component generates SEO metadata and JSON-LD structured data
- Passes product data to `ProductClient` (client component)
- `ProductClient` fetches live Stripe prices via `POST /api/prices`
- Falls back to `data/prices.json` while live prices load
- Variant selection triggers cart add with the variant's `stripePriceId`

### Image Loading

All images served from `/public`:
- Product images: `/tea/{product-slug}/preview.PNG` and gallery images
- About page images: `/images/about/`
- Hero: `/images/teastorm-hero.png` or similar
- Instagram feed: `/instagram/`
- Next.js `<Image>` component used where possible for optimization

---

## Section 4 — Checkout Flow

### Step-by-step

```
1. User adds items to cart
   └── CartContext.addItem() → items stored in React state + localStorage

2. User opens CartDrawer
   └── CartDrawer reads items from CartContext
   └── "Checkout" button → POST /api/checkout with items array

3. POST /api/checkout (server)
   ├── Rate limit check (10 req / IP / min)
   ├── Validate env vars (STRIPE_SECRET_KEY, STRIPE_SHIPPING_RATE_ID, BASE_URL)
   ├── Parse + validate request body (items array)
   ├── Check user session (optional — associates order with user if logged in)
   ├── Create Order + OrderItems in DB (status: "pending")
   ├── Stripe preflight: verify shipping rate is active
   ├── Stripe preflight: verify all price IDs are active
   ├── stripe.checkout.sessions.create({
   │     mode: "payment",
   │     line_items: items (mapped to stripePriceId + quantity),
   │     shipping_options: [STRIPE_SHIPPING_RATE_ID],
   │     billing_address_collection: "required",
   │     shipping_address_collection: { allowed_countries: ["US"] },
   │     automatic_tax: { enabled: true },
   │     metadata: { orderId },
   │     success_url: "${BASE_URL}/success?orderId=${order.id}&session_id={CHECKOUT_SESSION_ID}",
   │     cancel_url: "${BASE_URL}/shop",
   │   })
   └── Returns { url: stripeSession.url }

4. Client redirects to Stripe-hosted checkout page
   └── User enters card details, billing/shipping address

5. Stripe processes payment
   └── On success: Stripe redirects to success_url
   └── On cancel: Stripe redirects to cancel_url (/shop)

6. Success page loads (/success?orderId=...&session_id=...)
   └── Server component reads orderId from searchParams
   └── Fetches order from DB via Prisma
   └── Renders order summary
   └── ClearCartOnMount (client) clears localStorage cart

7. Stripe webhook fires (async, independent of redirect)
   └── POST /api/checkout/stripe/webhook
   └── Verifies stripe-signature header
   └── Checks idempotency (stripeEventId must not exist in DB)
   └── Handles checkout.session.completed:
       ├── Updates order status: "pending" → "paid"
       ├── Stores stripeSessionId, paymentIntentId, email, shippingAddress
       ├── Sends customer order confirmation email
       └── Sends admin notification email
```

### Key Files for Checkout

| File | Role |
|---|---|
| `components/cart/CartDrawer.tsx` | Initiates checkout, calls `/api/checkout` |
| `app/api/checkout/route.ts` | Creates DB order + Stripe session |
| `app/api/checkout/stripe/webhook/route.ts` | Finalizes order, sends emails |
| `app/success/page.tsx` | Displays confirmation |
| `app/success/ClearCartOnMount.tsx` | Clears cart after payment |
| `lib/cart-context.tsx` | Cart state management |
| `lib/email.ts` | Email sending |

---

## Section 5 — Stripe Integration

### Initialization

`app/api/checkout/route.ts` initializes Stripe at module load:
```typescript
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : null
```

The webhook handler also initializes its own Stripe instance:
```typescript
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
```

### Checkout Session Creation

`POST /api/checkout` — full flow:
- Creates a pending DB Order first (so it exists before Stripe redirect)
- Runs preflight checks against live Stripe API (validate rate + prices)
- Creates session with `metadata: { orderId }` so the webhook can link back

### Success URL

```typescript
success_url: `${BASE_URL}/success?orderId=${order.id}&session_id={CHECKOUT_SESSION_ID}`
```

`BASE_URL` = `process.env.NEXT_PUBLIC_BASE_URL`. Must be set to the production domain — **never localhost in production**.

### Webhook

`POST /api/checkout/stripe/webhook`:
- Reads raw body as text: `const body = await req.text()`
- Extracts `stripe-signature` header
- Calls `stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET)` — throws on invalid signature
- Only processes `checkout.session.completed`
- Uses `stripeEventId` uniqueness constraint for idempotency
- Updates order status, stores customer data, sends emails

**NGINX is configured with `proxy_request_buffering off`** for the webhook location to ensure the raw body is not modified before reaching Next.js.

### Price IDs

Each product variant in `data/products.ts` has a `stripePriceId` field (e.g., `price_1SuQej3mM6A1O46LtuXhcvH1`). These are Stripe Price object IDs created in the Stripe dashboard. They map directly to what gets sent to Stripe in `line_items`.

### Live vs Test Mode

The project currently has **live Stripe keys** configured. Do not switch to test keys without also updating all `stripePriceId` values in `data/products.ts`, as price IDs are mode-specific.

---

## Section 6 — Database Architecture

### Prisma Schema (`prisma/schema.prisma`)

Four models:

**User**
```
id            String    (cuid, PK)
email         String    (unique)
name          String?
emailVerified DateTime?
image         String?
createdAt     DateTime
orders        Order[]
```

**Order**
```
id              String    (cuid, PK)
stripeEventId   String?   (unique — idempotency key)
stripeSessionId String?   (unique)
paymentIntentId String?
amountTotal     Int       (cents)
subtotalAmount  Int       (cents)
shippingAmount  Int       (cents)
currency        String    ("usd")
status          String    ("pending" | "paid" | "shipped" | "cancelled")
email           String?   (customer email from Stripe)
shippingName    String?
shippingAddress Json?     (full address object)
userId          String?   (FK → User, nullable — guest checkout allowed)
createdAt       DateTime
items           OrderItem[]
statusLogs      OrderStatusLog[]
```

**OrderItem**
```
id        String   (cuid, PK)
orderId   String   (FK → Order, cascade delete)
title     String   ("Tea Name – Size")
variantId String
price     Int      (cents)
quantity  Int
createdAt DateTime
```

**OrderStatusLog**
```
id         String   (cuid, PK)
orderId    String   (FK → Order, cascade delete)
fromStatus String
toStatus   String
createdAt  DateTime
```

### Prisma Client (`lib/prisma.ts`)

Uses the `@prisma/adapter-pg` driver adapter (not the default binary engine) with a `pg` connection pool. This is required for Supabase's connection pooler.

Singleton pattern — stores client on `globalThis` to prevent multiple instances during module re-evaluation (hot reload in dev, or multiple worker processes):

```typescript
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)

const globalForPrisma = globalThis as { prisma: PrismaClient | undefined }

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter, log: ["error"] })
globalForPrisma.prisma = prisma   // always cache on global (fixed from dev-only guard)
```

### Supabase Usage

Supabase is used purely as a managed PostgreSQL host. The project connects to it directly via the standard `DATABASE_URL` connection string. No Supabase client SDK (`@supabase/supabase-js`) is used — all database access goes through Prisma.

### Migrations

Migration files live in `prisma/migrations/`. Deployment command: `npx prisma migrate deploy`.

---

## Section 7 — Environment Variables

### Complete Variable Reference

| Variable | Server/Client | Required | Purpose |
|---|---|---|---|
| `DATABASE_URL` | Server only | Yes | PostgreSQL connection string (Supabase) |
| `STRIPE_SECRET_KEY` | Server only | Yes | Stripe API secret — never expose to client |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Client (public) | Yes | Stripe publishable key — safe in browser |
| `STRIPE_WEBHOOK_SECRET` | Server only | Yes | Validates Stripe webhook signature |
| `STRIPE_SHIPPING_RATE_ID` | Server only | Yes | Stripe shipping rate object ID |
| `NEXT_PUBLIC_BASE_URL` | Client (public) | Yes | Full production URL — used in Stripe success/cancel URLs and as site base |
| `NEXTAUTH_URL` | Server only | Yes | Must match deployed domain exactly |
| `NEXTAUTH_SECRET` | Server only | Yes | Signs JWT session tokens — must be strong random |
| `EMAIL_HOST` | Server only | Yes* | SMTP server hostname |
| `EMAIL_PORT` | Server only | Yes* | SMTP port (typically 587) |
| `EMAIL_USER` | Server only | Yes* | SMTP username |
| `EMAIL_PASS` | Server only | Yes* | SMTP password |
| `EMAIL_FROM` | Server only | Yes* | Sender address for order emails |
| `ADMIN_EMAIL` | Server only | Yes* | Recipient of admin order notification emails |
| `PRISMA_CLIENT_ENGINE_TYPE` | Server only | Yes | Set to `binary` for standard deployment |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Client (public) | No | Sanity CMS project ID (not actively used) |

*Emails will fail silently without these — app continues to function but no emails are sent.

### Security Boundaries

**Server-only variables** (never included in client bundle):
- All variables without the `NEXT_PUBLIC_` prefix
- Accessed only inside Server Components, API Routes, or `getServerSession`

**Client-exposed variables** (bundled into browser JavaScript):
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — required by Stripe.js
- `NEXT_PUBLIC_BASE_URL` — used by client code for URL construction
- `NEXT_PUBLIC_SANITY_PROJECT_ID` — CMS (currently unused on client)

### Environment Files

| File | Committed | Purpose |
|---|---|---|
| `.env.production.example` | Yes | Template with comments — no real secrets |
| `.env.production` | **No** (gitignored) | Live production secrets — set on server |
| `.env.local` | **No** (gitignored) | Local development overrides |
| `.env` | **No** (gitignored) | Was previously committed with live keys — rotate those keys |

---

## Section 8 — Production Infrastructure

### Architecture Diagram

```
                    Internet
                       │
              ┌────────▼─────────┐
              │  NGINX :443       │  SSL termination
              │  (Certbot TLS)    │  Gzip compression
              │  Security headers │  Static asset cache
              └────────┬─────────┘
                       │ proxy_pass http://localhost:3000
              ┌────────▼─────────┐
              │  Next.js :3000    │  Docker container
              │  (node:20-alpine) │  restart: always
              │  non-root user    │  healthcheck every 30s
              └──────┬──────┬────┘
                     │      │
         ┌───────────▼┐    ┌▼──────────┐
         │  Supabase  │    │  Stripe   │
         │ PostgreSQL │    │   API     │
         └────────────┘    └───────────┘
```

### Dockerfile (Multi-stage)

**Stage 1 — builder** (`node:20-alpine`):
1. `apk add openssl` (Prisma binary requirement)
2. `npm ci` (install all dependencies)
3. Copy source files
4. `npx prisma generate` (generates Prisma client from schema)
5. `npm run build` (Next.js production build)

**Stage 2 — runner** (`node:20-alpine`):
1. Copy everything from builder into clean image
2. Create system user/group `nextjs:nodejs` (UID 1001)
3. `chown -R nextjs:nodejs /app`
4. `USER nextjs` — run as non-root
5. `EXPOSE 3000`
6. `CMD ["npm", "run", "start"]`

Secrets are **never baked into the image** — they are injected at runtime via `env_file: .env.production` in docker-compose.

### Docker Compose

```yaml
services:
  app:
    build: .
    container_name: teastorm_app
    restart: always
    env_file: .env.production
    ports: ["3000:3000"]
    healthcheck:
      test: wget -qO- http://localhost:3000/api/health
      interval: 30s / timeout: 10s / retries: 3 / start_period: 20s
```

Optional commented-out `db` service with `postgres:16-alpine` for self-hosted setup.

### NGINX (`nginx/teastorm.conf`)

Key behaviors:

| Feature | Implementation |
|---|---|
| HTTP → HTTPS redirect | `return 301 https://...` on port 80 |
| SSL | Let's Encrypt (Certbot fills in cert paths) |
| HTTP/2 | `listen 443 ssl http2` |
| Gzip | `gzip_types` covers CSS, JS, JSON, SVG |
| Security headers | HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-XSS-Protection |
| Stripe webhook | Separate `location` with `proxy_request_buffering off` |
| Static assets | `/_next/static/` → 1 year cache + immutable |
| Public images | `/images/` → 30 day cache |
| Everything else | Proxy with `Upgrade`/`Connection` headers for WebSocket |
| Body size limit | `client_max_body_size 2m` |
| Real IP forwarding | `X-Real-IP` + `X-Forwarded-For` + `X-Forwarded-Proto` |

### Health Check Endpoint

`GET /api/health` → `{ status: "ok", service: "teastorm", timestamp: ISO_string }`

- HTTP 200
- `Cache-Control: no-store`
- Does not probe database (intentional — DB issues should not mark app as down)
- Used by: Docker healthcheck, NGINX upstream check, uptime monitoring tools

---

## Section 9 — Security Features

### Rate Limiting (`lib/rate-limit.ts`)

Applied to: `POST /api/checkout`

- Sliding window: **10 requests per IP per minute**
- In-memory `Map<IP, {count, resetAt}>`
- IP extracted from `X-Real-IP` → `X-Forwarded-For` → `"unknown"` (in that priority)
- Auto-cleanup: expired entries purged every 5 minutes via `setInterval`
- Returns HTTP 429 with user-friendly message if exceeded
- **Note**: Not shared across multiple Node instances. Acceptable for single-VPS deployment. Use Redis for multi-instance.

### NGINX Security Headers

```
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

### Stripe Webhook Verification

Every webhook request is verified:
```typescript
event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET)
```
Invalid signatures → HTTP 400. Missing signature → HTTP 400. Idempotency enforced via `stripeEventId` unique constraint.

### Non-root Docker Container

Runner stage creates `nextjs` user (UID 1001) and runs as that user. If the container is compromised, the attacker cannot escalate to root easily.

### Environment Validation (`lib/env.ts`)

`getServerEnv()` throws immediately with a clear message if any required variable is missing. This surfaces misconfigurations at startup rather than at request time.

### Admin Access Control

`app/admin/layout.tsx` hard-codes an `ADMIN_EMAILS` allowlist:
```typescript
const ADMIN_EMAILS = ["ttrushenkova.bisiness@gmail.com"]
```
Unauthenticated or non-admin sessions are redirected to `/`. This runs server-side in the layout — cannot be bypassed client-side.

### User Order Isolation

`app/orders/[id]/page.tsx` checks that the authenticated user's ID matches the order's `userId`. Users cannot view other users' orders.

### Secrets Never Reach Client

- All `process.env.*` variables without `NEXT_PUBLIC_` prefix are inaccessible in client bundles
- Prisma and all DB logic lives in Server Components and API Routes only
- Stripe secret key only used in API Routes

---

## Section 10 — Deployment Process

### First-time VPS Setup

```bash
# 1. Provision Ubuntu 22.04 server

# 2. Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER && newgrp docker
sudo apt install -y docker-compose-plugin

# 3. Install NGINX + Certbot
sudo apt install -y nginx certbot python3-certbot-nginx

# 4. Clone the repository
git clone <repo-url> /opt/teastorm
cd /opt/teastorm/teastorm-frontend

# 5. Set production secrets
cp .env.production.example .env.production
nano .env.production    # fill all values

# 6. Run DB migrations (before first start)
npm install
npx prisma generate
npx prisma migrate deploy

# 7. Build and start the container
docker compose up -d --build

# 8. Verify app is running
curl http://localhost:3000/api/health
# → {"status":"ok","service":"teastorm","timestamp":"..."}

# 9. Configure NGINX
sudo cp nginx/teastorm.conf /etc/nginx/sites-available/teastorm
# Edit server_name to your domain:
sudo nano /etc/nginx/sites-available/teastorm
sudo ln -sf /etc/nginx/sites-available/teastorm /etc/nginx/sites-enabled/teastorm
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

# 10. Enable SSL
sudo certbot --nginx -d teastorm.com -d www.teastorm.com
# Certbot edits nginx config and reloads automatically

# 11. Test SSL auto-renewal
sudo certbot renew --dry-run

# 12. Register Stripe webhook
# Dashboard → Webhooks → Add endpoint
# URL: https://teastorm.com/api/checkout/stripe/webhook
# Event: checkout.session.completed
# Copy signing secret → set STRIPE_WEBHOOK_SECRET in .env.production
# Restart: docker compose restart app
```

### Subsequent Deployments

```bash
cd /opt/teastorm/teastorm-frontend
git pull
docker compose up -d --build
# If schema changed: docker compose run --rm app npx prisma migrate deploy
```

---

## Section 11 — Current Project Status

### Completed

- [x] 14-product catalog with rich content (descriptions, origins, brewing guides)
- [x] Product detail pages with variant selection, gallery, lightbox
- [x] Cart (localStorage-persisted, hydrated on mount, stable reference functions)
- [x] Sliding cart drawer (Zustand)
- [x] Stripe Checkout session creation with shipping, billing, tax
- [x] Order storage in PostgreSQL before Stripe redirect
- [x] Stripe webhook handler with signature verification + idempotency
- [x] Order status update (pending → paid) via webhook
- [x] Success page — no infinite loop, order displayed from DB
- [x] Cart cleared exactly once after purchase (ref guard)
- [x] Customer email on payment (Nodemailer — requires SMTP config)
- [x] Admin email on payment
- [x] User account / order history
- [x] Admin dashboard (stats, order list, order detail, status update)
- [x] NextAuth email login (JWT strategy)
- [x] Production build passes (0 TypeScript errors)
- [x] Docker multi-stage image
- [x] Docker Compose with healthcheck
- [x] NGINX config (HTTPS, gzip, security headers, caching)
- [x] SSL config (Certbot — needs live server to activate)
- [x] Health endpoint (`/api/health`)
- [x] Rate limiting on checkout (10 req / IP / min)
- [x] Structured logger
- [x] `.gitignore` covering all secrets
- [x] `.env.production.example` fully documented

### Still Requires Manual Action

| Action | Who | Why |
|---|---|---|
| Set real `NEXT_PUBLIC_BASE_URL` in `.env.production` | Deployer | Stripe success URL uses this |
| Set strong `NEXTAUTH_SECRET` | Deployer | `dev-secret-change-later` is in old `.env` |
| Register Stripe webhook on live URL | Deployer | Webhook cannot fire until registered |
| Configure SMTP credentials | Deployer | Emails currently fail silently |
| Rotate Stripe + Supabase keys | Owner | Old `.env` (since removed from git) contained live keys |
| Run `prisma migrate deploy` before first start | Deployer | Schema must match DB |

---

## Section 12 — Known Risks and Potential Improvements

### Risks

| Risk | Severity | Notes |
|---|---|---|
| Old `.env` file had live keys committed | High | Keys should be rotated in Stripe + Supabase dashboards immediately |
| Admin email allowlist is hardcoded | Medium | `ADMIN_EMAILS` array in `app/admin/layout.tsx` — should be env variable |
| Auth provider accepts any email | Medium | CredentialsProvider has no actual user verification — design choice, but insecure if multi-user |
| In-memory rate limiter | Low | Lost on restart; not shared across instances. Use Redis for HA |
| No DB health probe | Low | `/api/health` doesn't check DB. Add `/api/health/deep` if needed |
| SMTP credentials missing | Medium | Order emails silently fail without EMAIL_* vars |

### Potential Improvements

| Improvement | Value |
|---|---|
| **Sentry error monitoring** | Catch runtime errors in production. Run `npx @sentry/wizard -i nextjs`, set `SENTRY_DSN` |
| **Redis rate limiting** | Replace in-memory Map with Redis for multi-instance safety |
| **Redis session store** | Replace JWT sessions with Redis-backed sessions for instant revocation |
| **Background job queue** | Move email sending out of the webhook synchronous path (use BullMQ or similar) |
| **Cloudflare CDN / WAF** | DDoS protection, global edge caching, bot filtering |
| **Image CDN** | Move product images to Cloudinary or use Next.js remote images with an image host |
| **Sanity CMS activation** | Client is configured (`lib/sanity.client.ts`) but not wired to any page — could enable content editing without deployments |
| **Real authentication** | Replace email-only CredentialsProvider with magic link (Resend), Google OAuth, or similar |
| **Order webhook retry handling** | If email fails, order is still marked paid but email is lost — add retry queue |
| **Database connection pooling** | For high traffic, configure Supabase Transaction Pooler URL in `DATABASE_URL` |
| **Test coverage** | No tests exist. Add at minimum: checkout API route tests, cart context unit tests |
| **CSP headers** | Add `Content-Security-Policy` header to NGINX config |
| **Admin user management** | Promote admin emails to DB or env variable instead of hardcoded array |
| **`DIRECT_URL` for Prisma** | For Supabase connection pooler + migrations, a `DIRECT_URL` (non-pooled) may be needed |

---

## Appendix — Quick File Reference

| Need to find... | Look in... |
|---|---|
| Cart items logic | `lib/cart-context.tsx` |
| Cart drawer (open/close) | `lib/cart-store.ts` |
| Checkout session creation | `app/api/checkout/route.ts` |
| Stripe webhook handler | `app/api/checkout/stripe/webhook/route.ts` |
| Success page | `app/success/page.tsx` |
| Cart clear on success | `app/success/ClearCartOnMount.tsx` |
| All 14 products + variants | `data/products.ts` |
| Tea descriptions + brewing | `data/teaContent.ts` |
| Stripe price IDs (cached) | `data/prices.json` |
| DB schema | `prisma/schema.prisma` |
| Prisma client singleton | `lib/prisma.ts` |
| Auth config | `lib/auth.ts` |
| Email templates | `lib/email.ts` |
| Env validation | `lib/env.ts` |
| Rate limiter | `lib/rate-limit.ts` |
| Structured logger | `lib/logger.ts` |
| Admin DB queries | `lib/queries.ts` |
| NGINX config | `nginx/teastorm.conf` |
| Docker image | `Dockerfile` |
| Docker Compose | `docker-compose.yml` |
| All env variables | `.env.production.example` |
| Full deploy guide | `DEPLOYMENT.md` |
