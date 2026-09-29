import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { SiteHeader } from "@/components/layout/site-header";
import { getCourse } from "@/lib/course-catalog";

export default async function CourseReviewsPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const course = await getCourse(courseId);
  if (!course) notFound();
  return (
    <main>
      <SiteHeader />
      <Container className="max-w-[900px] py-12 md:py-[72px]">
        <Link href={`/courses/${course.id}`} className="text-sm text-persian-blue hover:underline">← Back to course</Link>
        <h1 className="mt-5 font-heading text-[clamp(30px,4vw,44px)] font-semibold">{course.title} reviews</h1>
        <p className="mt-3 text-shuttle-muted">★ {course.rating.toFixed(1)} average rating</p>
        <div className="mt-9 space-y-4">
          {course.reviews.length ? course.reviews.map((review) => (
            <article key={review.id} className="rounded-[20px] border border-[#ced0d3] p-6">
              <div className="flex items-center justify-between gap-3"><h2 className="font-medium">{review.author}</h2><span className="text-persian-blue">★ {review.rating.toFixed(1)}</span></div>
              <p className="mt-3 text-shuttle-muted">{review.quote}</p>
            </article>
          )) : <p className="rounded-[20px] bg-shuttle-soft p-7 text-shuttle-muted">Written reviews are being prepared for this sample course.</p>}
        </div>
      </Container>
    </main>
  );
}