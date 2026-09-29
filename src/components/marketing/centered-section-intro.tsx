export function CenteredSectionIntro({
  id,
  title,
  description,
  size = "large",
}: {
  id: string;
  title: string;
  description: string;
  size?: "large" | "medium";
}) {
  return (
    <div className="mx-auto max-w-[917px] text-center">
      <h2
        id={id}
        className={`mx-auto font-heading font-semibold leading-[1.2] text-[#040819] ${size === "large" ? "max-w-[588px] text-[clamp(32px,4vw,44px)]" : "max-w-[917px] text-[clamp(30px,3.4vw,36px)] min-[1000px]:whitespace-nowrap"}`}
      >
        {title}
      </h2>
      <p className="mt-4 text-[16px] leading-[1.6] text-shuttle-muted sm:text-[18px]">
        {description}
      </p>
    </div>
  );
}