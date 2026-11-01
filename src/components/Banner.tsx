"use client";

import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

// Three calming banner slides. Add or edit content here.
const slides = [
  {
    eyebrow: "Welcome to BookNook",
    title: "A quiet corner for every curious mind.",
    text: "Step away from the noise and settle into a story. Your next favorite book is waiting on the shelf.",
  },
  {
    eyebrow: "Discover something new",
    title: "Stories that feel like a deep breath.",
    text: "From timeless classics to fresh voices, find books that slow the day down and stay with you long after the last page.",
  },
  {
    eyebrow: "Borrow. Read. Return.",
    title: "Your library, open whenever you are.",
    text: "Browse our shelves, borrow with ease, and make room for a little more calm in your everyday reading ritual.",
  },
];

export default function Banner() {
  return (
    <section aria-label="Featured BookNook highlights" className="bg-[#FDFBF7]">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        loop
        speed={700}
        className="[&_.swiper-pagination-bullet]:h-2 [&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet]:bg-[#166534]/25 [&_.swiper-pagination-bullet]:opacity-100 [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet-active]:w-7 [&_.swiper-pagination-bullet-active]:rounded-full [&_.swiper-pagination-bullet-active]:bg-[#D97706]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div className="relative overflow-hidden bg-[#FDFBF7]">
              {/* Soft decorative background glows */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#166534]/5 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-[#D97706]/10 blur-3xl"
              />

              <div className="relative mx-auto grid min-h-[430px] w-full max-w-7xl items-center gap-10 px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-2 lg:px-8 lg:py-20">
                {/* Copy */}
                <div className="text-center lg:text-left">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#166534]/15 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#166534] shadow-sm backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D97706]" />
                    {slide.eyebrow}
                  </span>

                  <h2 className="mt-5 font-serif text-4xl font-bold leading-tight tracking-tight text-[#166534] sm:text-5xl xl:text-6xl">
                    {slide.title}
                  </h2>

                  <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#1F2937] sm:text-lg sm:leading-8 lg:mx-0">
                    {slide.text}
                  </p>

                  <div className="mt-8">
                    <Link
                      href="/books"
                      className="group inline-flex items-center gap-2 rounded-full bg-[#D97706] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#D97706]/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#D97706]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#166534] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFBF7]"
                    >
                      Browse Books
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

                {/* Decorative library visual */}
                <div
                  aria-hidden="true"
                  className="relative mx-auto hidden aspect-square w-full max-w-sm lg:block"
                >
                  <div className="absolute inset-4 rounded-full bg-[#166534]/5" />
                  <div className="absolute inset-12 rounded-full border border-[#D97706]/30" />
                  <div className="absolute inset-20 rounded-full border border-[#166534]/10" />

                  {/* Central book mark */}
                  <div className="absolute left-1/2 top-1/2 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 rotate-3 items-center justify-center rounded-[2rem] bg-[#166534] text-white shadow-2xl shadow-[#166534]/25">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-16 w-16"
                    >
                      <path d="M12 7.25C10.6 6.05 8.8 5.4 6.75 5.4H4.5A1.5 1.5 0 0 0 3 6.9v11.1a1.5 1.5 0 0 0 1.5 1.5h2.25c2.05 0 3.85.65 5.25 1.85 1.4-1.2 3.2-1.85 5.25-1.85h2.25a1.5 1.5 0 0 0 1.5-1.5V6.9a1.5 1.5 0 0 0-1.5-1.5h-2.25c-2.05 0-3.85.65-5.25 1.85Z" />
                      <path d="M12 7.25v14.1" />
                      <path d="M6.5 9.5h2.25M6.5 12.5h2.25M15.25 9.5h2.25M15.25 12.5h2.25" />
                    </svg>
                  </div>

                  {/* Floating stat card */}
                  <div className="absolute right-0 top-8 rounded-2xl bg-white/90 px-4 py-3 shadow-xl shadow-[#166534]/10 ring-1 ring-[#166534]/10 backdrop-blur">
                    <p className="text-xl font-bold text-[#166534]">3,200+</p>
                    <p className="text-[11px] font-medium text-[#1F2937]/60">
                      Curated books
                    </p>
                  </div>

                  {/* Floating readers card */}
                  <div className="absolute bottom-3 left-0 rounded-2xl bg-white/90 px-4 py-3 shadow-xl shadow-[#166534]/10 ring-1 ring-[#166534]/10 backdrop-blur">
                    <div className="flex -space-x-2">
                      <span className="h-6 w-6 rounded-full bg-[#166534]" />
                      <span className="h-6 w-6 rounded-full bg-[#D97706]" />
                      <span className="h-6 w-6 rounded-full bg-[#1F2937]/20" />
                    </div>
                    <p className="mt-1.5 text-[11px] font-medium text-[#1F2937]/60">
                      Loved by readers
                    </p>
                  </div>

                  <span className="absolute left-6 top-16 h-3 w-3 rounded-full bg-[#D97706]" />
                  <span className="absolute bottom-20 right-8 h-2 w-2 rounded-full bg-[#166534]/30" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
    </section>
  );
}
