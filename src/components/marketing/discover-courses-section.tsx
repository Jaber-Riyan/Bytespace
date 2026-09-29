import { Suspense } from "react";
import { CourseFilters } from "@/components/course/course-filters";
import { CourseGrid } from "@/components/course/course-grid";
import { CourseGridSkeleton } from "@/components/course/course-card-skeleton";
import { Container } from "@/components/layout/container";
import { CenteredSectionIntro } from "@/components/marketing/centered-section-intro";

export function DiscoverCoursesSection({ category }: { category?: string }) {
  return (
    <section id="discover" aria-labelledby="discover-title" className="scroll-mt-6 bg-white py-[72px]">
      <Container>
        <CenteredSectionIntro
          id="discover-title"
          title="Discover Your Passion, Build Your Skills"
          description="At Bytespace Courses, we bring you closer to life-changing knowledge. Explore a variety of courses across different fields, from technology to the arts, and make a difference in your career and life."
        />
        <div className="mt-[42px]"><CourseFilters selected={category} /></div>
        <div className="mt-[77px]" aria-live="polite">
          <Suspense key={category || "Featured"} fallback={<CourseGridSkeleton />}>
            <CourseGrid category={category} />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}