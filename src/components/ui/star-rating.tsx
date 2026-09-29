export function StarRating({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span
      aria-label={`${rating} out of 5 stars`}
      className={`inline-flex gap-1 text-xl ${className}`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={i < Math.round(rating) ? "text-shuttle-ink" : "text-gray-300"}
        >
          ★
        </span>
      ))}
    </span>
  );
}
