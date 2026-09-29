import Link from "next/link";
import { CourseCard } from "./course-card";
import { searchCourses, type CourseQuery } from "@/lib/course-catalog";

export async function CatalogResults({ query, parameters, basePath = "/courses" }: { query: CourseQuery; parameters: Record<string, string>; basePath?: string }) {
  const result = await searchCourses(query);
  if (!result.items.length) return <div className="rounded-3xl bg-shuttle-soft px-6 py-16 text-center"><h2 className="font-heading text-xl">No courses found</h2><p className="mt-3 text-shuttle-muted">Try a different search or remove a filter.</p><Link href={basePath} className="mt-5 inline-block text-persian-blue underline">View all courses</Link></div>;
  function href(page: number) { const params = new URLSearchParams(parameters); params.set("page", String(page)); return basePath + "?" + params.toString(); }
  return <><p role="status" className="sr-only">{result.total} courses found. Page {result.page} of {result.totalPages}.</p>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">{result.items.map(course => <CourseCard key={course.id} course={course} ratingOrder="star-last" />)}</div>
    <nav aria-label="Results pages" className="mt-[72px] flex flex-wrap justify-center gap-2">
      {result.page > 1 ? <Link aria-label="Previous page" href={href(result.page - 1)} className="flex size-11 items-center justify-center rounded-full border">←</Link> : <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-full border opacity-30">←</span>}
      {Array.from({ length: result.totalPages }, (_, i) => i + 1).map(page => <Link key={page} href={href(page)} aria-current={page === result.page ? "page" : undefined} className={`flex size-11 items-center justify-center rounded-full ${page === result.page ? "bg-electric-lime" : "hover:bg-shuttle-soft"}`}>{page}</Link>)}
      {result.page < result.totalPages ? <Link aria-label="Next page" href={href(result.page + 1)} className="flex size-11 items-center justify-center rounded-full border">→</Link> : <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-full border opacity-30">→</span>}
    </nav></>;
}
