"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import type { Metadata } from "next";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center" aria-label="Contact header">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#B76E79] mb-3">Get in touch</p>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-[#1C1C1E] mb-6">Contact Us</h1>
        <p className="text-[#4A4A4C] text-lg max-w-xl mx-auto leading-relaxed">
          Whether you have a question about our fragrances, need beauty advice, or want to collaborate — we&apos;d love to hear from you.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24" aria-label="Contact form and details">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl card-shadow p-12"
              >
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="font-display text-2xl font-semibold text-[#1C1C1E] mb-3">Message Sent!</h2>
                <p className="text-[#4A4A4C] mb-6">Thank you for reaching out. Our team will respond within 24 hours.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }} className="text-sm font-semibold text-[#B76E79] hover:underline">
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl card-shadow p-8 space-y-5" aria-label="Contact form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold tracking-wider uppercase text-[#4A4A4C] mb-1.5">Name</label>
                    <input id="contact-name" type="text" required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="Your name" className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#E0DAD4] rounded-xl text-sm text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#B76E79] focus:border-transparent" />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold tracking-wider uppercase text-[#4A4A4C] mb-1.5">Email</label>
                    <input id="contact-email" type="email" required value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} placeholder="you@example.com" className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#E0DAD4] rounded-xl text-sm text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#B76E79] focus:border-transparent" />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-semibold tracking-wider uppercase text-[#4A4A4C] mb-1.5">Subject</label>
                  <input id="contact-subject" type="text" value={form.subject} onChange={e => setForm(f => ({...f, subject: e.target.value}))} placeholder="What can we help with?" className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#E0DAD4] rounded-xl text-sm text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#B76E79] focus:border-transparent" />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold tracking-wider uppercase text-[#4A4A4C] mb-1.5">Message</label>
                  <textarea id="contact-message" rows={5} required value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} placeholder="Tell us more…" className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#E0DAD4] rounded-xl text-sm text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#B76E79] focus:border-transparent resize-none" />
                </div>
                <button type="submit" disabled={loading} id="send-message-btn" className="w-full py-4 bg-[#1C1C1E] text-white text-sm font-semibold tracking-wider uppercase rounded-2xl hover:bg-[#B76E79] transition-colors duration-300 disabled:opacity-60">
                  {loading ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            {[
              { label: "Email", value: "hello@lumiere.com", icon: "✉" },
              { label: "Instagram", value: "@lumiere.luxury", icon: "◎" },
              { label: "Hours", value: "Mon–Fri, 9am–6pm (GMT+5:30)", icon: "◇" },
            ].map((c) => (
              <div key={c.label} className="bg-white rounded-2xl card-shadow p-6 flex gap-4 items-start">
                <span className="text-xl text-[#B76E79] flex-shrink-0 mt-0.5" aria-hidden="true">{c.icon}</span>
                <div>
                  <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#4A4A4C] mb-1">{c.label}</p>
                  <p className="text-sm font-medium text-[#1C1C1E]">{c.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
