import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "All Books",
};

// Book type
type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
};

const getBooks = async (): Promise<Book[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allbooks`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();
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
  const books = await getBooks();

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
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
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
