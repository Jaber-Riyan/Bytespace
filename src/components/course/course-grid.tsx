import { CourseCard } from "@/components/course/course-card";
import { listCourses } from "@/lib/course-catalog";

export async function CourseGrid({ category, search }: { category?: string; search?: string }) {
  const courses = await listCourses({ category, search });
  if (!courses.length) {
    return <p className="rounded-[24px] bg-shuttle-soft p-10 text-center text-shuttle-muted">No courses match this selection yet. Try another category or search.</p>;
  }
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-10">
      {courses.slice(0, 6).map((course) => <CourseCard key={course.id} course={course} />)}
    </div>
  );
}