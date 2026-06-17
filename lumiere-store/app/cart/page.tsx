"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { state, removeItem, updateQuantity, subtotal } = useCart();
  const { items } = state;
  const shipping = subtotal > 120 ? 0 : 12;
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
      <div className="mb-10">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#B76E79] mb-2">Your Selection</p>
        <h1 className="font-display text-4xl font-bold text-[#1C1C1E]">Shopping Cart</h1>
      </div>

      {items.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="w-20 h-20 rounded-full bg-[#F0EDE8] flex items-center justify-center mb-6">
            <svg className="w-9 h-9 text-[#B76E79]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <h2 className="font-display text-2xl font-semibold text-[#1C1C1E] mb-3">Your cart is empty</h2>
          <p className="text-[#4A4A4C] mb-8 max-w-sm">
            Discover our curated collections and find something extraordinary.
          </p>
          <div className="flex gap-4">
            <Link
              href="/category/perfumes"
              className="px-6 py-3 bg-[#1C1C1E] text-white text-sm font-semibold tracking-wider uppercase rounded-2xl hover:bg-[#B76E79] transition-colors duration-300"
            >
              Shop Perfumes
            </Link>
            <Link
              href="/category/cosmetics"
              className="px-6 py-3 border-2 border-[#1C1C1E] text-[#1C1C1E] text-sm font-semibold tracking-wider uppercase rounded-2xl hover:border-[#B76E79] hover:text-[#B76E79] transition-colors duration-300"
            >
              Shop Cosmetics
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Line items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.div
                  key={item.product.id}
                  layout
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-5 bg-white rounded-2xl p-5 card-shadow"
                >
                  {/* Image */}
                  <Link href={`/product/${item.product.id}`} className="flex-shrink-0 relative w-24 h-32 md:w-28 md:h-36 rounded-xl overflow-hidden bg-[#F0EDE8]">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex flex-col flex-1 min-w-0 gap-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#B76E79]">
                          {item.product.category}
                        </span>
                        <Link href={`/product/${item.product.id}`}>
                          <h3 className="font-display text-base font-semibold text-[#1C1C1E] hover:text-[#B76E79] transition-colors duration-200 leading-tight mt-0.5">
                            {item.product.name}
                          </h3>
                        </Link>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        aria-label={`Remove ${item.product.name} from cart`}
                        className="flex-shrink-0 w-7 h-7 rounded-full bg-[#F0EDE8] text-[#4A4A4C] hover:bg-red-50 hover:text-red-500 transition-colors duration-200 flex items-center justify-center"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      {/* Qty stepper */}
                      <div className="flex items-center border border-[#E0DAD4] rounded-xl overflow-hidden bg-[#FAF9F6]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="w-9 h-9 flex items-center justify-center text-[#1C1C1E] hover:bg-[#F0EDE8] transition-colors duration-150"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14" strokeLinecap="round" /></svg>
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-[#1C1C1E]" aria-live="polite" aria-label={`Quantity: ${item.quantity}`}>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="w-9 h-9 flex items-center justify-center text-[#1C1C1E] hover:bg-[#F0EDE8] transition-colors duration-150"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg>
                        </button>
                      </div>
                      <p className="text-base font-semibold text-[#1C1C1E]">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl card-shadow p-7 sticky top-28">
              <h2 className="font-display text-xl font-semibold text-[#1C1C1E] mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-[#4A4A4C]">
                  <span>Subtotal</span>
                  <span className="text-[#1C1C1E] font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-[#4A4A4C]">
                  <span>Shipping</span>
                  <span className={`font-medium ${shipping === 0 ? "text-green-600" : "text-[#1C1C1E]"}`}>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-[#4A4A4C] bg-[#F0EDE8] rounded-lg px-3 py-2">
                    Free shipping on orders over $120
                  </p>
                )}
                <div className="border-t border-[#E0DAD4] pt-3 flex justify-between">
                  <span className="font-semibold text-[#1C1C1E]">Total</span>
                  <span className="font-semibold text-[#1C1C1E] text-lg">${total.toFixed(2)}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                id="proceed-to-checkout-btn"
                className="block w-full py-4 bg-[#1C1C1E] text-white text-sm font-semibold tracking-wider uppercase rounded-2xl text-center hover:bg-[#B76E79] transition-colors duration-300"
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/category/perfumes"
                className="block w-full py-3 text-sm font-medium text-[#4A4A4C] text-center mt-3 hover:text-[#B76E79] transition-colors duration-200"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
