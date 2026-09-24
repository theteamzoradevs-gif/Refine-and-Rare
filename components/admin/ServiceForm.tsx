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
  const isEdit = Boolean(initial?.id);

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
          />
          <Field
            name="slug"
            label="URL slug"
            required
            defaultValue={initial?.slug}
            placeholder="modular-kitchens"
            hint="Lowercase words separated by hyphens."
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
