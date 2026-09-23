import { SingleUploadField } from "@/components/admin/MediaUploader";
import { saveBlog } from "@/app/actions/admin";
import { parseBlogBody } from "@/lib/staticContent";

export function BlogForm({
  initial,
}: {
  initial?: {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    body: string;
    imageUrl: string;
    category: string;
    published: boolean;
    publishedAt: Date;
    sortOrder: number;
  };
}) {
  const bodyText = initial ? parseBlogBody(initial.body).join("\n\n") : "";
  const publishedAtValue = initial
    ? initial.publishedAt.toISOString().slice(0, 10)
    : new Date().toISOString().slice(0, 10);

  return (
    <form action={saveBlog} className="admin-panel w-full space-y-5">
      {initial?.id && <input type="hidden" name="id" value={initial.id} />}
      <div>
        <label className="admin-label">Title</label>
        <input name="title" required defaultValue={initial?.title} />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="admin-label">Slug</label>
          <input
            name="slug"
            required
            defaultValue={initial?.slug}
            placeholder="timeless-living-room-ideas"
          />
        </div>
        <div>
          <label className="admin-label">Category</label>
          <input name="category" required defaultValue={initial?.category} />
        </div>
      </div>
      <div>
        <label className="admin-label">Excerpt</label>
        <textarea name="excerpt" required rows={3} defaultValue={initial?.excerpt} />
      </div>
      <div>
        <label className="admin-label">Body</label>
        <p className="mb-1.5 text-xs text-muted">
          Separate paragraphs with a blank line.
        </p>
        <textarea name="body" required rows={10} defaultValue={bodyText} />
      </div>
      <SingleUploadField
        name="imageUrl"
        label="Cover image"
        initial={initial?.imageUrl || ""}
      />
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="admin-label">Publish date</label>
          <input
            name="publishedAt"
            type="date"
            required
            defaultValue={publishedAtValue}
          />
        </div>
        <div>
          <label className="admin-label">Sort order</label>
          <input
            name="sortOrder"
            type="number"
            defaultValue={initial?.sortOrder ?? 0}
          />
        </div>
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
        Save blog post
      </button>
    </form>
  );
}
