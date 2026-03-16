/**
 * Simple in-memory rate limiter for Next.js API routes.
 *
 * Uses a sliding window per IP. State lives in the Node.js process global,
 * so it resets on server restart and is NOT shared across multiple instances.
 * Good enough for a single-server VPS deployment; swap for Redis if you
 * ever run multiple app replicas.
 *
 * Usage:
 *   const result = rateLimit(req, { limit: 10, windowMs: 60_000 })
 *   if (!result.allowed) return NextResponse.json({ error: "Too many requests" }, { status: 429 })
 */

type Entry = {
  count: number;
  resetAt: number;
};

// Store is keyed by IP string
const store = new Map<string, Entry>();

// Clean up expired entries every 5 minutes to prevent unbounded memory growth
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (entry.resetAt <= now) store.delete(key);
  }
}, 5 * 60 * 1000);

export type RateLimitOptions = {
  /** Maximum number of requests allowed within the window */
  limit: number;
  /** Time window in milliseconds */
  windowMs: number;
};

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
};

/**
 * Extract the real client IP from the request, accounting for NGINX's
 * X-Real-IP and X-Forwarded-For headers when running behind a proxy.
 */
function getIp(req: Request): string {
  const headers = req.headers;
  return (
    headers.get("x-real-ip") ??
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

export function rateLimit(
  req: Request,
  options: RateLimitOptions
): RateLimitResult {
  const { limit, windowMs } = options;
  const ip = getIp(req);
  const now = Date.now();

  let entry = store.get(ip);

  if (!entry || entry.resetAt <= now) {
    // First request in this window (or window has expired)
    entry = { count: 1, resetAt: now + windowMs };
    store.set(ip, entry);
    return { allowed: true, remaining: limit - 1, resetAt: entry.resetAt };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  return {
    allowed: true,
    remaining: limit - entry.count,
    resetAt: entry.resetAt,
  };
}
