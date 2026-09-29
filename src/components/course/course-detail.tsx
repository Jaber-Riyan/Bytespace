import Image from "next/image";
import Link from "next/link";
import { formatDuration } from "@/lib/course-catalog";
import type { Course } from "@/types";

export function CourseDetail({ course }: { course: Course }) {
  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_390px]">
      <div>
        <p className="text-sm font-medium text-persian-blue">{course.category}</p>
        <h1 className="mt-3 font-heading text-[clamp(34px,4vw,52px)] font-semibold leading-[1.15] text-[#040819]">{course.title}</h1>
        <p className="mt-5 max-w-[680px] text-lg leading-[1.6] text-shuttle-muted">{course.description}</p>
        <p className="mt-5 text-sm text-shuttle-muted">Created by <span className="font-medium text-persian-blue">{course.creator}</span></p>
        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-shuttle-soft px-4 py-2">{course.level}</span>
          <span className="rounded-full bg-shuttle-soft px-4 py-2">{course.lessonCount} lessons</span>
          <span className="rounded-full bg-shuttle-soft px-4 py-2">{formatDuration(course.durationSeconds)}</span>
          <span className="rounded-full bg-shuttle-soft px-4 py-2">★ {course.rating.toFixed(1)}</span>
        </div>
        <nav aria-label="Course pages" className="mt-9 flex flex-wrap gap-3">
          <Link href={`/courses/${course.id}/lessons`} className="rounded-full bg-electric-lime px-6 py-3 font-medium text-[#040819] hover:brightness-95">View lessons</Link>
          <Link href={`/courses/${course.id}/reviews`} className="rounded-full border border-[#ced0d3] px-6 py-3 font-medium hover:border-persian-blue">Read reviews</Link>
        </nav>
        <section className="mt-14" aria-labelledby="course-overview">
          <h2 id="course-overview" className="font-heading text-2xl font-semibold">About this course</h2>
          <p className="mt-3 leading-7 text-shuttle-muted">{course.description}</p>
          <h3 className="mt-9 font-heading text-xl font-semibold">Course content</h3>
          {course.lessons.length ? (
            <ol className="mt-4 divide-y divide-[#ced0d3] rounded-[20px] border border-[#ced0d3] px-5">
              {course.lessons.map((lesson, index) => (
                <li key={lesson.id}>
                  <Link href={`/courses/${course.id}/lessons?lesson=${lesson.id}`} className="flex items-center justify-between gap-3 py-4 hover:text-persian-blue">
                    <span>{String(index + 1).padStart(2, "0")}. {lesson.title}</span>
                    <span className="shrink-0 text-sm text-shuttle-muted">{formatDuration(lesson.durationSeconds)}</span>
                  </Link>
                </li>
              ))}
            </ol>
          ) : <p className="mt-4 text-shuttle-muted">Lesson previews are being prepared for this sample course.</p>}
        </section>
      </div>
      <aside className="overflow-hidden rounded-[24px] border border-[#ced0d3] bg-white p-4">
        <Image src={course.image} alt="" width={682} height={390} className="aspect-[341/195] w-full rounded-[12px] object-cover" />
        <div className="p-3">
          <p className="mt-2 font-heading text-[28px] font-semibold text-persian-blue">${course.price} <span className="font-sans text-sm font-normal text-shuttle-muted">/ lifetime</span></p>
          <Link href={`/courses/${course.id}/lessons`} className="mt-5 block rounded-full bg-electric-lime px-6 py-3 text-center font-medium hover:brightness-95">Explore lessons</Link>
          <p className="mt-4 text-center text-xs text-shuttle-muted">Sample catalog content for preview.</p>
        </div>
      </aside>
    </div>
  );
}