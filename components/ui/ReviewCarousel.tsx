"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface ReviewCarouselProps {
  children: React.ReactNode;
  totalCards: number;
}

export default function ReviewCarousel({ children, totalCards }: ReviewCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < maxScroll - 10);

    // Calculate active index based on scroll position
    const cardWidth = el.querySelector<HTMLElement>(":scope > *")?.offsetWidth ?? 300;
    const gap = 16;
    const index = Math.round(scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(index, totalCards - 1));
  }, [totalCards]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [updateScrollState]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector<HTMLElement>(":scope > *")?.offsetWidth ?? 300;
    const gap = 16;
    const amount = direction === "left" ? -(cardWidth + gap) : cardWidth + gap;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector<HTMLElement>(":scope > *")?.offsetWidth ?? 300;
    const gap = 16;
    el.scrollTo({ left: index * (cardWidth + gap), behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
      </div>

      {/* Arrow buttons — desktop only */}
      <button
        onClick={() => scroll("left")}
        className={`hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-10 h-10 rounded-full bg-white/90 shadow-card items-center justify-center text-navy transition-all duration-200 hover:bg-white hover:shadow-card-hover ${
          canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-label="Previous review"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => scroll("right")}
        className={`hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-10 h-10 rounded-full bg-white/90 shadow-card items-center justify-center text-navy transition-all duration-200 hover:bg-white hover:shadow-card-hover ${
          canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-label="Next review"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="flex gap-2 justify-center mt-6">
        {Array.from({ length: totalCards }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-6 h-2 bg-gold"
                : "w-2 h-2 bg-gold/25 hover:bg-gold/40"
            }`}
            aria-label={`Go to review ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
