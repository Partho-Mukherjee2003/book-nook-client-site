import Link from "next/link";

/**
 * BookNook — Not Found (404)
 *
 * Shown automatically by Next.js when a route does not exist, or when
 * you call notFound() from "next/navigation".
 *
 * Idea: the "0" in 404 is an open book that floats, with a bookmark
 * swinging from it and loose pages drifting up behind it.
 *
 * All styles live in the <style> tag below, so this works even if
 * Tailwind does not scan this folder. Pure CSS animation, no state,
 * no "use client" needed.
 *
 * Place it at: app/not-found.tsx  (or src/app/not-found.tsx)
 *
 * Design tokens:
 * - Background:  #FDFBF7
 * - Titles:      #166534
 * - Text:        #1F2937
 * - Accent:      #D97706
 */

// Loose pages drifting up. left = position, delay / duration in seconds.
const driftingPages = [
  { left: "12%", delay: 0, duration: 7 },
  { left: "28%", delay: 2.2, duration: 8 },
  { left: "46%", delay: 4.1, duration: 6.5 },
  { left: "64%", delay: 1.1, duration: 7.5 },
  { left: "80%", delay: 3.3, duration: 8.5 },
];

export default function NotFound() {
  return (
    <section aria-labelledby="not-found-title" className="bn-nf">
      {/* All styles and keyframes (scoped by the bn- prefix) */}
      <style>{`
        .bn-nf {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 75vh;
          padding: 72px 16px;
          overflow: hidden;
          text-align: center;
          background: #FDFBF7;
        }

        /* Soft background glows */
        .bn-nf-glow {
          position: absolute;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          filter: blur(64px);
          pointer-events: none;
        }
        .bn-nf-glow-a { right: -96px; top: -96px; background: rgba(22, 101, 52, 0.07); }
        .bn-nf-glow-b { left: -96px; bottom: -128px; background: rgba(217, 119, 6, 0.12); }

        /* Loose pages drifting upward */
        .bn-nf-page {
          position: absolute;
          bottom: 8%;
          width: 18px;
          height: 24px;
          border: 1px solid rgba(22, 101, 52, 0.25);
          border-radius: 3px;
          background: #ffffff;
          opacity: 0;
          animation: bn-nf-drift 7s ease-in-out infinite;
        }

        /* The big 4 0 4 */
        .bn-nf-code {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(8px, 2vw, 24px);
        }
        .bn-nf-four {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(96px, 22vw, 200px);
          font-weight: 700;
          line-height: 1;
          color: #166534;
          animation: bn-nf-sway 4s ease-in-out infinite;
        }
        .bn-nf-four-b { animation-delay: 0.6s; }

        /* The book that replaces the 0 */
        .bn-nf-book-wrap {
          position: relative;
          animation: bn-nf-float 3.2s ease-in-out infinite;
        }
        .bn-nf-book {
          display: flex;
          align-items: center;
          justify-content: center;
          width: clamp(88px, 20vw, 168px);
          height: clamp(88px, 20vw, 168px);
          border-radius: 28%;
          background: #D97706;
          color: #ffffff;
          box-shadow: 0 24px 48px rgba(217, 119, 6, 0.35);
        }
        .bn-nf-book svg { width: 62%; height: 62%; }

        /* Bookmark ribbon swinging from the book */
        .bn-nf-bookmark {
          position: absolute;
          top: -14px;
          right: 22%;
          width: 22px;
          height: 54px;
          background: #166534;
          clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 78%, 0 100%);
          transform-origin: top center;
          animation: bn-nf-swing 2.4s ease-in-out infinite;
        }

        /* Floor shadow that shrinks as the book floats up */
        .bn-nf-shadow {
          width: clamp(60px, 14vw, 120px);
          height: 10px;
          margin: 18px auto 0;
          border-radius: 50%;
          background: rgba(31, 41, 55, 0.18);
          filter: blur(4px);
          animation: bn-nf-shadow 3.2s ease-in-out infinite;
        }

        /* Text */
        .bn-nf-title {
          position: relative;
          margin: 28px 0 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(28px, 5vw, 44px);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #166534;
        }
        .bn-nf-line {
          position: relative;
          width: 64px;
          height: 4px;
          margin: 16px auto 0;
          border-radius: 999px;
          background: #D97706;
        }
        .bn-nf-text {
          position: relative;
          max-width: 480px;
          margin: 20px 0 0;
          font-size: 17px;
          line-height: 1.7;
          color: #1F2937;
        }

        /* Buttons */
        .bn-nf-actions {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: 36px;
        }
        .bn-nf-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 13px 28px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease;
        }
        .bn-nf-btn:hover { transform: translateY(-2px); }
        .bn-nf-btn:focus-visible { outline: 2px solid #166534; outline-offset: 3px; }
        .bn-nf-btn-primary {
          background: #D97706;
          color: #ffffff;
          box-shadow: 0 10px 24px rgba(217, 119, 6, 0.28);
        }
        .bn-nf-btn-primary:hover { background: #b96205; }
        .bn-nf-btn-outline {
          border: 2px solid #166534;
          color: #166534;
        }
        .bn-nf-btn-outline:hover { background: #166534; color: #ffffff; }

        @keyframes bn-nf-float {
          0%, 100% { transform: translateY(0) rotate(-4deg); }
          50%      { transform: translateY(-16px) rotate(4deg); }
        }
        @keyframes bn-nf-shadow {
          0%, 100% { transform: scaleX(1);   opacity: 1; }
          50%      { transform: scaleX(0.7); opacity: 0.6; }
        }
        @keyframes bn-nf-sway {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
        @keyframes bn-nf-swing {
          0%, 100% { transform: rotate(10deg); }
          50%      { transform: rotate(-10deg); }
        }
        @keyframes bn-nf-drift {
          0%   { transform: translateY(0) rotate(0deg);        opacity: 0; }
          15%  { opacity: 0.9; }
          100% { transform: translateY(-340px) rotate(220deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bn-nf-page, .bn-nf-four, .bn-nf-book-wrap,
          .bn-nf-bookmark, .bn-nf-shadow { animation: none; }
          .bn-nf-btn { transition: none; }
        }
      `}</style>

      {/* Soft background glows */}
      <div aria-hidden="true" className="bn-nf-glow bn-nf-glow-a" />
      <div aria-hidden="true" className="bn-nf-glow bn-nf-glow-b" />

      {/* Loose pages drifting up in the background */}
      {driftingPages.map((page) => (
        <span
          key={page.left}
          aria-hidden="true"
          className="bn-nf-page"
          style={{
            left: page.left,
            animationDelay: `${page.delay}s`,
            animationDuration: `${page.duration}s`,
          }}
        />
      ))}

      {/* ==========================================================
          1. THE 404 GRAPHIC
          4 + floating open book (instead of 0) + 4
      ========================================================== */}
      <div aria-hidden="true">
        <div className="bn-nf-code">
          <span className="bn-nf-four">4</span>

          <div className="bn-nf-book-wrap">
            {/* Bookmark ribbon */}
            <span className="bn-nf-bookmark" />

            {/* Open book icon */}
            <div className="bn-nf-book">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 7.25C10.6 6.05 8.8 5.4 6.75 5.4H4.5A1.5 1.5 0 0 0 3 6.9v11.1a1.5 1.5 0 0 0 1.5 1.5h2.25c2.05 0 3.85.65 5.25 1.85 1.4-1.2 3.2-1.85 5.25-1.85h2.25a1.5 1.5 0 0 0 1.5-1.5V6.9a1.5 1.5 0 0 0-1.5-1.5h-2.25c-2.05 0-3.85.65-5.25 1.85Z" />
                <path d="M12 7.25v14.1" />
                <path d="M6.5 9.5h2.25M6.5 12.5h2.25M15.25 9.5h2.25M15.25 12.5h2.25" />
              </svg>
            </div>
          </div>

          <span className="bn-nf-four bn-nf-four-b">4</span>
        </div>

        {/* Shadow under the floating book */}
        <div className="bn-nf-shadow" />
      </div>

      {/* ==========================================================
          2. MESSAGE
      ========================================================== */}
      <h1 id="not-found-title" className="bn-nf-title">
        This page wandered off the shelf
      </h1>

      <div className="bn-nf-line" />

      <p className="bn-nf-text">
        We looked in every aisle but could not find the page you wanted. It may
        have been moved, borrowed, or never existed. Let&apos;s get you back to
        a good story.
      </p>

      {/* ==========================================================
          3. ACTION BUTTONS
          Primary: back home. Secondary: browse all books.
      ========================================================== */}
      <div className="bn-nf-actions">
        <Link href="/" className="bn-nf-btn bn-nf-btn-primary">
          Back to Home
        </Link>

        <Link href="/AllBooks" className="bn-nf-btn bn-nf-btn-outline">
          Browse Books
        </Link>
      </div>
    </section>
  );
}
