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
    <form
      action={saveTestimonial}
      className="max-w-2xl space-y-4 border border-line bg-white p-6"
    >
      {initial?.id && <input type="hidden" name="id" value={initial.id} />}
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
          Client name
        </label>
        <input
          name="name"
          required
          defaultValue={initial?.name}
          className="w-full border border-line px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
          Review
        </label>
        <textarea
          name="quote"
          required
          rows={5}
          defaultValue={initial?.quote}
          className="w-full border border-line px-3 py-2 text-sm"
        />
      </div>
      <SingleUploadField
        name="photoUrl"
        label="Photo (optional)"
        initial={initial?.photoUrl || ""}
      />
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
          Sort order
        </label>
        <input
          name="sortOrder"
          type="number"
          defaultValue={initial?.sortOrder ?? 0}
          className="w-full border border-line px-3 py-2 text-sm"
        />
      </div>
      <label className="flex items-center gap-2 text-sm">
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
