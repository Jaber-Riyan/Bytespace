import Link from "next/link";

export function NotFoundContent() {
  return (
    <main
      data-header-theme="blue"
      data-not-found
      className="blue-grid relative -mt-[120px] flex min-h-[740px] flex-col items-center bg-persian-blue px-5 pt-[180px] pb-24 text-center text-white md:min-h-[958px] md:pt-[188px]"
    >
      <p
        aria-hidden="true"
        className="bg-linear-to-b from-electric-lime from-25% to-electric-lime/0 bg-clip-text pr-[.05em] text-[clamp(160px,32vw,480px)] leading-[.9] font-bold tracking-[-.06em] text-transparent"
      >
        404
      </p>
      <h1 className="relative -mt-4 max-w-[920px] md:-mt-20 font-sans text-[clamp(32px,5vw,72px)] font-bold leading-[1.15] tracking-tight">
        <span className="sr-only">Page not found. </span>The page you are looking for doesn’t exist
      </h1>
      <p className="mt-10 text-base text-white/75 sm:text-lg">
        Try to use a correct URL or go back to the homepage to start again.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-electric-lime px-6 py-3 font-medium text-shuttle-ink transition-colors hover:bg-[#c9ed1e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        Back to Home
      </Link>
    </main>
  );
}
