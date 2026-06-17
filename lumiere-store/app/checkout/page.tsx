"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

type Step = "shipping" | "payment" | "confirmation";

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>("shipping");
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", address: "", city: "", country: "Sri Lanka", zip: "",
  });
  const { subtotal, clearCart, state } = useCart();
  const shipping = subtotal > 120 ? 0 : 12;
  const total = subtotal + shipping;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    setStep("confirmation");
  };

  const steps: { key: Step; label: string }[] = [
    { key: "shipping", label: "Shipping" },
    { key: "payment", label: "Payment" },
    { key: "confirmation", label: "Confirmation" },
  ];
  const stepOrder: Step[] = ["shipping", "payment", "confirmation"];
  const currentIndex = stepOrder.indexOf(step);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
      <div className="mb-10">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#B76E79] mb-2">Secure Checkout</p>
        <h1 className="font-display text-4xl font-bold text-[#1C1C1E]">Checkout</h1>
      </div>

      {/* Step indicator */}
      {step !== "confirmation" && (
        <div className="flex items-center gap-3 mb-12" role="list" aria-label="Checkout steps">
          {steps.slice(0, 2).map((s, i) => {
            const idx = stepOrder.indexOf(s.key);
            const done = idx < currentIndex;
            const active = idx === currentIndex;
            return (
              <React.Fragment key={s.key}>
                <div
                  role="listitem"
                  aria-current={active ? "step" : undefined}
                  className="flex items-center gap-2"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    done ? "bg-green-500 text-white" : active ? "bg-[#1C1C1E] text-white" : "bg-[#F0EDE8] text-[#4A4A4C]"
                  }`}>
                    {done ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    ) : i + 1}
                  </div>
                  <span className={`text-sm font-medium ${active ? "text-[#1C1C1E]" : "text-[#4A4A4C]"}`}>{s.label}</span>
                </div>
                {i < 1 && <div className="flex-1 h-px bg-[#E0DAD4]" aria-hidden="true" />}
              </React.Fragment>
            );
          })}
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* STEP 1 — Shipping */}
        {step === "shipping" && (
          <motion.div key="shipping" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              <form onSubmit={handleShippingSubmit} className="lg:col-span-3 space-y-5" aria-label="Shipping information">
                <h2 className="font-display text-xl font-semibold text-[#1C1C1E] mb-6">Shipping Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-xs font-semibold tracking-wider uppercase text-[#4A4A4C] mb-1.5">First Name</label>
                    <input id="firstName" type="text" required value={form.firstName} onChange={e => setForm(f => ({...f, firstName: e.target.value}))} className="w-full px-4 py-3 bg-white border border-[#E0DAD4] rounded-xl text-sm text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#B76E79] focus:border-transparent" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-xs font-semibold tracking-wider uppercase text-[#4A4A4C] mb-1.5">Last Name</label>
                    <input id="lastName" type="text" required value={form.lastName} onChange={e => setForm(f => ({...f, lastName: e.target.value}))} className="w-full px-4 py-3 bg-white border border-[#E0DAD4] rounded-xl text-sm text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#B76E79] focus:border-transparent" />
                  </div>
                </div>
                <div>
                  <label htmlFor="checkout-email" className="block text-xs font-semibold tracking-wider uppercase text-[#4A4A4C] mb-1.5">Email</label>
                  <input id="checkout-email" type="email" required value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} className="w-full px-4 py-3 bg-white border border-[#E0DAD4] rounded-xl text-sm text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#B76E79] focus:border-transparent" />
                </div>
                <div>
                  <label htmlFor="address" className="block text-xs font-semibold tracking-wider uppercase text-[#4A4A4C] mb-1.5">Street Address</label>
                  <input id="address" type="text" required value={form.address} onChange={e => setForm(f => ({...f, address: e.target.value}))} className="w-full px-4 py-3 bg-white border border-[#E0DAD4] rounded-xl text-sm text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#B76E79] focus:border-transparent" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label htmlFor="city" className="block text-xs font-semibold tracking-wider uppercase text-[#4A4A4C] mb-1.5">City</label>
                    <input id="city" type="text" required value={form.city} onChange={e => setForm(f => ({...f, city: e.target.value}))} className="w-full px-4 py-3 bg-white border border-[#E0DAD4] rounded-xl text-sm text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#B76E79] focus:border-transparent" />
                  </div>
                  <div>
                    <label htmlFor="zip" className="block text-xs font-semibold tracking-wider uppercase text-[#4A4A4C] mb-1.5">ZIP</label>
                    <input id="zip" type="text" value={form.zip} onChange={e => setForm(f => ({...f, zip: e.target.value}))} className="w-full px-4 py-3 bg-white border border-[#E0DAD4] rounded-xl text-sm text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#B76E79] focus:border-transparent" />
                  </div>
                </div>
                <button type="submit" id="continue-to-payment-btn" className="w-full py-4 bg-[#1C1C1E] text-white text-sm font-semibold tracking-wider uppercase rounded-2xl hover:bg-[#B76E79] transition-colors duration-300 mt-2">
                  Continue to Payment
                </button>
              </form>
              {/* Mini summary */}
              <div className="lg:col-span-2 bg-white rounded-2xl card-shadow p-6 h-fit">
                <h3 className="font-display text-base font-semibold text-[#1C1C1E] mb-4">Order ({state.items.length} items)</h3>
                <div className="space-y-3 mb-4">
                  {state.items.map(i => (
                    <div key={i.product.id} className="flex justify-between text-sm">
                      <span className="text-[#4A4A4C] truncate pr-2">{i.product.name} ×{i.quantity}</span>
                      <span className="text-[#1C1C1E] font-medium flex-shrink-0">${(i.product.price * i.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#E0DAD4] pt-3 flex justify-between font-semibold text-[#1C1C1E]">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 2 — Payment (stub) */}
        {step === "payment" && (
          <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            <h2 className="font-display text-xl font-semibold text-[#1C1C1E] mb-8">Payment</h2>
            <div className="max-w-lg">
              <div className="bg-[#F0EDE8] rounded-2xl p-8 border border-dashed border-[#B76E79]/40 text-center mb-6">
                <div className="w-14 h-14 rounded-full bg-[#B76E79]/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-[#B76E79]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                </div>
                <h3 className="font-display text-lg font-semibold text-[#1C1C1E] mb-2">Payment Integration Coming Soon</h3>
                <p className="text-sm text-[#4A4A4C] leading-relaxed">
                  Secure payment processing via Stripe or PayHere will be integrated in v2.
                  Click below to simulate a successful order.
                </p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep("shipping")} className="flex-1 py-3.5 border-2 border-[#E0DAD4] text-[#4A4A4C] text-sm font-semibold rounded-2xl hover:border-[#B76E79] hover:text-[#B76E79] transition-colors duration-200">
                  ← Back
                </button>
                <form onSubmit={handlePaymentSubmit} className="flex-1">
                  <button id="place-order-btn" type="submit" className="w-full py-3.5 bg-[#B76E79] text-white text-sm font-semibold tracking-wider uppercase rounded-2xl hover:bg-[#9A5560] transition-colors duration-300">
                    Place Order
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 3 — Confirmation */}
        {step === "confirmation" && (
          <motion.div key="confirmation" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="flex flex-col items-center py-20 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2, stiffness: 200 }} className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
            <h2 className="font-display text-3xl font-bold text-[#1C1C1E] mb-3">Order Confirmed!</h2>
            <p className="text-[#4A4A4C] max-w-md mb-8 leading-relaxed">
              Thank you for your order. You&apos;ll receive a confirmation email shortly. Your LUMIÈRE selection is being prepared with care.
            </p>
            <Link href="/" className="px-8 py-4 bg-[#1C1C1E] text-white text-sm font-semibold tracking-wider uppercase rounded-2xl hover:bg-[#B76E79] transition-colors duration-300">
              Continue Shopping
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
