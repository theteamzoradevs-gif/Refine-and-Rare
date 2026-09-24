import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AdminForm({
  children,
  action,
  className,
}: {
  children: ReactNode;
  action: (formData: FormData) => void | Promise<void>;
  className?: string;
}) {
  return (
    <form
      action={action}
      className={cn("mx-auto flex w-full max-w-5xl flex-col gap-5", className)}
    >
      {children}
    </form>
  );
}

export function FormSection({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-2xl border border-line/70 bg-white/95 shadow-[0_14px_40px_-30px_rgba(28,36,33,0.4)]",
        className
      )}
    >
      <header className="border-b border-line/60 bg-gradient-to-r from-cream/90 via-white to-white px-5 py-4 md:px-6">
        <h2 className="font-display text-xl text-ink md:text-2xl">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm leading-relaxed text-muted">{description}</p>
        ) : null}
      </header>
      <div className="space-y-5 px-5 py-5 md:px-6 md:py-6">{children}</div>
    </section>
  );
}

export function FormGrid({
  children,
  cols = 2,
}: {
  children: ReactNode;
  cols?: 1 | 2 | 3;
}) {
  return (
    <div
      className={cn(
        "grid gap-5",
        cols === 2 && "md:grid-cols-2",
        cols === 3 && "md:grid-cols-3"
      )}
    >
      {children}
    </div>
  );
}

export function Field({
  name,
  label,
  hint,
  required,
  type = "text",
  defaultValue,
  placeholder,
  className,
}: {
  name: string;
  label: string;
  hint?: string;
  required?: boolean;
  type?: string;
  defaultValue?: string | number;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="admin-label" htmlFor={name}>
        {label}
        {required ? <span className="ml-1 text-gold-dark">*</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full"
      />
      {hint ? <p className="admin-hint">{hint}</p> : null}
    </div>
  );
}

export function TextArea({
  name,
  label,
  hint,
  required,
  rows = 4,
  defaultValue,
  placeholder,
}: {
  name: string;
  label: string;
  hint?: string;
  required?: boolean;
  rows?: number;
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="admin-label" htmlFor={name}>
        {label}
        {required ? <span className="ml-1 text-gold-dark">*</span> : null}
      </label>
      {hint ? <p className="admin-hint mb-2 mt-0">{hint}</p> : null}
      <textarea
        id={name}
        name={name}
        required={required}
        rows={rows}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full resize-y"
      />
    </div>
  );
}

export function SelectField({
  name,
  label,
  hint,
  required,
  defaultValue,
  children,
}: {
  name: string;
  label: string;
  hint?: string;
  required?: boolean;
  defaultValue?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="admin-label" htmlFor={name}>
        {label}
        {required ? <span className="ml-1 text-gold-dark">*</span> : null}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="w-full"
      >
        {children}
      </select>
      {hint ? <p className="admin-hint">{hint}</p> : null}
    </div>
  );
}

export function ToggleField({
  name,
  label,
  description,
  defaultChecked,
}: {
  name: string;
  label: string;
  description?: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="admin-toggle">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="peer sr-only"
      />
      <span className="admin-toggle-track" aria-hidden>
        <span className="admin-toggle-thumb" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-medium text-ink">{label}</span>
        {description ? (
          <span className="mt-0.5 block text-xs leading-relaxed text-muted">
            {description}
          </span>
        ) : null}
      </span>
    </label>
  );
}

export function FormActions({
  submitLabel,
  cancelHref,
}: {
  submitLabel: string;
  cancelHref?: string;
}) {
  return (
    <div className="sticky bottom-4 z-10">
      <div className="flex flex-col gap-3 rounded-2xl border border-line/70 bg-ink/95 p-4 shadow-[0_20px_50px_-20px_rgba(28,36,33,0.65)] backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-cream/55 sm:pl-1">
          Review details, then save to update the live site.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {cancelHref ? (
            <a
              href={cancelHref}
              className="inline-flex items-center justify-center rounded-xl border border-white/25 px-4 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-cream transition hover:border-white hover:bg-white hover:text-ink"
            >
              Cancel
            </a>
          ) : null}
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-xl bg-gold px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink transition hover:bg-cream"
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
