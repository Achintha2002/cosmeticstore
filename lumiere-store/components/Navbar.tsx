"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import SearchModal from "./SearchModal";
import LoginCard from "./LoginCard";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const { totalItems } = useCart();
  const { isAuthenticated, state: authState, logout } = useAuth();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    if (mobileOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileOpen]);

  const navLinks = [
    { label: "Perfumes", href: "/category/perfumes" },
    { label: "Cosmetics", href: "/category/cosmetics" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const isHeroPage = pathname === "/";

  return (
    <>
      <header
        className={`absolute top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || !isHeroPage
            ? "glass shadow-glass"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 font-display text-xl md:text-2xl font-bold tracking-[0.2em] text-[#1C1C1E] hover:text-[#B76E79] transition-colors duration-300"
            aria-label="LUMIÈRE — Home"
          >
            LUMIÈRE
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium tracking-wider uppercase transition-colors duration-200 relative group ${
                    pathname.startsWith(link.href)
                      ? "text-[#B76E79]"
                      : "text-[#1C1C1E] hover:text-[#B76E79]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-[#B76E79] transition-all duration-300 ${
                      pathname.startsWith(link.href)
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Search */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
              className="p-2 rounded-full text-[#1C1C1E] hover:text-[#B76E79] hover:bg-[#F0EDE8] transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.35-4.35" strokeLinecap="round" />
              </svg>
            </motion.button>

            {/* Login / User */}
            {isAuthenticated ? (
              <div className="relative group">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  aria-label="Account menu"
                  className="p-2 rounded-full text-[#B76E79] hover:bg-[#F0EDE8] transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </motion.button>
                <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-[#E0DAD4] rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="px-4 py-3 border-b border-[#E0DAD4]">
                    <p className="text-xs text-[#4A4A4C]">Signed in as</p>
                    <p className="text-sm font-medium text-[#1C1C1E] truncate">{authState.user?.name}</p>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-3 text-sm text-[#1C1C1E] hover:text-[#B76E79] hover:bg-[#FAF9F6] transition-colors duration-150"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setLoginOpen(true)}
                aria-label="Sign in"
                className="p-2 rounded-full text-[#1C1C1E] hover:text-[#B76E79] hover:bg-[#F0EDE8] transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </motion.button>
            )}

            {/* Cart */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}>
              <Link
                href="/cart"
                aria-label={`Shopping cart, ${totalItems} item${totalItems !== 1 ? "s" : ""}`}
                className="relative p-2 rounded-full text-[#1C1C1E] hover:text-[#B76E79] hover:bg-[#F0EDE8] transition-colors duration-200 inline-block"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      key="badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#B76E79] text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                      aria-hidden="true"
                    >
                      {totalItems > 99 ? "99+" : totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          </div>

          {/* Mobile: Cart + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/cart"
              aria-label={`Cart, ${totalItems} items`}
              className="relative p-2 text-[#1C1C1E]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 bg-[#B76E79] text-white text-[9px] font-bold rounded-full flex items-center justify-center" aria-hidden="true">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="p-2 text-[#1C1C1E]"
            >
              <span className="sr-only">{mobileOpen ? "Close" : "Open"} navigation</span>
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`block h-px bg-current transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
                <span className={`block h-px bg-current transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
                <span className={`block h-px bg-current transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[9px]" : ""}`} />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              ref={menuRef}
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden glass border-t border-[#E0DAD4] overflow-hidden"
            >
              <div className="px-4 py-5 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-base font-medium tracking-wider uppercase py-1 transition-colors duration-200 ${
                      pathname.startsWith(link.href)
                        ? "text-[#B76E79]"
                        : "text-[#1C1C1E]"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <hr className="border-[#E0DAD4]" />
                <button
                  onClick={() => { setMobileOpen(false); setSearchOpen(true); }}
                  className="text-left text-base font-medium text-[#1C1C1E] tracking-wider uppercase py-1"
                >
                  Search
                </button>
                {isAuthenticated ? (
                  <button
                    onClick={() => { setMobileOpen(false); logout(); }}
                    className="text-left text-base font-medium text-[#B76E79] tracking-wider uppercase py-1"
                  >
                    Sign Out
                  </button>
                ) : (
                  <button
                    onClick={() => { setMobileOpen(false); setLoginOpen(true); }}
                    className="text-left text-base font-medium text-[#1C1C1E] tracking-wider uppercase py-1"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Modals */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <LoginCard isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
