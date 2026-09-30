import Image from "next/image";
import Link from "next/link";
import { CourseCard } from "@/components/course/course-card";
import { StudentProofCard } from "@/components/marketing/student-proof-card";
import { DecorativeOrnament } from "@/components/ui/decorative-ornament";
import { courses } from "@/data/courses";

const copy = {
  register: {
    title: "Sign up and come in",
    description:
      "The registration process is straightforward, uncomplicated, and efficient, allowing users to sign up quickly, easily, and at no cost",
  },
  signIn: {
    title: "Sign in with ease",
    description:
      "Experience a seamless and efficient sign-in process that grants you instant access to a world of knowledge.",
  },
} as const;

export function AuthShowcase({ mode }: { mode: "register" | "signIn" }) {
  const digitalAsset = courses.find((course) => course.id === "build-digital-asset");
  const bigData = courses.find((course) => course.id === "power-of-big-data");

  return (
    <div className="relative xl:h-[1024px]">
      <Link
        href="/"
        aria-label="ByteSpace home"
        className="inline-block xl:absolute xl:left-0 xl:top-[35px]"
      >
        <Image src="/images/hero/imgVector.svg" alt="" width={29} height={32} priority />
      </Link>
      <div className="mt-8 max-w-[490px] text-shuttle-soft xl:absolute xl:left-0 xl:top-[121px] xl:mt-0">
        <h2 className="text-[20px] font-medium leading-[28px]">{copy[mode].title}</h2>
        <p className="mt-4 max-w-[470px] text-[18px] leading-[1.6] text-[#e5e6e8]">
          {copy[mode].description}
        </p>
      </div>
      {digitalAsset && bigData && (
        <div aria-hidden="true" inert className="hidden xl:block">
          <div className="pointer-events-none absolute left-0 top-[395px] z-10 w-[373px] rounded-[24px] shadow-[0_18px_40px_rgba(0,20,100,0.18)]">
            <CourseCard course={digitalAsset} ratingOrder="star-last" />
          </div>
          <div className="pointer-events-none absolute left-[114px] top-[306px] z-20 w-[373px] rounded-[24px] shadow-[0_18px_40px_rgba(0,20,100,0.18)]">
            <CourseCard course={bigData} ratingOrder="star-last" />
          </div>
          <DecorativeOrnament
            image="/images/hero/imgCone012.png"
            mask="/images/hero/imgRectangle15.png"
            color="lime"
            className="left-[44px] top-[333px] z-30 size-[130px]"
          />
          <DecorativeOrnament
            image="/images/hero/imgCone14.png"
            mask="/images/hero/imgRectangle17.png"
            color="lime"
            className="left-0 top-[718px] z-30 size-[130px]"
          />
          <DecorativeOrnament
            image="/images/hero/imgImage1.png"
            mask="/images/hero/imgRectangle.png"
            color="white"
            className="left-[386px] top-[663px] z-40 size-[120px]"
          />
          <StudentProofCard
            tone="lime"
            starColor="blue"
            className="pointer-events-none absolute left-[228px] top-[740px] z-20"
            numberColor="bg-black/90 text-white"
          />
        </div>
      )}
    </div>
  );
}
