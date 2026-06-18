import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllProducts, getFeaturedProducts, getAllCategories } from "@/lib/products";
import ProductCarousel from "@/components/ProductCarousel";
import VideoHero from "@/components/VideoHero";
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
      {/* ─── HERO VIDEO ─────────────────────────────────────────────────────── */}
      <VideoHero />

      {/* ─── MARQUEE STRIP ─────────────────────────────────────────────────── */}
      <div className="marquee-strip" aria-hidden="true">
        <div className="marquee-strip__track">
          {Array.from({ length: 3 }).map((_, r) =>
            ["Velvet Oud", "Rose Noire", "Blanc Iris", "Santal Lumière", "Amber Soleil", "Aqua Neroli", "Mystère Boisé", "Fleur de Cassis"].map((name) => (
              <span key={`${r}-${name}`} className="marquee-strip__item">
                ✦ {name}
              </span>
            ))
          )}
        </div>
      </div>

      {/* ─── CATEGORY MOSAIC ────────────────────────────────────────────────── */}
      <section className="mosaic-section" aria-label="Shop by category">
        <div className="mosaic-section__header">
          <p className="section-eyebrow">Curated Collections</p>
          <h2 className="section-title">Discover Your Signature</h2>
          <p className="section-sub">Two worlds of luxury, one house of beauty.</p>
        </div>

        <div className="mosaic-grid">
          {categories.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              id={`category-card-${cat.slug}`}
              className={`mosaic-card mosaic-card--${i === 0 ? "tall" : "wide"}`}
              aria-label={`Browse ${cat.label}`}
            >
              <Image
                src={cat.heroImage}
                alt={`${cat.label} collection`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="mosaic-card__img"
              />
              <div className="mosaic-card__overlay" />
              <div className="mosaic-card__body">
                <p className="mosaic-card__count">{cat.productCount} products</p>
                <h3 className="mosaic-card__name">{cat.label}</h3>
                <p className="mosaic-card__desc">{cat.description}</p>
                <span className="mosaic-card__link">
                  Explore
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── BESTSELLERS ────────────────────────────────────────────────────── */}
      <section className="carousel-section" aria-label="Bestsellers">
        <div className="carousel-section__header">
          <p className="section-eyebrow">Most Loved</p>
          <ProductCarousel products={bestsellers} heading="Bestsellers" />
        </div>
      </section>

      {/* ─── EDITORIAL SPLIT BANNER ─────────────────────────────────────────── */}
      <section className="editorial-banner" aria-label="Brand story">
        {/* Left — image */}
        <div className="editorial-banner__image-wrap">
          <Image
            src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1000&q=80"
            alt="Artistic perfume imagery"
            fill
            sizes="50vw"
            className="editorial-banner__image"
          />
          <div className="editorial-banner__image-overlay" />
        </div>

        {/* Right — text */}
        <div className="editorial-banner__text">
          <p className="section-eyebrow section-eyebrow--light">Our Philosophy</p>
          <blockquote className="editorial-banner__quote">
            &ldquo;Luxury is not about possessing things — it is about experiencing the{" "}
            <em className="editorial-banner__quote-em">extraordinary</em>.&rdquo;
          </blockquote>
          <p className="editorial-banner__body">
            Each LUMIÈRE creation begins with a story — sourced from the world's finest ingredients,
            composed by master perfumers, and refined to absolute perfection.
          </p>
          <Link href="/about" className="editorial-banner__cta">
            Our Story
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </section>

      {/* ─── PERFUMES CAROUSEL ─────────────────────────────────────────────── */}
      <section className="carousel-section" aria-label="Perfume collection">
        <div className="carousel-section__header">
          <p className="section-eyebrow">Fragrances</p>
          <ProductCarousel products={perfumes} heading="The Perfume Edit" />
        </div>
      </section>

      {/* ─── COSMETICS CAROUSEL ────────────────────────────────────────────── */}
      <section className="carousel-section carousel-section--tinted" aria-label="Cosmetics collection">
        <div className="carousel-section__header">
          <p className="section-eyebrow">Beauty Essentials</p>
          <ProductCarousel products={cosmetics} heading="The Beauty Edit" />
        </div>
      </section>

      {/* ─── TRUST BADGES ──────────────────────────────────────────────────── */}
      <section className="trust-section" aria-label="Brand values">
        {[
          { icon: "✦", label: "Rare Ingredients", desc: "Sourced from 40+ countries" },
          { icon: "◎", label: "Cruelty Free", desc: "Never tested on animals" },
          { icon: "⟡", label: "Expert Formulation", desc: "Master perfumers & chemists" },
          { icon: "◇", label: "Free Shipping", desc: "On orders over $120" },
        ].map((item) => (
          <div key={item.label} className="trust-badge">
            <span className="trust-badge__icon" aria-hidden="true">{item.icon}</span>
            <h3 className="trust-badge__label">{item.label}</h3>
            <p className="trust-badge__desc">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* ─── FULL-WIDTH CTA BANNER ─────────────────────────────────────────── */}
      <section className="cta-banner" aria-label="Call to action">
        <div className="cta-banner__bg">
          <Image
            src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1800&q=80"
            alt=""
            fill
            sizes="100vw"
            className="cta-banner__img"
          />
          <div className="cta-banner__overlay" />
        </div>
        <div className="cta-banner__content">
          <p className="section-eyebrow section-eyebrow--light">Begin Your Journey</p>
          <h2 className="cta-banner__title">Experience the Extraordinary</h2>
          <p className="cta-banner__sub">
            Find your signature scent or discover the perfect beauty ritual.
          </p>
          <div className="cta-banner__ctas">
            <Link href="/category/perfumes" className="video-hero__cta video-hero__cta--primary">
              Shop Perfumes →
            </Link>
            <Link href="/category/cosmetics" className="video-hero__cta video-hero__cta--ghost">
              Shop Cosmetics
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
