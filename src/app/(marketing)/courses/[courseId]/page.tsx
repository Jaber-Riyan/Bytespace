import { notFound } from "next/navigation";
import { CourseDetail } from "@/components/course/course-detail";
import { Container } from "@/components/layout/container";
import { SiteHeader } from "@/components/layout/site-header";
import { getCourse } from "@/lib/course-catalog";

export default async function CourseDetailsPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const course = await getCourse(courseId);
  if (!course) notFound();
  return <main><SiteHeader /><Container className="py-12 md:py-[72px]"><CourseDetail course={course} /></Container></main>;
}