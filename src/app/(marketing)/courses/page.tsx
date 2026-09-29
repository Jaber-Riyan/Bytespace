import { Suspense } from "react";
import { CourseFilters } from "@/components/course/course-filters";
import { CourseSearch } from "@/components/course/course-search";
import { CatalogControls } from "@/components/course/catalog-controls";
import { CatalogResults } from "@/components/course/catalog-results";
import { CourseGridSkeleton } from "@/components/course/course-card-skeleton";
import { Container } from "@/components/layout/container";

export const metadata = { title: "Find Your Next Course | ByteSpace" };
export default async function CoursesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const raw = await searchParams;
  const query = Object.fromEntries(Object.entries(raw).filter((entry): entry is [string, string] => typeof entry[1] === "string"));
  return <main>
    <section className="blue-grid -mt-[120px] bg-persian-blue px-5 pt-[164px] pb-[70px] text-center text-white">
      <h1 className="font-heading text-[clamp(28px,4vw,36px)] font-semibold">Find Your Next Course</h1>
      <CourseSearch key={query.q} defaultValue={query.q} parameters={query} className="mx-auto mt-7" />
    </section>
    <Container className="py-[72px]">
      <CatalogControls query={query} />
      <div className="mt-8"><CourseFilters selected={query.category} basePath="/courses" query={query} /></div>
      <div className="mt-[72px]" aria-live="polite"><Suspense key={JSON.stringify(query)} fallback={<CourseGridSkeleton count={18} />}><CatalogResults parameters={query} query={{ search: query.q, category: query.category, level: query.level, sort: query.sort, maxPrice: query.price ? Number(query.price) : undefined, page: Number(query.page) || 1 }} /></Suspense></div>
    </Container>
  </main>;
}
