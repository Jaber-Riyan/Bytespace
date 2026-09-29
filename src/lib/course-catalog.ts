import { courses } from "@/data/courses";
import type { Course } from "@/types";

export type CourseQuery = { category?: string; search?: string; level?: string; sort?: string; maxPrice?: number; page?: number; pageSize?: number };
export type CoursePage = { items: Course[]; total: number; page: number; pageSize: number; totalPages: number };

// Replace these async repository functions with API calls; consumers retain the same contracts.
export async function listCourses(query: CourseQuery = {}): Promise<Course[]> {
  const search = query.search?.trim().toLowerCase();
  const items = courses.filter(course =>
    (!query.category || query.category === "Featured" || course.category === query.category) &&
    (!query.level || course.level === query.level) &&
    (query.maxPrice === undefined || !Number.isFinite(query.maxPrice) || course.price <= query.maxPrice) &&
    (!search || [course.title, course.creator, course.category, course.description].some(value => value.toLowerCase().includes(search)))
  );
  if (query.sort === "rating") items.sort((a, b) => b.rating - a.rating);
  if (query.sort === "price-asc") items.sort((a, b) => a.price - b.price);
  if (query.sort === "price-desc") items.sort((a, b) => b.price - a.price);
  return items;
}
export async function searchCourses(query: CourseQuery = {}): Promise<CoursePage> {
  const items = await listCourses(query);
  const pageSize = Math.max(1, Math.min(48, Math.floor(query.pageSize || 18)));
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const requestedPage = Number.isFinite(query.page) ? Math.floor(query.page!) : 1;
  const page = Math.max(1, Math.min(totalPages, requestedPage));
  return { items: items.slice((page - 1) * pageSize, page * pageSize), total: items.length, page, pageSize, totalPages };
}
export async function getCourse(id: string): Promise<Course | undefined> { return courses.find(course => course.id === id); }
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return hours ? `${hours} hour${hours === 1 ? "" : "s"} ${minutes} min` : `${minutes} min`;
}
