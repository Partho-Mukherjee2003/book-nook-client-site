"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

// All navigation links live here. Add / remove / rename links in one place.
const linkes = [
  { href: "/", label: "Home" },
  { href: "/AllBooks", label: "All Books" },
  { href: "/new", label: "Add Book" },
  { href: "/my-books", label: "My Books" },
  { href: "/my-borrows", label: "My Borrows" },
];

// Home ("/") shudhu exact match, baki link nested path-eo active thakbe
const isLinkActive = (pathname: string, href: string) =>
  href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);

// Profile photo: image thakle seta, na thakle naam-er prothom okkhor
type AvatarUser = { name?: string | null; image?: string | null };

function Avatar({ user, size }: { user: AvatarUser; size: string }) {
  const initial = (user.name?.trim().charAt(0) || "U").toUpperCase();

  return user.image ? (
    // Plain <img>: je kono host-er photo URL kaj korbe
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={user.image}
      alt={user.name || "Profile"}
      referrerPolicy="no-referrer"
      className={`${size} shrink-0 rounded-full object-cover ring-2 ring-[#D97706]`}
    />
  ) : (
    <span
      className={`${size} flex shrink-0 items-center justify-center rounded-full bg-[#D97706] text-sm font-bold text-white ring-2 ring-white/30`}
    >
      {initial}
    </span>
  );
}

function NavbarContent() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Better Auth session: logged-in hole data.user thake
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const closeDropdown = () => setIsDropdownOpen(false);

  // Dropdown-er baire click korle ba Esc chaple bondho
  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsDropdownOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isDropdownOpen]);

  const handleLogout = async () => {
    setLoggingOut(true);

    const { error } = await authClient.signOut();

    setLoggingOut(false);

    if (error) {
      toast.error("Logout failed", {
        description: error.message || "Something went wrong. Please try again.",
      });
      return;
    }

    closeDropdown();
    closeMobileMenu();
    toast.success("Logged out", {
      description: "You have been logged out successfully.",
    });
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#166534] text-white shadow-lg shadow-black/10">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8"
      >
        {/* ==========================================================
            1. LOGO SECTION
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
              <path d="M12 7.25C10.6 6.05 8.8 5.4 6.75 5.4H4.5A1.5 1.5 0 0 0 3 6.9v11.1a1.5 1.5 0 0 0 1.5 1.5h2.25c2.05 0 3.85.65 5.25 1.85 1.4-1.2 3.2-1.85 5.25-1.85h2.25a1.5 1.5 0 0 0 1.5-1.5V6.9a1.5 1.5 0 0 0-1.5-1.5h-2.25c-2.05 0-3.85.65-5.25 1.85Z" />
              <path d="M12 7.25v14.1" />
              <path d="M6.5 9.5h2.25M6.5 12.5h2.25M15.25 9.5h2.25M15.25 12.5h2.25" />
            </svg>
          </span>

          <span className="font-serif text-xl font-bold tracking-tight text-white sm:text-2xl">
            BookNook
          </span>
        </Link>

        {/* ==========================================================
            2. DESKTOP NAVIGATION LINKS (with active state)
        ========================================================== */}
        <ul className="hidden items-center gap-1 lg:flex">
          {linkes.map((link) => {
            const active = isLinkActive(pathname, link.href);

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`block whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#166534] ${
                    active
                      ? "bg-[#D97706] font-semibold shadow-sm shadow-black/20"
                      : "hover:bg-[#D97706]/80"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ==========================================================
            3. AUTH AREA (DESKTOP ONLY)
        ========================================================== */}
        <div className="hidden items-center gap-3 lg:flex">
          {isPending ? (
            /* Session load hocche: layout jeno lafiye na othe */
            <div className="h-10 w-10 animate-pulse rounded-full bg-white/10" />
          ) : user ? (
            /* -------- LOGGED-IN: Photo + Dropdown -------- */
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen((open) => !open)}
                aria-haspopup="menu"
                aria-expanded={isDropdownOpen}
                aria-label="Open profile menu"
                className="flex items-center rounded-full transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#166534]"
              >
                <Avatar user={user} size="h-10 w-10" />
              </button>

              {isDropdownOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full mt-3 w-64 origin-top-right overflow-hidden rounded-xl border border-[#166534]/10 bg-white text-[#1F2937] shadow-2xl shadow-black/25 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  {/* User info */}
                  <div className="flex items-center gap-3 border-b border-[#166534]/10 bg-[#FDFBF7] px-4 py-4">
                    <Avatar user={user} size="h-11 w-11" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-[#166534]">
                        {user.name}
                      </p>
                      {user.email && (
                        <p className="truncate text-xs text-[#1F2937]/60">
                          {user.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-2">
                    <Link
                      href="/profile"
                      role="menuitem"
                      onClick={closeDropdown}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 hover:bg-[#166534]/10 hover:text-[#166534] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#166534] ${
                        isLinkActive(pathname, "/profile")
                          ? "bg-[#166534]/10 text-[#166534]"
                          : ""
                      }`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className="h-4 w-4"
                      >
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" />
                      </svg>
                      My Profile
                    </Link>

                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-[#D97706] transition-colors duration-150 hover:bg-[#D97706]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97706] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className="h-4 w-4"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <path d="m16 17 5-5-5-5M21 12H9" />
                      </svg>
                      {loggingOut ? "Logging out..." : "Logout"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* -------- LOGGED-OUT: Login + Register -------- */
            <div className="flex items-center gap-1.5">
              <Link
                href="/login"
                aria-current={
                  isLinkActive(pathname, "/login") ? "page" : undefined
                }
                className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#166534] ${
                  isLinkActive(pathname, "/login")
                    ? "bg-white/15 font-semibold"
                    : "hover:bg-[#D97706]"
                }`}
              >
                Login
              </Link>

              <Link
                href="/register"
                aria-current={
                  isLinkActive(pathname, "/register") ? "page" : undefined
                }
                className="whitespace-nowrap rounded-lg bg-[#D97706] px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-black/20 transition-colors duration-200 hover:bg-[#D97706]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#166534]"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* ==========================================================
            4. MOBILE HAMBURGER MENU BUTTON
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
          5. MOBILE NAVIGATION PANEL (with active state)
      ========================================================== */}
      {isMobileMenuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-[#166534] shadow-2xl shadow-black/30 animate-in fade-in slide-in-from-top-2 duration-200 lg:hidden"
        >
          <ul className="flex flex-col gap-1 p-4">
            {linkes.map((link) => {
              const active = isLinkActive(pathname, link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMobileMenu}
                    aria-current={active ? "page" : undefined}
                    className={`group flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#166534] ${
                      active
                        ? "bg-[#D97706] font-semibold"
                        : "hover:bg-[#D97706]/80"
                    }`}
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
                      className={`h-4 w-4 transition-colors duration-200 group-hover:text-white ${
                        active ? "text-white" : "text-white/50"
                      }`}
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile auth actions */}
          <div className="border-t border-white/10 p-4">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
              Account
            </p>

            {isPending ? (
              <div className="h-12 w-full animate-pulse rounded-lg bg-white/10" />
            ) : user ? (
              /* -------- LOGGED-IN (mobile): dropdown-er jinis menu-te-i -------- */
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 p-3">
                  <Avatar user={user} size="h-11 w-11" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {user.name}
                    </p>
                    {user.email && (
                      <p className="truncate text-xs text-white/60">
                        {user.email}
                      </p>
                    )}
                  </div>
                </div>

                <Link
                  href="/profile"
                  onClick={closeMobileMenu}
                  aria-current={
                    isLinkActive(pathname, "/profile") ? "page" : undefined
                  }
                  className={`flex items-center justify-center rounded-lg border px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:border-[#D97706] hover:bg-[#D97706] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#166534] ${
                    isLinkActive(pathname, "/profile")
                      ? "border-[#D97706] bg-[#D97706]"
                      : "border-white/20"
                  }`}
                >
                  My Profile
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="flex w-full items-center justify-center rounded-lg bg-[#D97706] px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-black/20 transition-colors duration-200 hover:bg-[#D97706]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#166534] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loggingOut ? "Logging out..." : "Logout"}
                </button>
              </div>
            ) : (
              /* -------- LOGGED-OUT (mobile) -------- */
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
            )}
          </div>
        </nav>
      )}
    </header>
  );
}

// usePathname() runtime-e jana jay, tai Suspense-er bhitore rakha lagbe
export default function Navbar() {
  return (
    <Suspense
      fallback={
        <header className="sticky top-0 z-50 h-16 w-full border-b border-white/10 bg-[#166534] lg:h-20" />
      }
    >
      <NavbarContent />
    </Suspense>
  );
}
