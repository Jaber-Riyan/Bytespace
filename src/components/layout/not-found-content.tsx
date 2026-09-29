import Link from "next/link";

export function NotFoundContent() {
  return (
    <main className="grid min-h-[60vh] place-items-center bg-brand-cream px-6 py-20 text-center">
      <div>
        <p className="text-sm font-semibold text-brand-purple">404</p>
        <h1 className="mt-4 text-5xl font-semibold">Page not found</h1>
        <Link href="/" className="mt-8 inline-block rounded-xl bg-brand-purple px-5 py-3 text-white">Back home</Link>
      </div>
    </main>
  );
}