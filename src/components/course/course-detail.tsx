import Link from "next/link";
import { Container } from "@/components/layout/container";
import { CoursePreview } from "./course-preview";
import { CourseShare } from "./course-share";
import { CourseEnrollmentCard } from "./course-enrollment-card";
import { CourseAboutContent } from "./course-about-content";
import { CourseLessonsContent } from "./course-lessons-content";
import { CourseReviewsContent } from "./course-reviews-content";
import type { Course } from "@/types";

export function CourseDetail({
  course,
  tab = "about",
  lessonId,
}: {
  course: Course;
  tab?: string;
  lessonId?: string;
}) {
  const active = ["about", "lessons", "reviews"].includes(tab) ? tab : "about";
  const lesson = lessonId ? course.lessons.find((item) => item.id === lessonId) : undefined;
  const previewLesson = lesson || course.lessons[0];
  const tabs = [
    { id: "about", label: "About", href: `/courses/${course.id}` },
    { id: "lessons", label: "Lesson", href: `/courses/${course.id}/lessons` },
    { id: "reviews", label: "Reviews", href: `/courses/${course.id}/reviews` },
  ];
  return (
    <main className="relative -mt-[120px]" data-header-theme="blue">
      <div
        aria-hidden="true"
        className="blue-grid absolute inset-x-0 top-0 h-[680px] bg-persian-blue lg:h-[958px]"
      />
      <Container className="relative pt-[164px] pb-[80px]">
        <div className="flex flex-wrap justify-between gap-4 text-white">
          <div>
            <h1 className="font-heading text-[clamp(26px,3vw,36px)] font-semibold leading-[1.35]">
              {course.details.headline}
            </h1>
            <p className="mt-2 text-xl font-medium">{course.details.subtitle}</p>
            <p className="mt-6">
              by{" "}
              <Link
                href={`/creators/${course.details.instructor.id}`}
                className="text-electric-lime"
              >
                {course.creator}
              </Link>
            </p>
            <div className="mt-5 flex flex-wrap gap-4 text-sm text-shuttle-ink">
              <span className="rounded-full bg-white px-5 py-2">
                <span className="mr-2 text-persian-blue">▥</span>
                {course.level}
              </span>
              <Link
                href={`/courses/${course.id}/reviews#course-content`}
                className="rounded-full bg-white px-5 py-2"
              >
                <span className="mr-2 text-persian-blue">★</span>
                {course.rating} ({course.reviewCount} reviews)
              </Link>
              <span className="rounded-full bg-white px-5 py-2">
                <span className="mr-2 text-persian-blue">♧</span>
                {course.learnerCount} Students
              </span>
            </div>
          </div>
          <CourseShare title={course.details.headline} />
        </div>
        <div className="mt-[60px] grid items-start gap-8 lg:grid-cols-[minmax(0,720px)_minmax(0,412px)] lg:gap-x-[64px]">
          <div id="lesson-player" className="min-w-0 scroll-mt-28">
            <CoursePreview
              key={previewLesson?.id || course.id}
              poster={course.details.previewImage}
              title={lesson?.title || course.title}
              video={previewLesson?.video}
              autoPlay={Boolean(lesson)}
            />
            {lesson && (
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-4 text-sm shadow-[0_8px_30px_rgba(20,24,40,0.08)]">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-persian-blue">
                    Now playing · Lesson{" "}
                    {course.lessons.findIndex((item) => item.id === lesson.id) + 1}
                  </p>
                  <p className="mt-1 font-bold">{lesson.title}</p>
                </div>
                {lesson.video ? (
                  <a
                    className="rounded-full bg-shuttle-soft px-4 py-2 font-medium text-persian-blue hover:bg-electric-lime"
                    href={lesson.video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in YouTube ↗
                  </a>
                ) : (
                  <p className="mt-1 text-shuttle-muted">This lesson video is not available yet.</p>
                )}
              </div>
            )}
          </div>
          <div className="lg:col-start-2 lg:row-span-2">
            <CourseEnrollmentCard course={course} />
          </div>
          <section
            id="course-content"
            aria-label="Course information"
            className="min-w-0 scroll-mt-28 rounded-2xl bg-white pt-6 lg:col-start-1 lg:row-start-2 lg:mt-[150px] lg:pt-0"
          >
            <nav
              aria-label="Course information tabs"
              className="mb-9 flex flex-wrap gap-2 sm:gap-4"
            >
              {tabs.map((item) => (
                <Link
                  key={item.id}
                  href={`${item.href}#course-content`}
                  scroll={false}
                  aria-current={active === item.id ? "page" : undefined}
                  className={`rounded-full px-5 py-3 text-sm ${active === item.id ? "bg-electric-lime" : "bg-shuttle-soft hover:bg-electric-lime/30"}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            {active === "about" && <CourseAboutContent course={course} />}
            {active === "lessons" && (
              <CourseLessonsContent course={course} activeLessonId={lessonId} />
            )}
            {active === "reviews" && (
              <CourseReviewsContent
                title={course.details.headline}
                reviews={course.reviews}
                counts={course.details.ratingCounts}
              />
            )}
          </section>
        </div>
      </Container>
    </main>
  );
}
