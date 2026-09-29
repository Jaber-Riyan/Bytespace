export function CourseCardSkeleton() {
  return (
    <div className="min-h-[384px] motion-safe:animate-pulse rounded-[24px] border border-[#ced0d3] bg-white p-4" role="status" aria-label="Loading course">
      <div className="aspect-[341/195] rounded-[12px] bg-shuttle-soft" />
      <div className="mt-5 h-6 w-4/5 rounded bg-shuttle-soft" />
      <div className="mt-3 h-3 w-2/5 rounded bg-shuttle-soft" />
      <div className="mt-9 h-7 w-1/3 rounded bg-shuttle-soft" />
      <span className="sr-only">Loading course</span>
    </div>
  );
}

export function CourseGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-10">
      {Array.from({ length: count }, (_, index) => <CourseCardSkeleton key={index} />)}
    </div>
  );
}