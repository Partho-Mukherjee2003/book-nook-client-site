"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

/** Re-runs the server component for this route (fresh fetch, no cache). */
export function RetryButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => startTransition(() => router.refresh())}
      className="rounded-lg bg-[#D97706] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isPending ? "Retrying..." : "Try again"}
    </button>
  );
}
