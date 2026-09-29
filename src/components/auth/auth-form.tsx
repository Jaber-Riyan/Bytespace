"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { FormField } from "@/components/ui/form-field";

type AuthMode = "register" | "signIn";

const content = {
  register: {
    eyebrow: "Create an Account",
    title: <>Welcome to<br />ByteSpace</>,
    button: "Continue",
    notice: "Account creation is not connected yet.",
  },
  signIn: {
    eyebrow: "Sign In",
    title: <>Welcome Back</>,
    button: "Sign In",
    notice: "Sign in is not connected yet.",
  },
};

function SocialAuthButton({ provider, onUnavailable }: { provider: "Facebook" | "Google"; onUnavailable: (provider: string) => void }) {
  return (
    <button
      type="button"
      aria-label={`Continue with ${provider}`}
      onClick={() => onUnavailable(provider)}
      className="flex size-[70px] items-center justify-center rounded-[16px] border border-[#e1e1e1] bg-white text-black transition-colors hover:border-persian-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian-blue"
    >
      {provider === "Facebook" ? (
        <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden="true">
          <circle cx="19" cy="19" r="17" fill="black" />
          <path d="M21.6 31V20.7h3.5l.5-4h-4v-2.5c0-1.2.4-2 2-2h2.2V8.7a27 27 0 0 0-3.2-.2c-3.3 0-5.5 2-5.5 5.7v2.5h-3.4v4h3.4V31h4.5Z" fill="white" />
        </svg>
      ) : <span aria-hidden="true" className="font-sans text-[39px] font-bold leading-none">G</span>}
    </button>
  );
}

export function AuthForm({ mode }: { mode: AuthMode }) {
  const [notice, setNotice] = useState("");
  const details = content[mode];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setNotice(details.notice);
  }

  return (
    <section aria-labelledby="auth-title" className="mt-9 flex min-h-[700px] w-full max-w-[580px] flex-col rounded-[24px] bg-white px-6 pb-10 pt-10 text-shuttle-ink shadow-[0_16px_38px_rgba(0,25,90,0.1)] sm:mx-auto sm:px-10 xl:mx-0 xl:mt-[120px] xl:h-[784px] xl:min-h-0 xl:px-[64px] xl:pb-[52px] xl:pt-[64px]">
      <p className="text-[16px] leading-[26px] text-persian-blue">{details.eyebrow}</p>
      <h1 id="auth-title" className="mt-1 font-heading text-[clamp(32px,4vw,44px)] font-semibold leading-[1.2] tracking-[-0.01em] text-shuttle-ink">{details.title}</h1>

      <form onSubmit={handleSubmit} className={`w-full ${mode === "register" ? "mt-[34px]" : "mt-[36px]"}`}>
        <div className="space-y-[18px]">
          {mode === "register" && <FormField label="Full Name" id="auth-name" name="name" type="text" placeholder="Jamie Davis" autoComplete="name" required />}
          <FormField label="Email" id="auth-email" name="email" type="email" placeholder="designer@example.com" autoComplete="email" required />
          <FormField label="Password" id="auth-password" name="password" type="password" placeholder="********" autoComplete={mode === "register" ? "new-password" : "current-password"} required />
        </div>
        <div className="mt-6 flex justify-end">
          <button type="submit" className="min-h-[46px] rounded-[24px] bg-electric-lime px-6 py-3 text-[18px] font-medium leading-[1.2] transition-colors hover:bg-[#c9ed1e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian-blue">{details.button}</button>
        </div>
      </form>

      {mode === "signIn" && (
        <div className="mt-[80px]">
          <div className="flex items-center gap-3 text-[14px] leading-[22px] text-[#8b8e93]"><span className="h-px flex-1 bg-[#dedfe1]" /><span>Or</span><span className="h-px flex-1 bg-[#dedfe1]" /></div>
          <div className="mt-[35px] flex justify-center gap-4">
            <SocialAuthButton provider="Facebook" onUnavailable={(provider) => setNotice(`${provider} sign in is not connected yet.`)} />
            <SocialAuthButton provider="Google" onUnavailable={(provider) => setNotice(`${provider} sign in is not connected yet.`)} />
          </div>
        </div>
      )}

      {notice && <p role="status" className="mt-4 text-center text-[14px] leading-[22px] text-persian-blue">{notice}</p>}
      <p className="mt-auto pt-8 text-center text-[14px] leading-[22px] text-[#82868e]">
        {mode === "register" ? <><span>Already have an account? </span><Link href="/sign-in" className="text-persian-blue hover:underline">Login</Link></> : <><span>New user? </span><Link href="/register" className="text-persian-blue hover:underline">Create an account</Link></>}
      </p>
    </section>
  );
}