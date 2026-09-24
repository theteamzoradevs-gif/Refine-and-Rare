import {
  AdminForm,
  Field,
  FormActions,
  FormGrid,
  FormSection,
  TextArea,
} from "@/components/admin/FormUI";
import { AdminShell } from "@/components/admin/AdminShell";
import { saveSettings } from "@/app/actions/admin";
import { getSettings } from "@/lib/data";
import { parseHours } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSettings();
  const hours = parseHours(settings.hoursJson);

  return (
    <AdminShell
      title="Settings"
      description="Business details, contact links, and opening hours."
    >
      <AdminForm action={saveSettings}>
        <FormSection
          title="Brand"
          description="Public-facing name and story for Refine & Rare."
        >
          <FormGrid>
            <Field
              name="businessName"
              label="Business name"
              defaultValue={settings.businessName}
            />
            <Field
              name="tagline"
              label="Tagline"
              defaultValue={settings.tagline}
            />
          </FormGrid>
          <TextArea
            name="description"
            label="Brand description"
            rows={5}
            defaultValue={settings.description}
          />
        </FormSection>

        <FormSection
          title="Contact"
          description="How clients reach you from the site."
        >
          <FormGrid>
            <Field name="email" label="Email" defaultValue={settings.email} />
            <Field name="phone" label="Phone" defaultValue={settings.phone} />
            <Field
              name="whatsapp"
              label="WhatsApp number"
              defaultValue={settings.whatsapp}
              hint="Digits only, with country code."
            />
            <Field
              name="instagram"
              label="Instagram URL"
              defaultValue={settings.instagram}
            />
            <Field name="city" label="City" defaultValue={settings.city} />
            <Field
              name="address"
              label="Address"
              defaultValue={settings.address}
            />
          </FormGrid>
          <TextArea
            name="whatsappMessage"
            label="Default WhatsApp message"
            rows={2}
            defaultValue={settings.whatsappMessage}
          />
        </FormSection>

        <FormSection
          title="Opening hours"
          description="Shown on contact pages and enquiry flows."
        >
          <FormGrid>
            {(
              [
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday",
                "sunday",
              ] as const
            ).map((day) => (
              <Field
                key={day}
                name={day}
                label={`${day.charAt(0).toUpperCase()}${day.slice(1)}`}
                defaultValue={hours[day] || ""}
                placeholder="9:00 AM – 7:00 PM"
              />
            ))}
          </FormGrid>
        </FormSection>

        <FormActions submitLabel="Save settings" />
      </AdminForm>
    </AdminShell>
  );
}
