import { SingleUploadField } from "@/components/admin/MediaUploader";
import { saveService } from "@/app/actions/admin";

type Initial = {
  id?: string;
  title?: string;
  slug?: string;
  shortDesc?: string;
  longDesc?: string;
  imageUrl?: string;
  sortOrder?: number;
};

export function ServiceForm({ initial }: { initial?: Initial }) {
  return (
    <form action={saveService} className="max-w-3xl space-y-4 border border-line bg-white p-6">
      {initial?.id && <input type="hidden" name="id" value={initial.id} />}
      <Field name="title" label="Title" defaultValue={initial?.title} required />
      <Field name="slug" label="URL slug" defaultValue={initial?.slug} required />
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
          Short description
        </label>
        <textarea
          name="shortDesc"
          required
          rows={2}
          defaultValue={initial?.shortDesc}
          className="w-full border border-line px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
          Full description
        </label>
        <textarea
          name="longDesc"
          required
          rows={6}
          defaultValue={initial?.longDesc}
          className="w-full border border-line px-3 py-2 text-sm"
        />
      </div>
      <SingleUploadField
        name="imageUrl"
        label="Service image"
        initial={initial?.imageUrl || ""}
      />
      <Field
        name="sortOrder"
        label="Sort order"
        type="number"
        defaultValue={String(initial?.sortOrder ?? 0)}
      />
      <button type="submit" className="btn-primary">
        Save service
      </button>
    </form>
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
