"use client";

import { useMemo, useState, useTransition } from "react";
import { submitEnquiry } from "@/app/actions/enquiry";

type ServiceOption = { id: string; title: string; slug: string };

export function EnquiryForm({
  services,
  defaultServiceSlug,
}: {
  services: ServiceOption[];
  defaultServiceSlug?: string;
}) {
  const defaultServiceId = useMemo(() => {
    if (!defaultServiceSlug) return "";
    return services.find((s) => s.slug === defaultServiceSlug)?.id || "";
  }, [services, defaultServiceSlug]);

  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function onSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await submitEnquiry(formData);
      if (result.ok) {
        setSuccess(true);
      } else {
        setError(result.error);
      }
    });
  }

  if (success) {
    return (
      <div className="border border-teal/30 bg-teal/5 p-8 text-center">
        <p className="font-display text-2xl text-ink">Thank you</p>
        <p className="mt-3 text-muted">
          Your enquiry has been received. Our team will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form action={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name" name="name" required placeholder="Your name" />
        <Field
          label="Phone"
          name="phone"
          required
          placeholder="+91 ..."
          type="tel"
        />
      </div>
      <Field
        label="Email"
        name="email"
        required
        placeholder="you@email.com"
        type="email"
      />
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Service Interested In
        </label>
        <select
          name="serviceId"
          defaultValue={defaultServiceId}
          className="w-full border border-line bg-white px-4 py-3 text-sm outline-none focus:border-teal"
        >
          <option value="">General enquiry</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Message
        </label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us about your space and vision..."
          className="w-full border border-line bg-white px-4 py-3 text-sm outline-none focus:border-teal"
        />
      </div>
      {error && <p className="text-sm text-red-700">{error}</p>}
      <button type="submit" disabled={pending} className="btn-primary w-full md:w-auto">
        {pending ? "Sending..." : "Send Enquiry"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  required,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full border border-line bg-white px-4 py-3 text-sm outline-none focus:border-teal"
      />
    </div>
  );
}
