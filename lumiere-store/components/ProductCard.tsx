"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-shadow duration-400"
    >
      {/* Image */}
      <Link
        href={`/product/${product.id}`}
        className="relative block aspect-[3/4] overflow-hidden bg-[#F0EDE8]"
        aria-label={`View ${product.name}`}
        tabIndex={0}
      >
        <motion.div
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={product.images[0]}
            alt={`${product.name} — ${product.category}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            priority={priority}
          />
        </motion.div>

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#4A4A4C] bg-white/90 px-4 py-2 rounded-full border border-[#E0DAD4]">
              Sold Out
            </span>
          </div>
        )}

        {/* Category badge */}
        <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-[0.12em] uppercase text-[#4A4A4C] bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#E0DAD4]">
          {product.category}
        </span>
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="flex-1">
          <Link href={`/product/${product.id}`} className="block group-hover:text-[#B76E79] transition-colors duration-200">
            <h3 className="font-display text-base font-semibold text-[#1C1C1E] leading-tight line-clamp-2">
              {product.name}
            </h3>
          </Link>
          {product.scentNotes.length > 0 && (
            <p className="mt-1 text-xs text-[#4A4A4C] line-clamp-1">
              {product.scentNotes.slice(0, 3).join(" · ")}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-[#1C1C1E]">
            ${product.price.toFixed(2)}
          </p>

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => product.inStock && addItem(product)}
            disabled={!product.inStock}
            aria-label={
              product.inStock
                ? `Add ${product.name} to cart`
                : `${product.name} is out of stock`
            }
            className={`flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase px-3.5 py-2 rounded-xl transition-all duration-200 ${
              product.inStock
                ? "bg-[#1C1C1E] text-white hover:bg-[#B76E79]"
                : "bg-[#F0EDE8] text-[#4A4A4C] cursor-not-allowed"
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            Add
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

// Skeleton for loading state
export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col bg-white rounded-2xl overflow-hidden card-shadow animate-pulse">
      <div className="aspect-[3/4] bg-[#E8E4DE]" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-[#E8E4DE] rounded-lg w-3/4" />
        <div className="h-3 bg-[#E8E4DE] rounded-lg w-1/2" />
        <div className="flex justify-between items-center pt-1">
          <div className="h-5 bg-[#E8E4DE] rounded-lg w-16" />
          <div className="h-8 bg-[#E8E4DE] rounded-xl w-16" />
        </div>
      </div>
    </div>
  );
}
