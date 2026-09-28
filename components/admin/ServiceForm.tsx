"use client";

import { useState } from "react";
import {
  AdminForm,
  Field,
  FormActions,
  FormGrid,
  FormSection,
  TextArea,
} from "@/components/admin/FormUI";
import { SingleUploadField } from "@/components/admin/MediaUploader";
import { saveService } from "@/app/actions/admin";
import { slugify } from "@/lib/projectSlug";
import { DEFAULT_HIGHLIGHTS, parseHighlights } from "@/lib/highlights";

type Initial = {
  id?: string;
  title?: string;
  slug?: string;
  shortDesc?: string;
  longDesc?: string;
  imageUrl?: string;
  sortOrder?: number;
  highlightsJson?: string | null;
};

export function ServiceForm({ initial }: { initial?: Initial }) {
  const isEdit = Boolean(initial?.id);
  const [slug, setSlug] = useState(initial?.slug || "");
  const highlights = parseHighlights(initial?.highlightsJson);

  return (
    <AdminForm action={saveService}>
      {initial?.id ? <input type="hidden" name="id" value={initial.id} /> : null}

      <FormSection
        title="Basics"
        description="How this service appears in navigation and listings."
      >
        <FormGrid>
          <Field
            name="title"
            label="Title"
            required
            defaultValue={initial?.title}
            placeholder="Modular Kitchens"
            onChange={(event) => {
              if (!isEdit) setSlug(slugify(event.target.value));
            }}
          />
          <Field
            name="slug"
            label="URL slug"
            required
            value={slug}
            onChange={(event) => setSlug(slugify(event.target.value))}
            placeholder="modular-kitchens"
          />
        </FormGrid>
        <TextArea
          name="shortDesc"
          label="Short description"
          required
          rows={2}
          defaultValue={initial?.shortDesc}
          placeholder="One or two lines for cards and previews…"
        />
        <TextArea
          name="longDesc"
          label="Full description"
          required
          rows={6}
          defaultValue={initial?.longDesc}
          placeholder="Detailed copy for the service detail page…"
        />
      </FormSection>

      <FormSection
        title="What clients can expect"
        description="Four highlight cards shown on this service page."
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
        title="Visual & order"
        description="Cover image and listing position."
      >
        <SingleUploadField
          name="imageUrl"
          label="Service image"
          hint="Shown on the services grid and detail hero."
          initial={initial?.imageUrl || ""}
        />
        <Field
          name="sortOrder"
          label="Sort order"
          type="number"
          defaultValue={initial?.sortOrder ?? 0}
          hint="Lower numbers appear first."
          className="max-w-xs"
        />
      </FormSection>

      <FormActions
        submitLabel={isEdit ? "Update service" : "Save service"}
        cancelHref="/admin/services"
      />
    </AdminForm>
  );
}
