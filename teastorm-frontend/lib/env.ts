/**
 * Server-side environment variable validation.
 * Import this at the top of server-only modules that need guaranteed env vars.
 * Throws at startup if required variables are missing so failures are immediate.
 *
 * NEVER import this file in client components — it contains server-only references.
 */

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}\n` +
        `Set it in .env.local (development) or in your production environment.`
    );
  }
  return value;
}

/** Validated server-side env vars — throws on first missing variable. */
export function getServerEnv() {
  return {
    databaseUrl: requireEnv("DATABASE_URL"),
    stripeSecretKey: requireEnv("STRIPE_SECRET_KEY"),
    stripeWebhookSecret: requireEnv("STRIPE_WEBHOOK_SECRET"),
    stripeShippingRateId: requireEnv("STRIPE_SHIPPING_RATE_ID"),
    nextAuthSecret: requireEnv("NEXTAUTH_SECRET"),
    nextAuthUrl: requireEnv("NEXTAUTH_URL"),
    baseUrl: requireEnv("NEXT_PUBLIC_BASE_URL"),
  };
}
