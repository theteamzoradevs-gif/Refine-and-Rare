import { isDatabaseEnabled } from "@/lib/database";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isDatabaseEnabled()) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream px-6">
        <div className="max-w-md text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Admin
          </p>
          <h1 className="mt-3 font-display text-3xl text-ink">
            Database is temporarily disabled
          </h1>
          <p className="mt-4 text-sm text-muted">
            Prisma and admin tooling are still in the project. Set{" "}
            <code className="text-ink">DATABASE_URL</code> in your env (and leave{" "}
            <code className="text-ink">DATABASE_ENABLED</code> unset or{" "}
            <code className="text-ink">true</code>), then run{" "}
            <code className="text-ink">npm run db:setup</code> to turn them back on.
          </p>
          <a
            href="/"
            className="mt-8 inline-block border border-ink px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-ink hover:text-white"
          >
            Back to site
          </a>
        </div>
      </div>
    );
  }

  return children;
}
