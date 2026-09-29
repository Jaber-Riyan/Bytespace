import { notFound } from "next/navigation";
import { CourseDetail } from "@/components/course/course-detail";
import { getCourse } from "@/lib/course-catalog";

export default async function CourseReviewsPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const course = await getCourse(courseId);
  if (!course) notFound();
  return <CourseDetail course={course} tab="reviews" />;
}
