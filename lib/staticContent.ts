import type {
  BlogPost,
  MediaType,
  Project,
  ProjectMedia,
  Service,
  SiteSettings,
  Testimonial,
} from "@prisma/client";

const now = new Date("2026-01-01T00:00:00.000Z");

const hours = {
  monday: "8:30 AM – 8:30 PM",
  tuesday: "9:00 AM – 8:00 PM",
  wednesday: "9:00 AM – 8:00 PM",
  thursday: "9:00 AM – 8:00 PM",
  friday: "9:00 AM – 8:00 PM",
  saturday: "9:00 AM – 8:00 PM",
  sunday: "Closed",
};

export const staticSettings: SiteSettings = {
  id: "main",
  businessName: "Refine & Rare",
  tagline: "Bespoke interiors crafted around your lifestyle, taste and vision.",
  description:
    "Refine & Rare creates sophisticated residential interiors where timeless aesthetics meet everyday functionality.",
  email: "rajasharma9226@gmail.com",
  phone: "+91 9738964736",
  whatsapp: "919738964736",
  instagram: "https://www.instagram.com/refineandrare",
  city: "Bengaluru",
  address: "Bengaluru, Karnataka, India",
  hoursJson: JSON.stringify(hours),
  whatsappMessage:
    "Hello Refine & Rare, I'd like to enquire about your interior design services.",
  updatedAt: now,
};

export const staticServices: Service[] = [
  {
    id: "static-service-full-home-interiors",
    slug: "full-home-interiors",
    title: "Full Home Interiors",
    shortDesc: "Complete residential interior design and execution.",
    longDesc:
      "Complete residential interior design and execution — from concept and space planning to materials, joinery, and finishing. We shape every room with a cohesive point of view so your home feels refined, functional, and uniquely yours.",
    imageUrl: "/brand/services/interior-design.jpg",
    sortOrder: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "static-service-luxury-living-spaces",
    slug: "luxury-living-spaces",
    title: "Luxury Living Spaces",
    shortDesc: "Elegant living rooms designed around comfort and character.",
    longDesc:
      "Elegant living rooms designed around comfort and character. Thoughtful layouts, layered textures, and statement details create inviting spaces for everyday living and entertaining.",
    imageUrl: "/brand/services/LuxuryLivingSpaces.png",
    sortOrder: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "static-service-modular-kitchens",
    slug: "modular-kitchens",
    title: "Modular Kitchens",
    shortDesc:
      "Premium finishes with intelligent storage and ergonomic planning.",
    longDesc:
      "Premium modular kitchens with intelligent storage and ergonomic planning. Soft-close hardware, durable finishes, and layouts tuned to how you cook — stylish, efficient, and built to last.",
    imageUrl: "/brand/services/modular-kitchen.jpg",
    sortOrder: 3,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "static-service-bespoke-wardrobes",
    slug: "bespoke-wardrobes",
    title: "Bespoke Wardrobes",
    shortDesc: "Custom storage solutions designed for your lifestyle.",
    longDesc:
      "Custom wardrobe and storage solutions designed for your lifestyle. From walk-in systems to space-smart units, we balance aesthetics with organization so everything has its place.",
    imageUrl: "/brand/services/Bespoke Wardrobes.png",
    sortOrder: 4,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "static-service-bedrooms",
    slug: "bedrooms",
    title: "Bedrooms",
    shortDesc: "Calm, comfortable and sophisticated private spaces.",
    longDesc:
      "Calm, comfortable, and sophisticated private spaces. Soft palettes, tailored lighting, and carefully chosen finishes create bedrooms that feel restful and refined.",
    imageUrl: "/brand/services/Bedrooms.png",
    sortOrder: 5,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "static-service-tv-units-feature-walls",
    slug: "tv-units-feature-walls",
    title: "TV Units & Feature Walls",
    shortDesc:
      "Statement elements that bring architectural character to your home.",
    longDesc:
      "Statement TV units and feature walls that bring architectural character to your home. Integrated storage, lighting, and material detail turn focal walls into lasting design moments.",
    imageUrl: "/brand/services/TV Units & Feature Walls.png",
    sortOrder: 6,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "static-service-ceiling-lighting",
    slug: "ceiling-lighting",
    title: "Ceiling & Lighting",
    shortDesc:
      "Layered lighting and ceiling design that enhance the entire space.",
    longDesc:
      "Layered lighting and ceiling design that enhance the entire space. From POP detailing to ambient, task, and accent lighting — we craft atmosphere with precision and polish.",
    imageUrl: "/brand/services/Ceiling & Lighting.png",
    sortOrder: 7,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "static-service-turnkey-execution",
    slug: "turnkey-execution",
    title: "Turnkey Execution",
    shortDesc: "Complete coordination from design to final handover.",
    longDesc:
      "Complete coordination from design to final handover. One team manages sequencing, craftsmen, finishes, and quality checks — so your project moves clearly from vision to a space ready to live in.",
    imageUrl: "/brand/services/painting-electrical.jpg",
    sortOrder: 8,
    createdAt: now,
    updatedAt: now,
  },
];

const bySlug = Object.fromEntries(staticServices.map((s) => [s.slug, s]));

type StaticProject = Project & {
  media: ProjectMedia[];
  category: Service;
};

function media(
  projectId: string,
  items: { url: string; type: MediaType; alt: string; sortOrder: number }[]
): ProjectMedia[] {
  return items.map((item, index) => ({
    id: `${projectId}-media-${index}`,
    projectId,
    url: item.url,
    type: item.type,
    alt: item.alt,
    sortOrder: item.sortOrder,
  }));
}

export const staticProjects: StaticProject[] = [
  {
    id: "static-project-1",
    slug: "contemporary-living-room",
    title: "Contemporary Living Room",
    description:
      "Warm wood cabinetry, layered lighting, and a calm neutral palette for everyday luxury living.",
    featured: true,
    sortOrder: 2,
    categoryId: bySlug["luxury-living-spaces"].id,
    category: bySlug["luxury-living-spaces"],
    createdAt: now,
    updatedAt: now,
    media: media("static-project-1", [
      {
        url: "/brand/services/LuxuryLivingSpaces.png",
        type: "IMAGE",
        alt: "Contemporary living room with wood TV unit and warm lighting",
        sortOrder: 0,
      },
    ]),
  },
  {
    id: "static-project-2",
    slug: "refined-modular-kitchen",
    title: "Refined Modular Kitchen",
    description:
      "A premium modular kitchen focused on workflow, storage, and soft modern finishes.",
    featured: true,
    sortOrder: 1,
    categoryId: bySlug["modular-kitchens"].id,
    category: bySlug["modular-kitchens"],
    createdAt: now,
    updatedAt: now,
    media: media("static-project-2", [
      {
        url: "/brand/video/room2.mp4",
        type: "VIDEO",
        alt: "Modular kitchen walkthrough video",
        sortOrder: 0,
      },
      {
        url: "/brand/services/modular-kitchen.jpg",
        type: "IMAGE",
        alt: "Modern modular kitchen interior",
        sortOrder: 1,
      },
    ]),
  },
  {
    id: "static-project-3",
    slug: "quiet-luxury-bedroom",
    title: "Quiet Luxury Bedroom",
    description:
      "Soft textures, recessed lighting, and tailored joinery for a restful private suite.",
    featured: true,
    sortOrder: 3,
    categoryId: bySlug["bedrooms"].id,
    category: bySlug["bedrooms"],
    createdAt: now,
    updatedAt: now,
    media: media("static-project-3", [
      {
        url: "/brand/services/Bedrooms.png",
        type: "IMAGE",
        alt: "Quiet luxury bedroom interior",
        sortOrder: 0,
      },
    ]),
  },
  {
    id: "static-project-4",
    slug: "full-home-remodel",
    title: "Full Home Remodel",
    description:
      "Turnkey remodeling with cohesive finishes across living spaces.",
    featured: true,
    sortOrder: 4,
    categoryId: bySlug["full-home-interiors"].id,
    category: bySlug["full-home-interiors"],
    createdAt: now,
    updatedAt: now,
    media: media("static-project-4", [
      {
        url: "/brand/services/interior-design.jpg",
        type: "IMAGE",
        alt: "Renovated home interior living space",
        sortOrder: 0,
      },
      {
        url: "/brand/gallery/project-video.mp4",
        type: "VIDEO",
        alt: "Project walkthrough video",
        sortOrder: 1,
      },
    ]),
  },
  {
    id: "static-project-5",
    slug: "ceiling-lighting-detail",
    title: "Ceiling & Lighting Detail",
    description:
      "Creative POP ceiling design with integrated lighting for depth and atmosphere.",
    featured: true,
    sortOrder: 5,
    categoryId: bySlug["ceiling-lighting"].id,
    category: bySlug["ceiling-lighting"],
    createdAt: now,
    updatedAt: now,
    media: media("static-project-5", [
      {
        url: "/brand/services/Ceiling & Lighting.png",
        type: "IMAGE",
        alt: "POP ceiling and lighting detail",
        sortOrder: 0,
      },
    ]),
  },
  {
    id: "static-project-6",
    slug: "bespoke-wardrobe-suite",
    title: "Bespoke Wardrobe Suite",
    description:
      "Custom storage with clean lines, soft lighting, and finishes tailored to the room.",
    featured: false,
    sortOrder: 6,
    categoryId: bySlug["bespoke-wardrobes"].id,
    category: bySlug["bespoke-wardrobes"],
    createdAt: now,
    updatedAt: now,
    media: media("static-project-6", [
      {
        url: "/brand/services/Bespoke Wardrobes.png",
        type: "IMAGE",
        alt: "Bespoke wardrobe interior",
        sortOrder: 0,
      },
    ]),
  },
];

export const staticTestimonials: Testimonial[] = [
  {
    id: "static-testimonial-1",
    name: "Ankur Sharma",
    quote:
      "Refine & Rare completely transformed our home with a modern and elegant interior design. The team was professional, creative, and delivered everything on time with excellent finishing.",
    photoUrl: null,
    published: true,
    sortOrder: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "static-testimonial-2",
    name: "Priya Menon",
    quote:
      "Our modular kitchen feels effortless every day — smart storage, beautiful finishes, and a layout that finally works for how we cook.",
    photoUrl: null,
    published: true,
    sortOrder: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "static-testimonial-3",
    name: "Rohit & Neha Kapoor",
    quote:
      "From the first consultation to handover, everything was clear and coordinated. The living room and wardrobes exceeded what we imagined.",
    photoUrl: null,
    published: true,
    sortOrder: 3,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "static-testimonial-4",
    name: "Sana Fernandes",
    quote:
      "Quiet luxury done right. The bedroom suite is calm, detailed, and perfectly tailored to our lifestyle in Bengaluru.",
    photoUrl: null,
    published: true,
    sortOrder: 4,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "static-testimonial-5",
    name: "Vikram Iyer",
    quote:
      "Turnkey execution without the usual stress. Materials, lighting, and finishing were handled with real attention to detail.",
    photoUrl: null,
    published: true,
    sortOrder: 5,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "static-testimonial-6",
    name: "Meera Desai",
    quote:
      "They listened carefully and designed around how we live — timeless, elegant, and wonderfully functional.",
    photoUrl: null,
    published: true,
    sortOrder: 6,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "static-testimonial-7",
    name: "Arjun Nair",
    quote:
      "The TV unit and feature wall became the centrepiece of our apartment. Clean lines, premium materials, and flawless installation.",
    photoUrl: null,
    published: true,
    sortOrder: 7,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "static-testimonial-8",
    name: "Kavya Reddy",
    quote:
      "We loved the 3D visualisation stage — it helped us refine every choice before execution. The final reveal felt exactly like the design.",
    photoUrl: null,
    published: true,
    sortOrder: 8,
    createdAt: now,
    updatedAt: now,
  },
];

export const staticBlogPosts: BlogPost[] = [
  {
    id: "static-blog-1",
    slug: "timeless-living-room-ideas",
    title: "Timeless Living Room Ideas for Bengaluru Homes",
    excerpt:
      "How layered lighting, calm materials, and smart storage create living rooms that feel refined for years.",
    body: JSON.stringify([
      "A timeless living room is less about following trends and more about creating balance — proportion, light, and materials that age gracefully.",
      "In Bengaluru apartments and villas alike, we favour warm neutrals, thoughtful joinery, and lighting that shifts from day to evening without feeling staged.",
      "Start with how you gather: seating depth, TV sightlines, and storage for everyday clutter. Then refine finishes so the room feels personal, not showroom-perfect.",
    ]),
    imageUrl: "/brand/services/LuxuryLivingSpaces.png",
    category: "Living Spaces",
    published: true,
    publishedAt: new Date("2026-02-12T00:00:00.000Z"),
    sortOrder: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "static-blog-2",
    slug: "modular-kitchen-planning-guide",
    title: "A Practical Guide to Planning Your Modular Kitchen",
    excerpt:
      "Workflow, storage zones, and finishes that make a kitchen both beautiful and effortless to use every day.",
    body: JSON.stringify([
      "Great kitchens begin with how you cook — not just how a catalogue looks. We map prep, cook, and clean zones before choosing finishes.",
      "Soft-close hardware, durable surfaces, and tall storage keep the room calm. Lighting under cabinets and over the island does as much as the countertops.",
      "Whether you prefer a quiet matte look or a richer wood tone, the goal is the same: a kitchen that supports real life and still feels premium.",
    ]),
    imageUrl: "/brand/services/modular-kitchen.jpg",
    category: "Kitchens",
    published: true,
    publishedAt: new Date("2026-01-28T00:00:00.000Z"),
    sortOrder: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "static-blog-3",
    slug: "renovation-without-chaos",
    title: "Renovation Without Chaos: What to Expect",
    excerpt:
      "A clear look at sequencing, site coordination, and the decisions that keep a remodel on track.",
    body: JSON.stringify([
      "Renovation feels overwhelming when decisions arrive out of order. We reverse that — design first, then materials, then a sequenced site plan.",
      "Quality checks at each stage protect finishes and timelines. You always know what is happening next.",
      "The result is a home that feels newly considered, without the stress of a fragmented build.",
    ]),
    imageUrl: "/brand/services/renovation.jpg",
    category: "Renovation",
    published: true,
    publishedAt: new Date("2025-12-10T00:00:00.000Z"),
    sortOrder: 3,
    createdAt: now,
    updatedAt: now,
  },
];

export function parseBlogBody(body: string): string[] {
  try {
    const parsed = JSON.parse(body) as unknown;
    if (Array.isArray(parsed)) {
      return parsed.map(String).filter(Boolean);
    }
  } catch {
    /* plain text fallback */
  }
  return body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function serializeBlogBody(raw: string): string {
  const paragraphs = raw
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  return JSON.stringify(paragraphs.length ? paragraphs : [raw.trim()].filter(Boolean));
}

export function getStaticServiceById(id: string) {
  return staticServices.find((s) => s.id === id) ?? null;
}

export function getStaticServiceBySlug(slug: string) {
  return staticServices.find((s) => s.slug === slug) ?? null;
}

export function getStaticBlogBySlug(slug: string) {
  return staticBlogPosts.find((p) => p.slug === slug) ?? null;
}
