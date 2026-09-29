import { ProgressBar } from "@/components/ui/progress-bar";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { CourseCard } from "@/components/course/course-card";
import { StudentProofCard } from "@/components/marketing/student-proof-card";
import { DecorativeOrnament } from "@/components/ui/decorative-ornament";
import { courses } from "@/data/courses";

const growthAsset = (name: string) => `/images/growth/${name}`;

function GrowthFeatureRow({
  children,
  visual,
  reverse = false,
}: {
  children: ReactNode;
  visual: ReactNode;
  reverse?: boolean;
}) {
  return (
    <div
      className={`grid items-center gap-10 min-[1360px]:gap-0 ${reverse ? "min-[1360px]:grid-cols-[541px_580px] min-[1360px]:gap-x-[79px]" : "min-[1360px]:grid-cols-[574px_621px] min-[1360px]:gap-x-[63px]"}`}
    >
      <div className={reverse ? "min-[1360px]:order-2" : ""}>{children}</div>
      <div className={reverse ? "min-[1360px]:order-1" : ""}>{visual}</div>
    </div>
  );
}

function LearningProgressCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-[232px] rounded-[16px] bg-white p-4 text-shuttle-ink shadow-sm backdrop-blur-[10px] ${className}`}
    >
      <p className="text-[14px] font-medium leading-6">Learning Progress</p>
      <p className="mt-2 font-heading text-[48px] font-semibold leading-[1.2] tracking-[-0.01em]">
        55%
      </p>
      <ProgressBar value={55} className="mt-2" />
    </div>
  );
}

function LearnerVisual() {
  return (
    <>
      <div className="relative hidden h-[552px] w-[621px] min-[1360px]:block">
        <div className="absolute left-0 top-0 w-[373px]">
          <CourseCard course={courses[0]} />
        </div>
        <Image
          src={growthAsset("student.png")}
          alt="Student holding a tablet while learning"
          width={577}
          height={540}
          className="pointer-events-none absolute left-0 top-3 z-10 h-[540px] w-[577px] object-cover drop-shadow-[18px_30px_25px_rgba(0,0,0,0.15)]"
        />
        <LearningProgressCard className="absolute left-[345px] top-[213px] z-20" />
        <DecorativeOrnament
          image={growthAsset("ornament-top.png")}
          mask={growthAsset("ornament-top-mask.png")}
          color="lime"
          className="left-[406px] top-[67px] z-20 size-[215px]"
        />
      </div>
      <div className="relative mx-auto h-[390px] w-full max-w-[390px] min-[1360px]:hidden">
        <Link
          href="/courses/learn-figma"
          className="absolute left-0 top-0 h-[185px] w-[70%] overflow-hidden rounded-[20px] border border-[#ced0d3] bg-white p-2"
        >
          <Image
            src="/images/courses/figma.png"
            alt="Learn Figma from Basic course"
            width={341}
            height={195}
            className="h-full w-full rounded-[12px] object-cover"
          />
        </Link>
        <Image
          src={growthAsset("student.png")}
          alt="Student holding a tablet while learning"
          width={516}
          height={483}
          className="pointer-events-none absolute bottom-0 left-[3%] z-10 h-auto w-[92%] drop-shadow-[12px_20px_18px_rgba(0,0,0,0.15)]"
        />
        <div className="absolute bottom-5 right-0 z-20 w-[150px] rounded-[16px] bg-white p-3 text-shuttle-ink shadow-md">
          <p className="text-[11px] font-medium">Learning Progress</p>
          <p className="mt-1 font-heading text-[30px] font-semibold leading-[1.2]">55%</p>
          <ProgressBar value={55} className="mt-2 h-1.5" />
        </div>
      </div>
    </>
  );
}

function RevenueBadge({
  title,
  period,
  value,
  compact = false,
  className = "",
}: {
  title: string;
  period: string;
  value: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[16px] bg-persian-blue p-4 text-white shadow-sm ${compact ? "w-[134px]" : "w-[232px]"} ${className}`}
    >
      <p className="text-[16px] font-medium leading-[1.2]">{title}</p>
      <p className="text-[10px] leading-[1.2]">{period}</p>
      <p className="mt-2 font-heading text-[24px] font-semibold leading-8">{value}</p>
      {compact ? (
        <span className="mt-2 inline-block rounded-full bg-electric-lime px-2 py-0.5 text-[10px] font-medium text-shuttle-ink">
          +12$
        </span>
      ) : (
        <div className="mt-2 h-2 rounded-full bg-white">
          <div className="h-full w-[56%] rounded-full bg-electric-lime" />
        </div>
      )}
    </div>
  );
}

function CreatorVisual() {
  return (
    <>
      <div className="relative hidden h-[596px] w-[541px] min-[1360px]:block">
        <RevenueBadge
          title="Total Revenue"
          period="July 1-28"
          value="$120.29"
          className="absolute left-0 top-[44px]"
        />
        <RevenueBadge
          title="Year to Date"
          period="2023"
          value="$1,200.38"
          compact
          className="absolute left-0 top-[194px]"
        />
        <div className="pointer-events-none absolute left-[28px] top-0 z-10 h-[596px] w-[435px] overflow-hidden drop-shadow-[18px_30px_25px_rgba(0,0,0,0.15)]">
          <Image
            src={growthAsset("creator.png")}
            alt="Course creator holding a tablet"
            width={683}
            height={683}
            className="absolute left-[-124px] top-0 h-[683px] w-[683px] max-w-none"
          />
        </div>
        <StudentProofCard className="absolute left-[283px] top-[413px] z-20" />
        <DecorativeOrnament
          image={growthAsset("ornament-bottom.png")}
          mask={growthAsset("ornament-bottom-mask.png")}
          color="lime"
          className="left-[305px] top-[114px] z-20 size-[215px]"
        />
      </div>
      <div className="relative mx-auto h-[420px] w-full max-w-[390px] min-[1360px]:hidden">
        <RevenueBadge
          title="Total Revenue"
          period="July 1-28"
          value="$120.29"
          className="absolute left-0 top-4 scale-[0.7] origin-top-left"
        />
        <RevenueBadge
          title="Year to Date"
          period="2023"
          value="$1,200.38"
          compact
          className="absolute left-0 top-[125px] scale-[0.8] origin-top-left"
        />
        <Image
          src={growthAsset("creator.png")}
          alt="Course creator holding a tablet"
          width={500}
          height={500}
          className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-auto w-[min(100%,390px)] -translate-x-1/2 drop-shadow-[12px_20px_18px_rgba(0,0,0,0.15)]"
        />
        <StudentProofCard className="absolute bottom-0 right-0 z-20" />
      </div>
    </>
  );
}

const benefits = [
  "Share Your Expertise",
  "Monetize Your Passion",
  "Flexibility and Autonomy",
  "Build a Community",
];

export function GrowthSection() {
  return (
    <section
      aria-label="Professional growth with ByteSpace"
      className="relative overflow-hidden bg-[#fafafa] py-20 min-[1360px]:py-[120px]"
    >
      <Image
        src={growthAsset("background.svg")}
        alt=""
        width={2536}
        height={2471}
        className="pointer-events-none absolute left-1/2 top-[-506px] h-[2471px] w-[2536px] max-w-none -translate-x-1/2"
      />
      <Image
        src={growthAsset("bottom-glow.svg")}
        alt=""
        width={752}
        height={752}
        className="pointer-events-none absolute left-[-327px] top-[906px] h-[752px] w-[752px] max-w-none"
      />
      <Container className="relative">
        <GrowthFeatureRow visual={<LearnerVisual />}>
          <div>
            <h2 className="max-w-[577px] font-heading text-[clamp(32px,4vw,44px)] font-semibold leading-[1.2] tracking-[-0.01em] text-shuttle-ink">
              Your Path to Professional Growth Starts Here!
            </h2>
            <p className="mt-8 max-w-[477px] text-[16px] leading-[1.6] text-[#4b4c53] sm:text-[18px] min-[1360px]:mt-10">
              Explore our curated selection of courses tailored to enhance your capabilities and
              accelerate your career journey. Whether you are looking to sharpen specific skills,
              gain industry expertise, or embark on a new career path entirely, we have the
              resources you need.
            </p>
            <div className="mt-8 flex flex-wrap gap-8 sm:gap-14 min-[1360px]:mt-10">
              {[
                ["12K", "Students"],
                ["70+", "Courses"],
                ["16", "Creators"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="font-heading text-[30px] font-semibold leading-[44px] tracking-[-0.01em] text-persian-blue sm:text-[36px]">
                    {value}
                  </p>
                  <p className="text-[16px] leading-[1.6] text-[#4b4c53] sm:text-[18px]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </GrowthFeatureRow>
        <div className="mt-20 min-[1360px]:mt-[72px]">
          <GrowthFeatureRow reverse visual={<CreatorVisual />}>
            <div>
              <h2 className="max-w-[391px] font-heading text-[clamp(32px,4vw,44px)] font-semibold leading-[1.2] tracking-[-0.01em] text-shuttle-ink">
                Create &amp; Manage Courses Easily.
              </h2>
              <p className="mt-8 max-w-[574px] text-[16px] leading-[1.6] text-[#4b4c53] sm:text-[18px] min-[1360px]:mt-10">
                <strong className="font-bold text-shuttle-ink">ByteSpace</strong> supports
                individuals or entities in the creation, publication, and administration of
                educational courses.
              </p>
              <ul className="mt-8 space-y-4 min-[1360px]:mt-10">
                {benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-center gap-2 text-[16px] font-medium text-shuttle-ink sm:text-[18px]"
                  >
                    <Image src={growthAsset("check.svg")} alt="" width={24} height={24} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </GrowthFeatureRow>
        </div>
      </Container>
    </section>
  );
}
