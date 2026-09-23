import { SingleUploadField } from "@/components/admin/MediaUploader";
import { saveTestimonial } from "@/app/actions/admin";

export function TestimonialForm({
  initial,
}: {
  initial?: {
    id: string;
    name: string;
    quote: string;
    photoUrl: string | null;
    published: boolean;
    sortOrder: number;
  };
}) {
  return (
    <form action={saveTestimonial} className="admin-panel w-full space-y-5">
      {initial?.id && <input type="hidden" name="id" value={initial.id} />}
      <div>
        <label className="admin-label">Client name</label>
        <input name="name" required defaultValue={initial?.name} />
      </div>
      <div>
        <label className="admin-label">Review</label>
        <textarea name="quote" required rows={5} defaultValue={initial?.quote} />
      </div>
      <SingleUploadField
        name="photoUrl"
        label="Photo (optional)"
        initial={initial?.photoUrl || ""}
      />
      <div>
        <label className="admin-label">Sort order</label>
        <input
          name="sortOrder"
          type="number"
          defaultValue={initial?.sortOrder ?? 0}
        />
      </div>
      <label className="flex items-center gap-2.5 text-sm text-ink">
        <input
          type="checkbox"
          name="published"
          defaultChecked={initial?.published ?? true}
        />
        Published on website
      </label>
      <button type="submit" className="btn-primary">
        Save testimonial
      </button>
    </form>
  );
}
