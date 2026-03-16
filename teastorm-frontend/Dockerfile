# =============================================================================
# TeaStorm — Production Dockerfile
# Multi-stage build: builder → runner
# =============================================================================

# ---- Stage 1: Build --------------------------------------------------------
FROM node:20-alpine AS builder

# Install openssl for Prisma binary query engine
RUN apk add --no-cache openssl

WORKDIR /app

# Copy dependency manifests first for better layer caching
COPY package*.json ./
RUN npm ci --prefer-offline

# Copy the full source
COPY . .

# Generate Prisma client (must run before build)
RUN npx prisma generate

# Build Next.js for production
RUN npm run build

# ---- Stage 2: Runner -------------------------------------------------------
FROM node:20-alpine AS runner

RUN apk add --no-cache openssl

WORKDIR /app

ENV NODE_ENV=production

# Copy everything from builder (node_modules + .next + public + prisma)
COPY --from=builder /app ./

# Drop to a non-root user for security
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs \
 && chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["npm", "run", "start"]
