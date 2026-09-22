import { AdminShell } from "@/components/admin/AdminShell";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { saveProject } from "@/app/actions/admin";
import { isDatabaseEnabled } from "@/lib/database";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function NewProjectPage() {
  if (!isDatabaseEnabled()) return null;

  const services = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <AdminShell title="Add project">
      <form action={saveProject} className="max-w-3xl space-y-4 border border-line bg-white p-6">
        <Field name="title" label="Title" required />
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
            Description
          </label>
          <textarea
            name="description"
            required
            rows={4}
            className="w-full border border-line px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
            Service category
          </label>
          <select name="categoryId" required className="w-full border border-line px-3 py-2 text-sm">
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
        <Field name="sortOrder" label="Sort order" type="number" defaultValue="0" />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" />
          Feature on homepage
        </label>
        <MediaUploader />
        <button type="submit" className="btn-primary">
          Save project
        </button>
      </form>
    </AdminShell>
  );
}

function Field({
  name,
  label,
  required,
  type = "text",
  defaultValue,
}: {
  name: string;
  label: string;
  required?: boolean;
  type?: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="w-full border border-line px-3 py-2 text-sm"
      />
    </div>
  );
}
