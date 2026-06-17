"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { searchProducts } from "@/lib/products";
import type { Product } from "@/lib/products";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setResults([]);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    setResults(value.trim().length > 0 ? searchProducts(value) : []);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label="Search products"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-[70] bg-[#FAF9F6] shadow-xl border-b border-[#E0DAD4] max-h-[80vh] overflow-y-auto"
          >
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
              {/* Input row */}
              <div className="flex items-center gap-4 mb-6">
                <svg className="w-5 h-5 text-[#4A4A4C] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m21 21-4.35-4.35" strokeLinecap="round" />
                </svg>
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search perfumes, cosmetics, ingredients…"
                  aria-label="Search products"
                  className="flex-1 text-lg bg-transparent border-none outline-none text-[#1C1C1E] placeholder:text-[#4A4A4C]/60 font-medium"
                  autoComplete="off"
                />
                <button
                  onClick={onClose}
                  aria-label="Close search"
                  className="flex-shrink-0 text-sm text-[#4A4A4C] hover:text-[#B76E79] transition-colors duration-200 font-medium"
                >
                  Close
                </button>
              </div>

              {/* Results */}
              {query.trim().length > 0 && (
                <>
                  {results.length > 0 ? (
                    <ul role="listbox" aria-label="Search results" className="divide-y divide-[#E0DAD4]">
                      {results.map((product) => (
                        <li key={product.id} role="option" aria-selected="false">
                          <Link
                            href={`/product/${product.id}`}
                            onClick={onClose}
                            className="flex items-center gap-4 py-4 hover:bg-[#F0EDE8] -mx-4 px-4 rounded-xl transition-colors duration-150 group"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-[#1C1C1E] group-hover:text-[#B76E79] transition-colors duration-200 truncate">
                                {product.name}
                              </p>
                              <p className="text-xs text-[#4A4A4C] capitalize mt-0.5">
                                {product.category} · ${product.price}
                              </p>
                            </div>
                            <svg className="w-4 h-4 text-[#4A4A4C] group-hover:text-[#B76E79] transition-colors duration-200 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="py-10 text-center">
                      <p className="text-[#4A4A4C] font-medium">No results for &ldquo;{query}&rdquo;</p>
                      <p className="text-sm text-[#4A4A4C]/70 mt-1">Try a different term or browse our collections.</p>
                    </div>
                  )}
                </>
              )}

              {/* Default state */}
              {query.trim().length === 0 && (
                <div className="py-4">
                  <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#4A4A4C] mb-3">Quick Links</p>
                  <div className="flex flex-wrap gap-2">
                    {["Oud", "Rose", "Sandalwood", "Serum", "Foundation", "Mascara"].map((term) => (
                      <button
                        key={term}
                        onClick={() => handleSearch(term)}
                        className="text-sm px-3.5 py-1.5 rounded-full border border-[#E0DAD4] text-[#4A4A4C] hover:border-[#B76E79] hover:text-[#B76E79] transition-colors duration-200"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
