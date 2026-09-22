import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LocalBusinessJsonLd />
      <ScrollProgress />
      <Header />
      <main>{children}</main>
      <Footer />
      <BackToTop />
      <FloatingContact />
    </>
  );
}
