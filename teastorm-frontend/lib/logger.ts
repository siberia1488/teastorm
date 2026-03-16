/**
 * Structured logging helper for TeaStorm server-side code.
 *
 * Wraps console.log/warn/error with a timestamp and service tag so that
 * all server logs are consistently formatted and easy to grep in production.
 *
 * Usage:
 *   import { logger } from "@/lib/logger"
 *   logger.info("[checkout] session created", { sessionId })
 *   logger.error("[webhook] signature invalid", error)
 */

const SERVICE = "TeaStorm API";

function timestamp(): string {
  return new Date().toISOString();
}

function prefix(level: string): string {
  return `[${timestamp()}] [${SERVICE}] [${level}]`;
}

export const logger = {
  info(...args: unknown[]): void {
    console.log(prefix("INFO"), ...args);
  },

  warn(...args: unknown[]): void {
    console.warn(prefix("WARN"), ...args);
  },

  error(...args: unknown[]): void {
    console.error(prefix("ERROR"), ...args);
  },
};
