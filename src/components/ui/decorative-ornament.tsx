import Image from "next/image";

type DecorativeOrnamentProps = {
  image: string;
  mask: string;
  color: "lime" | "white";
  className: string;
};

export function DecorativeOrnament({ image, mask, color, className }: DecorativeOrnamentProps) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
      <Image src={image} alt="" fill sizes="(max-width: 1024px) 180px, 390px" className="object-contain" />
      <div
        className={`absolute inset-0 mix-blend-hard-light ${color === "lime" ? "bg-electric-lime" : "bg-shuttle-soft"}`}
        style={{
          maskImage: `url("${mask}")`,
          maskSize: "100% 100%",
          maskRepeat: "no-repeat",
        }}
      />
    </div>
  );
}
