export const SITE_NAME = "Refine & Rare";
export const SITE_TAGLINE = "Exquisite Designs for Exceptional Living";
export const DEFAULT_DESCRIPTION =
  "Refine & Rare — Transforming interiors with smart design, premium modular kitchens, and complete renovation solutions in Bengaluru.";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Projects" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
] as const;

export const VALUE_PILLARS = [
  {
    title: "Craftsmanship",
    body: "Premium materials and careful detailing at every stage — from joinery to final finish.",
  },
  {
    title: "Turnkey Execution",
    body: "Design, civil, electrical, plumbing, ceilings, and finishing coordinated under one team.",
  },
  {
    title: "On-Time Delivery",
    body: "Clear schedules and accountable project coordination so your home moves forward with confidence.",
  },
  {
    title: "Personalized Design",
    body: "Spaces shaped around how you live — stylish, functional, and uniquely yours.",
  },
] as const;

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Consultation",
    body: "We listen to your lifestyle, space, and goals — then define a clear design direction.",
  },
  {
    step: "02",
    title: "Design",
    body: "Layouts, materials, and finishes are refined until the vision feels effortless and intentional.",
  },
  {
    step: "03",
    title: "Execution",
    body: "Skilled teams deliver with precision across interiors, kitchens, renovations, and finishing.",
  },
  {
    step: "04",
    title: "Handover",
    body: "A polished space ready to live in — with quality checks and a seamless project close.",
  },
] as const;

export function whatsappUrl(phone: string, message?: string) {
  const digits = phone.replace(/\D/g, "");
  const text = encodeURIComponent(
    message ||
      "Hello Refine & Rare, I'd like to enquire about your interior design services."
  );
  return `https://wa.me/${digits}?text=${text}`;
}

export function telUrl(phone: string) {
  return `tel:${phone.replace(/\s/g, "")}`;
}

export type BusinessHours = Record<string, string>;

export function parseHours(hoursJson: string): BusinessHours {
  try {
    return JSON.parse(hoursJson) as BusinessHours;
  } catch {
    return {};
  }
}
