"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface LoginCardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginCard({ isOpen, onClose }: LoginCardProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { login, state } = useAuth();
  const firstInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstInputRef.current?.focus(), 150);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setEmail(""); setPassword(""); setName(""); setError("");
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    const ok = await login(email, password);
    if (ok) { onClose(); router.refresh(); }
    else { setError("Invalid credentials. Please try again."); }
  };

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
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Card */}
          <motion.div
            key="card"
            role="dialog"
            aria-modal="true"
            aria-label={mode === "login" ? "Sign in" : "Create account"}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed z-[70] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#FAF9F6] rounded-3xl shadow-2xl border border-[#E0DAD4] overflow-hidden"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-8 pt-8 pb-6">
              <div>
                <h2 className="font-display text-2xl font-semibold text-[#1C1C1E]">
                  {mode === "login" ? "Welcome back" : "Create account"}
                </h2>
                <p className="text-sm text-[#4A4A4C] mt-1">
                  {mode === "login"
                    ? "Sign in to your LUMIÈRE account"
                    : "Join LUMIÈRE for exclusive access"}
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close sign in dialog"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F0EDE8] text-[#4A4A4C] hover:bg-[#E0DAD4] transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4" noValidate>
              {mode === "signup" && (
                <div>
                  <label htmlFor="login-name" className="block text-xs font-semibold tracking-wider uppercase text-[#4A4A4C] mb-1.5">
                    Full Name
                  </label>
                  <input
                    id="login-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                    className="w-full px-4 py-3 bg-white border border-[#E0DAD4] rounded-xl text-sm text-[#1C1C1E] placeholder:text-[#4A4A4C]/60 focus:outline-none focus:ring-2 focus:ring-[#B76E79] focus:border-transparent transition"
                  />
                </div>
              )}

              <div>
                <label htmlFor="login-email" className="block text-xs font-semibold tracking-wider uppercase text-[#4A4A4C] mb-1.5">
                  Email Address
                </label>
                <input
                  ref={firstInputRef}
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 bg-white border border-[#E0DAD4] rounded-xl text-sm text-[#1C1C1E] placeholder:text-[#4A4A4C]/60 focus:outline-none focus:ring-2 focus:ring-[#B76E79] focus:border-transparent transition"
                />
              </div>

              <div>
                <label htmlFor="login-password" className="block text-xs font-semibold tracking-wider uppercase text-[#4A4A4C] mb-1.5">
                  Password
                </label>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  required
                  className="w-full px-4 py-3 bg-white border border-[#E0DAD4] rounded-xl text-sm text-[#1C1C1E] placeholder:text-[#4A4A4C]/60 focus:outline-none focus:ring-2 focus:ring-[#B76E79] focus:border-transparent transition"
                />
              </div>

              {error && (
                <p role="alert" className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2">
                  {error}
                </p>
              )}

              <motion.button
                type="submit"
                disabled={state.isLoading}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3.5 bg-[#1C1C1E] text-white text-sm font-semibold tracking-wider uppercase rounded-xl hover:bg-[#B76E79] transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {state.isLoading
                  ? "Signing in…"
                  : mode === "login"
                  ? "Sign In"
                  : "Create Account"}
              </motion.button>

              <p className="text-center text-sm text-[#4A4A4C]">
                {mode === "login" ? "New to LUMIÈRE?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}
                  className="text-[#B76E79] font-semibold hover:underline"
                >
                  {mode === "login" ? "Create account" : "Sign in"}
                </button>
              </p>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
