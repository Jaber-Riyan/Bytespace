import Link from "next/link";
import { LessonProgress } from "./lesson-progress";
import type { Course } from "@/types";

export function CourseLessonsContent({ course }: { course: Course }) {
  return (
    <div>
      <h2 className="text-xl font-bold">Explore the Modules</h2>
      <p className="mt-5 leading-7 text-shuttle-muted">
        Immerse yourself in the course content as we break down each module into comprehensive
        lessons, providing practical insights and hands-on experiences.
      </p>
      <h3 className="mt-6 text-xl font-bold">Lesson List</h3>
      <ol className="mt-6 space-y-6">
        {course.details.modules.map((module, index) => (
          <li key={module.id} className="flex items-start gap-4">
            <span
              className="flex size-[72px] shrink-0 items-center justify-center rounded-[24px] bg-electric-lime"
              aria-hidden="true"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M3 6h12v12H3zM15 10l6-4v12l-6-4z" />
              </svg>
            </span>
            <div className="min-w-0">
              <h4 className="font-medium">
                Module {index + 1}: {module.title}
              </h4>
              <p className="mt-1 leading-7 text-shuttle-muted">{module.description}</p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                {module.lessonIds.map((id) => {
                  const lesson = course.lessons.find((item) => item.id === id);
                  return lesson ? (
                    <Link
                      key={id}
                      href={`/courses/${course.id}/lessons?lesson=${id}`}
                      className="text-sm text-persian-blue hover:underline"
                    >
                      {lesson.video ? "Watch" : "View"}: {lesson.title}
                    </Link>
                  ) : null;
                })}
              </div>
            </div>
          </li>
        ))}
      </ol>
      <h3 className="mt-7 text-xl font-bold">Lesson Content</h3>
      <p className="mt-5 leading-7 text-shuttle-muted">
        Engage with each lesson through video content, detailed explanations, and practical
        exercises. Apply what you learn to your own projects and revisit each module at your own
        pace.
      </p>
      <h3 className="mt-6 text-xl font-bold">Lesson Progress Tracking</h3>
      <p className="mt-5 leading-7 text-shuttle-muted">
        Witness your growth as you complete the lessons, with intuitive progress tracking guiding
        you through your learning journey.
      </p>
      <LessonProgress
        courseId={course.id}
        lessons={course.lessons.map(({ id, title }) => ({ id, title }))}
      />
    </div>
  );
}
