import Link from "next/link";
import { CenteredSectionIntro } from "@/components/marketing/centered-section-intro";
import { Container } from "@/components/layout/container";

const learningPaths = [
  { label: "Design", category: "Graphic Design", icon: "design" },
  { label: "Development", category: "Web Development", icon: "development" },
  { label: "IT & Software", category: "Data Science", icon: "software" },
  {
    label: "Business",
    category: "Freelance & Entrepreneurship",
    icon: "business",
  },
  { label: "Marketing", category: "Marketing", icon: "marketing" },
  { label: "Photography", category: "Photography", icon: "photography" },
] as const;

function LearningPathIcon({ icon }: { icon: (typeof learningPaths)[number]["icon"] }) {
  const paths = {
    design: (
      <>
        <path d="M8 25.5 25.5 8l4.5 4.5L12.5 30H8v-4.5Z" />
        <path d="m22 11.5 4.5 4.5" />
      </>
    ),
    development: (
      <>
        <path d="m14 11-8 7 8 7" />
        <path d="m22 11 8 7-8 7" />
        <path d="m20 8-4 20" />
      </>
    ),
    software: (
      <>
        <rect x="5" y="7" width="26" height="21" rx="3" />
        <path d="M5 13h26M11 20h5m-5 4h10" />
      </>
    ),
    business: (
      <>
        <rect x="5" y="12" width="26" height="19" rx="3" />
        <path d="M13 12V8a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v4M5 20h26M16 19v3h4v-3" />
      </>
    ),
    marketing: (
      <>
        <path d="M7 21h5l14 7V8L12 15H7v6ZM26 13a5 5 0 0 1 0 10" />
        <path d="m11 21 2 9h5l-2-7" />
      </>
    ),
    photography: (
      <>
        <rect x="4" y="10" width="28" height="20" rx="3" />
        <path d="m11 10 2-4h10l2 4" />
        <circle cx="18" cy="20" r="5" />
      </>
    ),
  };
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 36 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-9"
    >
      {paths[icon]}
    </svg>
  );
}

function LearningPathCard({ path }: { path: (typeof learningPaths)[number] }) {
  return (
    <Link
      href={`/courses?category=${encodeURIComponent(path.category)}`}
      className="group flex h-[167px] w-full max-w-[167px] flex-col items-center justify-center gap-3 rounded-[24px] border border-[#ced0d3] bg-white text-center transition-[border-color,box-shadow,transform] hover:-translate-y-1 hover:border-persian-blue hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian-blue"
    >
      <span className="grid size-[60px] place-items-center rounded-[18px] bg-electric-lime text-black font-bold group-hover:bg-electric-lime/50">
        <LearningPathIcon icon={path.icon} />
      </span>
      <span className="px-2 text-[18px] font-medium leading-[24px] text-shuttle-ink">
        {path.label}
      </span>
    </Link>
  );
}

export function LearningPathsSection() {
  return (
    <section aria-labelledby="learning-paths-title" className="bg-white pb-[120px]">
      <Container>
        <CenteredSectionIntro
          id="learning-paths-title"
          size="medium"
          title="Explore Diverse Learning Paths at Bytespace"
          description="At Bytespace, we believe in empowering individuals through knowledge. Our diverse range of courses spans various fields, ensuring there's something for everyone. Unleash your potential and explore our carefully curated categories."
        />
        <div className="mt-[68px] grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-3 lg:flex lg:justify-between lg:gap-0">
          {learningPaths.map((path) => (
            <LearningPathCard key={path.label} path={path} />
          ))}
        </div>
      </Container>
    </section>
  );
}
