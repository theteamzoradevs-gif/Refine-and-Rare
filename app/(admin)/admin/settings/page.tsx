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
      <form action={saveSettings} className="admin-panel w-full space-y-5">
        <Field
          name="businessName"
          label="Business name"
          defaultValue={settings.businessName}
        />
        <Field name="tagline" label="Tagline" defaultValue={settings.tagline} />
        <div>
          <label className="admin-label">Brand description</label>
          <textarea
            name="description"
            rows={5}
            defaultValue={settings.description}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field name="email" label="Email" defaultValue={settings.email} />
          <Field name="phone" label="Phone" defaultValue={settings.phone} />
          <Field
            name="whatsapp"
            label="WhatsApp number (digits)"
            defaultValue={settings.whatsapp}
          />
          <Field
            name="instagram"
            label="Instagram URL"
            defaultValue={settings.instagram}
          />
          <Field name="city" label="City" defaultValue={settings.city} />
          <Field name="address" label="Address" defaultValue={settings.address} />
        </div>
        <div>
          <label className="admin-label">Default WhatsApp message</label>
          <textarea
            name="whatsappMessage"
            rows={2}
            defaultValue={settings.whatsappMessage}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
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
              label={`${day} hours`}
              defaultValue={hours[day] || ""}
            />
          ))}
        </div>
        <button type="submit" className="btn-primary">
          Save settings
        </button>
      </form>
    </AdminShell>
  );
}

function Field({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="admin-label capitalize">{label}</label>
      <input name={name} defaultValue={defaultValue} />
    </div>
  );
}
