import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { getProjects, getServices } from "@/lib/data";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [services, projects] = await Promise.all([
    getServices(),
    getProjects(),
  ]);

  const searchItems = [
    ...services.map((s) => ({
      type: "service" as const,
      title: s.title,
      description: s.shortDesc,
      href: `/services/${s.slug}`,
    })),
    ...projects.map((p) => ({
      type: "project" as const,
      title: p.title,
      description: p.description,
      href: `/gallery?category=${p.category.slug}`,
    })),
  ];

  return (
    <>
      <LocalBusinessJsonLd />
      <ScrollProgress />
      <Header searchItems={searchItems} />
      <main>{children}</main>
      <Footer />
      <FloatingContact />
    </>
  );
}
