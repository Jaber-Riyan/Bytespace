import { Container } from "@/components/layout/container";
import { CourseGridSkeleton } from "@/components/course/course-card-skeleton";

export default function Loading() {
  return <main aria-label="Loading creator" data-header-theme="blue"><section className="blue-grid -mt-[120px] bg-persian-blue pt-[172px] pb-20"><Container><div className="h-24 w-24 rounded-3xl bg-white/20 motion-safe:animate-pulse" /><div className="mt-10 h-28 rounded-xl bg-white/20 motion-safe:animate-pulse" /></Container></section><Container className="py-16"><div className="mb-10 h-12 rounded-full bg-shuttle-soft motion-safe:animate-pulse" /><CourseGridSkeleton /></Container></main>;
}
