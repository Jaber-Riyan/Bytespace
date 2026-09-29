"use client";

import { useState, type FormEvent } from "react";

export function NewsletterForm() {
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setMessage("Newsletter signup will be available soon.");
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[504px]" aria-label="Newsletter signup">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Enter your email"
          className="h-[52px] min-w-0 w-full rounded-full border border-[#ced0d3] bg-white px-6 text-[16px] text-shuttle-ink outline-none placeholder:text-shuttle-ink focus-visible:border-persian-blue focus-visible:ring-2 focus-visible:ring-persian-blue/20 sm:w-[376px]"
        />
        <button
          type="submit"
          className="min-h-[46px] shrink-0 self-start rounded-[24px] bg-electric-lime px-6 py-3 text-[18px] font-medium leading-[1.2] text-shuttle-ink hover:bg-[#c9ed1e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian-blue"
        >
          Search
        </button>
      </div>
      <p className="mt-6 text-[12px] leading-[1.6] text-shuttle-ink">
        By subscribing, you agree to our Privacy Policy and consent to receive updates from our
        company.
      </p>
      {message && (
        <p role="status" className="mt-2 text-[12px] leading-[1.6] text-persian-blue">
          {message}
        </p>
      )}
    </form>
  );
}
