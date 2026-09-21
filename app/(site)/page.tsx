import { Hero } from "@/components/home/Hero";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { ValuePillars } from "@/components/home/ValuePillars";
import { TestimonialHighlight } from "@/components/home/TestimonialHighlight";
import { CtaBanner } from "@/components/home/CtaBanner";
import { EnergyMarquee } from "@/components/home/EnergyMarquee";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import {
  getFeaturedProjects,
  getPublishedTestimonials,
  getServices,
  getSettings,
} from "@/lib/data";

export default async function HomePage() {
  const [settings, services, projects, testimonials] = await Promise.all([
    getSettings(),
    getServices(),
    getFeaturedProjects(4),
    getPublishedTestimonials(),
  ]);

  return (
    <>
      <Hero tagline={settings.tagline} description={settings.description} />
      <EnergyMarquee />
      <section className="bg-cream py-20 md:py-24">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="section-label">About the Studio</p>
            <h2 className="heading-display mt-3">
              Crafting exceptional spaces with{" "}
              <span className="text-teal">timeless elegance.</span>
            </h2>
            <div className="mt-6">
              <ButtonLink href="/about" variant="outline" className="btn-shine">
                Our Story
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="border border-line bg-white/70 p-6 shadow-[0_24px_50px_-32px_rgba(16,20,22,0.35)] transition duration-500 hover:-translate-y-1 hover:border-gold/40 md:p-8">
              <p className="prose-muted">{settings.description}</p>
            </div>
          </Reveal>
        </div>
      </section>
      <ServicesOverview services={services} />
      <FeaturedProjects projects={projects} />
      <ValuePillars />
      <TestimonialHighlight testimonials={testimonials} />
      <CtaBanner />
    </>
  );
}
