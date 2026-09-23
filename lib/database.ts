/**
 * When DATABASE_URL is set (e.g. Supabase), Prisma powers the public site
 * and /admin CMS. Leave unset to serve static content only.
 */
export function isDatabaseEnabled() {
  if (process.env.DATABASE_ENABLED === "false") return false;
  return Boolean(process.env.DATABASE_URL);
}
