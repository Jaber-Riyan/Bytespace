import { HeroSection } from "@/components/marketing/hero-section";
import { PartnerStrip } from "@/components/marketing/partner-strip";
import { DiscoverCoursesSection } from "@/components/marketing/discover-courses-section";
import { LearningPathsSection } from "@/components/marketing/learning-paths-section";
import { GrowthSection } from "@/components/marketing/growth-section";

export default async function HomePage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  return (
    <main>
      <HeroSection />
      <PartnerStrip />
      <DiscoverCoursesSection category={category} />
      <LearningPathsSection />
      <GrowthSection />
    </main>
  );
}