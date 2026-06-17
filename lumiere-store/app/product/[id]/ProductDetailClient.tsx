"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import ProductCarousel from "@/components/ProductCarousel";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/lib/products";

interface ProductDetailClientProps {
  product: Product;
  related: Product[];
}

export default function ProductDetailClient({ product, related }: ProductDetailClientProps) {
  const { addItem, state } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [ingredientsOpen, setIngredientsOpen] = useState(false);

  const cartItem = state.items.find((i) => i.product.id === product.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs text-[#4A4A4C]" role="list">
            <li><Link href="/" className="hover:text-[#B76E79] transition-colors duration-200">Home</Link></li>
            <li aria-hidden="true" className="text-[#E0DAD4]">/</li>
            <li><Link href={`/category/${product.category}s`} className="hover:text-[#B76E79] transition-colors duration-200 capitalize">{product.category}s</Link></li>
            <li aria-hidden="true" className="text-[#E0DAD4]">/</li>
            <li className="text-[#1C1C1E] font-medium truncate max-w-[200px]">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#F0EDE8]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.images[selectedImage]}
                    alt={`${product.name} — image ${selectedImage + 1}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              {!product.inStock && (
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                  <span className="text-sm font-semibold tracking-widest uppercase text-[#4A4A4C] bg-white/90 px-6 py-3 rounded-full border border-[#E0DAD4]">
                    Sold Out
                  </span>
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    aria-label={`View image ${i + 1}`}
                    aria-current={i === selectedImage ? "true" : "false"}
                    className={`relative w-20 h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all duration-200 ${
                      i === selectedImage
                        ? "border-[#B76E79] shadow-card"
                        : "border-transparent hover:border-[#E0DAD4]"
                    }`}
                  >
                    <Image src={img} alt={`${product.name} thumbnail ${i + 1}`} fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6 pt-2">
            <div>
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#B76E79] mb-2 block capitalize">
                {product.category}
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-[#1C1C1E] leading-tight mb-3">
                {product.name}
              </h1>
              <p className="text-3xl font-semibold text-[#1C1C1E]">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <p className="text-[#4A4A4C] leading-relaxed">{product.description}</p>

            {product.scentNotes.length > 0 && (
              <div>
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#4A4A4C] mb-3">Scent Notes</p>
                <div className="flex flex-wrap gap-2">
                  {product.scentNotes.map((note) => (
                    <span key={note} className="text-sm px-4 py-1.5 rounded-full bg-[#F0EDE8] border border-[#E0DAD4] text-[#1C1C1E] font-medium">
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-[#E0DAD4] rounded-xl overflow-hidden bg-white">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity" className="w-11 h-11 flex items-center justify-center text-[#1C1C1E] hover:bg-[#F0EDE8] transition-colors duration-150">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14" strokeLinecap="round" /></svg>
                </button>
                <span className="w-10 text-center text-sm font-semibold text-[#1C1C1E]" aria-live="polite" aria-label={`Quantity: ${quantity}`}>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity" className="w-11 h-11 flex items-center justify-center text-[#1C1C1E] hover:bg-[#F0EDE8] transition-colors duration-150">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg>
                </button>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                disabled={!product.inStock}
                id="add-to-cart-btn"
                aria-label={product.inStock ? `Add ${product.name} to cart` : "Out of stock"}
                className={`flex-1 py-3.5 text-sm font-semibold tracking-wider uppercase rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 ${
                  added
                    ? "bg-green-600 text-white"
                    : product.inStock
                    ? "bg-[#1C1C1E] text-white hover:bg-[#B76E79]"
                    : "bg-[#F0EDE8] text-[#4A4A4C] cursor-not-allowed"
                }`}
              >
                {added ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Added to Cart
                  </>
                ) : product.inStock ? "Add to Cart" : "Out of Stock"}
              </motion.button>
            </div>

            {cartItem && (
              <p className="text-sm text-[#4A4A4C]">
                {cartItem.quantity} in your cart.{" "}
                <Link href="/cart" className="text-[#B76E79] font-semibold hover:underline">View cart →</Link>
              </p>
            )}

            {product.ingredients.length > 0 && (
              <div className="border-t border-[#E0DAD4] pt-6">
                <button
                  onClick={() => setIngredientsOpen((v) => !v)}
                  aria-expanded={ingredientsOpen}
                  className="w-full flex items-center justify-between text-left"
                >
                  <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#4A4A4C]">Ingredients</span>
                  <svg className={`w-4 h-4 text-[#4A4A4C] transition-transform duration-300 ${ingredientsOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <AnimatePresence>
                  {ingredientsOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                      <p className="text-sm text-[#4A4A4C] leading-relaxed mt-3">{product.ingredients.join(", ")}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-24" aria-label="You may also like">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#B76E79] mb-3">Discover More</p>
            <ProductCarousel products={related} heading="You May Also Like" />
          </section>
        )}
      </div>
    </>
  );
}
