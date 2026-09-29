import { EnrollButton } from "@/components/cart/enroll-button";
import Image from "next/image";
import Link from "next/link";
import { formatDuration } from "@/lib/course-catalog";
import type { Course } from "@/types";

export function CourseEnrollmentCard({ course }: { course: Course }) {
  return <aside aria-label="Course enrollment" className="rounded-[24px] border border-[#dedee1] bg-white p-6 text-shuttle-ink sm:p-10">
    <h2 className="text-xl font-bold">{course.lessonCount} Lessons ({formatDuration(course.durationSeconds)})</h2>
    <ol className="mt-6 space-y-4">{course.lessons.slice(0, 3).map((lesson, i) => <li key={lesson.id}><Link href={`/courses/${course.id}/lessons?lesson=${lesson.id}`} className="flex items-start gap-3 text-sm hover:text-persian-blue"><span>{String(i + 1).padStart(2, "0")}</span><span className="flex-1">{lesson.title}</span><span className="shrink-0 text-xs text-persian-blue">{formatDuration(lesson.durationSeconds)}</span></Link></li>)}</ol>
    {course.lessons.length > 3 && <Link href={`/courses/${course.id}/lessons#course-content`} className="mt-4 block text-sm text-shuttle-muted">{course.lessons.length - 3} more lessons</Link>}
    {!course.lessons.length && <p className="mt-4 text-sm text-shuttle-muted">The lesson list will be available soon.</p>}
    <p className="mt-7 text-sm leading-6 text-shuttle-muted">Ready to dive in? Start building your digital future!</p>
    <p className="mt-5 text-4xl font-bold text-persian-blue">${course.price}<span className="text-sm font-normal text-shuttle-muted">/lifetime</span></p>
    <EnrollButton courseId={course.id} />
    <h3 className="mt-6 text-xl font-bold">This course includes</h3>
    <ul className="mt-5 space-y-4 text-sm text-shuttle-muted">{course.details.includes.map(item => <li key={item} className="flex items-center gap-3"><span aria-hidden="true" className="text-persian-blue">✓</span>{item}</li>)}</ul>
    <div className="mt-7 border-t pt-6"><div className="flex items-center gap-3"><Image src={course.details.instructor.avatar} alt="" width={52} height={52} className="size-13 rounded-full object-cover" /><div><h3 className="font-medium">{course.creator}</h3><p className="text-sm text-shuttle-muted">{course.details.instructor.role}</p></div></div><p className="mt-5 text-sm leading-6 text-shuttle-muted">{course.details.instructor.bio}</p><Link href={`/creators/${course.details.instructor.id}`} className="mt-5 inline-block rounded-full border px-4 py-2 text-sm hover:bg-shuttle-soft">See Full Profile</Link></div>
  </aside>;
}
