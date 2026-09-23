import { isDatabaseEnabled } from "@/lib/database";

export const dynamic = "force-dynamic";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isDatabaseEnabled()) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cream px-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(197,178,138,0.25),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(27,58,47,0.08),transparent_40%)]" />
        <div className="admin-panel relative max-w-md text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-dark">
            Admin
          </p>
          <h1 className="mt-3 font-display text-3xl text-ink">
            Connect your database
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Add your Supabase{" "}
            <code className="rounded-md bg-cream-2 px-1.5 py-0.5 text-ink">
              DATABASE_URL
            </code>{" "}
            in{" "}
            <code className="rounded-md bg-cream-2 px-1.5 py-0.5 text-ink">
              .env
            </code>
            , then run{" "}
            <code className="rounded-md bg-cream-2 px-1.5 py-0.5 text-ink">
              npm run db:setup
            </code>{" "}
            to enable the admin CMS.
          </p>
          <a href="/" className="btn-outline mt-8 inline-flex">
            Back to site
          </a>
        </div>
      </div>
    );
  }

  return children;
}
