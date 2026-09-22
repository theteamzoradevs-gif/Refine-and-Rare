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
    title: "Timeless",
    body: "Design that endures beyond trends — balanced, calm, and built to feel beautiful for years.",
    accent: "gold",
  },
  {
    title: "Elegant",
    body: "Refined proportions, considered materials, and quiet luxury in every finish and detail.",
    accent: "teal",
  },
  {
    title: "Functional",
    body: "Every inch planned with purpose — storage, flow, and lighting that support how you live.",
    accent: "ink",
  },
  {
    title: "Personal",
    body: "Spaces shaped around your taste, rituals, and lifestyle — never a one-size template.",
    accent: "gold",
  },
] as const;

export const DIFFERENCE_POINTS = [
  {
    title: "Bespoke Design",
    body: "Every interior is created specifically for the client and the space.",
    accent: "gold",
  },
  {
    title: "Premium Materials",
    body: "Thoughtfully selected finishes, textures and materials.",
    accent: "teal",
  },
  {
    title: "Functional Luxury",
    body: "Beautiful spaces designed for real everyday living.",
    accent: "ink",
  },
  {
    title: "Attention to Detail",
    body: "Precision in every finish, proportion and element.",
    accent: "gold",
  },
  {
    title: "End-to-End Execution",
    body: "One coordinated journey from concept to completion.",
    accent: "teal",
  },
] as const;

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discover",
    body: "Understand your lifestyle and requirements.",
  },
  {
    step: "02",
    title: "Concept",
    body: "Develop the design direction and visual language.",
  },
  {
    step: "03",
    title: "Visualise",
    body: "Experience the proposed space through detailed 3D design.",
  },
  {
    step: "04",
    title: "Refine",
    body: "Finalise materials, colours, furniture and details.",
  },
  {
    step: "05",
    title: "Execute",
    body: "Bring the design to life with coordinated site execution.",
  },
  {
    step: "06",
    title: "Reveal",
    body: "Step into a home created around you.",
  },
] as const;

export const MATERIAL_FINISHES = [
  {
    title: "Premium Wood",
    imageUrl: "/brand/gallery/project-1.jpg",
  },
  {
    title: "Veneer",
    imageUrl: "/brand/services/modular-kitchen.jpg",
  },
  {
    title: "Acrylic",
    imageUrl: "/brand/services/renovation.jpg",
  },
  {
    title: "Marble",
    imageUrl: "/brand/gallery/project-4.jpg",
  },
  {
    title: "Fluted Panels",
    imageUrl: "/brand/gallery/project-3.jpg",
  },
  {
    title: "Glass",
    imageUrl: "/brand/gallery/project-2.jpg",
  },
  {
    title: "Metal",
    imageUrl: "/brand/services/painting-electrical.jpg",
  },
  {
    title: "Fabric",
    imageUrl: "/brand/hero/cover.jpg",
  },
  {
    title: "Lighting Details",
    imageUrl: "/brand/services/pop-ceiling.jpg",
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
