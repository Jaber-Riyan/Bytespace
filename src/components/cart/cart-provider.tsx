"use client";

import Image from "next/image";
import Link from "next/link";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useLocalPreference } from "@/lib/use-local-preference";

type CartCourse = { id: string; title: string; image: string; price: number };
type CartContextValue = {
  items: CartCourse[];
  openCart: () => void;
  addCourse: (id: string, source: HTMLElement) => void;
};
const CartContext = createContext<CartContextValue | null>(null);
const currency = (amount: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("Cart components must be inside CartProvider.");
  return cart;
}

function flyToCart(course: CartCourse, source: HTMLElement) {
  if (reduceMotion()) return;
  const target = document.querySelector<HTMLElement>("[data-cart-trigger]");
  if (!target) return;
  const start = source.getBoundingClientRect();
  const finish = target.getBoundingClientRect();
  const x = start.left + start.width / 2 - 40;
  const y = start.top + start.height / 2 - 28;
  const dx = finish.left + finish.width / 2 - x - 40;
  const dy = Math.max(48, finish.top + finish.height / 2) - y - 28;
  const ghost = document.createElement("div");
  ghost.setAttribute("aria-hidden", "true");
  ghost.dataset.cartFlight = "true";
  Object.assign(ghost.style, {
    position: "fixed",
    left: `${x}px`,
    top: `${y}px`,
    width: "80px",
    height: "56px",
    borderRadius: "12px",
    backgroundImage: `url("${course.image}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    pointerEvents: "none",
    zIndex: "100",
    boxShadow: "0 12px 32px #003be240",
    border: "2px solid #d4fb20",
  });
  document.body.append(ghost);
  const animation = ghost.animate(
    [
      { transform: "translate(0, 0) scale(1)", opacity: 1 },
      {
        transform: `translate(${dx * 0.45}px, ${Math.min(-70, dy * 0.65)}px) scale(.85)`,
        opacity: 0.95,
        offset: 0.45,
      },
      { transform: `translate(${dx}px, ${dy}px) scale(.15)`, opacity: 0.2 },
    ],
    { duration: 700, easing: "cubic-bezier(.22,1,.36,1)", fill: "forwards" },
  );
  void animation.finished
    .then(() => {
      target.animate(
        [{ transform: "scale(1)" }, { transform: "scale(1.18)" }, { transform: "scale(1)" }],
        { duration: 280 },
      );
    })
    .catch(() => {})
    .finally(() => ghost.remove());
}

export function CartProvider({
  catalog,
  children,
}: {
  catalog: CartCourse[];
  children: ReactNode;
}) {
  const [stored, setStored] = useLocalPreference("bytespace:cart:v1");
  const ids = useMemo(() => {
    try {
      const value: unknown = JSON.parse(stored || "[]");
      return Array.isArray(value)
        ? [
            ...new Set(
              value.filter(
                (id): id is string =>
                  typeof id === "string" && catalog.some((course) => course.id === id),
              ),
            ),
          ]
        : [];
    } catch {
      return [];
    }
  }, [stored, catalog]);
  const items = ids.flatMap((id) => {
    const course = catalog.find((item) => item.id === id);
    return course ? [course] : [];
  });
  const total = items.reduce((sum, course) => sum + Math.round(course.price * 100), 0) / 100;
  const [receipt, setReceipt] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationRef = useRef<Animation | null>(null);
  const purchaseLock = useRef(false);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
      animationRef.current?.cancel();
    },
    [],
  );

  function announce(message: string) {
    setAnnouncement(message);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAnnouncement(""), 4000);
  }
  function openCart() {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    setReceipt(0);
    purchaseLock.current = false;
    dialog.showModal();
    animationRef.current =
      panelRef.current?.animate(
        [{ transform: "translateX(100%)" }, { transform: "translateX(0)" }],
        { duration: reduceMotion() ? 0 : 300, easing: "cubic-bezier(.22,1,.36,1)" },
      ) || null;
  }
  function closeCart() {
    animationRef.current?.cancel();
    const animation = panelRef.current?.animate(
      [{ transform: "translateX(0)" }, { transform: "translateX(100%)" }],
      { duration: reduceMotion() ? 0 : 220, easing: "ease-in", fill: "forwards" },
    );
    animationRef.current = animation || null;
    const finish = () => {
      dialogRef.current?.close();
      animation?.cancel();
    };
    if (animation) void animation.finished.then(finish).catch(() => {});
    else finish();
  }
  function addCourse(id: string, source: HTMLElement) {
    const course = catalog.find((item) => item.id === id);
    if (!course) return;
    if (ids.includes(id)) {
      openCart();
      return;
    }
    setStored(JSON.stringify([...ids, id]));
    setReceipt(0);
    window.dispatchEvent(new Event("bytespace:cart-added"));
    requestAnimationFrame(() => flyToCart(course, source));
    announce(`${course.title} added to your cart.`);
  }
  function purchase() {
    if (!items.length || purchaseLock.current) return;
    purchaseLock.current = true;
    setReceipt(items.length);
    setStored("[]");
    setAnnouncement("");
    requestAnimationFrame(() => successRef.current?.focus());
  }

  return (
    <CartContext.Provider value={{ items, openCart, addCourse }}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-none fixed bottom-5 left-1/2 z-[60] w-max max-w-[calc(100%-40px)] -translate-x-1/2 rounded-2xl bg-shuttle-ink px-5 py-3 text-center text-sm text-white shadow-lg transition-opacity motion-reduce:transition-none ${announcement ? "opacity-100" : "opacity-0"}`}
      >
        {announcement}
      </div>
      <dialog
        data-cart-drawer
        ref={dialogRef}
        aria-labelledby="cart-title"
        onCancel={(event) => {
          event.preventDefault();
          closeCart();
        }}
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden bg-transparent p-0 text-shuttle-ink backdrop:bg-black/45"
      >
        <div aria-hidden="true" onClick={closeCart} className="absolute inset-0" />
        <aside
          ref={panelRef}
          className="absolute inset-y-0 right-0 flex w-full max-w-[460px] flex-col bg-white shadow-2xl"
        >
          <div className="flex items-center justify-between border-b px-5 py-5 sm:px-7">
            <h2 id="cart-title" className="font-heading text-2xl font-semibold">
              Your cart <span className="text-base text-shuttle-muted">({items.length})</span>
            </h2>
            <button
              type="button"
              onClick={closeCart}
              aria-label="Close cart"
              className="flex size-11 items-center justify-center rounded-full bg-shuttle-soft text-2xl hover:bg-gray-200"
            >
              ×
            </button>
          </div>
          {receipt > 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center px-7 text-center">
              <span
                aria-hidden="true"
                className="flex size-20 items-center justify-center rounded-full bg-electric-lime text-4xl"
              >
                ✓
              </span>
              <h3
                ref={successRef}
                tabIndex={-1}
                className="mt-6 font-heading text-2xl font-semibold outline-none"
              >
                {receipt === 1
                  ? "Your course was purchased successfully!"
                  : "Your courses were purchased successfully!"}
              </h3>
              <p className="mt-4 text-shuttle-muted">
                Demo purchase complete. No payment was collected.
              </p>
              <button
                onClick={closeCart}
                className="mt-7 rounded-full bg-electric-lime px-6 py-3 font-medium"
              >
                Continue exploring
              </button>
            </div>
          ) : items.length ? (
            <>
              <ul className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain p-5 sm:p-7">
                {items.map((course) => (
                  <li key={course.id} className="flex gap-4 border-b pb-5">
                    <Image
                      src={course.image}
                      alt=""
                      width={100}
                      height={72}
                      className="h-[72px] w-24 shrink-0 rounded-xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <Link
                        onClick={closeCart}
                        href={`/courses/${course.id}`}
                        className="font-medium hover:text-persian-blue"
                      >
                        {course.title}
                      </Link>
                      <p className="mt-1 font-bold text-persian-blue">{currency(course.price)}</p>
                      <button
                        onClick={() => {
                          setStored(JSON.stringify(ids.filter((id) => id !== course.id)));
                          announce(`${course.title} removed from your cart.`);
                        }}
                        aria-label={`Remove ${course.title}`}
                        className="mt-2 text-sm text-shuttle-muted underline hover:text-shuttle-ink"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-t p-5 pb-[max(20px,env(safe-area-inset-bottom))] sm:p-7">
                <div className="flex justify-between text-xl font-bold">
                  <span>
                    Total{" "}
                    <span className="text-sm font-normal text-shuttle-muted">
                      ({items.length} {items.length === 1 ? "course" : "courses"})
                    </span>
                  </span>
                  <span data-cart-total>{currency(total)}</span>
                </div>
                <p className="mt-3 text-sm text-shuttle-muted">
                  Demo checkout — no payment is collected.
                </p>
                <button
                  onClick={purchase}
                  className="mt-5 w-full rounded-full bg-electric-lime px-6 py-3 font-medium hover:brightness-95"
                >
                  Purchase
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center p-7 text-center">
              <h3 className="font-heading text-xl">Your cart is empty</h3>
              <p className="mt-3 text-shuttle-muted">
                Find a course you love and select Enroll Now to add it here.
              </p>
              <button onClick={closeCart} className="mt-6 rounded-full bg-electric-lime px-6 py-3">
                Keep exploring
              </button>
            </div>
          )}
        </aside>
      </dialog>
    </CartContext.Provider>
  );
}
