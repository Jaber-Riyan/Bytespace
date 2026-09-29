import type { ButtonHTMLAttributes } from "react";
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" };
export function Button({ className = "", variant = "primary", ...props }: ButtonProps) { const styles = variant === "primary" ? "bg-brand-purple text-white hover:bg-brand-purple-dark" : "border border-brand-purple/20 bg-white text-brand-ink hover:border-brand-purple/50"; return <button className={`rounded-xl px-5 py-3 font-medium ${styles} ${className}`} {...props} />; }
