import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Strict mode helps catch bugs early; safe to enable in production.
  reactStrictMode: true,

  // Treat TypeScript errors as build failures in CI/production.
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
