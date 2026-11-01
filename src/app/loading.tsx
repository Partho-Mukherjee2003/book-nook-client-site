/**
 * BookNook — Loading Design 2: "Brand Pulse"
 *
 * The BookNook logo mark floats and pulses on a deep green background,
 * with a sliding amber progress bar underneath. Pure CSS animation,
 * no state, no "use client" needed.
 *
 * Best for: the whole site, e.g. app/loading.tsx
 *
 * Design tokens:
 * - Background:  #166534 (with a darker #104d26 glow)
 * - Text:        white
 * - Accent:      #D97706
 */

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-[#166534] px-4 py-16 text-white"
    >
      {/* Animation keyframes (scoped by the bn- prefix) */}
      <style>{`
        @keyframes bn-float {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50%      { transform: translateY(-10px) rotate(3deg); }
        }
        @keyframes bn-slide {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }
        .bn-float { animation: bn-float 2.6s ease-in-out infinite; }
        .bn-slide { animation: bn-slide 1.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .bn-float, .bn-slide { animation: none; }
        }
      `}</style>

      {/* Soft background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#104d26] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-[#D97706]/15 blur-3xl"
      />

      {/* ==========================================================
          1. LOGO MARK
          Amber box with the open-book icon. Floats up and down, with
          two expanding rings behind it.
      ========================================================== */}
      <div
        className="relative flex h-28 w-28 items-center justify-center"
        aria-hidden="true"
      >
        {/* Expanding rings */}
        <span className="absolute inset-0 animate-ping rounded-3xl bg-[#D97706]/30" />
        <span
          style={{ animationDelay: "0.6s" }}
          className="absolute inset-0 animate-ping rounded-3xl bg-white/10"
        />

        {/* Logo box */}
        <div className="bn-float relative flex h-24 w-24 items-center justify-center rounded-3xl bg-[#D97706] shadow-2xl shadow-black/30 ring-1 ring-white/20">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-14 w-14 text-white"
          >
            <path d="M12 7.25C10.6 6.05 8.8 5.4 6.75 5.4H4.5A1.5 1.5 0 0 0 3 6.9v11.1a1.5 1.5 0 0 0 1.5 1.5h2.25c2.05 0 3.85.65 5.25 1.85 1.4-1.2 3.2-1.85 5.25-1.85h2.25a1.5 1.5 0 0 0 1.5-1.5V6.9a1.5 1.5 0 0 0-1.5-1.5h-2.25c-2.05 0-3.85.65-5.25 1.85Z" />
            <path d="M12 7.25v14.1" />
            <path d="M6.5 9.5h2.25M6.5 12.5h2.25M15.25 9.5h2.25M15.25 12.5h2.25" />
          </svg>
        </div>
      </div>

      {/* ==========================================================
          2. WORDMARK + MESSAGE
      ========================================================== */}
      <p className="relative mt-10 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
        BookNook
      </p>
      <p className="relative mt-2 text-sm text-white/70 sm:text-base">
        Finding a quiet corner for you...
      </p>

      {/* ==========================================================
          3. PROGRESS BAR
          Amber bar sliding across a faint track.
      ========================================================== */}
      <div
        aria-hidden="true"
        className="relative mt-8 h-1.5 w-48 overflow-hidden rounded-full bg-white/15 sm:w-56"
      >
        <div className="bn-slide h-full w-1/3 rounded-full bg-[#D97706]" />
      </div>

      {/* Screen-reader only text */}
      <span className="sr-only">Loading, please wait</span>
    </div>
  );
}
