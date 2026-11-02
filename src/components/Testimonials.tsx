/**
 * BookNook — Testimonials
 *
 * Purely presentational section (no state, no "use client" needed).
 *
 * Design tokens:
 * - Section background: #166534
 * - Text / titles:      white
 * - Card background:    #104d26
 * - Stars / accent:     #D97706
 */
//Title
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials",
};


type Review = {
  name: string;
  role: string;
  avatar: string;
  text: string;
};

// Three reader reviews. Add or edit content here.
const reviews: Review[] = [
  {
    name: "Ayesha Rahman",
    role: "University Student",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    text: "BookNook is my little escape after class. I borrow a novel in seconds and read it with a cup of tea. It has made my evenings so much calmer.",
  },
  {
    name: "Daniel Carter",
    role: "Software Engineer",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    text: "I had stopped reading for years. Now I finish a book every week because borrowing here is so easy. It truly brought the joy of stories back.",
  },
  {
    name: "Maria Lopez",
    role: "High School Teacher",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    text: "The collection is wonderful and the whole place feels warm and welcoming. I even recommend BookNook to my students. Every visit feels like coming home.",
  },
];

// Used to render 5 stars per review
const stars = [0, 1, 2, 3, 4];

export default function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-title"
      className="bg-[#166534] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ==========================================================
            1. SECTION HEADING
            Centered title with a small amber divider.
        ========================================================== */}
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="testimonials-title"
            className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            What Our Readers Say
          </h2>

          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#D97706]" />
        </div>

        {/* ==========================================================
            2. REVIEWS GRID
            1 column on mobile, 3 columns from the md breakpoint.
        ========================================================== */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-3">
          {reviews.map((review) => (
            <figure
              key={review.name}
              className="flex flex-col rounded-3xl border border-white/10 bg-[#104d26] p-8 shadow-lg shadow-black/20 transition-transform duration-300 hover:scale-105"
            >
              {/* Star rating: each star pulses and glows, slightly staggered */}
              <div
                role="img"
                aria-label="Rated 5 out of 5 stars"
                className="flex gap-1 text-[#D97706]"
              >
                {stars.map((star) => (
                  <svg
                    key={star}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    style={{ animationDelay: `${star * 200}ms` }}
                    className="h-6 w-6 animate-pulse drop-shadow-[0_0_6px_rgba(217,119,6,0.7)]"
                  >
                    <path d="M12 2.5l2.94 5.96 6.58.96-4.76 4.64 1.12 6.55L12 17.52l-5.88 3.09 1.12-6.55L2.48 9.42l6.58-.96L12 2.5Z" />
                  </svg>
                ))}
              </div>

              {/* Review text */}
              <blockquote className="mt-5 flex-1 text-base leading-7 text-white/90">
                &ldquo;{review.text}&rdquo;
              </blockquote>

              {/* Reviewer: circular avatar + name + role */}
              <figcaption className="mt-6 flex items-center gap-4 border-t border-white/10 pt-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={review.avatar}
                  alt={review.name}
                  width={48}
                  height={48}
                  loading="lazy"
                  className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-[#D97706]"
                />
                <div>
                  <p className="font-semibold text-white">{review.name}</p>
                  <p className="text-sm text-white/60">{review.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
