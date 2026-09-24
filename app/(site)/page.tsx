import { Hero } from "@/components/home/Hero";
import { AboutStudio } from "@/components/home/AboutStudio";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { ValuePillars } from "@/components/home/ValuePillars";
import { WhyRefineRare } from "@/components/home/WhyRefineRare";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { MaterialsFinishes } from "@/components/home/MaterialsFinishes";
import { BengaluruHomes } from "@/components/home/BengaluruHomes";
import { TestimonialHighlight } from "@/components/home/TestimonialHighlight";
import { FaqSection } from "@/components/home/FaqSection";
import { CtaBanner } from "@/components/home/CtaBanner";
import { EnergyMarquee } from "@/components/home/EnergyMarquee";
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
    getFeaturedProjects(5),
    getPublishedTestimonials(),
  ]);

  return (
    <>
      <Hero tagline={settings.tagline} description={settings.description} />
      <EnergyMarquee />
      <AboutStudio description={settings.description} />
      <ServicesOverview services={services} />
      <FeaturedProjects projects={projects} />
      <ValuePillars />
      <WhyRefineRare />
      <ProcessTimeline />
      <MaterialsFinishes />
      <BengaluruHomes />
      <TestimonialHighlight testimonials={testimonials} />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
