"use client";
import { useCart } from "./cart-provider";

export function CartButton({
  className = "",
  onOpen,
}: {
  className?: string;
  onOpen?: () => void;
}) {
  const { items, openCart } = useCart();
  return (
    <button
      type="button"
      data-cart-trigger
      aria-label={`Open cart, ${items.length} ${items.length === 1 ? "course" : "courses"}`}
      aria-haspopup="dialog"
      onClick={() => {
        onOpen?.();
        openCart();
      }}
      className={`relative flex size-11 shrink-0 items-center justify-center rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${className}`}
    >
      <svg
        aria-hidden="true"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 7h14l1 14H4L5 7Z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </svg>
      {items.length > 0 && (
        <span
          data-cart-count
          className="absolute right-0 top-0 flex min-w-5 items-center justify-center rounded-full bg-electric-lime px-1 text-[11px] leading-5 font-bold text-shuttle-ink"
        >
          {items.length}
        </span>
      )}
    </button>
  );
}
