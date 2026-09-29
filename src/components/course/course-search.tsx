import Image from "next/image";
import { Button } from "@/components/ui/button";

export function CourseSearch({
  className = "",
  defaultValue = "",
  parameters = {},
}: {
  className?: string;
  defaultValue?: string;
  parameters?: Record<string, string>;
}) {
  return (
    <form
      action="/courses"
      role="search"
      className={`flex w-full max-w-[581px] flex-col gap-3 sm:flex-row sm:gap-4 ${className}`}
    >
      {Object.entries(parameters)
        .filter(([key]) => key !== "q" && key !== "page")
        .map(([key, value]) => (
          <input key={key} type="hidden" name={key} value={value} />
        ))}
      <label className="flex h-[52px] min-w-0 flex-1 items-center gap-2 rounded-[24px] bg-white px-6 py-2 text-shuttle-muted">
        <Image src="/images/hero/imgStyleOutlined.svg" alt="" width={24} height={24} />
        <span className="sr-only">Search courses</span>
        <input
          type="search"
          name="q"
          defaultValue={defaultValue}
          placeholder="Course, topic, creator"
          className="w-full min-w-0 bg-transparent text-[18px] leading-[29px] text-shuttle-ink outline-none placeholder:text-shuttle-muted"
        />
      </label>
      <Button
        type="submit"
        variant="lime"
        className="h-[46px] self-center rounded-full! px-6 py-3 text-[18px] leading-[22px] sm:self-start"
      >
        Search
      </Button>
    </form>
  );
}
