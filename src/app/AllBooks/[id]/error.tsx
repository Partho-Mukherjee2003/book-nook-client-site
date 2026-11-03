"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * Route-level error boundary for /AllBooks/[id].
 * In this Next.js version the recovery prop is `retry` (not `reset`).
 */
export default function BookDetailsError({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error("Book details route failed:", error);
  }, [error]);

  return (
    <section className="bg-[#FDFBF7] px-4 py-24 text-center">
      <h2 className="font-serif text-2xl font-bold text-[#166534]">
        Could not load this book
      </h2>
      <p className="mt-2 text-sm text-[#1F2937]/70">
        Something went wrong while loading the details. Please try again.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => retry()}
          className="rounded-lg bg-[#D97706] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-orange-700"
        >
          Try again
        </button>
        <Link
          href="/AllBooks"
          className="rounded-lg border border-[#166534]/20 px-5 py-2.5 text-sm font-semibold text-[#166534] transition-colors duration-200 hover:bg-[#166534]/5"
        >
          Back to All Books
        </Link>
      </div>
    </section>
  );
}
