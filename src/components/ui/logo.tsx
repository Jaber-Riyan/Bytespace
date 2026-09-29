import Image from "next/image";
import Link from "next/link";

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link
      href="/"
      aria-label="ByteSpace home"
      className={`inline-flex shrink-0 items-center gap-[8px] font-display text-[24px] font-bold leading-[30px] ${tone === "light" ? "text-shuttle-soft" : "text-shuttle-ink"}`}
    >
      <Image src="/images/hero/imgVector.svg" alt="" width={29} height={32} />
      <span>ByteSpace</span>
    </Link>
  );
}
