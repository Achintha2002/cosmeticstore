"use client";

import React, { useState, useRef, useEffect } from "react";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/products";

interface ProductCarouselProps {
  products: Product[];
  heading?: string;
}

const CARD_WIDTH = 280;
const CARD_GAP = 20;

export default function ProductCarousel({ products, heading }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [maxIndex, setMaxIndex] = useState(products.length - 1);

  // Check scroll position to determine active dot and arrow button disabled states
  const checkScrollLimits = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    // Use a tolerance of 5px to account for subpixel rendering variations
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);

    // Calculate max possible index and current active dot
    const itemWidth = CARD_WIDTH + CARD_GAP;
    const maxScroll = scrollWidth - clientWidth;
    const calculatedMaxIndex = Math.max(0, Math.round(maxScroll / itemWidth));
    setMaxIndex(calculatedMaxIndex);

    const index = Math.round(scrollLeft / itemWidth);
    setCurrentIndex(Math.max(0, Math.min(index, calculatedMaxIndex)));
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScrollLimits();

    el.addEventListener("scroll", checkScrollLimits, { passive: true });
    window.addEventListener("resize", checkScrollLimits);

    // Extra check after initial load/mount rendering finishes
    const timer = setTimeout(checkScrollLimits, 300);

    return () => {
      el.removeEventListener("scroll", checkScrollLimits);
      window.removeEventListener("resize", checkScrollLimits);
      clearTimeout(timer);
    };
  }, [products.length]);

  const handlePrev = () => {
    if (!scrollRef.current) return;
    const itemWidth = CARD_WIDTH + CARD_GAP;
    // Scroll left by 2 items (or 1 if on small screen)
    const scrollAmount = scrollRef.current.clientWidth < 640 ? itemWidth : itemWidth * 2;
    const targetScroll = Math.max(0, scrollRef.current.scrollLeft - scrollAmount);

    scrollRef.current.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  const handleNext = () => {
    if (!scrollRef.current) return;
    const itemWidth = CARD_WIDTH + CARD_GAP;
    // Scroll right by 2 items (or 1 if on small screen)
    const scrollAmount = scrollRef.current.clientWidth < 640 ? itemWidth : itemWidth * 2;
    const targetScroll = Math.min(
      scrollRef.current.scrollWidth - scrollRef.current.clientWidth,
      scrollRef.current.scrollLeft + scrollAmount
    );

    scrollRef.current.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  const scrollToCard = (index: number) => {
    if (!scrollRef.current) return;
    const itemWidth = CARD_WIDTH + CARD_GAP;
    scrollRef.current.scrollTo({
      left: index * itemWidth,
      behavior: "smooth",
    });
  };

  return (
    <section
      aria-label={heading ?? "Product carousel"}
      className="relative overflow-visible group/carousel"
    >
      {heading && (
        <h2 className="font-display text-2xl md:text-3xl font-semibold text-[#1C1C1E] mb-8">
          {heading}
        </h2>
      )}

      <div className="relative overflow-visible">
        {/* Navigation Arrow: Previous */}
        <button
          onClick={handlePrev}
          disabled={!canScrollLeft}
          aria-label="Previous products"
          className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/95 border border-[#E0DAD4] shadow-card flex items-center justify-center text-[#1C1C1E] hover:bg-[#B76E79] hover:text-white hover:border-[#B76E79] transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none md:opacity-0 md:group-hover/carousel:opacity-100 hover:scale-105 active:scale-95 cursor-pointer -translate-x-2 md:translate-x-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Navigation Arrow: Next */}
        <button
          onClick={handleNext}
          disabled={!canScrollRight}
          aria-label="Next products"
          className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/95 border border-[#E0DAD4] shadow-card flex items-center justify-center text-[#1C1C1E] hover:bg-[#B76E79] hover:text-white hover:border-[#B76E79] transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none md:opacity-0 md:group-hover/carousel:opacity-100 hover:scale-105 active:scale-95 cursor-pointer translate-x-2 md:translate-x-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Scrollable Track */}
        <div
          ref={scrollRef}
          className="overflow-x-auto scroll-smooth snap-x snap-mandatory flex gap-5 pb-4 px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ scrollPaddingLeft: "4px" }}
        >
          {products.map((product, i) => (
            <div
              key={product.id}
              className="snap-start shrink-0"
              style={{ width: `${CARD_WIDTH}px` }}
              aria-label={`Product ${i + 1} of ${products.length}: ${product.name}`}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Dot Indicators */}
        {maxIndex > 0 && (
          <div className="flex items-center justify-center gap-2 mt-6" role="tablist" aria-label="Carousel position">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === currentIndex}
                aria-label={`Go to page ${i + 1}`}
                onClick={() => scrollToCard(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentIndex
                    ? "w-6 bg-[#B76E79]"
                    : "w-2 bg-[#E0DAD4] hover:bg-[#B76E79]/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
