import Link from "next/link";
export type CourseCardProps = {
  id: string;
  title: string;
  creator: string;
  price: number;
};
export function CourseCard({ id, title, creator, price }: CourseCardProps) {
  return (
    <article className="rounded-3xl border bg-white p-4 shadow-sm">
      <div className="aspect-[16/9] rounded-2xl bg-brand-lilac" />
      <div className="px-1 pb-1 pt-5">
        <Link
          href={`/courses/${id}`}
          className="text-lg font-semibold text-brand-ink hover:text-brand-purple">
          {title}
        </Link>
        <p className="mt-1 text-sm text-brand-muted">by {creator}</p>
        <p className="mt-5 font-semibold text-brand-purple">
          ${price}{" "}
          <span className="text-xs font-normal text-brand-muted">
            / lifetime
          </span>
        </p>
      </div>
    </article>
  );
}
