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

export function StudentProofCard({ className = "", tone = "white" }: { className?: string; tone?: "white" | "lime" }) {
  return (
    <div className={`w-[200px] rounded-[16px] p-3 lg:w-[258px] lg:p-4 text-shuttle-ink shadow-sm backdrop-blur-[10px] ${tone === "lime" ? "bg-electric-lime" : "bg-white"} ${className}`}>
      <div className="text-[14px] font-medium leading-[18px] lg:text-[16px] lg:leading-[19px]">Happy Students</div>
      <div className="flex items-center text-[11px] leading-[17px] lg:text-[12px] lg:leading-[19px]">
        <span>4.5</span>
        <span className="ml-1 text-shuttle-muted">(240)</span>
        <Image src="/images/hero/imgStar.svg" alt="" width={16} height={16} className="ml-1" />
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
        <span className="relative -ml-3 grid size-8 place-items-center lg:-ml-4 lg:size-[43px] bg-[url('/images/hero/imgEllipse8.svg')] bg-contain font-bold text-[12px]">
          2K+
        </span>
      </div>
    </div>
  );
}