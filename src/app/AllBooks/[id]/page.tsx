import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";

type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description?: string;
  userName?: string;
  userEmail?: string;
};

const getBook = async (id: string): Promise<Book> => {
  const res = await fetch(`http://localhost:5000/allbooks/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404 || res.status === 400) notFound();
  if (!res.ok) throw new Error("Failed to fetch book details");

  return res.json();
};

/* ------------------------------------------------------------------
   Loading skeleton
------------------------------------------------------------------ */
const DetailsSkeleton = () => {
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
};

/* ------------------------------------------------------------------
   Data component (reads params + fetches) — wrapped in Suspense
------------------------------------------------------------------ */
const BookDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const book = await getBook(id);

  const addedBy = book.userName || "BookNook Member";
  const initial = addedBy.charAt(0).toUpperCase();
  const hasImage = typeof book.image === "string" && book.image.length > 0;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
      {/* ---------------- Cover ---------------- */}
      <div className="lg:col-span-2">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl bg-[#F3EFE6] shadow-xl shadow-[#166534]/10 ring-1 ring-[#166534]/10 lg:sticky lg:top-24">
          {hasImage ? (
            <Image
              src={book.image}
              alt={book.title}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-[#1F2937]/40">
              No image available
            </div>
          )}

          <span className="absolute left-4 top-4 z-10 rounded-full bg-[#D97706] px-3 py-1 text-xs font-semibold text-white shadow-sm">
            {book.category}
          </span>
        </div>
      </div>

      {/* ---------------- Info ---------------- */}
      <div className="lg:col-span-3">
        <div className="rounded-2xl border border-[#166534]/10 bg-white p-6 shadow-xl shadow-[#166534]/5 sm:p-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#166534]/15 bg-[#FDFBF7] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#166534]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D97706]" />
            {book.category}
          </span>

          <h1 className="mt-4 font-serif text-3xl font-bold tracking-tight text-[#166534] sm:text-4xl">
            {book.title}
          </h1>

          <p className="mt-2 text-base text-[#1F2937]/70">
            by{" "}
            <span className="font-semibold text-[#1F2937]">{book.author}</span>
          </p>

          <span
            aria-hidden="true"
            className="mt-5 block h-0.5 w-12 rounded-full bg-[#D97706]"
          />

          {/* Description */}
          <div className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#166534]">
              About this book
            </h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#1F2937]/80 sm:text-base">
              {book.description || "No description has been added yet."}
            </p>
          </div>

          {/* Quick facts */}
          <dl className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-[#166534]/10 bg-[#FDFBF7] p-4">
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-[#1F2937]/50">
                Category
              </dt>
              <dd className="mt-1 text-sm font-semibold text-[#1F2937]">
                {book.category}
              </dd>
            </div>
            <div className="rounded-xl border border-[#166534]/10 bg-[#FDFBF7] p-4">
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-[#1F2937]/50">
                Author
              </dt>
              <dd className="mt-1 truncate text-sm font-semibold text-[#1F2937]">
                {book.author}
              </dd>
            </div>
          </dl>

          {/* Added by */}
          <div className="mt-6 flex items-center gap-4 rounded-xl border border-[#166534]/10 bg-[#FDFBF7] p-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#166534] text-lg font-bold text-white">
              {initial}
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#1F2937]/50">
                Added by
              </p>
              <p className="truncate text-sm font-semibold text-[#1F2937]">
                {addedBy}
              </p>
              {book.userEmail && (
                <p className="truncate text-xs text-[#1F2937]/60">
                  {book.userEmail}
                </p>
              )}
            </div>
          </div>

          {/* Borrow button */}
          <div className="mt-8">
            <Button
              type="button"
              className="h-12 w-full gap-2 bg-[#D97706] text-base font-semibold text-white shadow-md shadow-[#D97706]/25 hover:bg-orange-700"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="h-5 w-5"
              >
                <path d="M12 7.25C10.6 6.05 8.8 5.4 6.75 5.4H4.5A1.5 1.5 0 0 0 3 6.9v11.1a1.5 1.5 0 0 0 1.5 1.5h2.25c2.05 0 3.85.65 5.25 1.85 1.4-1.2 3.2-1.85 5.25-1.85h2.25a1.5 1.5 0 0 0 1.5-1.5V6.9a1.5 1.5 0 0 0-1.5-1.5h-2.25c-2.05 0-3.85.65-5.25 1.85Z" />
                <path d="M12 7.25v14.1" />
              </svg>
              Borrow This Book
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------
   Page
------------------------------------------------------------------ */
const BookDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <section className="relative overflow-hidden bg-[#FDFBF7] px-4 py-10 sm:py-14">
      {/* Decorative glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#D97706]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-[#166534]/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl">
        {/* Back link */}
        <Link
          href="/AllBooks"
          className="group mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#166534] transition-colors hover:text-[#D97706]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
          >
            <path d="M19 12H5m5 5-5-5 5-5" />
          </svg>
          Back to All Books
        </Link>

        <Suspense fallback={<DetailsSkeleton />}>
          <BookDetails params={params} />
        </Suspense>
      </div>
    </section>
  );
};

export default BookDetailsPage;
