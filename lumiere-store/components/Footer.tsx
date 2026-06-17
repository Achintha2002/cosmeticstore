"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const footerLinks = [
  {
    heading: "Shop",
    links: [
      { label: "Perfumes", href: "/category/perfumes" },
      { label: "Cosmetics", href: "/category/cosmetics" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "Sign In", href: "/login" },
      { label: "Cart", href: "/cart" },
    ],
  },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#F0EDE8] border-t border-[#E0DAD4] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="font-display text-2xl font-bold tracking-[0.2em] text-[#1C1C1E] hover:text-[#B76E79] transition-colors duration-300"
            >
              LUMIÈRE
            </Link>
            <p className="mt-4 text-sm text-[#4A4A4C] leading-relaxed max-w-xs">
              Crafted for those who find beauty in every detail. Our collections
              celebrate the art of fragrance and the science of cosmetics.
            </p>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, color: "#B76E79" }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-white border border-[#E0DAD4] flex items-center justify-center text-[#4A4A4C] hover:text-[#B76E79] hover:border-[#B76E79] transition-colors duration-200"
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-[#1C1C1E] mb-4">
                {col.heading}
              </h3>
              <ul className="space-y-3" role="list">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#4A4A4C] hover:text-[#B76E79] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-[#E0DAD4]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="font-display text-lg font-semibold text-[#1C1C1E]">
                Join the inner circle
              </h3>
              <p className="text-sm text-[#4A4A4C] mt-1">
                Early access to new collections, exclusive offers, and beauty
                rituals.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full max-w-sm"
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                placeholder="Your email address"
                aria-label="Email address for newsletter"
                className="flex-1 px-4 py-3 text-sm bg-white border border-[#E0DAD4] rounded-l-xl focus:outline-none focus:ring-2 focus:ring-[#B76E79] focus:border-transparent text-[#1C1C1E] placeholder:text-[#4A4A4C]"
                required
              />
              <button
                type="submit"
                className="px-5 py-3 bg-[#B76E79] text-white text-sm font-medium rounded-r-xl hover:bg-[#9A5560] transition-colors duration-200 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-[#E0DAD4] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-[#4A4A4C]">
          <p>© {new Date().getFullYear()} LUMIÈRE. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-[#B76E79] transition-colors duration-200">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#B76E79] transition-colors duration-200">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
