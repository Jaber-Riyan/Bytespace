import { AuthShowcase } from "@/components/auth/auth-showcase";
import { AuthForm } from "@/components/auth/auth-form";

export function AuthScreen({ mode }: { mode: "register" | "signIn" }) {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-5 pb-10 pt-6 sm:px-8 xl:grid xl:min-h-[1024px] xl:grid-cols-[580px_580px] xl:gap-10 xl:px-0 xl:py-0">
      <AuthShowcase mode={mode} />
      <AuthForm mode={mode} />
    </div>
  );
}