import Image from "next/image";
import Link from "next/link";
import { formatDuration } from "@/lib/course-catalog";
import type { Course } from "@/types";

const avatars = [1, 2, 3, 4];

export function CourseCard({ course, ratingOrder = "star-first" }: { course: Course; ratingOrder?: "star-first" | "star-last" }) {
  const href = `/courses/${course.id}`;
  return (
    <article className="flex min-h-[384px] flex-col rounded-[24px] border border-[#ced0d3] bg-white p-4 transition-shadow hover:shadow-lg">
      <Link href={href} className="group relative block overflow-hidden rounded-[12px]">
        <Image
          src={course.image}
          alt={course.title}
          width={682}
          height={390}
          sizes="(min-width: 1024px) 373px, (min-width: 768px) 45vw, 90vw"
          className="aspect-[341/195] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-medium text-shuttle-ink">{course.lessonCount} Lessons</span>
          <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-medium text-shuttle-ink">{formatDuration(course.durationSeconds)}</span>
          <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-medium text-shuttle-ink">{course.reviewCount} Comments</span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col px-1 pt-4">
        <div className="flex items-start justify-between gap-3">
          <Link href={href} className="line-clamp-1 font-heading text-[20px] font-semibold leading-[1.3] text-[#040819] hover:text-persian-blue">{course.title}</Link>
          <span className="flex shrink-0 items-center gap-1 text-[13px] text-shuttle-ink">
            {ratingOrder === "star-first" && <Image src="/images/courses/star.svg" alt="" width={16} height={16} />}
            {course.rating.toFixed(1)}
            {ratingOrder === "star-last" && <Image src="/images/courses/star.svg" alt="" width={16} height={16} />}
          </span>
        </div>
        <p className="mt-1 text-[12px] leading-[18px] text-shuttle-muted">By <span className="text-persian-blue">{course.creator}</span></p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <span className="rounded-full bg-shuttle-soft px-3 py-1 text-[11px] text-shuttle-muted">{course.level}</span>
          <div className="flex items-center pl-2" aria-label={`${course.learnerCount} learners`}>
            {avatars.map((avatar) => (
              <Image key={avatar} src={`/images/courses/avatar-${avatar}.png`} alt="" width={28} height={28} className="-ml-2 size-7 rounded-full border-2 border-white object-cover" />
            ))}
            <span className="-ml-1 flex size-7 items-center justify-center rounded-full border-2 border-white bg-persian-blue text-[9px] text-white">{course.learnerCount - 4}+</span>
          </div>
        </div>
        <p className="mt-2 font-heading text-[20px] font-semibold leading-[26px] text-persian-blue">
          ${course.price}<span className="ml-1 font-sans text-[12px] font-normal text-shuttle-muted">/ lifetime</span>
        </p>
      </div>
    </article>
  );
}