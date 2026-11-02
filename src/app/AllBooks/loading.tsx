/**
 * BookNook — Loading Design 1: "Flipping Book"
 *
 * An open book whose pages flip over and over, on the soft off-white
 * background. Pure CSS animation, no state, no "use client" needed.
 *
 * Best for: data-heavy pages, e.g. app/books/loading.tsx
 *
 * Design tokens:
 * - Background:  #FDFBF7
 * - Book / text: #166534
 * - Accent:      #D97706
 */

// Delays for the three flipping pages (seconds)
const pageDelays = [0, 0.4, 0.8];

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[70vh] flex-col items-center justify-center bg-[#FDFBF7] px-4 py-16"
    >
      {/* Animation keyframes (scoped by the bn- prefix) */}
      <style>{`
        @keyframes bn-flip {
          0%   { transform: rotateY(0deg);    opacity: 1; }
          50%  { transform: rotateY(-180deg); opacity: 1; }
          85%  { transform: rotateY(-180deg); opacity: 1; }
          100% { transform: rotateY(-180deg); opacity: 0; }
        }
        @keyframes bn-bounce {
          0%, 80%, 100% { transform: translateY(0);    opacity: 0.4; }
          40%           { transform: translateY(-5px); opacity: 1; }
        }
        .bn-flip-page {
          transform-origin: left center;
          animation: bn-flip 2.4s ease-in-out infinite;
          background-image: repeating-linear-gradient(
            to bottom,
            transparent 0 11px,
            rgba(22, 101, 52, 0.14) 11px 12px
          );
        }
        .bn-dot { animation: bn-bounce 1.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .bn-flip-page, .bn-dot { animation: none; }
        }
      `}</style>

      {/* ==========================================================
          1. BOOK ANIMATION
          Left half = static cover, right half = flipping pages.
      ========================================================== */}
      <div
        aria-hidden="true"
        className="relative h-32 w-52 drop-shadow-xl"
        style={{ perspective: "700px" }}
      >
        {/* Back cover (forest green) */}
        <div className="absolute inset-0 rounded-xl bg-[#166534]" />

        {/* Left page (already read) */}
        <div className="absolute bottom-2 left-2 top-2 w-[calc(50%-8px)] rounded-l-md bg-white" />

        {/* Right page (waiting to be flipped) */}
        <div className="absolute bottom-2 left-1/2 right-2 top-2 rounded-r-md bg-white" />

        {/* Center spine in amber */}
        <div className="absolute bottom-0 left-1/2 top-0 w-1 -translate-x-1/2 rounded-full bg-[#D97706]" />

        {/* Flipping pages */}
        {pageDelays.map((delay) => (
          <div
            key={delay}
            style={{ animationDelay: `${delay}s` }}
            className="bn-flip-page absolute bottom-2 left-1/2 right-2 top-2 rounded-r-md border border-[#166534]/10 bg-white"
          />
        ))}
      </div>

      {/* ==========================================================
          2. LOADING TEXT
          Message + three bouncing amber dots.
      ========================================================== */}
      <p className="mt-10 font-serif text-xl font-bold text-[#166534] sm:text-2xl">
        Turning to the next page
      </p>

      <div className="mt-3 flex items-center gap-1.5" aria-hidden="true">
        {[0, 0.2, 0.4].map((delay) => (
          <span
            key={delay}
            style={{ animationDelay: `${delay}s` }}
            className="bn-dot h-2 w-2 rounded-full bg-[#D97706]"
          />
        ))}
      </div>

      {/* Screen-reader only text */}
      <span className="sr-only">Loading, please wait</span>
    </div>
  );
}
