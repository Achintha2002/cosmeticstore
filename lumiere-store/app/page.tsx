import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllProducts, getFeaturedProducts, getAllCategories } from "@/lib/products";
import ProductCarousel from "@/components/ProductCarousel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LUMIÈRE — Luxury Cosmetics & Perfumes",
  description:
    "Discover the art of luxury. LUMIÈRE brings you the finest cosmetics, perfumes, and beauty essentials — curated for those who appreciate the extraordinary.",
};

export default function HomePage() {
  const allProducts = getAllProducts();
  const perfumes = allProducts.filter((p) => p.category === "perfume");
  const cosmetics = allProducts.filter((p) => p.category === "cosmetic");
  const bestsellers = getFeaturedProducts(8);
  const categories = getAllCategories();

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        aria-label="Hero"
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1800&q=85"
            alt="Luxury perfume bottles arranged artistically"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F6]/90 via-[#FAF9F6]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6]/80 via-transparent to-transparent" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 pb-16">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#B76E79] mb-4 animate-[fadeInUp_0.6s_ease_both]">
              New Collection 2025
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-[#1C1C1E] leading-[1.1] mb-6 animate-[fadeInUp_0.7s_0.1s_ease_both]">
              The Art of
              <br />
              <span className="text-gradient-rose">Luminous</span>
              <br />
              Beauty
            </h1>
            <p className="text-base md:text-lg text-[#4A4A4C] mb-10 leading-relaxed max-w-md animate-[fadeInUp_0.7s_0.2s_ease_both]">
              Rare ingredients. Masterful composition. Discover fragrances and
              cosmetics crafted for those who find beauty in every detail.
            </p>
            <div className="flex flex-wrap gap-4 animate-[fadeInUp_0.7s_0.3s_ease_both]">
              <Link
                href="/category/perfumes"
                id="hero-cta-perfumes"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#1C1C1E] text-white text-sm font-semibold tracking-wider uppercase rounded-2xl hover:bg-[#B76E79] transition-colors duration-300"
              >
                Shop Perfumes
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/category/cosmetics"
                id="hero-cta-cosmetics"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#1C1C1E] text-[#1C1C1E] text-sm font-semibold tracking-wider uppercase rounded-2xl hover:border-[#B76E79] hover:text-[#B76E79] transition-colors duration-300"
              >
                Shop Cosmetics
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[#4A4A4C]/70">
          <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#B76E79]/60 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ─── CATEGORY CARDS ───────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" aria-label="Shop by category">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#B76E79] mb-3">Explore</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#1C1C1E]">
            Shop by Collection
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              id={`category-card-${cat.slug}`}
              className="group relative rounded-3xl overflow-hidden aspect-[4/3] md:aspect-[16/10] block"
              aria-label={`Browse ${cat.label}`}
            >
              <Image
                src={cat.heroImage}
                alt={`${cat.label} collection`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E]/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/70 mb-2">
                  {cat.productCount} products
                </p>
                <h3 className="font-display text-3xl font-bold text-white mb-2">{cat.label}</h3>
                <p className="text-sm text-white/80 mb-4 max-w-xs leading-relaxed">{cat.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-white border-b border-white/50 pb-0.5 group-hover:border-white transition-colors duration-200">
                  Explore
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── BESTSELLERS CAROUSEL ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-label="Bestsellers">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#B76E79] mb-3">Most loved</p>
          <ProductCarousel products={bestsellers} heading="Bestsellers" />
        </div>
      </section>

      {/* ─── EDITORIAL BANNER ─────────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden bg-[#1C1C1E]" aria-label="Brand story">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1400&q=70"
            alt="Artistic perfume imagery"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#B76E79] mb-6">
            Our Philosophy
          </p>
          <blockquote className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-[1.25] mb-8">
            &ldquo;Luxury is not about possessing things — it is about experiencing the&nbsp;
            <em className="text-[#B76E79] not-italic">extraordinary</em>.&rdquo;
          </blockquote>
          <p className="text-[#FAF9F6]/70 text-base leading-relaxed mb-8 max-w-xl mx-auto">
            Each LUMIÈRE creation begins with a story — sourced from the world&apos;s finest ingredients,
            composed by master perfumers, and refined to perfection.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-white border border-white/40 px-6 py-3 rounded-2xl hover:bg-white/10 transition-colors duration-300"
          >
            Our Story
          </Link>
        </div>
      </section>

      {/* ─── PERFUMES CAROUSEL ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" aria-label="Perfume collection">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#B76E79] mb-3">Fragrances</p>
        <ProductCarousel products={perfumes} heading="The Perfume Edit" />
      </section>

      {/* ─── COSMETICS CAROUSEL ───────────────────────────────────────────── */}
      <section className="bg-[#F0EDE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" aria-label="Cosmetics collection">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#B76E79] mb-3">Beauty Essentials</p>
          <ProductCarousel products={cosmetics} heading="The Beauty Edit" />
        </div>
      </section>

      {/* ─── TRUST BADGES ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-label="Brand values">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: "✦", label: "Rare Ingredients", desc: "Sourced globally" },
            { icon: "◎", label: "Cruelty Free", desc: "Never tested on animals" },
            { icon: "⟡", label: "Expert Formulation", desc: "Master perfumers" },
            { icon: "◇", label: "Free Shipping", desc: "On orders over $120" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-3 p-6">
              <span className="text-2xl text-[#B76E79]" aria-hidden="true">{item.icon}</span>
              <h3 className="font-display text-sm font-semibold text-[#1C1C1E]">{item.label}</h3>
              <p className="text-xs text-[#4A4A4C]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
