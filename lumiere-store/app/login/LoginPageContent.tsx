"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginPageContent() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, state } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    const ok = await login(email, password);
    if (ok) router.push("/");
    else setError("Invalid credentials.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0EDE8] px-4 pt-20 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="font-display text-2xl font-bold tracking-[0.2em] text-[#1C1C1E] hover:text-[#B76E79] transition-colors duration-300">
            LUMIÈRE
          </Link>
        </div>

        <div className="bg-[#FAF9F6] rounded-3xl shadow-xl border border-[#E0DAD4] overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-[#E0DAD4]">
            {(["login", "signup"] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(""); }}
                className={`flex-1 py-4 text-sm font-semibold tracking-wider uppercase transition-colors duration-200 ${
                  mode === m
                    ? "text-[#B76E79] border-b-2 border-[#B76E79] -mb-px"
                    : "text-[#4A4A4C] hover:text-[#1C1C1E]"
                }`}
                aria-selected={mode === m}
                role="tab"
              >
                {m === "login" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5" aria-label={mode === "login" ? "Sign in form" : "Sign up form"}>
            <div>
              <label htmlFor="page-email" className="block text-xs font-semibold tracking-wider uppercase text-[#4A4A4C] mb-1.5">Email</label>
              <input id="page-email" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="w-full px-4 py-3 bg-white border border-[#E0DAD4] rounded-xl text-sm text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#B76E79] focus:border-transparent" />
            </div>
            <div>
              <label htmlFor="page-password" className="block text-xs font-semibold tracking-wider uppercase text-[#4A4A4C] mb-1.5">Password</label>
              <input id="page-password" type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 bg-white border border-[#E0DAD4] rounded-xl text-sm text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#B76E79] focus:border-transparent" />
            </div>
            {error && <p role="alert" className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2">{error}</p>}
            <button type="submit" disabled={state.isLoading} className="w-full py-3.5 bg-[#1C1C1E] text-white text-sm font-semibold tracking-wider uppercase rounded-xl hover:bg-[#B76E79] transition-colors duration-300 disabled:opacity-60">
              {state.isLoading ? "Please wait…" : mode === "login" ? "Sign In" : "Create Account"}
            </button>
            <p className="text-center text-xs text-[#4A4A4C]">
              By continuing you agree to our{" "}
              <a href="#" className="text-[#B76E79] hover:underline">Terms</a>{" "}
              and{" "}
              <a href="#" className="text-[#B76E79] hover:underline">Privacy Policy</a>.
            </p>
          </form>
        </div>

        <p className="text-center mt-6 text-sm text-[#4A4A4C]">
          <Link href="/" className="hover:text-[#B76E79] transition-colors duration-200">← Back to home</Link>
        </p>
      </motion.div>
    </div>
  );
}
