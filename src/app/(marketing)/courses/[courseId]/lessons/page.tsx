import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { getCourse, formatDuration } from "@/lib/course-catalog";

export default async function CourseLessonsPage({
  params, searchParams,
}: {
  params: Promise<{ courseId: string }>;
  searchParams: Promise<{ lesson?: string }>;
}) {
  const [{ courseId }, { lesson: requestedLesson }] = await Promise.all([params, searchParams]);
  const course = await getCourse(courseId);
  if (!course) notFound();
  const selected = course.lessons.find((lesson) => lesson.id === requestedLesson) ?? course.lessons[0];
  return (
    <main>
      <Container className="py-12 md:py-[72px]">
        <Link href={`/courses/${course.id}`} className="text-sm text-persian-blue hover:underline">← Back to course</Link>
        <h1 className="mt-5 font-heading text-[clamp(30px,4vw,44px)] font-semibold text-[#040819]">{course.title}</h1>
        {selected ? (
          <div className="mt-9 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div>
              <div className="aspect-video overflow-hidden rounded-[20px] bg-[#040819]">
                {selected.video ? <iframe
                  key={selected.id}
                  src={`https://www.youtube-nocookie.com/embed/${selected.video.videoId}`}
                  title={selected.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  className="h-full w-full"
                /> : <div className="flex h-full items-center justify-center p-6 text-center text-white"><p>This lesson video is not available yet.</p></div>}
              </div>
              <h2 className="mt-6 font-heading text-2xl font-semibold">{selected.title}</h2>
              <p className="mt-2 text-shuttle-muted">Lesson {course.lessons.indexOf(selected) + 1} of {course.lessons.length} · {formatDuration(selected.durationSeconds)}</p>
              {selected.video && <a href={selected.video.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm text-persian-blue hover:underline">Watch on YouTube ↗</a>}
            </div>
            <aside className="rounded-[20px] border border-[#ced0d3] p-5">
              <h2 className="font-heading text-xl font-semibold">Course lessons</h2>
              <ol className="mt-4 space-y-2">
                {course.lessons.map((lesson, index) => (
                  <li key={lesson.id}>
                    <Link
                      href={`/courses/${course.id}/lessons?lesson=${lesson.id}`}
                      scroll={false}
                      aria-current={lesson.id === selected.id ? "page" : undefined}
                      className={`block rounded-xl p-3 hover:bg-shuttle-soft ${lesson.id === selected.id ? "bg-shuttle-soft text-persian-blue" : ""}`}
                    >
                      <span className="font-medium">{index + 1}. {lesson.title}</span>
                      <span className="mt-1 block text-xs text-shuttle-muted">{formatDuration(lesson.durationSeconds)}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        ) : (
          <div className="mt-9 rounded-[20px] bg-shuttle-soft p-8">
            <p className="text-shuttle-muted">Lesson previews are being prepared for this sample course.</p>
            <Link href="/courses" className="mt-4 inline-block text-persian-blue hover:underline">Browse other courses</Link>
          </div>
        )}
      </Container>
    </main>
  );
}