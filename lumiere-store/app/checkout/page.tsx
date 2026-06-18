"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

type Step = "shipping" | "payment" | "confirmation";

const COUNTRIES = [
  "Sri Lanka", "United States", "United Kingdom", "Australia", "Canada",
  "India", "Singapore", "UAE", "Germany", "France", "Japan",
];

const SHIPPING_METHODS = [
  { id: "standard", label: "Standard Shipping", sub: "1–3 Business Days", price: 2 },
  { id: "overnight", label: "Overnight Delivery", sub: "Next Business Area (Only Colombo Area)", price: 10 },
];

const PAYMENT_METHODS = [
  { id: "card", label: "Credit / Debit Card Payments", desc: "Pay securely with Visa, Mastercard, or Amex." },
  { id: "koko", label: "Koko", desc: "Buy Now Pay Later. Split into 3 interest-free installments." },
  { id: "mintpay", label: "Mintpay", desc: "Shop now. Pay later. 3 easy payments." },
  { id: "bank", label: "Bank Transfer", desc: "Direct deposit to our account." },
  { id: "cod", label: "Cash on Delivery", desc: "Pay in cash upon receiving your order." },
];

const inputClass =
  "w-full px-4 py-3 bg-white border border-[#E0DAD4] rounded-xl text-sm text-[#1C1C1E] placeholder:text-[#A09A94] focus:outline-none focus:ring-2 focus:ring-[#B76E79] focus:border-transparent transition-all duration-200";
const labelClass =
  "block text-xs font-semibold tracking-wider uppercase text-[#4A4A4C] mb-1.5";

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>("shipping");
  const [shippingMethodId, setShippingMethodId] = useState("standard");
  const [emailOffers, setEmailOffers] = useState(false);
  const [smsOffers, setSmsOffers] = useState(false);
  const [saveInfo, setSaveInfo] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [paymentMethodId, setPaymentMethodId] = useState("card");
  const [form, setForm] = useState({
    email: "",
    firstName: "", lastName: "",
    country: "Sri Lanka",
    address: "", apt: "",
    city: "", postalCode: "",
    phone: "",
    cardNumber: "", cardExpiry: "", cardCvc: "", cardName: "",
  });

  const { subtotal, clearCart, state } = useCart();
  const selectedMethod = SHIPPING_METHODS.find(m => m.id === shippingMethodId) ?? SHIPPING_METHODS[0];
  const discount = discountApplied ? subtotal * 0.1 : 0;
  const total = subtotal - discount + selectedMethod.price;

  React.useEffect(() => {
    if (step !== "payment" || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  const handleShippingSubmit = (e: React.FormEvent) => { e.preventDefault(); setStep("payment"); };
  const handlePaymentSubmit = (e: React.FormEvent) => { e.preventDefault(); clearCart(); setStep("confirmation"); };

  // Step indicator
  const stepOrder: Step[] = ["shipping", "payment", "confirmation"];
  const currentIndex = stepOrder.indexOf(step);
  const visibleSteps = [
    { key: "shipping" as Step, label: "Shipping" },
    { key: "payment" as Step, label: "Payment" },
  ];

  /* ── Order Summary Panel ── */
  const OrderSummary = () => (
    <div className="bg-white rounded-2xl card-shadow p-6 h-fit sticky top-28">
      {/* Items */}
      <div className="space-y-4 mb-5">
        {state.items.map(i => (
          <div key={i.product.id} className="flex items-center gap-3">
            <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-[#F0EDE8] flex-shrink-0 ring-1 ring-[#E0DAD4]">
              <Image src={i.product.images[0]} alt={i.product.name} fill sizes="56px" className="object-cover" />
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#1C1C1E] text-white text-[9px] font-bold flex items-center justify-center">
                {i.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#1C1C1E] truncate">{i.product.name}</p>
              <p className="text-xs text-[#4A4A4C] capitalize">{i.product.category}</p>
            </div>
            <span className="text-sm font-semibold text-[#1C1C1E] flex-shrink-0">
              ${(i.product.price * i.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Discount code */}
      <div className="flex gap-2 mb-5">
        <input
          type="text"
          placeholder="Discount code or gift card"
          value={discountCode}
          onChange={e => setDiscountCode(e.target.value)}
          className="flex-1 px-3 py-2.5 text-sm bg-white border border-[#E0DAD4] rounded-xl text-[#1C1C1E] placeholder:text-[#A09A94] focus:outline-none focus:ring-2 focus:ring-[#B76E79] focus:border-transparent"
        />
        <button
          onClick={() => { if (discountCode.trim()) setDiscountApplied(true); }}
          className="px-4 py-2.5 bg-[#F0EDE8] text-[#1C1C1E] text-sm font-semibold rounded-xl hover:bg-[#E8E4DE] transition-colors duration-200"
        >
          Apply
        </button>
      </div>

      {/* Totals */}
      <div className="space-y-2.5 border-t border-[#E0DAD4] pt-4">
        <div className="flex justify-between text-sm text-[#4A4A4C]">
          <span>Subtotal</span>
          <span className="font-medium text-[#1C1C1E]">${subtotal.toFixed(2)}</span>
        </div>
        {discountApplied && (
          <div className="flex justify-between text-sm">
            <span className="text-green-600">Discount (10%)</span>
            <span className="text-green-600 font-medium">−${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm text-[#4A4A4C]">
          <span>Shipping</span>
          <span className="font-medium text-[#1C1C1E]">${selectedMethod.price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-[#1C1C1E] text-base pt-2 border-t border-[#E0DAD4]">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
      <div className="mb-10">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#B76E79] mb-2">Secure Checkout</p>
        <h1 className="font-display text-4xl font-bold text-[#1C1C1E]">Checkout</h1>
      </div>

      {/* Step indicator */}
      {step !== "confirmation" && (
        <div className="flex items-center gap-3 mb-12" role="list" aria-label="Checkout steps">
          {visibleSteps.map((s, i) => {
            const idx = stepOrder.indexOf(s.key);
            const done = idx < currentIndex;
            const active = idx === currentIndex;
            return (
              <React.Fragment key={s.key}>
                <div role="listitem" aria-current={active ? "step" : undefined} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${done ? "bg-green-500 text-white" : active ? "bg-[#1C1C1E] text-white" : "bg-[#F0EDE8] text-[#4A4A4C]"
                    }`}>
                    {done
                      ? <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      : i + 1}
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
        {/* ── STEP 1: Shipping ── */}
        {step === "shipping" && (
          <motion.div key="shipping" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              <form onSubmit={handleShippingSubmit} className="lg:col-span-3 space-y-8" aria-label="Shipping information">

                {/* Contact section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display text-xl font-semibold text-[#1C1C1E]">Contact</h2>
                    <Link href="/login" className="text-sm text-[#B76E79] hover:text-[#9A5560] underline underline-offset-2 font-medium transition-colors">
                      Sign in
                    </Link>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label htmlFor="checkout-email" className={labelClass}>Email</label>
                      <input id="checkout-email" type="email" required placeholder="you@example.com" value={form.email} onChange={set("email")} className={inputClass} />
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={emailOffers}
                        onChange={e => setEmailOffers(e.target.checked)}
                        className="w-4 h-4 rounded border-[#E0DAD4] text-[#B76E79] focus:ring-[#B76E79] accent-[#B76E79]"
                      />
                      <span className="text-sm text-[#4A4A4C] group-hover:text-[#1C1C1E] transition-colors">Email me with news and exclusive offers</span>
                    </label>
                  </div>
                </div>

                {/* Delivery section */}
                <div>
                  <h2 className="font-display text-xl font-semibold text-[#1C1C1E] mb-4">Delivery</h2>
                  <div className="space-y-3">
                    {/* Country */}
                    <div>
                      <label htmlFor="country" className={labelClass}>Country / Region</label>
                      <select id="country" value={form.country} onChange={set("country")}
                        className="w-full px-4 py-3 bg-white border border-[#E0DAD4] rounded-xl text-sm text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#B76E79] focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                      >
                        {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>

                    {/* First + Last name */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="firstName" className={labelClass}>First Name</label>
                        <input id="firstName" type="text" required placeholder="Jane" value={form.firstName} onChange={set("firstName")} className={inputClass} />
                      </div>
                      <div>
                        <label htmlFor="lastName" className={labelClass}>Last Name</label>
                        <input id="lastName" type="text" required placeholder="Doe" value={form.lastName} onChange={set("lastName")} className={inputClass} />
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <label htmlFor="address" className={labelClass}>Address</label>
                      <input id="address" type="text" required placeholder="123 Perfume Lane" value={form.address} onChange={set("address")} className={inputClass} />
                    </div>

                    {/* Apt / Suite */}
                    <div>
                      <label htmlFor="apt" className={labelClass}>Apartment, suite, etc. <span className="normal-case font-normal text-[#A09A94]">(optional)</span></label>
                      <input id="apt" type="text" placeholder="Apt 4B" value={form.apt} onChange={set("apt")} className={inputClass} />
                    </div>

                    {/* City + Postal code */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="city" className={labelClass}>City</label>
                        <input id="city" type="text" required placeholder="Colombo" value={form.city} onChange={set("city")} className={inputClass} />
                      </div>
                      <div>
                        <label htmlFor="postalCode" className={labelClass}>Postal Code <span className="normal-case font-normal text-[#A09A94]">(optional)</span></label>
                        <input id="postalCode" type="text" placeholder="10001" value={form.postalCode} onChange={set("postalCode")} className={inputClass} />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className={labelClass}>Phone</label>
                      <div className="relative">
                        <input id="phone" type="tel" placeholder="+94 77 000 0000" value={form.phone} onChange={set("phone")} className={`${inputClass} pr-10`} />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A09A94]">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-2.5 pt-1">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" checked={saveInfo} onChange={e => setSaveInfo(e.target.checked)} className="w-4 h-4 rounded border-[#E0DAD4] accent-[#B76E79]" />
                        <span className="text-sm text-[#4A4A4C] group-hover:text-[#1C1C1E] transition-colors">Save this information for next time</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" checked={smsOffers} onChange={e => setSmsOffers(e.target.checked)} className="w-4 h-4 rounded border-[#E0DAD4] accent-[#B76E79]" />
                        <span className="text-sm text-[#4A4A4C] group-hover:text-[#1C1C1E] transition-colors">Text me with news and offers</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Shipping method */}
                <div>
                  <h2 className="font-display text-xl font-semibold text-[#1C1C1E] mb-4">Shipping Method</h2>
                  <div className="space-y-3">
                    {SHIPPING_METHODS.map(method => (
                      <label key={method.id} className={`flex items-center justify-between gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${shippingMethodId === method.id
                          ? "border-[#B76E79] bg-[#B76E79]/5"
                          : "border-[#E0DAD4] bg-white hover:border-[#B76E79]/50"
                        }`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${shippingMethodId === method.id ? "border-[#B76E79]" : "border-[#D0CAC4]"
                            }`}>
                            {shippingMethodId === method.id && <div className="w-2.5 h-2.5 rounded-full bg-[#B76E79]" />}
                          </div>
                          <input type="radio" name="shipping" value={method.id} checked={shippingMethodId === method.id} onChange={() => setShippingMethodId(method.id)} className="sr-only" />
                          <div>
                            <p className="text-sm font-semibold text-[#1C1C1E]">{method.label}</p>
                            <p className="text-xs text-[#4A4A4C]">{method.sub}</p>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-[#1C1C1E] flex-shrink-0">${method.price.toFixed(2)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button type="submit" id="continue-to-payment-btn"
                  className="w-full py-4 bg-[#1C1C1E] text-white text-sm font-semibold tracking-wider uppercase rounded-2xl hover:bg-[#B76E79] transition-colors duration-300">
                  Continue to Payment
                </button>
              </form>

              <div className="lg:col-span-2">
                <OrderSummary />
              </div>
            </div>
          </motion.div>
        )}

        {/* ── STEP 2: Payment ── */}
        {step === "payment" && (
          <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              <form onSubmit={handlePaymentSubmit} className="lg:col-span-3 space-y-6" aria-label="Payment information">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl font-semibold text-[#1C1C1E]">Payment</h2>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#B76E79] bg-[#B76E79]/10 px-3 py-1.5 rounded-lg">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span>{formatTime(timeLeft)}</span>
                  </div>
                </div>

                {/* Secure badge */}
                <div className="flex items-center gap-2 text-xs text-[#4A4A4C] bg-[#F0EDE8] rounded-xl px-4 py-3">
                  <svg className="w-4 h-4 text-[#B76E79] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  All transactions are secure and encrypted
                </div>

                {/* Payment Methods */}
                <div className="space-y-3">
                  {PAYMENT_METHODS.map(method => (
                    <div key={method.id} className={`border-2 rounded-xl overflow-hidden transition-all duration-200 ${
                      paymentMethodId === method.id ? "border-[#B76E79]" : "border-[#E0DAD4]"
                    }`}>
                      <label className="flex items-center gap-4 p-4 cursor-pointer hover:bg-[#FAF9F6]">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                          paymentMethodId === method.id ? "border-[#B76E79]" : "border-[#D0CAC4]"
                        }`}>
                          {paymentMethodId === method.id && <div className="w-2.5 h-2.5 rounded-full bg-[#B76E79]" />}
                        </div>
                        <input type="radio" name="paymentMethod" value={method.id} checked={paymentMethodId === method.id} onChange={() => setPaymentMethodId(method.id)} className="sr-only" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-[#1C1C1E] flex items-center gap-2">
                            {method.label}
                            {method.id === "koko" && <span className="bg-[#FF4A7A] text-white text-[10px] font-bold px-2 py-0.5 rounded-md tracking-wider">koko</span>}
                            {method.id === "mintpay" && <span className="bg-[#00D09C] text-white text-[10px] font-bold px-2 py-0.5 rounded-md tracking-wider">mintpay</span>}
                            {method.id === "bank" && <svg className="w-4 h-4 text-[#4A4A4C]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                            {method.id === "cod" && <svg className="w-4 h-4 text-[#4A4A4C]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11M14 9h4l4 4v4c0 .6-.4 1-1 1h-2M9 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM19 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                          </p>
                          <p className="text-xs text-[#4A4A4C] mt-0.5">{method.desc}</p>
                        </div>
                      </label>
                      
                      {/* Expanded content for selected method */}
                      {paymentMethodId === method.id && (
                        <div className="bg-[#FAF9F6] border-t border-[#E0DAD4] p-4">
                          {method.id === "card" && (
                            <div className="space-y-4">
                              <div className="flex items-center gap-2 pt-1 mb-2">
                                {/* Visa */}
                                <div className="w-10 h-7 bg-white border border-[#E0DAD4] rounded flex items-center justify-center">
                                  <span className="text-[#1434CB] font-bold text-[10px] italic tracking-wider">VISA</span>
                                </div>
                                {/* Mastercard */}
                                <div className="w-10 h-7 bg-white border border-[#E0DAD4] rounded flex items-center justify-center">
                                  <svg viewBox="0 0 24 15" className="h-3" fill="none">
                                    <circle cx="7.5" cy="7.5" r="7.5" fill="#EB001B"/>
                                    <circle cx="16.5" cy="7.5" r="7.5" fill="#F79E1B"/>
                                    <path d="M12 12.8A7.5 7.5 0 0012 2.2a7.5 7.5 0 000 10.6z" fill="#FF5F00"/>
                                  </svg>
                                </div>
                                {/* Amex */}
                                <div className="w-10 h-7 bg-[#002663] rounded flex items-center justify-center">
                                  <span className="text-white font-bold text-[8px] tracking-tighter">AMEX</span>
                                </div>
                              </div>
                              <div>
                                <label htmlFor="cardNumber" className={labelClass}>Card Number</label>
                                <input id="cardNumber" type="text" required placeholder="1234 5678 9012 3456" maxLength={19} value={form.cardNumber}
                                  onChange={e => setForm(f => ({ ...f, cardNumber: e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim().slice(0, 19) }))}
                                  className={inputClass} />
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label htmlFor="cardExpiry" className={labelClass}>Expiry Date</label>
                                  <input id="cardExpiry" type="text" required placeholder="MM / YY" maxLength={7} value={form.cardExpiry}
                                    onChange={e => {
                                      let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                                      if (v.length >= 3) v = v.slice(0, 2) + " / " + v.slice(2);
                                      setForm(f => ({ ...f, cardExpiry: v }));
                                    }}
                                    className={inputClass} />
                                </div>
                                <div>
                                  <label htmlFor="cardCvc" className={labelClass}>Security Code</label>
                                  <input id="cardCvc" type="text" required placeholder="CVC" maxLength={4} value={form.cardCvc}
                                    onChange={e => setForm(f => ({ ...f, cardCvc: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                                    className={inputClass} />
                                </div>
                              </div>
                              <div>
                                <label htmlFor="cardName" className={labelClass}>Name on Card</label>
                                <input id="cardName" type="text" required placeholder="Jane Doe" value={form.cardName} onChange={set("cardName")} className={inputClass} />
                              </div>
                            </div>
                          )}
                          {method.id === "koko" && (
                            <p className="text-sm text-[#4A4A4C]">You will be redirected to Koko to securely complete your payment.</p>
                          )}
                          {method.id === "mintpay" && (
                            <p className="text-sm text-[#4A4A4C]">You will be redirected to Mintpay to securely complete your payment.</p>
                          )}
                          {method.id === "bank" && (
                            <div className="text-sm text-[#4A4A4C] space-y-1">
                              <p>Please transfer the total amount to the following bank account:</p>
                              <p className="font-semibold text-[#1C1C1E] mt-2">Bank: Commercial Bank</p>
                              <p className="font-semibold text-[#1C1C1E]">Account Name: LUMIERE PVT LTD</p>
                              <p className="font-semibold text-[#1C1C1E]">Account Number: 1000 2345 6789</p>
                              <p className="mt-2 text-xs">Your order will not ship until we receive the funds.</p>
                            </div>
                          )}
                          {method.id === "cod" && (
                            <p className="text-sm text-[#4A4A4C]">You can pay in cash to our courier when your order is delivered.</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Shipping summary */}
                <div className="border border-[#E0DAD4] rounded-xl p-4 bg-[#FAF9F6]">
                  <p className="text-xs font-semibold tracking-wider uppercase text-[#4A4A4C] mb-2">Delivery to</p>
                  <p className="text-sm text-[#1C1C1E] font-medium">{form.firstName} {form.lastName}</p>
                  <p className="text-sm text-[#4A4A4C]">{form.address}{form.apt ? `, ${form.apt}` : ""}, {form.city}, {form.country}</p>
                  <p className="text-sm text-[#4A4A4C]">{selectedMethod.label} · ${selectedMethod.price.toFixed(2)}</p>
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep("shipping")}
                    className="flex-1 py-3.5 border-2 border-[#E0DAD4] text-[#4A4A4C] text-sm font-semibold rounded-2xl hover:border-[#B76E79] hover:text-[#B76E79] transition-colors duration-200">
                    ← Back
                  </button>
                  <button id="place-order-btn" type="submit"
                    className="flex-[2] py-3.5 bg-[#B76E79] text-white text-sm font-semibold tracking-wider uppercase rounded-2xl hover:bg-[#9A5560] transition-colors duration-300">
                    Place Order · ${total.toFixed(2)}
                  </button>
                </div>
              </form>

              <div className="lg:col-span-2">
                <OrderSummary />
              </div>
            </div>
          </motion.div>
        )}

        {/* ── STEP 3: Confirmation ── */}
        {step === "confirmation" && (
          <motion.div key="confirmation" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
            className="flex flex-col items-center py-20 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
              className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
            <h2 className="font-display text-3xl font-bold text-[#1C1C1E] mb-3">Order Confirmed!</h2>
            <p className="text-[#4A4A4C] max-w-md mb-3 leading-relaxed">
              Thank you for your order, <strong>{form.firstName || "dear customer"}</strong>. A confirmation will be sent to <strong>{form.email || "your email"}</strong>.
            </p>
            <p className="text-sm text-[#4A4A4C] mb-8">Your LUMIÈRE selection is being prepared with care via <span className="text-[#B76E79] font-medium">{selectedMethod.label}</span>.</p>
            <Link href="/" className="px-8 py-4 bg-[#1C1C1E] text-white text-sm font-semibold tracking-wider uppercase rounded-2xl hover:bg-[#B76E79] transition-colors duration-300">
              Continue Shopping
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
