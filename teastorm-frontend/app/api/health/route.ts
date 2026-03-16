import { NextResponse } from "next/server";

/**
 * GET /api/health
 *
 * Lightweight liveness probe used by Docker healthcheck,
 * NGINX upstream checks, and uptime monitoring services.
 *
 * Returns HTTP 200 as long as the Node process is running.
 * Does NOT probe the database — this is intentional.
 * A DB probe would add latency and could cause false downtime alerts
 * when the database is temporarily unreachable but the app is fine.
 */
export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      service: "teastorm",
      timestamp: new Date().toISOString(),
    },
    {
      status: 200,
      headers: {
        // Prevent any caching of health responses
        "Cache-Control": "no-store",
      },
    }
  );
}
