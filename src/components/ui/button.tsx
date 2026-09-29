import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "lime";
};

const variants = {
  primary: "bg-brand-purple text-white hover:bg-brand-purple-dark",
  secondary: "border border-brand-purple/20 bg-white text-brand-ink hover:border-brand-purple/50",
  lime: "bg-electric-lime text-shuttle-ink hover:bg-[#c9ed1e]",
} as const;

export function Button({ className = "", variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-xl px-5 py-3 font-medium ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
