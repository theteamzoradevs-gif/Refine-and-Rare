import { DIFFERENCE_POINTS, PROCESS_STEPS } from "@/lib/constants";

export type KnowledgeContext = {
  businessName: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  hoursText: string;
  instagram: string;
  services: { title: string; shortDesc: string; longDesc: string; slug: string }[];
  projects: { title: string; description: string; category: string }[];
};

type Answer = {
  text: string;
  suggestLead?: boolean;
};

function includesAny(q: string, words: string[]) {
  return words.some((w) => q.includes(w));
}

export function answerSiteQuestion(raw: string, ctx: KnowledgeContext): Answer {
  const q = raw.toLowerCase().trim();

  if (!q) {
    return {
      text: "Ask me anything about our services, projects, process, hours, or how to enquire.",
    };
  }

  if (includesAny(q, ["hello", "hi ", "hey", "good morning", "good evening", "namaste"])) {
    return {
      text: `Hello! I'm the ${ctx.businessName} assistant. I can explain our services, projects, process, pricing approach, and hours — or help you leave an enquiry.`,
    };
  }

  if (includesAny(q, ["thank", "thanks", "ok ", "okay", "great"])) {
    return { text: "You're welcome. Ask anything else, or say “enquire” when you're ready for a free consultation." };
  }

  if (includesAny(q, ["enquire", "inquiry", "enquiry", "quote", "consultation", "book", "contact me", "call me", "lead"])) {
    return {
      text: "I can take your enquiry right here. I'll ask for your name, phone, and a short note about your project.",
      suggestLead: true,
    };
  }

  if (includesAny(q, ["hour", "timing", "open", "closed", "sunday", "monday", "when"])) {
    return {
      text: `Our business hours in ${ctx.city}:\n${ctx.hoursText}\n\nYou can also leave an enquiry anytime and we'll follow up.`,
    };
  }

  if (includesAny(q, ["phone", "call", "whatsapp", "number", "email", "contact", "address", "location", "where", "bengaluru", "bangalore"])) {
    return {
      text: `You can reach ${ctx.businessName} at:\n• Phone / WhatsApp: ${ctx.phone}\n• Email: ${ctx.email}\n• Location: ${ctx.address}\n• Instagram: ${ctx.instagram}\n\nPrefer me to capture your enquiry here? Just say “enquire”.`,
    };
  }

  if (includesAny(q, ["price", "cost", "budget", "rate", "charge", "fee", "expensive"])) {
    return {
      text: "Pricing depends on scope, materials, and home size. We start with a free consultation, then share a clear estimate. Say “enquire” and I'll pass your details to the team.",
      suggestLead: true,
    };
  }

  if (includesAny(q, ["process", "how do you work", "steps", "timeline", "how long", "duration"])) {
    const steps = PROCESS_STEPS.map((s) => `${s.step} ${s.title}: ${s.body}`).join("\n");
    return {
      text: `Our process is simple:\n${steps}\n\nTimelines vary by project size — after consultation we share a schedule.`,
    };
  }

  if (includesAny(q, ["why", "different", "special", "quality", "craft"])) {
    const points = DIFFERENCE_POINTS.map((p) => `• ${p.title}: ${p.body}`).join("\n");
    return {
      text: `The Refine & Rare difference:\n${points}`,
    };
  }

  if (includesAny(q, ["about", "who are you", "company", "studio", "brand"])) {
    return {
      text: `${ctx.businessName} — ${ctx.tagline}.\n\n${ctx.description}`,
    };
  }

  if (includesAny(q, ["gallery", "project", "portfolio", "work", "photos", "video"])) {
    const list =
      ctx.projects.length > 0
        ? ctx.projects
            .slice(0, 5)
            .map((p) => `• ${p.title} (${p.category}) — ${p.description}`)
            .join("\n")
        : "Browse our project gallery on the Projects page.";
    return {
      text: `You can explore our work on the Projects page. Featured examples:\n${list}\n\nWant a similar space? Say “enquire”.`,
    };
  }

  if (includesAny(q, ["kitchen", "modular"])) {
    const s = ctx.services.find((x) => x.slug.includes("modular") || x.title.toLowerCase().includes("kitchen"));
    return {
      text: s
        ? `${s.title}: ${s.longDesc}\n\nMore at /services/${s.slug}. Say “enquire” for a kitchen quote.`
        : "We design premium modular kitchens tailored to your lifestyle. Say “enquire” for a quote.",
      suggestLead: true,
    };
  }

  if (includesAny(q, ["renovat", "remodel", "old house", "makeover"])) {
    const s = ctx.services.find(
      (x) =>
        x.slug.includes("renovation") ||
        x.slug.includes("full-home") ||
        x.slug.includes("turnkey")
    );
    return {
      text: s
        ? `${s.title}: ${s.longDesc}\n\nSay “enquire” and we'll plan your renovation consultation.`
        : "We handle complete home and commercial renovation with turnkey execution.",
      suggestLead: true,
    };
  }

  if (includesAny(q, ["paint", "electrical", "plumbing", "pop", "ceiling", "false ceiling", "turnkey", "interior"])) {
    const matched = ctx.services.find((s) =>
      q.split(/\s+/).some((w) => s.title.toLowerCase().includes(w) || s.slug.includes(w))
    );
    if (matched) {
      return {
        text: `${matched.title}: ${matched.longDesc}\n\nDetails: /services/${matched.slug}. Type “enquire” to get a quote.`,
        suggestLead: true,
      };
    }
  }

  if (includesAny(q, ["service", "offer", "do you", "what can"])) {
    const list = ctx.services.map((s) => `• ${s.title}: ${s.shortDesc}`).join("\n");
    return {
      text: `Here are our services:\n${list}\n\nAsk about any one, or say “enquire” for a free consultation.`,
    };
  }

  if (includesAny(q, ["testimonial", "review", "client", "feedback"])) {
    return {
      text: "Clients love our finishing and on-time delivery. Ankur Sharma shared: “Refine & Rare completely transformed our home with a modern and elegant interior design…” See more on the Testimonials page.",
    };
  }

  // Fuzzy service match by title words
  for (const s of ctx.services) {
    const key = s.title.toLowerCase();
    if (q.includes(key) || key.split(/\s+/).filter((w) => w.length > 4).some((w) => q.includes(w))) {
      return {
        text: `${s.title}: ${s.longDesc}\n\nView: /services/${s.slug}. Say “enquire” if you'd like a quote.`,
        suggestLead: true,
      };
    }
  }

  for (const p of ctx.projects) {
    if (q.includes(p.title.toLowerCase())) {
      return {
        text: `${p.title} (${p.category}): ${p.description}\n\nSee more in Projects. Say “enquire” for a similar look.`,
        suggestLead: true,
      };
    }
  }

  return {
    text: `I can help with services, projects, process, hours, contact details, and enquiries for ${ctx.businessName}.\n\nTry asking: “What services do you offer?”, “Do you do modular kitchens?”, “What are your hours?”, or say “enquire”.`,
  };
}
