import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";
import { getServices } from "@/lib/data";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const services = await getServices();

  return (
    <>
      <LocalBusinessJsonLd />
      <ScrollProgress />
      <Header
        services={services.map((s) => ({ slug: s.slug, title: s.title }))}
      />
      <main>{children}</main>
      <Footer />
      <BackToTop />
      <FloatingContact />
    </>
  );
}
