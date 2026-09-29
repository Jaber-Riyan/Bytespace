import { CourseGridSkeleton } from "@/components/course/course-card-skeleton";
import { Container } from "@/components/layout/container";
import { SiteHeader } from "@/components/layout/site-header";

export default function Loading() {
  return <main><SiteHeader /><Container className="py-12 md:py-[72px]"><div className="mx-auto h-14 w-64 animate-pulse rounded bg-shuttle-soft" /><div className="mt-16"><CourseGridSkeleton /></div></Container></main>;
}