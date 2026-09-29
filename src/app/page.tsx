import { HeroSection } from "@/components/marketing/hero-section";
import { PartnerStrip } from "@/components/marketing/partner-strip";
import { DiscoverCoursesSection } from "@/components/marketing/discover-courses-section";
import { LearningPathsSection } from "@/components/marketing/learning-paths-section";
import { GrowthSection } from "@/components/marketing/growth-section";
import { CreatorCtaSection } from "@/components/marketing/creator-cta-section";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";
import { SiteFooter } from "@/components/marketing/site-footer";

export default async function HomePage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  return (
    <>
      <main>
        <HeroSection />
        <PartnerStrip />
        <DiscoverCoursesSection category={category} />
        <LearningPathsSection />
        <GrowthSection />
        <CreatorCtaSection />
        <TestimonialsSection />
      </main>
      <SiteFooter />
    </>
  );
}