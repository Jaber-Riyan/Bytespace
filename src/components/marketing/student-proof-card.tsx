import Image from "next/image";

const students = [
  "imgEllipse.png",
  "imgEllipse1.png",
  "imgEllipse2.png",
  "imgEllipse3.png",
  "imgEllipse4.png",
  "imgEllipse5.png",
  "imgEllipse6.png",
] as const;

export function StudentProofCard({
  className = "",
  tone = "white",
  numberColor,
  starColor = "lime",
}: {
  className?: string;
  tone?: "white" | "lime";
  numberColor?: string;
  starColor?: "blue" | "lime";
}) {
  return (
    <div
      className={`w-[200px] rounded-[16px] p-3 lg:w-[258px] lg:p-4 text-shuttle-ink shadow-sm backdrop-blur-[10px] ${tone === "lime" ? "bg-electric-lime" : "bg-white"} ${className}`}
    >
      <div className="text-[14px] font-medium leading-[18px] lg:text-[16px] lg:leading-[19px]">
        Happy Students
      </div>
      <div className="flex items-center text-[11px] leading-[17px] lg:text-[12px] lg:leading-[19px]">
        <span>4.5</span>
        <span className="ml-1 text-shuttle-muted">(240)</span>
        <span
          aria-hidden="true"
          className={`ml-1 inline-block size-4 shrink-0 ${starColor === "blue" ? "bg-persian-blue" : "bg-electric-lime"}`}
          style={{
            mask: 'url("/images/hero/imgStar.svg") center / contain no-repeat',
            WebkitMask: 'url("/images/hero/imgStar.svg") center / contain no-repeat',
          }}
        />
      </div>
      <div className="mt-2 flex items-center">
        {students.map((student, index) => (
          <Image
            key={student}
            src={`/images/hero/${student}`}
            alt=""
            width={43}
            height={43}
            className={`relative size-8 rounded-full lg:size-[43px] ${index === 0 ? "" : "-ml-3 lg:-ml-4"}`}
          />
        ))}
        <span
          className={`relative -ml-3 grid place-items-center lg:-ml-6 lg:size-10.75 ${numberColor ? `${numberColor}` : "bg-electric-lime"} rounded-full font-bold text-[12px]`}
        >
          2K+
        </span>
      </div>
    </div>
  );
}
