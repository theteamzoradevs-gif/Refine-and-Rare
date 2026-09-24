import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { LeadPopup } from "@/components/layout/LeadPopup";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";
import { getServices, getSettings } from "@/lib/data";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [services, settings] = await Promise.all([
    getServices(),
    getSettings(),
  ]);

  return (
    <>
      <LocalBusinessJsonLd />
      <ScrollProgress />
      <Header
        services={services.map((s) => ({ slug: s.slug, title: s.title }))}
        phone={settings.phone}
        instagram={settings.instagram}
      />
      <main>{children}</main>
      <Footer />
      <BackToTop />
      <FloatingContact />
      <LeadPopup phone={settings.phone} />
    </>
  );
}
