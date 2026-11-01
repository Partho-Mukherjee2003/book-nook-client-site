import type { ReactNode } from "react";

/**
 * BookNook — HowItWorks
 *
 * Purely presentational section (no state, no "use client" needed).
 *
 * Design tokens:
 * - Section background: #FDFBF7
 * - Titles / icons:     #166534
 * - Body text:          #1F2937
 * - Accent / hover:     #D97706
 */

type Step = {
  number: string;
  title: string;
  text: string;
  icon: ReactNode;
};

// Three borrowing steps. Add or edit content here.
const steps: Step[] = [
  {
    number: "1",
    title: "Find Your Book",
    text: "Discover from our huge collection of classics, new releases and hidden gems.",
    /* Magnifying glass icon */
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-12 w-12"
      >
        <circle cx="11" cy="11" r="6.5" />
        <path d="m20 20-4.2-4.2" />
        <path d="M8.5 11h5M11 8.5v5" />
      </svg>
    ),
  },
  {
    number: "2",
    title: "Borrow It Easily",
    text: "Click borrow and get instant access. No queues, no paperwork.",
    /* Open book with check mark icon */
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-12 w-12"
      >
        <path d="M12 7.25C10.6 6.05 8.8 5.4 6.75 5.4H4.5A1.5 1.5 0 0 0 3 6.9v11.1a1.5 1.5 0 0 0 1.5 1.5h2.25c2.05 0 3.85.65 5.25 1.85 1.4-1.2 3.2-1.85 5.25-1.85h2.25a1.5 1.5 0 0 0 1.5-1.5V6.9a1.5 1.5 0 0 0-1.5-1.5h-2.25c-2.05 0-3.85.65-5.25 1.85Z" />
        <path d="M12 7.25v14.1" />
        <path d="m14.5 12.5 1.5 1.5 3-3" />
      </svg>
    ),
  },
  {
    number: "3",
    title: "Enjoy & Return",
    text: "Read in peace at your own pace, then return the book when you are done.",
    /* Coffee cup + return arrow icon */
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-12 w-12"
      >
        <path d="M4 9h11v4.5a4.5 4.5 0 0 1-4.5 4.5h-2A4.5 4.5 0 0 1 4 13.5V9Z" />
        <path d="M15 10.5h1.25a2.25 2.25 0 0 1 0 4.5H15" />
        <path d="M7 3.5v2M10 3.5v2M13 3.5v2" />
        <path d="M4 21h11" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section
      aria-labelledby="how-it-works-title"
      className="bg-[#FDFBF7] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ==========================================================
            1. SECTION HEADING
            Centered title + short subtitle.
        ========================================================== */}
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="how-it-works-title"
            className="font-serif text-3xl font-bold tracking-tight text-[#166534] sm:text-4xl lg:text-5xl"
          >
            How Borrowing Works
          </h2>

          {/* Small amber divider under the title */}
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#D97706]" />

          <p className="mt-5 text-base leading-7 text-[#1F2937]/80 sm:text-lg sm:leading-8">
            Three simple steps to bring your next favorite story home.
          </p>
        </div>

        {/* ==========================================================
            2. STEPS GRID
            1 column on mobile, 3 columns from the md breakpoint.
        ========================================================== */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:mt-16 md:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.title}
              className="group relative overflow-hidden rounded-3xl border border-[#166534]/10 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#166534]/10"
            >
              {/* Big faint step number in the corner */}
              <span
                aria-hidden="true"
                className="absolute right-5 top-3 font-serif text-6xl font-bold text-[#166534]/5 transition-colors duration-300 group-hover:text-[#D97706]/15"
              >
                {step.number}
              </span>

              {/* Icon circle: icon turns amber on card hover */}
              <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#166534]/5 text-[#166534] ring-1 ring-[#166534]/10 transition-colors duration-300 group-hover:bg-[#D97706]/10 group-hover:text-[#D97706] group-hover:ring-[#D97706]/30">
                {step.icon}
              </div>

              {/* Step title */}
              <h3 className="mt-6 font-serif text-xl font-bold text-[#166534] sm:text-2xl">
                {step.title}
              </h3>

              {/* Step description */}
              <p className="mt-3 text-base leading-7 text-[#1F2937]">
                {step.text}
              </p>

              {/* Amber underline that grows on hover */}
              <div className="mx-auto mt-6 h-1 w-10 rounded-full bg-[#D97706] transition-all duration-300 group-hover:w-24" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
