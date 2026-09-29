export function ProgressBar({
  value,
  label = "Learning progress",
  className = "",
}: {
  value: number;
  label?: string;
  className?: string;
}) {
  const percent = Math.max(0, Math.min(100, Number.isFinite(value) ? value : 0));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(percent)}
      className={`h-2 overflow-hidden rounded-full bg-[#e6e6e6] ${className}`}
    >
      <div
        style={{ width: `${percent}%` }}
        className="h-full rounded-full bg-electric-lime motion-safe:transition-[width] motion-safe:duration-300"
      />
    </div>
  );
}
