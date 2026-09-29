import { notFound } from "next/navigation";
import { CourseDetail } from "@/components/course/course-detail";
import { getCourse } from "@/lib/course-catalog";

export default async function CourseLessonsPage({ params, searchParams }: {
  params: Promise<{ courseId: string }>;
  searchParams: Promise<{ lesson?: string }>;
}) {
  const [{ courseId }, { lesson }] = await Promise.all([params, searchParams]);
  const course = await getCourse(courseId);
  if (!course || (lesson && !course.lessons.some(item => item.id === lesson))) notFound();
  return <CourseDetail course={course} tab="lessons" lessonId={lesson} />;
}
