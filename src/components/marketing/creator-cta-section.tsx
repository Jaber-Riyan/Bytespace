import Image from "next/image";
import Link from "next/link";
import { DecorativeOrnament } from "@/components/ui/decorative-ornament";

export function CreatorCtaSection() {
  return (
    <section
      aria-labelledby="creator-cta-title"
      className="relative flex min-h-[488px] items-center justify-center overflow-hidden bg-persian-blue px-5 py-16 text-shuttle-soft lg:h-[488px] lg:py-0"
    >
      <Image
        src="/images/creator-cta/background-grid.svg"
        alt=""
        width={1442}
        height={1026}
        className="pointer-events-none absolute left-1/2 top-0 h-[1026px] w-[1442px] max-w-none -translate-x-1/2"
      />
      <div className="hidden lg:block">
        <DecorativeOrnament
          image="/images/hero/imgCone14.png"
          mask="/images/hero/imgRectangle17.png"
          color="lime"
          className="left-[calc(50%+360px)] top-0 size-[188px]"
        />
        <DecorativeOrnament
          image="/images/growth/ornament-top.png"
          mask="/images/hero/imgRectangle.png"
          color="lime"
          className="left-[calc(50%+390px)] top-[289px] size-[330px]"
        />
        <DecorativeOrnament
          image="/images/growth/ornament-bottom.png"
          mask="/images/hero/imgRectangle1.png"
          color="lime"
          className="left-[calc(50%-838px)] top-[-162px] size-[385px]"
        />
        <DecorativeOrnament
          image="/images/growth/ornament-bottom.png"
          mask="/images/hero/imgRectangle2.png"
          color="white"
          className="left-[calc(50%-470px)] top-[5px] size-[175px] -scale-x-100"
        />
        <DecorativeOrnament
          image="/images/creator-cta/left-cone.png"
          mask="/images/creator-cta/left-cone-mask.png"
          color="white"
          className="left-[calc(50%-768px)] top-[225px] size-[188px]"
        />
        <DecorativeOrnament
          image="/images/hero/imgCone012.png"
          mask="/images/hero/imgRectangle15.png"
          color="lime"
          className="left-[calc(50%-700px)] top-[299px] size-[342px]"
        />
        <DecorativeOrnament
          image="/images/hero/imgCone13.png"
          mask="/images/hero/imgRectangle16.png"
          color="white"
          className="left-[calc(50%+506px)] top-[6px] size-[370px]"
        />
      </div>
      <div className="relative z-10 flex w-full max-w-[964px] flex-col items-center gap-8 text-center lg:gap-10">
        <h2
          id="creator-cta-title"
          className="max-w-[710px] font-heading text-[clamp(32px,4vw,44px)] font-semibold leading-[1.2] tracking-[-0.01em]"
        >
          Unlock Your Potential as a Creator with ByteSpace
        </h2>
        <p className="max-w-[964px] text-[16px] leading-[1.6] sm:text-[18px]">
          Experience the collaboration of numerous creators and an expanding selection of courses.
          Register now and become a part of a community comprising over 10,000 local and
          international creators. Utilize our Course Editor, and showcase your expertise by
          publishing your finest course on the ByteSpace Course Library.
        </p>
        <Link
          href="/register"
          className="inline-flex min-h-[46px] items-center justify-center rounded-[24px] bg-electric-lime px-6 py-3 text-[18px] font-medium leading-[1.2] text-shuttle-ink transition-colors hover:bg-[#c9ed1e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Join as Creator
        </Link>
      </div>
    </section>
  );
}
