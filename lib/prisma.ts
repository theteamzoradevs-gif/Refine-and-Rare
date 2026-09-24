import { PrismaClient } from "@prisma/client";
import { isDatabaseEnabled } from "./database";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

function createPrismaClient() {
  const url = process.env.DATABASE_URL;
  const withLimit =
    url && !/[?&]connection_limit=/.test(url)
      ? `${url}${url.includes("?") ? "&" : "?"}connection_limit=1`
      : url;

  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    datasources: withLimit ? { db: { url: withLimit } } : undefined,
  });
}

/**
 * Prisma client — only constructed when the database is enabled.
 * All schema / seed / admin code remains; set DATABASE_URL to turn it back on.
 */
export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    if (!isDatabaseEnabled()) {
      throw new Error(
        "Database is disabled. Set DATABASE_URL (and DATABASE_ENABLED!=false) to enable Prisma."
      );
    }
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = createPrismaClient();
    }
    const value = Reflect.get(globalForPrisma.prisma, prop, receiver);
    return typeof value === "function" ? value.bind(globalForPrisma.prisma) : value;
  },
});

if (process.env.NODE_ENV !== "production" && isDatabaseEnabled()) {
  globalForPrisma.prisma = globalForPrisma.prisma || createPrismaClient();
}
