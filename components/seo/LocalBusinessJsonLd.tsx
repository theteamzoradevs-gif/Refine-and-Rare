import { getSettings } from "@/lib/data";
import { parseHours } from "@/lib/constants";

export async function LocalBusinessJsonLd() {
  const settings = await getSettings();
  const hours = parseHours(settings.hoursJson);

  const openingHours = Object.entries(hours)
    .filter(([, v]) => v.toLowerCase() !== "closed")
    .map(([day, value]) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: day.charAt(0).toUpperCase() + day.slice(1),
      description: value,
    }));

  const data = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: settings.businessName,
    description: settings.description,
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    telephone: settings.phone,
    email: settings.email,
    image: "/brand/logo.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: settings.city,
      addressRegion: "Karnataka",
      addressCountry: "IN",
      streetAddress: settings.address,
    },
    areaServed: {
      "@type": "City",
      name: "Bengaluru",
    },
    sameAs: [settings.instagram],
    openingHoursSpecification: openingHours,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
