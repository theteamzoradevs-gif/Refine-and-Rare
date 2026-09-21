import { AdminShell } from "@/components/admin/AdminShell";
import { updateEnquiryStatus } from "@/app/actions/admin";
import { prisma } from "@/lib/prisma";
import { whatsappUrl, telUrl } from "@/lib/constants";

export default async function AdminEnquiriesPage() {
  const enquiries = await prisma.enquiry.findMany({
    include: { service: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminShell title="Enquiries">
      <div className="space-y-4">
        {enquiries.length === 0 && (
          <p className="text-sm text-muted">No enquiries yet.</p>
        )}
        {enquiries.map((enquiry) => (
          <article
            key={enquiry.id}
            className="border border-line bg-white p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-xl">{enquiry.name}</h2>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted">
                  {new Date(enquiry.createdAt).toLocaleString("en-IN")} ·{" "}
                  {enquiry.service?.title || "General"}
                </p>
              </div>
              <span
                className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                  enquiry.status === "PENDING"
                    ? "bg-gold/20 text-gold-dark"
                    : "bg-teal/15 text-teal"
                }`}
              >
                {enquiry.status}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {enquiry.message}
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <a
                href={telUrl(enquiry.phone)}
                className="text-teal hover:underline"
              >
                Call {enquiry.phone}
              </a>
              <a
                href={whatsappUrl(
                  enquiry.phone,
                  `Hi ${enquiry.name}, this is Refine & Rare following up on your enquiry.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal hover:underline"
              >
                WhatsApp
              </a>
              <a
                href={`mailto:${enquiry.email}`}
                className="text-teal hover:underline"
              >
                {enquiry.email}
              </a>
            </div>
            <form action={updateEnquiryStatus} className="mt-4 flex flex-wrap gap-2">
              <input type="hidden" name="id" value={enquiry.id} />
              <button
                type="submit"
                name="status"
                value="PENDING"
                className="border border-line px-3 py-1.5 text-xs uppercase tracking-wider"
              >
                Mark pending
              </button>
              <button
                type="submit"
                name="status"
                value="CONTACTED"
                className="border border-teal bg-teal px-3 py-1.5 text-xs uppercase tracking-wider text-white"
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
