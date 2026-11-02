//Title
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Books",
};

import Image from "next/image";
import Link from "next/link";
import React from "react";

// Newarrivals book type
type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
};
const getBooks = async (): Promise<Book[]> => {
  const res = await fetch("http://localhost:5000/allbooks", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();
};

const AllBookspage = async () => {
  const books = await getBooks();
  return (
    <div>
      <section
        aria-labelledby="new-arrivals-heading"
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
              id="new-arrivals-heading"
              className="mt-4 font-serif text-3xl font-bold tracking-tight text-[#166534] sm:text-4xl"
            >
              All Books ({books.length})
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#1F2937] sm:text-base">
              Explore the all books available in our collection and find your
              next quiet escape.
            </p>
          </div>

          {/* Books Grid */}
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <article
                key={book._id}
                className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
              >
                {/* Book Cover */}
                <div className="relative h-64 w-full overflow-hidden bg-[#F3EFE6]">
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

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
                      href={`/book/${book._id}`}
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

          {/* See All Books Action */}
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

export default AllBookspage;
