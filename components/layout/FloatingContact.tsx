import { getProjects, getServices, getSettings } from "@/lib/data";
import { ChatLauncher } from "./ChatLauncher";
import { WhatsAppFloat } from "./WhatsAppFloat";

export async function FloatingContact() {
  const [settings, services, projects] = await Promise.all([
    getSettings(),
    getServices(),
    getProjects(),
  ]);

  return (
    <>
      <ChatLauncher
        businessName={settings.businessName}
        tagline={settings.tagline}
        description={settings.description}
        email={settings.email}
        phone={settings.phone}
        city={settings.city}
        address={settings.address}
        hoursJson={settings.hoursJson}
        instagram={settings.instagram}
        services={services.map((s) => ({
          id: s.id,
          title: s.title,
          slug: s.slug,
          shortDesc: s.shortDesc,
          longDesc: s.longDesc,
        }))}
        projects={projects.map((p) => ({
          title: p.title,
          description: p.description,
          category: p.category.title,
        }))}
      />
      <WhatsAppFloat
        whatsapp={settings.whatsapp}
        message={settings.whatsappMessage}
      />
    </>
  );
}
