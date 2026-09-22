import { PrismaClient, MediaType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const hours = {
  monday: "8:30 AM – 8:30 PM",
  tuesday: "9:00 AM – 8:00 PM",
  wednesday: "9:00 AM – 8:00 PM",
  thursday: "9:00 AM – 8:00 PM",
  friday: "9:00 AM – 8:00 PM",
  saturday: "9:00 AM – 8:00 PM",
  sunday: "Closed",
};

const services = [
  {
    slug: "interior-design",
    title: "Interior Design",
    shortDesc:
      "Customized interior solutions that blend style, comfort, and functionality.",
    longDesc:
      "Customized interior solutions that blend style, comfort, and functionality. We create elegant living and workspace designs with smart space planning, modern aesthetics, and attention to every detail — from material selection and lighting layouts to furniture placement and finishing touches, tailored for Bengaluru homes and commercial spaces.",
    imageUrl: "/brand/services/interior-design.jpg",
    sortOrder: 1,
  },
  {
    slug: "modular-kitchen",
    title: "Modular Kitchen",
    shortDesc:
      "Premium modular kitchens designed for convenience, durability, and modern living.",
    longDesc:
      "Premium modular kitchens designed for convenience, durability, and modern living. From space-saving layouts to stylish finishes, we deliver functional kitchens tailored to your lifestyle — including soft-close hardware, thoughtful storage, durable countertops, and finishes that stand up to everyday cooking.",
    imageUrl: "/brand/services/modular-kitchen.jpg",
    sortOrder: 2,
  },
  {
    slug: "renovation-remodeling",
    title: "Renovation & Remodeling",
    shortDesc:
      "Complete home and commercial renovation that transforms old spaces into fresh interiors.",
    longDesc:
      "Complete home and commercial renovation services that transform old spaces into fresh, modern interiors. We handle redesigning, structural upgrades, and customized remodeling with turnkey execution — coordinating civil work, finishes, and sequencing so your renovation stays clear, controlled, and beautifully delivered.",
    imageUrl: "/brand/services/renovation.jpg",
    sortOrder: 3,
  },
  {
    slug: "painting-electrical-plumbing",
    title: "Painting, Electrical & Plumbing",
    shortDesc:
      "Reliable painting, electrical, and plumbing to enhance aesthetics and functionality.",
    longDesc:
      "Reliable painting, electrical, and plumbing services to enhance both aesthetics and functionality. We ensure smooth finishes, safe electrical setups, and efficient plumbing solutions with quality workmanship — so your space looks refined and performs reliably every day.",
    imageUrl: "/brand/services/painting-electrical.jpg",
    sortOrder: 4,
  },
  
];

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@refineandrare.com";
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });

  await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      businessName: "Refine & Rare",
      tagline: "Exquisite Designs for Exceptional Living",
      description:
        "Refine & Rare — Transforming interiors with smart design, premium modular kitchens, and complete renovation solutions. We specialize in remodeling, painting, electrical work, plumbing, POP ceilings, and turnkey interior execution — delivering stylish, functional, and customized spaces with quality craftsmanship and attention to every detail.",
      email: "rajasharma9226@gmail.com",
      phone: "+91 9738964736",
      whatsapp: "919738964736",
      instagram: "https://www.instagram.com/refineandrare",
      city: "Bengaluru",
      address: "Bengaluru, Karnataka, India",
      hoursJson: JSON.stringify(hours),
      whatsappMessage:
        "Hello Refine & Rare, I'd like to enquire about your interior design services.",
    },
  });

  const serviceRecords = [];
  for (const service of services) {
    const record = await prisma.service.upsert({
      where: { slug: service.slug },
      update: {
        title: service.title,
        shortDesc: service.shortDesc,
        longDesc: service.longDesc,
        imageUrl: service.imageUrl,
        sortOrder: service.sortOrder,
      },
      create: service,
    });
    serviceRecords.push(record);
  }

  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({
    data: [
      {
        name: "Ankur Sharma",
        quote:
          "Refine & Rare completely transformed our home with a modern and elegant interior design. The team was professional, creative, and delivered everything on time with excellent finishing.",
        published: true,
        sortOrder: 1,
      },
      {
        name: "Priya Menon",
        quote:
          "Our modular kitchen feels effortless every day — smart storage, beautiful finishes, and a layout that finally works for how we cook.",
        published: true,
        sortOrder: 2,
      },
      {
        name: "Rohit & Neha Kapoor",
        quote:
          "From the first consultation to handover, everything was clear and coordinated. The living room and wardrobes exceeded what we imagined.",
        published: true,
        sortOrder: 3,
      },
      {
        name: "Sana Fernandes",
        quote:
          "Quiet luxury done right. The bedroom suite is calm, detailed, and perfectly tailored to our lifestyle in Bengaluru.",
        published: true,
        sortOrder: 4,
      },
      {
        name: "Vikram Iyer",
        quote:
          "Turnkey execution without the usual stress. Materials, lighting, and finishing were handled with real attention to detail.",
        published: true,
        sortOrder: 5,
      },
      {
        name: "Meera Desai",
        quote:
          "They listened carefully and designed around how we live — timeless, elegant, and wonderfully functional.",
        published: true,
        sortOrder: 6,
      },
      {
        name: "Arjun Nair",
        quote:
          "The TV unit and feature wall became the centrepiece of our apartment. Clean lines, premium materials, and flawless installation.",
        published: true,
        sortOrder: 7,
      },
      {
        name: "Kavya Reddy",
        quote:
          "We loved the 3D visualisation stage — it helped us refine every choice before execution. The final reveal felt exactly like the design.",
        published: true,
        sortOrder: 8,
      },
    ],
  });

  await prisma.projectMedia.deleteMany();
  await prisma.project.deleteMany();

  const bySlug = Object.fromEntries(serviceRecords.map((s) => [s.slug, s]));

  const projects = [
    {
      title: "Contemporary Living Room",
      description:
        "Warm wood cabinetry, layered lighting, and a calm neutral palette for everyday luxury living.",
      featured: true,
      sortOrder: 2,
      categoryId: bySlug["interior-design"].id,
      media: [
        {
          url: "/brand/gallery/project-1.jpg",
          type: MediaType.IMAGE,
          alt: "Contemporary living room with wood TV unit and warm lighting",
          sortOrder: 0,
        },
      ],
    },
    {
      title: "Refined Modular Kitchen",
      description:
        "A premium modular kitchen focused on workflow, storage, and soft modern finishes.",
      featured: true,
      sortOrder: 1,
      categoryId: bySlug["modular-kitchen"].id,
      media: [
        {
          url: "/brand/video/room2.mp4",
          type: MediaType.VIDEO,
          alt: "Modular kitchen walkthrough video",
          sortOrder: 0,
        },
        {
          url: "/brand/gallery/project-2.jpg",
          type: MediaType.IMAGE,
          alt: "Modern modular kitchen interior",
          sortOrder: 1,
        },
      ],
    },
    {
      title: "Quiet Luxury Bedroom",
      description:
        "Soft textures, recessed lighting, and tailored joinery for a restful private suite.",
      featured: true,
      sortOrder: 3,
      categoryId: bySlug["interior-design"].id,
      media: [
        {
          url: "/brand/gallery/project-3.jpg",
          type: MediaType.IMAGE,
          alt: "Quiet luxury bedroom interior",
          sortOrder: 0,
        },
      ],
    },
    {
      title: "Full Home Remodel",
      description:
        "Turnkey remodeling with cohesive finishes across living spaces.",
      featured: true,
      sortOrder: 4,
      categoryId: bySlug["renovation-remodeling"].id,
      media: [
        {
          url: "/brand/gallery/project-4.jpg",
          type: MediaType.IMAGE,
          alt: "Renovated home interior living space",
          sortOrder: 0,
        },
        {
          url: "/brand/gallery/project-video.mp4",
          type: MediaType.VIDEO,
          alt: "Project walkthrough video",
          sortOrder: 1,
        },
      ],
    },
    {
      title: "Ceiling & Lighting Detail",
      description:
        "Creative POP ceiling design with integrated lighting for depth and atmosphere.",
      featured: true,
      sortOrder: 5,
      categoryId: bySlug["pop-ceiling-turnkey"].id,
      media: [
        {
          url: "/brand/gallery/project-5.jpg",
          type: MediaType.IMAGE,
          alt: "POP ceiling and lighting detail",
          sortOrder: 0,
        },
      ],
    },
  ];

  for (const project of projects) {
    const { media, ...data } = project;
    await prisma.project.create({
      data: {
        ...data,
        media: { create: media },
      },
    });
  }

  console.log("Seed complete.");
  console.log(`Admin: ${email} / ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
