import { AdminShell } from "@/components/admin/AdminShell";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { saveProject } from "@/app/actions/admin";
import { isDatabaseEnabled } from "@/lib/database";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function NewProjectPage() {
  if (!isDatabaseEnabled()) return null;

  const services = await prisma.service.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <AdminShell
      title="Add project"
      description="Create a new gallery piece for the site."
    >
      <form action={saveProject} className="admin-panel w-full space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <Field name="title" label="Title" required />
          <Field
            name="slug"
            label="Slug"
            required
            placeholder="contemporary-living-room"
          />
        </div>
        <div>
          <label className="admin-label">Description</label>
          <textarea name="description" required rows={4} />
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="admin-label">Service category</label>
            <select name="categoryId" required>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>
          <Field name="sortOrder" label="Sort order" type="number" defaultValue="0" />
        </div>
        <label className="flex items-center gap-2.5 text-sm text-ink">
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
  placeholder,
}: {
  name: string;
  label: string;
  required?: boolean;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="admin-label">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    </div>
  );
}
