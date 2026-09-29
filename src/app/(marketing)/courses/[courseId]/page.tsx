import { notFound } from "next/navigation";
import { CourseDetail } from "@/components/course/course-detail";
import { getCourse } from "@/lib/course-catalog";
export default async function CourseDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ courseId: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const [{ courseId }, { tab }] = await Promise.all([params, searchParams]);
  const course = await getCourse(courseId);
  if (!course) notFound();
  return <CourseDetail course={course} tab={tab} />;
}
