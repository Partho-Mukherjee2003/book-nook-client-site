"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * BookNook — Navbar
 *
 * The desktop layout is static. The mobile navigation panel is the only
 * interactive part: it is toggled with local component state.
 *
 * Design tokens:
 * - Navbar background: #166534
 * - Accent / hover:    #D97706
 * - Navbar text:       white
 */

// All navigation links live here. Add / remove / rename links in one place.
const linkes = [
  { href: "/", label: "Home" },
  { href: "/AllBooks", label: "All Books" },
  { href: "/AllBooks/new", label: "Add Book" },
  { href: "/my-books", label: "My Books" },
  { href: "/my-borrows", label: "My Borrows" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#166534] text-white shadow-lg shadow-black/10">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8"
      >
        {/* ==========================================================
            1. LOGO SECTION
            Book icon + BookNook wordmark. Replace href="/" if needed.
        ========================================================== */}
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="group flex shrink-0 items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#166534]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D97706] ring-1 ring-white/10 transition-all duration-300 group-hover:-rotate-3 group-hover:bg-[#D97706]/85 sm:h-10 sm:w-10">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-5 w-5 sm:h-6 sm:w-6"
            >
              {/* Open book */}
              <path d="M12 7.25C10.6 6.05 8.8 5.4 6.75 5.4H4.5A1.5 1.5 0 0 0 3 6.9v11.1a1.5 1.5 0 0 0 1.5 1.5h2.25c2.05 0 3.85.65 5.25 1.85 1.4-1.2 3.2-1.85 5.25-1.85h2.25a1.5 1.5 0 0 0 1.5-1.5V6.9a1.5 1.5 0 0 0-1.5-1.5h-2.25c-2.05 0-3.85.65-5.25 1.85Z" />
              {/* Center spine */}
              <path d="M12 7.25v14.1" />
              {/* Page lines */}
              <path d="M6.5 9.5h2.25M6.5 12.5h2.25M15.25 9.5h2.25M15.25 12.5h2.25" />
            </svg>
          </span>

          <span className="font-serif text-xl font-bold tracking-tight text-white sm:text-2xl">
            BookNook
          </span>
        </Link>

        {/* ==========================================================
            2. DESKTOP NAVIGATION LINKS
            Hidden below the lg breakpoint. Swap href values for your
            real routes, and add active-link styling here later.
        ========================================================== */}
        <ul className="hidden items-center gap-1 lg:flex">
          {linkes.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#D97706] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#166534]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ==========================================================
            3. AUTH AREA (DESKTOP ONLY)
            IMPORTANT: Both auth states are shown statically for now.
            Keep one and delete the other when you wire up auth logic.
        ========================================================== */}
        <div className="hidden items-center gap-3 lg:flex">
          {/* --------------------------------------------------------
              3A. LOGGED-OUT STATE PREVIEW
              "Login" (ghost-style) + "Register" (amber CTA)
          -------------------------------------------------------- */}
          <div className="flex items-center gap-1.5">
            <Link
              href="/login"
              className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#D97706] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#166534]"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="whitespace-nowrap rounded-lg bg-[#D97706] px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-black/20 transition-colors duration-200 hover:bg-[#D97706]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#166534]"
            >
              Register
            </Link>
          </div>

          {/* --------------------------------------------------------
              3B. LOGGED-IN STATE PREVIEW
              Circular mock avatar + name + chevron. Attach your
              dropdown/menu logic to this button later.
          -------------------------------------------------------- */}
        </div>

        {/* ==========================================================
            4. MOBILE HAMBURGER MENU BUTTON
            Visible below lg. Toggles the mobile navigation panel and
            swaps between the hamburger and close icons.
        ========================================================== */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? "Close main menu" : "Open main menu"}
          className="ml-auto inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition-colors duration-200 hover:border-[#D97706] hover:bg-[#D97706] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#166534] lg:hidden"
        >
          {isMobileMenuOpen ? (
            /* Close (X) icon */
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
              className="h-6 w-6"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          ) : (
            /* Hamburger icon */
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
              className="h-6 w-6"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* ==========================================================
          5. MOBILE NAVIGATION PANEL
          Shown only when the hamburger is open. Every link closes
          the panel before navigating to its destination.
      ========================================================== */}
      {isMobileMenuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-[#166534] shadow-2xl shadow-black/30 animate-in fade-in slide-in-from-top-2 duration-200 lg:hidden"
        >
          {/* Mobile navigation links */}
          <ul className="flex flex-col gap-1 p-4">
            {linkes.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="group flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#D97706] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#166534]"
                >
                  <span>{link.label}</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="h-4 w-4 text-white/50 transition-colors duration-200 group-hover:text-white"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile auth actions */}
          <div className="border-t border-white/10 p-4">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
              Account
            </p>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/login"
                onClick={closeMobileMenu}
                className="flex items-center justify-center rounded-lg border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:border-[#D97706] hover:bg-[#D97706] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#166534]"
              >
                Login
              </Link>

              <Link
                href="/register"
                onClick={closeMobileMenu}
                className="flex items-center justify-center rounded-lg bg-[#D97706] px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-black/20 transition-colors duration-200 hover:bg-[#D97706]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#166534]"
              >
                Register
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
