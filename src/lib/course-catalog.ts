import { courses } from "@/data/courses";
import type { Course } from "@/types";

export type CourseQuery = { category?: string; search?: string };

// Kept async so callers and loading boundaries stay the same when data comes from an API.
export async function listCourses(query: CourseQuery = {}): Promise<Course[]> {
  const search = query.search?.trim().toLowerCase();
  return courses.filter((course) => {
    const matchesCategory = !query.category || query.category === "Featured" || course.category === query.category;
    const matchesSearch = !search || [course.title, course.creator, course.category, course.description]
      .some((value) => value.toLowerCase().includes(search));
    return matchesCategory && matchesSearch;
  });
}

export async function getCourse(id: string): Promise<Course | undefined> {
  return courses.find((course) => course.id === id);
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return hours ? `${hours} hour${hours === 1 ? "" : "s"} ${minutes} min` : `${minutes} min`;
}