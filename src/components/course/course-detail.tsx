import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { CoursePreview } from "./course-preview";
import { CourseShare } from "./course-share";
import { CourseEnrollmentCard } from "./course-enrollment-card";
import { formatDuration } from "@/lib/course-catalog";
import type { Course } from "@/types";

export function CourseDetail({ course, tab = "about" }: { course: Course; tab?: string }) {
  const active = ["about", "lessons", "reviews"].includes(tab) ? tab : "about";
  return <main className="relative -mt-[120px]">
    <div aria-hidden="true" className="blue-grid absolute inset-x-0 top-0 h-[680px] bg-persian-blue lg:h-[958px]" />
    <Container className="relative pt-[164px] pb-[72px]">
      <div className="flex flex-wrap justify-between gap-4 text-white">
        <div><h1 className="font-heading text-[clamp(26px,3vw,36px)] font-semibold leading-[1.35]">{course.details.headline}</h1><p className="mt-2 text-xl font-medium">{course.details.subtitle}</p><p className="mt-6">by <Link href={`/creators/${course.details.instructor.id}`} className="text-electric-lime">{course.creator}</Link></p>
        <div className="mt-5 flex flex-wrap gap-4 text-sm text-shuttle-ink"><span className="rounded-full bg-white px-5 py-2"><span className="mr-2 text-persian-blue">▥</span>{course.level}</span><Link href={`/courses/${course.id}?tab=reviews#course-content`} className="rounded-full bg-white px-5 py-2"><span className="mr-2 text-persian-blue">★</span>{course.rating} ({course.reviewCount} reviews)</Link><span className="rounded-full bg-white px-5 py-2"><span className="mr-2 text-persian-blue">♧</span>{course.learnerCount} Students</span></div></div>
        <CourseShare title={course.details.headline} />
      </div>
      <div className="mt-[60px] grid items-start gap-8 lg:grid-cols-[minmax(0,720px)_minmax(0,412px)] lg:gap-x-[64px]">
        <div className="min-w-0"><CoursePreview poster={course.details.previewImage} title={course.title} video={course.lessons[0]?.video} /></div>
        <div className="lg:col-start-2 lg:row-span-2"><CourseEnrollmentCard course={course} /></div>
        <section id="course-content" aria-label="Course information" className="min-w-0 scroll-mt-28 rounded-2xl bg-white pt-6 lg:col-start-1 lg:row-start-2 lg:mt-[74px] lg:pt-0">
          <nav aria-label="Course information tabs" className="mb-9 flex flex-wrap gap-2 sm:gap-4">{["about", "lessons", "reviews"].map(item => <Link key={item} href={`/courses/${course.id}?tab=${item}#course-content`} scroll={false} aria-current={active === item ? "page" : undefined} className={`rounded-full px-5 py-3 text-sm capitalize ${active === item ? "bg-electric-lime" : "bg-shuttle-soft hover:bg-electric-lime"}`}>{item}</Link>)}</nav>
          {active === "about" && <><h2 className="text-xl font-bold">Description</h2><div className="mt-5 space-y-6 text-base leading-[1.7] text-shuttle-muted">{course.details.descriptionParagraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}</div><h2 className="mt-7 text-xl font-bold">Sneak Peek</h2><div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">{course.details.gallery.map(item => <Image key={item.src} src={item.src} alt={item.alt} width={280} height={210} sizes="(min-width: 1024px) 170px, 40vw" className="aspect-[4/3] w-full rounded-2xl object-cover" />)}</div><h2 className="mt-6 text-xl font-bold">Key Points</h2><ul className="mt-5 space-y-3 text-shuttle-muted">{course.details.learningOutcomes.map(item => <li key={item} className="flex gap-3"><span aria-hidden="true" className="flex size-5 shrink-0 items-center justify-center rounded-full bg-persian-blue text-xs text-white">✓</span>{item}</li>)}</ul></>}
          {active === "lessons" && <><h2 className="text-xl font-bold">Course lessons</h2><ol className="mt-5 divide-y rounded-2xl border px-5">{course.lessons.map((lesson, i) => <li key={lesson.id}><Link href={`/courses/${course.id}/lessons?lesson=${lesson.id}`} className="flex justify-between gap-3 py-5 hover:text-persian-blue"><span>{i + 1}. {lesson.title}</span><span className="shrink-0 text-sm">{formatDuration(lesson.durationSeconds)}</span></Link></li>)}</ol>{!course.lessons.length && <p className="mt-4 text-shuttle-muted">The lesson list will be available soon.</p>}</>}
          {active === "reviews" && <><h2 className="text-xl font-bold">Student reviews</h2><div className="mt-5 space-y-4">{course.reviews.map(review => <article key={review.id} className="rounded-2xl border p-5"><div className="flex justify-between"><h3 className="font-bold">{review.author}</h3><span className="text-persian-blue">★ {review.rating}</span></div><p className="mt-3 leading-7 text-shuttle-muted">{review.quote}</p></article>)}{!course.reviews.length && <p className="text-shuttle-muted">No written reviews yet.</p>}</div></>}
        </section>
      </div>
    </Container>
  </main>;
}
