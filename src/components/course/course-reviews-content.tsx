"use client";
import Image from "next/image";
import { useState } from "react";
import { StarRating } from "@/components/ui/star-rating";
import { ProgressBar } from "@/components/ui/progress-bar";
import type { CourseReview } from "@/types";

export function CourseReviewsContent({
  title,
  reviews,
  counts,
}: {
  title: string;
  reviews: CourseReview[];
  counts: Record<number, number>;
}) {
  const [filter, setFilter] = useState(0);
  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
  const average = total
    ? Object.entries(counts).reduce((sum, [stars, count]) => sum + Number(stars) * count, 0) / total
    : 0;
  const filtered = filter ? reviews.filter((review) => review.rating === filter) : reviews;
  return (
    <div>
      <h2 className="text-xl font-bold">What Learners Are Saying</h2>
      <p className="mt-5 leading-7 text-shuttle-muted">
        Discover what our learners have to say about their experience with “{title}.” Read reviews
        and ratings from people who have embarked on their own creative journey.
      </p>
      <div className="mt-6 flex flex-col gap-6 rounded-2xl border p-5 sm:flex-row sm:items-center sm:p-9">
        <div className="flex shrink-0 flex-col items-center justify-center rounded-lg bg-electric-lime px-8 py-6">
          <span className="text-sm">Ratings</span>
          <strong className="text-4xl">{average.toFixed(1)}</strong>
          <span className="sr-only">out of 5, from {total} ratings</span>
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center gap-3">
              <ProgressBar
                value={total ? ((counts[stars] || 0) / total) * 100 : 0}
                label={`${stars} star ratings`}
                className="h-1.5 min-w-8 flex-1"
              />
              <StarRating rating={stars} className="gap-0.5 text-base" />
              <span className="w-7 text-right text-sm text-shuttle-muted">
                {counts[stars] || 0}
              </span>
            </div>
          ))}
        </div>
      </div>
      <h3 className="mt-6 text-xl font-bold">Individual Reviews</h3>
      <div role="group" aria-label="Filter reviews by rating" className="mt-5 flex flex-wrap gap-3">
        {[0, 5, 4, 3, 2, 1].map((stars) => (
          <button
            key={stars}
            aria-pressed={filter === stars}
            onClick={() => setFilter(stars)}
            className={`rounded-full px-4 py-2 text-sm ${filter === stars ? "bg-electric-lime" : "bg-shuttle-soft hover:bg-electric-lime"}`}
          >
            {stars ? `★ ${stars}` : "All ratings"}
          </button>
        ))}
      </div>
      <p role="status" className="sr-only">
        {filtered.length} written reviews shown
      </p>
      <div className="mt-7 space-y-6">
        {filtered.map((review) => (
          <article key={review.id} className="rounded-[24px] border p-6 sm:p-9">
            <div className="flex flex-wrap items-center gap-3">
              <Image
                src={review.avatar || "/images/courses/avatar-1.png"}
                alt=""
                width={48}
                height={48}
                className="size-12 rounded-full object-cover"
              />
              <div className="min-w-0">
                <h4 className="font-medium">{review.author}</h4>
                <p className="text-sm text-shuttle-muted">{review.role || "Course learner"}</p>
              </div>
              {review.createdAt && (
                <time dateTime={review.createdAt} className="ml-auto text-xs text-shuttle-muted">
                  {new Intl.DateTimeFormat("en", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    timeZone: "UTC",
                  }).format(new Date(review.createdAt))}
                </time>
              )}
            </div>
            <div className="mt-5">
              <StarRating rating={review.rating} />
            </div>
            <p className="mt-5 leading-7 text-shuttle-muted">“{review.quote}”</p>
          </article>
        ))}
      </div>
      {!filtered.length && (
        <p className="mt-6 rounded-2xl bg-shuttle-soft p-6 text-shuttle-muted">
          No written reviews with this rating yet. Try another rating.
        </p>
      )}
    </div>
  );
}
