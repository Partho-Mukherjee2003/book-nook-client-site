import Link from "next/link";
import { headers } from "next/headers";
import { connection } from "next/server";
import { Suspense } from "react";
import BorrowBooks from "@/app/borrow/BorrowBooks";
import { auth } from "@/lib/auth";
import { apiUrl } from "@/lib/api";
import BookDetailsLoading from "./loading";
import { RetryButton } from "./retry-button";

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

type BookResult =
  | { status: "ok"; book: Book }
  | { status: "not-found" }
  | { status: "unauthorized" }
  | { status: "error"; message: string };

const OBJECT_ID = /^[a-f\d]{24}$/i;

/**
 * Reads the book straight from the Express API.
 *
 * `cache: "no-store"` keeps Next.js from serving a cached response for a
 * different id, and every failure mode is turned into a value (never a throw)
 * so a dead API renders a friendly panel instead of crashing the route.
 */
const getBook = async (id: string): Promise<BookResult> => {
  if (!OBJECT_ID.test(id)) return { status: "not-found" };

  let token: string | undefined;
  try {
    const jwt = await auth.api.getToken({ headers: await headers() });
    token = jwt?.token;
  } catch {
    token = undefined;
  }

  try {
    const res = await fetch(apiUrl(`/allbooks/${id}`), {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      cache: "no-store",
    });

    if (res.status === 400 || res.status === 404) return { status: "not-found" };
    if (res.status === 401) return { status: "unauthorized" };

    if (!res.ok) {
      return {
        status: "error",
        message: `The book service responded with status ${res.status}.`,
      };
    }

    const book = (await res.json()) as Book;

    if (!book?._id) {
      return {
        status: "error",
        message: "The book service returned an unexpected response.",
      };
    }

    return { status: "ok", book };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Could not reach the book service.",
    };
  }
};

const StatePanel = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) => (
  <div className="mx-auto max-w-xl rounded-2xl border border-[#166534]/10 bg-white p-10 text-center shadow-xl shadow-[#166534]/5">
    <h2 className="font-serif text-2xl font-bold text-[#166534]">{title}</h2>
    <p className="mt-2 text-sm leading-6 text-[#1F2937]/70">{description}</p>
    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
      {children}
    </div>
  </div>
);

/* ------------------------------------------------------------------
   Data component — wrapped in Suspense so nothing runs while prerendering
------------------------------------------------------------------ */
const BookDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  // Stop prerendering here: cookies, JWTs and the book request must only run
  // for a real request, otherwise `next build` fails with Cache Components.
  await connection();

  const { id } = await params;
  const result = await getBook(id);

  if (result.status === "not-found") {
    return (
      <StatePanel
        title="Book not found"
        description="This book may have been removed, or the link is incorrect."
      >
        <Link
          href="/AllBooks"
          className="rounded-lg bg-[#D97706] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-orange-700"
        >
          Back to All Books
        </Link>
      </StatePanel>
    );
  }

  if (result.status === "unauthorized") {
    return (
      <StatePanel
        title="Please log in"
        description="Book details are private. Log in and you will be brought straight back to this book."
      >
        <Link
          href={`/login?redirect=/AllBooks/${id}`}
          className="rounded-lg bg-[#D97706] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-orange-700"
        >
          Log in
        </Link>
        <Link
          href="/AllBooks"
          className="rounded-lg border border-[#166534]/20 px-5 py-2.5 text-sm font-semibold text-[#166534] transition-colors duration-200 hover:bg-[#166534]/5"
        >
          Back to All Books
        </Link>
      </StatePanel>
    );
  }

  if (result.status === "error") {
    return (
      <StatePanel
        title="Could not load this book"
        description={result.message}
      >
        <RetryButton />
        <Link
          href="/AllBooks"
          className="rounded-lg border border-[#166534]/20 px-5 py-2.5 text-sm font-semibold text-[#166534] transition-colors duration-200 hover:bg-[#166534]/5"
        >
          Back to All Books
        </Link>
      </StatePanel>
    );
  }

  const book = result.book;
  const addedBy = book.userName || "BookNook Member";
  const initial = addedBy.charAt(0).toUpperCase();
  const hasImage = typeof book.image === "string" && book.image.length > 0;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
      {/* ---------------- Cover ---------------- */}
      <div className="lg:col-span-2">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl bg-[#F3EFE6] shadow-xl shadow-[#166534]/10 ring-1 ring-[#166534]/10 lg:sticky lg:top-24">
          {hasImage ? (
            // Plain <img>: any uploaded host works, no next.config allowlist.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={book.image}
              alt={book.title}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
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
            <BorrowBooks book={book} />
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

        <Suspense fallback={<BookDetailsLoading />}>
          <BookDetails params={params} />
        </Suspense>
      </div>
    </section>
  );
};

export default BookDetailsPage;
