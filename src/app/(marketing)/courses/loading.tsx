import { CourseGridSkeleton } from "@/components/course/course-card-skeleton";
import { Container } from "@/components/layout/container";
export default function Loading() {
  return <main aria-label="Loading courses"><div className="blue-grid -mt-[120px] h-[360px] bg-persian-blue pt-[175px]"><div className="mx-auto h-10 w-64 rounded bg-white/20 motion-safe:animate-pulse" /></div><Container className="py-[72px]"><div className="mb-[72px] h-24 rounded-2xl bg-shuttle-soft motion-safe:animate-pulse" /><CourseGridSkeleton count={18} /></Container></main>;
}
