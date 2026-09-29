"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/ui/logo";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Creators", href: "/creators" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const isHeroTop = (pathname === "/" || pathname === "/courses" || /^\/courses\/[^/]+(?:\/(?:lessons|reviews))?$/.test(pathname) || /^\/creators\/[^/]+$/.test(pathname)) && !scrolled;
  const ink = isHeroTop ? "text-shuttle-soft hover:text-electric-lime" : "text-shuttle-ink hover:text-persian-blue";

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMenuOpen(false));
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    let previousY = window.scrollY;
    let directionDistance = 0;
    let frame = 0;
    let hideTimer: number | undefined;
    const hero = pathname === "/" ? document.querySelector('[aria-labelledby="hero-title"]') : null;

    const cancelHide = () => {
      if (hideTimer) window.clearTimeout(hideTimer);
      hideTimer = undefined;
    };
    const update = () => {
      const currentY = window.scrollY;
      const movement = currentY - previousY;
      previousY = currentY;
      frame = 0;

      if (currentY <= 48) {
        cancelHide();
        directionDistance = 0;
        setScrolled(false);
        setVisible(true);
        return;
      }

      setScrolled(true);
      const heroOnScreen = hero && hero.getBoundingClientRect().bottom > 0;
      if (menuOpen || heroOnScreen) {
        cancelHide();
        directionDistance = 0;
        setVisible(true);
        return;
      }

      if (movement === 0) return;
      directionDistance = Math.sign(movement) === Math.sign(directionDistance)
        ? directionDistance + movement
        : movement;

      if (directionDistance <= -8) {
        cancelHide();
        setVisible(true);
        directionDistance = 0;
      } else if (directionDistance >= 8) {
        if (pathname === "/") {
          cancelHide();
          setVisible(false);
        } else if (!hideTimer) {
          hideTimer = window.setTimeout(() => {
            setVisible(false);
            hideTimer = undefined;
          }, 420);
        }
        directionDistance = 0;
      }
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    frame = window.requestAnimationFrame(() => {
      previousY = window.scrollY;
      setScrolled(previousY > 48);
      setVisible(true);
      frame = 0;
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      cancelHide();
    };
  }, [pathname, menuOpen]);

  return (
    <header className="pointer-events-none sticky top-0 z-50 h-[120px]" aria-label="Site header">
      <div
        className={`site-header-shell pointer-events-auto absolute left-1/2 ${scrolled ? "top-3 h-[72px] w-[calc(100%-32px)] max-w-[1200px] rounded-[24px] bg-white/95 shadow-[0_12px_36px_rgba(22,31,68,0.16)] backdrop-blur-xl" : "top-0 h-[80px] w-full bg-transparent lg:h-[120px]"}`}
        data-scroll-state={scrolled ? (visible ? "floating" : "hidden") : "top"}
        style={{ transform: visible ? "translate(-50%, 0)" : "translate(-50%, calc(-100% - 24px))" }}
      >
        <Container className="relative flex h-full items-center justify-between">
          <Logo tone={isHeroTop ? "light" : "dark"} />

          <nav aria-label="Primary navigation" className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 gap-6 text-[16px] lg:flex">
            {navigation.map(({ label, href }) => {
              const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return <Link key={href} href={href} aria-current={active ? "page" : undefined} className={`${ink} ${active ? "font-medium" : ""} focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current`}>{label}</Link>;
            })}
          </nav>

          <div className={`hidden items-center gap-6 text-[16px] lg:flex ${ink}`}>
            <Link href="/sign-in" className="focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current">Sign In</Link>
            <Link href="/register" className="focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current">Join Us</Link>
            <Link href="/courses" aria-label="Browse courses" className={`${isHeroTop ? "" : "hidden"} site-browse-link focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current`}><Image src="/images/hero/imgStyleOutlined1.svg" alt="" width={24} height={24} /></Link>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className={`inline-flex size-11 items-center justify-center rounded-xl border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current lg:hidden ${isHeroTop ? "border-white/35 text-white" : "border-[#ced0d3] text-shuttle-ink"}`}
          >
            <span className="relative block h-5 w-5" aria-hidden="true">
              <span className={`absolute left-0 top-[3px] h-[2px] w-5 rounded-full bg-current transition-transform duration-200 ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[9px] h-[2px] w-5 rounded-full bg-current transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 top-[15px] h-[2px] w-5 rounded-full bg-current transition-transform duration-200 ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </span>
          </button>
        </Container>

        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          aria-hidden={!menuOpen}
          data-open={menuOpen}
          className={`site-mobile-menu absolute top-full mt-2 rounded-[20px] border border-[#ced0d3] bg-white p-3 text-shuttle-ink shadow-[0_16px_40px_rgba(22,31,68,0.2)] lg:hidden ${scrolled ? "left-0 right-0" : "left-4 right-4"}`}
        >
          {navigation.map(({ label, href }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return <Link key={href} href={href} onClick={() => setMenuOpen(false)} aria-current={active ? "page" : undefined} className={`block rounded-xl px-4 py-3 text-[16px] hover:bg-shuttle-soft ${active ? "bg-shuttle-soft font-medium text-persian-blue" : ""}`}>{label}</Link>;
          })}
          <div className="my-2 border-t border-[#ced0d3]" />
          <Link href="/sign-in" onClick={() => setMenuOpen(false)} className="block rounded-xl px-4 py-3 text-[16px] hover:bg-shuttle-soft">Sign In</Link>
          <Link href="/register" onClick={() => setMenuOpen(false)} className="mt-1 block rounded-xl bg-electric-lime px-4 py-3 text-center text-[16px] font-medium hover:bg-[#c9ed1e]">Join Us</Link>
        </nav>
      </div>
    </header>
  );
}