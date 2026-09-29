import { Suspense } from "react";
import { CourseFilters } from "@/components/course/course-filters";
import { CourseGrid } from "@/components/course/course-grid";
import { CourseGridSkeleton } from "@/components/course/course-card-skeleton";
import { Container } from "@/components/layout/container";

export default async function CoursesPage({ searchParams }: { searchParams: Promise<{ q?: string; category?: string }> }) {
  const { q, category } = await searchParams;
  return (
    <main>
      <Container className="py-12 md:py-[72px]">
        <div className="mx-auto max-w-[760px] text-center">
          <h1 className="font-heading text-[clamp(34px,4vw,44px)] font-semibold text-[#040819]">Explore courses</h1>
          <p className="mt-4 text-lg text-shuttle-muted">Find practical lessons for the skills you want to build next.</p>
        </div>
        <div className="mt-10"><CourseFilters selected={category} basePath="/courses" /></div>
        <div className="mt-12" aria-live="polite">
          <Suspense key={`${category ?? ""}-${q ?? ""}`} fallback={<CourseGridSkeleton />}>
            <CourseGrid category={category} search={q} />
          </Suspense>
        </div>
      </Container>
    </main>
  );
}