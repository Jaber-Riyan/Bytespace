import type { InputHTMLAttributes } from "react";

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
};

export function FormField({ label, id, className = "", ...inputProps }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-[14px] leading-[22px] text-shuttle-ink">
        {label}
      </label>
      <input
        id={id}
        className={`mt-2 h-[52px] w-full rounded-[12px] border border-[#e1e1e1] bg-white px-6 text-[16px] text-shuttle-ink outline-none placeholder:text-[#a4a7ad] focus-visible:border-persian-blue focus-visible:ring-2 focus-visible:ring-persian-blue/15 ${className}`}
        {...inputProps}
      />
    </div>
  );
}
