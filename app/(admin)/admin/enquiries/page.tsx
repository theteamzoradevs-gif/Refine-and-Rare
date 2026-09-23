import { AdminShell } from "@/components/admin/AdminShell";
import { updateEnquiryStatus } from "@/app/actions/admin";
import { isDatabaseEnabled } from "@/lib/database";
import { prisma } from "@/lib/prisma";
import { whatsappUrl, telUrl } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function AdminEnquiriesPage() {
  if (!isDatabaseEnabled()) return null;

  const enquiries = await prisma.enquiry.findMany({
    include: { service: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminShell
      title="Enquiries"
      description="Leads from the website forms and chat assistant."
    >
      <div className="space-y-4">
        {enquiries.length === 0 && (
          <div className="admin-panel text-sm text-muted">No enquiries yet.</div>
        )}
        {enquiries.map((enquiry) => (
          <article key={enquiry.id} className="admin-card">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-2xl text-ink">
                  {enquiry.name}
                </h2>
                <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-muted">
                  {new Date(enquiry.createdAt).toLocaleString("en-IN")} ·{" "}
                  {enquiry.service?.title || "General"}
                </p>
              </div>
              <span
                className={
                  enquiry.status === "PENDING"
                    ? "admin-badge-gold"
                    : "admin-badge-teal"
                }
              >
                {enquiry.status}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {enquiry.message}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={telUrl(enquiry.phone)} className="admin-link">
                Call {enquiry.phone}
              </a>
              <a
                href={whatsappUrl(
                  enquiry.phone,
                  `Hi ${enquiry.name}, this is Refine & Rare following up on your enquiry.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="admin-link"
              >
                WhatsApp
              </a>
              <a href={`mailto:${enquiry.email}`} className="admin-link">
                {enquiry.email}
              </a>
            </div>
            <form
              action={updateEnquiryStatus}
              className="mt-5 flex flex-wrap gap-2"
            >
              <input type="hidden" name="id" value={enquiry.id} />
              <button
                type="submit"
                name="status"
                value="PENDING"
                className="rounded-xl border border-line bg-cream/60 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink transition hover:border-gold"
              >
                Mark pending
              </button>
              <button
                type="submit"
                name="status"
                value="CONTACTED"
                className="rounded-xl bg-teal px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-teal-dark"
              >
                Mark contacted
              </button>
            </form>
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
