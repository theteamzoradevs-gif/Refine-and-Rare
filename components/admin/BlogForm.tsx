import {
  AdminForm,
  Field,
  FormActions,
  FormGrid,
  FormSection,
  TextArea,
  ToggleField,
} from "@/components/admin/FormUI";
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
  const isEdit = Boolean(initial?.id);
  const bodyText = initial ? parseBlogBody(initial.body).join("\n\n") : "";
  const publishedAtValue = initial
    ? initial.publishedAt.toISOString().slice(0, 10)
    : new Date().toISOString().slice(0, 10);

  return (
    <AdminForm action={saveBlog}>
      {initial?.id ? <input type="hidden" name="id" value={initial.id} /> : null}

      <FormSection
        title="Article"
        description="Headline, URL, and category for this post."
      >
        <Field
          name="title"
          label="Title"
          required
          defaultValue={initial?.title}
          placeholder="Timeless living room ideas"
        />
        <FormGrid>
          <Field
            name="slug"
            label="URL slug"
            required
            defaultValue={initial?.slug}
            placeholder="timeless-living-room-ideas"
            hint="Lowercase words separated by hyphens."
          />
          <Field
            name="category"
            label="Category"
            required
            defaultValue={initial?.category}
            placeholder="Living spaces"
          />
        </FormGrid>
        <TextArea
          name="excerpt"
          label="Excerpt"
          required
          rows={3}
          defaultValue={initial?.excerpt}
          placeholder="Short teaser shown on the blog listing…"
        />
        <TextArea
          name="body"
          label="Body"
          required
          rows={10}
          defaultValue={bodyText}
          hint="Separate paragraphs with a blank line."
          placeholder="Write the full article…"
        />
      </FormSection>

      <FormSection
        title="Cover & publishing"
        description="Image, date, and visibility on the site."
      >
        <SingleUploadField
          name="imageUrl"
          label="Cover image"
          hint="Landscape images look best on the blog cards."
          initial={initial?.imageUrl || ""}
        />
        <FormGrid>
          <Field
            name="publishedAt"
            label="Publish date"
            type="date"
            required
            defaultValue={publishedAtValue}
          />
          <Field
            name="sortOrder"
            label="Sort order"
            type="number"
            defaultValue={initial?.sortOrder ?? 0}
          />
        </FormGrid>
        <ToggleField
          name="published"
          label="Published on website"
          description="Uncheck to keep this post as a draft."
          defaultChecked={initial?.published ?? true}
        />
      </FormSection>

      <FormActions
        submitLabel={isEdit ? "Update blog post" : "Save blog post"}
        cancelHref="/admin/blogs"
      />
    </AdminForm>
  );
}
