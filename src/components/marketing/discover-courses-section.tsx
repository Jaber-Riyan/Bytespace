import { Suspense } from "react";
import { CourseFilters } from "@/components/course/course-filters";
import { CourseGrid } from "@/components/course/course-grid";
import { CourseGridSkeleton } from "@/components/course/course-card-skeleton";
import { Container } from "@/components/layout/container";

export function DiscoverCoursesSection({ category }: { category?: string }) {
  return (
    <section id="discover" aria-labelledby="discover-title" className="scroll-mt-6 bg-white py-[72px]">
      <Container>
        <div className="mx-auto max-w-[917px] text-center">
          <h2 id="discover-title" className="mx-auto max-w-[588px] font-heading text-[clamp(32px,4vw,44px)] font-semibold leading-[1.2] text-[#040819]">
            Discover Your Passion, Build Your Skills
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-shuttle-muted sm:text-[18px]">
            At Bytespace Courses, we bring you closer to life-changing knowledge. Explore a variety of courses across different fields, from technology to the arts, and make a difference in your career and life.
          </p>
        </div>
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