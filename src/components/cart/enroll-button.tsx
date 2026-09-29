"use client";
import { useCart } from "./cart-provider";

export function EnrollButton({ courseId }: { courseId: string }) {
  const { items, addCourse, openCart } = useCart();
  const added = items.some((course) => course.id === courseId);
  return (
    <button
      type="button"
      data-enroll-button
      onClick={(event) => (added ? openCart() : addCourse(courseId, event.currentTarget))}
      className="mt-5 block w-full rounded-full bg-electric-lime px-6 py-3 text-center font-medium hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian-blue"
    >
      {added ? "Added to cart · View cart" : "Enroll Now"}
    </button>
  );
}
