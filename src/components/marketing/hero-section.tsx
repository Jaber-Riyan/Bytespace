import { ProgressBar } from "@/components/ui/progress-bar";
import Image from "next/image";
import { CourseSearch } from "@/components/course/course-search";
import { StudentProofCard } from "@/components/marketing/student-proof-card";
import { DecorativeOrnament } from "@/components/ui/decorative-ornament";

const asset = (name: string) => `/images/hero/${name}`;

export function HeroSection() {
  return (
    <section
      className="relative -mt-[120px] min-h-[990px] overflow-hidden bg-persian-blue text-white lg:h-[1024px]"
      aria-labelledby="hero-title">
      <div className="relative mx-auto min-h-[990px] max-w-[1440px] lg:h-full lg:min-h-0">
        <Image
          src={asset("imgGroup4.svg")}
          alt=""
          width={1442}
          height={1026}
          priority
          className="pointer-events-none absolute left-1/2 top-0 max-w-none -translate-x-1/2"
        />
        <Image
          src={asset("imgEllipse7.svg")}
          alt=""
          width={1149}
          height={1149}
          priority
          className="pointer-events-none absolute left-1/2 top-[700px] max-w-none lg:top-[582px] -translate-x-1/2"
        />

        <div className="hidden lg:block">
          <DecorativeOrnament
            image={asset("imgImage2.png")}
            mask={asset("imgRectangle1.png")}
            color="lime"
            className="left-[calc(50%-838px)] top-[221px] size-[385px]"
          />
          <DecorativeOrnament
            image={asset("imgImage2.png")}
            mask={asset("imgRectangle2.png")}
            color="white"
            className="left-[calc(50%-362px)] top-[477px] size-[175px] -scale-x-100"
          />
          <DecorativeOrnament
            image={asset("imgCone012.png")}
            mask={asset("imgRectangle15.png")}
            color="white"
            className="left-[calc(50%-702px)] top-[682px] size-[342px]"
          />
          <DecorativeOrnament
            image={asset("imgCone13.png")}
            mask={asset("imgRectangle16.png")}
            color="lime"
            className="left-[calc(50%+511px)] top-[221px] size-[370px]"
          />
          <DecorativeOrnament
            image={asset("imgCone14.png")}
            mask={asset("imgRectangle17.png")}
            color="white"
            className="left-[calc(50%+386px)] top-[464px] size-[188px]"
          />
          <DecorativeOrnament
            image={asset("imgImage1.png")}
            mask={asset("imgRectangle.png")}
            color="white"
            className="left-[calc(50%+407px)] top-[672px] size-[330px]"
          />
        </div>


        <div className="relative z-20 mx-auto mt-[164px] flex w-[calc(100%-40px)] max-w-[1200px] flex-col items-center text-center lg:absolute lg:left-1/2 lg:top-[169px] lg:mt-0 lg:-translate-x-1/2">
          <h1
            id="hero-title"
            className="max-w-[935px] font-heading text-[clamp(42px,5vw,72px)] font-semibold leading-[1.2] tracking-[-0.01em]">
            Get Access to Hundreds Courses Available
          </h1>
          <p className="mt-8 max-w-[900px] text-[18px] leading-[1.6] text-[#e5e6e8]">
            Unlock your creativity, gain valuable knowledge, and grow your
            business with our wide range of courses.
          </p>
          <CourseSearch className="mt-[60px]" />
        </div>

        <div className="relative z-10 mx-auto mt-8 h-[430px] w-full max-w-[500px] lg:contents">
          <Image
            src={asset("learner.png")}
            alt="Smiling student learning with a laptop"
            width={578}
            height={541}
            priority
            className="pointer-events-none absolute left-1/2 top-[52px] z-10 h-auto w-[min(95vw,390px)] -translate-x-1/2 drop-shadow-2xl lg:top-[512px] lg:w-[578px]"
          />

          <div className="absolute left-3 top-[48px] z-20 w-[174px] rounded-[16px] bg-white p-3 text-shuttle-ink shadow-sm backdrop-blur-[10px] lg:left-[calc(50%-316px)] lg:top-[639px] lg:w-auto lg:p-4">
            <p className="text-[14px] font-medium leading-[18px] lg:text-[16px] lg:leading-[19px]">UI/UX Design</p>
            <p className="mt-1 text-[10px] leading-[15px] text-shuttle-muted lg:text-[12px] lg:leading-[19px]">
              200 Courses <span className="mx-1 lg:mx-2">•</span> 1000+ Students
            </p>
          </div>

          <div className="absolute right-3 top-[108px] z-20 w-[152px] rounded-[16px] bg-white p-3 text-shuttle-ink shadow-sm backdrop-blur-[10px] lg:left-[calc(50%+122px)] lg:right-auto lg:top-[651px] lg:w-[232px] lg:p-4">
            <p className="text-[11px] font-medium leading-[15px] lg:text-[14px] lg:leading-[17px]">
              Learning Progress
            </p>
            <p className="mt-1 font-heading text-[32px] font-semibold leading-[38px] tracking-[-0.01em] lg:mt-2 lg:text-[48px] lg:leading-[58px]">
              55%
            </p>
            <ProgressBar value={55} className="mt-2" />
          </div>

          <StudentProofCard className="absolute bottom-3 left-3 z-20 lg:bottom-auto lg:left-[calc(50%-392px)] lg:top-[837px]" />
        </div>
      </div>
    </section>
  );
}