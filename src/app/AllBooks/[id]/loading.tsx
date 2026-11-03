/**
 * Shown while /AllBooks/[id] streams in, and reused as the <Suspense> fallback
 * inside page.tsx so navigation from the grid keeps the same layout.
 */
export default function BookDetailsLoading() {
  return (
    <div className="grid animate-pulse grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
      <div className="h-96 rounded-2xl bg-[#F3EFE6] lg:col-span-2 lg:h-[34rem]" />
      <div className="space-y-4 lg:col-span-3">
        <div className="h-6 w-24 rounded-full bg-[#F3EFE6]" />
        <div className="h-10 w-3/4 rounded bg-[#F3EFE6]" />
        <div className="h-5 w-1/3 rounded bg-[#F3EFE6]" />
        <div className="h-32 w-full rounded bg-[#F3EFE6]" />
        <div className="h-20 w-full rounded-xl bg-[#F3EFE6]" />
        <div className="h-12 w-full rounded-lg bg-[#F3EFE6]" />
      </div>
    </div>
  );
}
