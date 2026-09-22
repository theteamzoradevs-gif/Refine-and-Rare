/**
 * Database is temporarily disabled until DATABASE_URL is configured.
 * Prisma schema, client, seed, and admin code are kept intact — set
 * DATABASE_URL (and leave DATABASE_ENABLED unset or "true") to re-enable.
 */
export function isDatabaseEnabled() {
  if (process.env.DATABASE_ENABLED === "false") return false;
  return Boolean(process.env.DATABASE_URL);
}
