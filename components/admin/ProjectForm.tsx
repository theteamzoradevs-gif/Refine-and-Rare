"use client";
import { useState } from "react";
import {
  AdminForm,
  Field,
  FormActions,
  FormGrid,
  FormSection,
  SelectField,
  TextArea,
  ToggleField,
} from "@/components/admin/FormUI";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { saveProject } from "@/app/actions/admin";
import { DEFAULT_HIGHLIGHTS, parseHighlights } from "@/lib/highlights";

type ServiceOption = { id: string; title: string };

type Initial = {
  id?: string;
  title?: string;
  slug?: string;
  description?: string;
  categoryId?: string;
  sortOrder?: number;
  featured?: boolean;
  media?: { url: string; type: "IMAGE" | "VIDEO"; alt: string }[];
  highlightsJson?: string | null;
};

function generateSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function ProjectForm({
  services,
  initial,
}: {
  services: ServiceOption[];
  initial?: Initial;
}) {
  const isEdit = Boolean(initial?.id);
  const [slug, setSlug] = useState(initial?.slug || "");
  const highlights = parseHighlights(initial?.highlightsJson);

  return (
    <AdminForm action={saveProject}>
      {initial?.id ? <input type="hidden" name="id" value={initial.id} /> : null}

      <FormSection
        title="Basics"
        description="Name and URL for this gallery project."
      >
        <FormGrid>
          <Field
            name="title"
            label="Title"
            required
            defaultValue={initial?.title}
            placeholder="Contemporary Living Room"
             onChange={(e) => {
    if (!isEdit) {
      setSlug(generateSlug(e.target.value));
    }
  }}
          />
          <Field
            name="slug"
            label="URL slug"
            required
            value={slug}
            onChange={(e) => setSlug(generateSlug(e.target.value))}
            placeholder="contemporary-living-room"
            hint="Lowercase words separated by hyphens."
          />
        </FormGrid>
        <TextArea
          name="description"
          label="Description"
          required
          rows={4}
          defaultValue={initial?.description}
          placeholder="Short story of the space, finishes, and mood…"
        />
      </FormSection>

      <FormSection
        title="Project highlights"
        description="Four highlight cards shown on this project page."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {DEFAULT_HIGHLIGHTS.map((fallback, index) => (
            <TextArea
              key={fallback}
              name={`highlight${index + 1}`}
              label={`Highlight ${index + 1}`}
              required
              rows={3}
              defaultValue={highlights[index] || fallback}
              placeholder={fallback}
            />
          ))}
        </div>
      </FormSection>

      <FormSection
        title="Placement"
        description="Where it appears and how it is ordered."
      >
        <FormGrid>
          <SelectField
            name="categoryId"
            label="Service category"
            required
            defaultValue={initial?.categoryId || services[0]?.id}
          >
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </SelectField>
          <Field
            name="sortOrder"
            label="Sort order"
            type="number"
            defaultValue={initial?.sortOrder ?? 0}
            hint="Lower numbers appear first."
          />
        </FormGrid>
        <ToggleField
          name="featured"
          label="Feature on homepage"
          description="Show this project in the Featured Projects section."
          defaultChecked={initial?.featured}
        />
      </FormSection>

      <FormSection
        title="Media gallery"
        description="Add photos or videos. The first image is used as the cover."
      >
        <MediaUploader initial={initial?.media || []} />
      </FormSection>

      <FormActions
        submitLabel={isEdit ? "Update project" : "Save project"}
        cancelHref="/admin/projects"
      />
    </AdminForm>
  );
}
