import {
  AdminForm,
  Field,
  FormActions,
  FormSection,
  TextArea,
  ToggleField,
} from "@/components/admin/FormUI";
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
  const isEdit = Boolean(initial?.id);

  return (
    <AdminForm action={saveTestimonial}>
      {initial?.id ? <input type="hidden" name="id" value={initial.id} /> : null}

      <FormSection
        title="Review"
        description="Client name and their words as shown on the site."
      >
        <Field
          name="name"
          label="Client name"
          required
          defaultValue={initial?.name}
          placeholder="Priya Sharma"
        />
        <TextArea
          name="quote"
          label="Review"
          required
          rows={5}
          defaultValue={initial?.quote}
          placeholder="What they loved about the project…"
        />
      </FormSection>

      <FormSection
        title="Photo & visibility"
        description="Optional portrait and listing controls."
      >
        <SingleUploadField
          name="photoUrl"
          label="Photo (optional)"
          hint="Square or portrait photos work best."
          initial={initial?.photoUrl || ""}
        />
        <Field
          name="sortOrder"
          label="Sort order"
          type="number"
          defaultValue={initial?.sortOrder ?? 0}
          className="max-w-xs"
        />
        <ToggleField
          name="published"
          label="Published on website"
          description="Uncheck to hide this review from the site."
          defaultChecked={initial?.published ?? true}
        />
      </FormSection>

      <FormActions
        submitLabel={isEdit ? "Update testimonial" : "Save testimonial"}
        cancelHref="/admin/testimonials"
      />
    </AdminForm>
  );
}
