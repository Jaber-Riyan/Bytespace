import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/ui/logo";

const navigation = [
  ["Home", "/"],
  ["Courses", "/courses"],
  ["Creators", "/creators"],
] as const;

export function SiteHeader({
  variant = "default",
}: {
  variant?: "default" | "hero";
}) {
  const isHero = variant === "hero";
  const linkColor = isHero
    ? "text-shuttle-soft hover:text-electric-lime"
    : "text-brand-muted hover:text-brand-purple";

  return (
    <header
      className={`relative z-30 h-[120px] ${isHero ? "text-white" : "border-b border-brand-purple/10 bg-brand-cream/90"}`}>
      <Container className="relative flex h-full items-start justify-between pt-[30px] lg:items-center lg:pt-0">
        <Logo tone={isHero ? "light" : "dark"} />
        <nav
          aria-label="Primary navigation"
          className="absolute inset-x-0 top-[84px] flex justify-center gap-6 text-[16px] lg:inset-x-auto lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
          {navigation.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={href === "/" && isHero ? "page" : undefined}
              className={`${linkColor} ${href === "/" && isHero ? "font-medium" : ""}`}>
              {label}
            </Link>
          ))}
        </nav>
        <div
          className={`flex items-center gap-3 text-[16px] sm:gap-6 ${linkColor}`}>
          <Link href="/sign-in" className="hidden sm:inline">
            Sign In
          </Link>
          <Link href="/register">Join Us</Link>
          {isHero && (
            <Link href="/courses" aria-label="Browse courses">
              <Image
                src="/images/hero/imgStyleOutlined1.svg"
                alt=""
                width={24}
                height={24}
              />
            </Link>
          )}
        </div>
      </Container>
    </header>
  );
}
