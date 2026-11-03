import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "BookNook | All Books",
};

// Book type
type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
};

const API = process.env.NEXT_PUBLIC_API_URL 

// Fetch kora fail korle page crash korbe na, error state dekhabe
const getBooks = async (): Promise<{ books: Book[]; failed: boolean }> => {
  try {
    const res = await fetch(`${API}/allbooks`, { cache: "no-store" });

    if (!res.ok) {
      console.error("allbooks fetch failed:", res.status);
      return { books: [], failed: true };
    }

    const data = await res.json();
    return { books: Array.isArray(data) ? data : [], failed: false };
  } catch (error) {
    console.error("allbooks fetch error:", error);
    return { books: [], failed: true };
  }
};

/* ------------------------------------------------------------------
   Loading skeleton (Suspense fallback)
------------------------------------------------------------------ */
const BooksSkeleton = () => {
  return (
    <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex h-full animate-pulse flex-col overflow-hidden rounded-xl bg-white shadow-md"
        >
          <div className="h-64 w-full bg-[#F3EFE6]" />
          <div className="space-y-3 p-5">
            <div className="h-5 w-3/4 rounded bg-[#F3EFE6]" />
            <div className="h-4 w-1/2 rounded bg-[#F3EFE6]" />
            <div className="h-10 w-full rounded-lg bg-[#F3EFE6]" />
          </div>
        </div>
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------
   Data fetching component (async) — wrapped in <Suspense> below
------------------------------------------------------------------ */
const BooksGrid = async () => {
  // Build-er shomoy na, shudhu request-er shomoy render hobe.
  // Eta na dile Next.js prerender-er shomoy fetch() ke thamiye rakhe,
  // ar try/catch oi thamano fetch-ke error hishebe dhore.
  await connection();

  const { books, failed } = await getBooks();

  if (failed) {
    return (
      <div className="mt-10 rounded-xl border border-[#166534]/10 bg-white p-10 text-center shadow-sm">
        <h3 className="text-lg font-bold text-[#166534]">
          Could not load the books
        </h3>
        <p className="mt-2 text-sm text-[#1F2937]/70">
          Please refresh the page or try again in a moment.
        </p>
        <Link
          href="/AllBooks"
          className="mt-5 inline-flex items-center justify-center rounded-lg bg-[#D97706] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-orange-700"
        >
          Try again
        </Link>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <p className="mt-10 rounded-xl border border-[#166534]/10 bg-white py-14 text-center text-[#1F2937]/70 shadow-sm">
        No books have been added yet.
      </p>
    );
  }

  return (
    <>
      <p className="mt-6 text-center text-sm font-semibold text-[#166534]">
        {books.length} books found
      </p>

      {/* Books Grid */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <article
            key={book._id}
            className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
          >
            {/* Book Cover */}
            <div className="relative h-64 w-full overflow-hidden bg-[#F3EFE6]">
              {typeof book.image === "string" && book.image ? (
                // Plain <img>: je kono host-er image (unsplash, imgbb ityadi) kaj korbe
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={book.image}
                  alt={book.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-[#1F2937]/40">
                  No image
                </div>
              )}

              <span className="absolute left-4 top-4 z-10 rounded-full bg-[#D97706] px-3 py-1 text-xs font-semibold text-white shadow-sm">
                {book.category}
              </span>
            </div>

            {/* Card Content */}
            <div className="flex flex-1 flex-col p-5">
              <h3 className="line-clamp-2 text-xl font-bold text-[#1F2937]">
                {book.title}
              </h3>

              <p className="mt-2 line-clamp-1 text-sm text-[#1F2937]/70">
                by {book.author}
              </p>

              {/* Full-width Action */}
              <div className="mt-auto pt-5">
                <Link
                  href={`/AllBooks/${book._id}`}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#D97706] px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#166534] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  View Details
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="h-4 w-4"
                  >
                    <path d="M5 12h14m-5-5 5 5-5 5" />
                  </svg>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
};

/* ------------------------------------------------------------------
   Page (no data fetching here)
------------------------------------------------------------------ */
const AllBooksPage = () => {
  return (
    <div>
      <section
        aria-labelledby="all-books-heading"
        className="bg-[#FDFBF7] py-12"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#166534]/15 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#166534] shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D97706]" />
              Fresh from the shelves
            </span>

            <h2
              id="all-books-heading"
              className="mt-4 font-serif text-3xl font-bold tracking-tight text-[#166534] sm:text-4xl"
            >
              All Books
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#1F2937] sm:text-base">
              Explore all the books available in our collection and find your
              next quiet escape.
            </p>
          </div>

          {/* Data section wrapped in Suspense */}
          <Suspense fallback={<BooksSkeleton />}>
            <BooksGrid />
          </Suspense>

          {/* Back to Home */}
          <div className="mt-12 flex justify-center">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-full bg-[#D97706] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#D97706]/25 transition-colors duration-200 hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#166534] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFBF7]"
            >
              Back to Home
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              >
                <path d="M5 12h14m-5-5 5 5-5 5" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllBooksPage;
