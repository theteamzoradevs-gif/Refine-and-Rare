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
    <form action={saveService} className="admin-panel w-full space-y-5">
      {initial?.id && <input type="hidden" name="id" value={initial.id} />}
      <div className="grid gap-5 md:grid-cols-2">
        <Field name="title" label="Title" defaultValue={initial?.title} required />
        <Field name="slug" label="URL slug" defaultValue={initial?.slug} required />
      </div>
      <div>
        <label className="admin-label">Short description</label>
        <textarea
          name="shortDesc"
          required
          rows={2}
          defaultValue={initial?.shortDesc}
        />
      </div>
      <div>
        <label className="admin-label">Full description</label>
        <textarea
          name="longDesc"
          required
          rows={6}
          defaultValue={initial?.longDesc}
        />
      </div>
      <SingleUploadField
        name="imageUrl"
        label="Service image"
        initial={initial?.imageUrl || ""}
      />
      <div className="grid gap-5 md:grid-cols-2 md:items-end">
        <Field
          name="sortOrder"
          label="Sort order"
          type="number"
          defaultValue={String(initial?.sortOrder ?? 0)}
        />
        <button type="submit" className="btn-primary md:justify-self-start">
          Save service
        </button>
      </div>
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
      <label className="admin-label">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
      />
    </div>
  );
}
