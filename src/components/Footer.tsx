import Link from "next/link";

/**
 * BookNook — Footer
 *
 * Purely presentational. No state, hooks, or conditional rendering.
 *
 * Design tokens:
 * - Footer background: #166534
 * - Accent / hover:    #D97706
 * - Primary text:      white
 * - Secondary text:    gray-200
 */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-4 border-[#D97706] bg-[#1F2937] text-white">
      {/* Decorative background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#D97706]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-white/5 blur-3xl"
      />

      {/* ==========================================================
          FOOTER MAIN CONTENT
          Mobile: 1 column · Tablet: 2x2 grid · Desktop: 4 columns
      ========================================================== */}
      <div className="relative mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          {/* --------------------------------------------------------
              BRAND COLUMN
          -------------------------------------------------------- */}
          <div className="block min-w-0 lg:pr-4">
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#166534]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D97706] ring-1 ring-white/10 transition-all duration-300 group-hover:-rotate-3 group-hover:bg-[#D97706]/85">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="h-6 w-6"
                >
                  {/* Open book */}
                  <path d="M12 7.25C10.6 6.05 8.8 5.4 6.75 5.4H4.5A1.5 1.5 0 0 0 3 6.9v11.1a1.5 1.5 0 0 0 1.5 1.5h2.25c2.05 0 3.85.65 5.25 1.85 1.4-1.2 3.2-1.85 5.25-1.85h2.25a1.5 1.5 0 0 0 1.5-1.5V6.9a1.5 1.5 0 0 0-1.5-1.5h-2.25c-2.05 0-3.85.65-5.25 1.85Z" />
                  {/* Center spine */}
                  <path d="M12 7.25v14.1" />
                  {/* Page lines */}
                  <path d="M6.5 9.5h2.25M6.5 12.5h2.25M15.25 9.5h2.25M15.25 12.5h2.25" />
                </svg>
              </span>

              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                BookNook
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-200">
              Your quiet corner for endless reading. Discover, borrow, and read.
            </p>
          </div>

          {/* --------------------------------------------------------
              QUICK LINKS COLUMN
          -------------------------------------------------------- */}
          <div className="block min-w-0">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Quick Links
            </h3>
            <span
              aria-hidden="true"
              className="mt-2 block h-0.5 w-8 rounded-full bg-[#D97706]"
            />

            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/"
                  className="group inline-flex items-center gap-2 rounded text-sm text-gray-200 transition-colors duration-200 hover:text-[#D97706] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#166534]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="h-3.5 w-3.5 text-[#D97706] transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/books"
                  className="group inline-flex items-center gap-2 rounded text-sm text-gray-200 transition-colors duration-200 hover:text-[#D97706] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#166534]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="h-3.5 w-3.5 text-[#D97706] transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                  All Books
                </Link>
              </li>

              <li>
                <Link
                  href="/books/add"
                  className="group inline-flex items-center gap-2 rounded text-sm text-gray-200 transition-colors duration-200 hover:text-[#D97706] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#166534]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="h-3.5 w-3.5 text-[#D97706] transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                  Add Book
                </Link>
              </li>

              <li>
                <Link
                  href="/my-borrows"
                  className="group inline-flex items-center gap-2 rounded text-sm text-gray-200 transition-colors duration-200 hover:text-[#D97706] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#166534]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="h-3.5 w-3.5 text-[#D97706] transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                  Borrowed Books
                </Link>
              </li>
            </ul>
          </div>

          {/* --------------------------------------------------------
              CONTACT COLUMN
          -------------------------------------------------------- */}
          <div className="block min-w-0">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Contact Info
            </h3>
            <span
              aria-hidden="true"
              className="mt-2 block h-0.5 w-8 rounded-full bg-[#D97706]"
            />

            <address className="mt-4 flex flex-col gap-3 not-italic">
              <a
                href="mailto:support@booknook.com"
                className="group flex items-center gap-3 rounded-lg text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#166534]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[#D97706] ring-1 ring-white/10 transition-colors duration-200 group-hover:bg-[#D97706] group-hover:text-white">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="h-4 w-4"
                  >
                    <path d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </span>

                <span className="min-w-0">
                  <span className="block text-[11px] uppercase tracking-wider text-gray-200">
                    Email
                  </span>
                  <span className="block truncate font-medium text-white transition-colors duration-200 group-hover:text-[#D97706]">
                    parthomukherjee582@gmail.com
                  </span>
                </span>
              </a>

              <a
                href="tel:+15551234567"
                className="group flex items-center gap-3 rounded-lg text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#166534]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[#D97706] ring-1 ring-white/10 transition-colors duration-200 group-hover:bg-[#D97706] group-hover:text-white">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="h-4 w-4"
                  >
                    <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                </span>

                <span className="min-w-0">
                  <span className="block text-[11px] uppercase tracking-wider text-gray-200">
                    Phone
                  </span>
                  <span className="block font-medium text-white transition-colors duration-200 group-hover:text-[#D97706]">
                    +(880) 1778-827812
                  </span>
                </span>
              </a>
            </address>
          </div>

          {/* --------------------------------------------------------
              SOCIAL COLUMN
              Replace each href="#" with your real social profile URL.
          -------------------------------------------------------- */}
          <div className="block min-w-0">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Follow Us
            </h3>
            <span
              aria-hidden="true"
              className="mt-2 block h-0.5 w-8 rounded-full bg-[#D97706]"
            />

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-200">
              Follow us for new arrivals and reading updates.
            </p>

            {/* Social Links */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href="#"
                aria-label="BookNook on Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-gray-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D97706] hover:bg-[#D97706]/10 hover:text-[#D97706] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#166534]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-5"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z" />
                </svg>
              </a>

              <a
                href="#"
                aria-label="BookNook on Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-gray-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D97706] hover:bg-[#D97706]/10 hover:text-[#D97706] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#166534]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-5"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
                </svg>
              </a>

              <a
                href="#"
                aria-label="BookNook on LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-gray-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D97706] hover:bg-[#D97706]/10 hover:text-[#D97706] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#166534]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-5"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
                </svg>
              </a>

              <a
                href="#"
                aria-label="BookNook on X"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-gray-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D97706] hover:bg-[#D97706]/10 hover:text-[#D97706] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#166534]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-4 w-4"
                >
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </a>

              <a
                href="#"
                aria-label="BookNook on YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-gray-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D97706] hover:bg-[#D97706]/10 hover:text-[#D97706] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#166534]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-5"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================================
          COPYRIGHT BAR
      ========================================================== */}
      <div className="relative border-t border-green-900">
        <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-200">
            © 2026 BookNook. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
