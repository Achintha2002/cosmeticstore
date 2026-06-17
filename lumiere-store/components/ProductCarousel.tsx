"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/products";

interface ProductCarouselProps {
  products: Product[];
  heading?: string;
}

const CARD_WIDTH = 280;
const CARD_GAP = 20;

export default function ProductCarousel({ products, heading }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(hover: none)").matches);
  }, []);

  const maxIndex = Math.max(0, products.length - 1);

  const getMaxDrag = useCallback(() => {
    if (!constraintsRef.current) return 0;
    const containerWidth = constraintsRef.current.offsetWidth;
    const totalWidth = products.length * (CARD_WIDTH + CARD_GAP) - CARD_GAP;
    return Math.max(0, totalWidth - containerWidth);
  }, [products.length]);

  const scrollToIndex = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(clamped);
  }, [maxIndex]);

  const prev = () => scrollToIndex(currentIndex - 1);
  const next = () => scrollToIndex(currentIndex + 1);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
  };

  const xOffset = -currentIndex * (CARD_WIDTH + CARD_GAP);

  return (
    <section
      aria-label={heading ?? "Product carousel"}
      className="relative overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
    >
      {heading && (
        <h2 className="font-display text-2xl md:text-3xl font-semibold text-[#1C1C1E] mb-8">
          {heading}
        </h2>
      )}

      <div className="relative">
        {/* Arrow: Previous */}
        {!isTouchDevice && (
          <AnimatePresence>
            {isHovered && currentIndex > 0 && (
              <motion.button
                key="prev"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                onClick={prev}
                aria-label="Previous products"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-11 h-11 rounded-full bg-white border border-[#E0DAD4] shadow-card flex items-center justify-center text-[#1C1C1E] hover:bg-[#B76E79] hover:text-white hover:border-[#B76E79] transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        )}

        {/* Arrow: Next */}
        {!isTouchDevice && (
          <AnimatePresence>
            {isHovered && currentIndex < maxIndex && (
              <motion.button
                key="next"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.2 }}
                onClick={next}
                aria-label="Next products"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 w-11 h-11 rounded-full bg-white border border-[#E0DAD4] shadow-card flex items-center justify-center text-[#1C1C1E] hover:bg-[#B76E79] hover:text-white hover:border-[#B76E79] transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        )}

        {/* Drag container */}
        <div ref={constraintsRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
          <motion.div
            ref={trackRef}
            drag="x"
            dragConstraints={{
              left: -getMaxDrag(),
              right: 0,
            }}
            dragElastic={0.08}
            animate={{ x: xOffset }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
            onDragEnd={(_, info) => {
              // Snap to nearest card on drag release
              const velocity = info.velocity.x;
              const offset = info.offset.x;
              if (offset < -60 || velocity < -400) {
                scrollToIndex(currentIndex + 1);
              } else if (offset > 60 || velocity > 400) {
                scrollToIndex(currentIndex - 1);
              }
            }}
            className="flex"
            style={{ gap: CARD_GAP, paddingBottom: "4px" }}
            aria-live="polite"
          >
            {products.map((product, i) => (
              <div
                key={product.id}
                style={{ width: CARD_WIDTH, flexShrink: 0 }}
                aria-label={`Product ${i + 1} of ${products.length}: ${product.name}`}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dot indicators */}
        {products.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-6" role="tablist" aria-label="Carousel position">
            {products.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === currentIndex}
                aria-label={`Go to product ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "w-6 h-2 bg-[#B76E79]"
                    : "w-2 h-2 bg-[#E0DAD4] hover:bg-[#B76E79]/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
