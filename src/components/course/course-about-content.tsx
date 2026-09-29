import Image from "next/image";
import type { Course } from "@/types";

export function CourseAboutContent({ course }: { course: Course }) {
  return <>
    <h2 className="text-xl font-bold">Description</h2>
    <div className="mt-5 space-y-6 text-base leading-[1.7] text-shuttle-muted">{course.details.descriptionParagraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}</div>
    <h2 className="mt-7 text-xl font-bold">Sneak Peek</h2>
    <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">{course.details.gallery.map(item => <Image key={item.src} src={item.src} alt={item.alt} width={280} height={210} sizes="(min-width: 1024px) 170px, 40vw" className="aspect-[4/3] w-full rounded-2xl object-cover" />)}</div>
    <h2 className="mt-6 text-xl font-bold">Key Points</h2>
    <ul className="mt-5 space-y-3 text-shuttle-muted">{course.details.learningOutcomes.map(item => <li key={item} className="flex gap-3"><span aria-hidden="true" className="flex size-5 shrink-0 items-center justify-center rounded-full bg-persian-blue text-xs text-white">✓</span>{item}</li>)}</ul>
  </>;
}
