import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#B76E79] mb-4">404</p>
      <h1 className="font-display text-5xl font-bold text-[#1C1C1E] mb-4">Page Not Found</h1>
      <p className="text-[#4A4A4C] mb-10 max-w-md leading-relaxed">
        The page you&apos;re looking for seems to have vanished like a delicate top note.
        Let&apos;s find you something extraordinary instead.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Link href="/" className="px-8 py-4 bg-[#1C1C1E] text-white text-sm font-semibold tracking-wider uppercase rounded-2xl hover:bg-[#B76E79] transition-colors duration-300">
          Back to Home
        </Link>
        <Link href="/category/perfumes" className="px-8 py-4 border-2 border-[#1C1C1E] text-[#1C1C1E] text-sm font-semibold tracking-wider uppercase rounded-2xl hover:border-[#B76E79] hover:text-[#B76E79] transition-colors duration-300">
          Shop Perfumes
        </Link>
      </div>
    </div>
  );
}
