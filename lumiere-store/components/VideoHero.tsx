"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
    const onLoaded = () => setLoaded(true);
    v.addEventListener("canplaythrough", onLoaded);
    return () => v.removeEventListener("canplaythrough", onLoaded);
  }, []);

  return (
    <section className="video-hero" aria-label="Hero">
      {/* ── Video ── */}
      <video
        ref={videoRef}
        src="/intro.mp4"
        muted
        loop
        playsInline
        preload="auto"
        className={`video-hero__video ${loaded ? "video-hero__video--loaded" : ""}`}
      />

      {/* ── Layered overlays ── */}
      <div className="video-hero__overlay video-hero__overlay--dark" />
      <div className="video-hero__overlay video-hero__overlay--vignette" />
      <div className="video-hero__overlay video-hero__overlay--bottom" />

      {/* ── Scan-line texture ── */}
      <div className="video-hero__scanlines" />

      {/* ── Content ── */}
      <div className="video-hero__content">
        {/* Eyebrow */}
        <p className="video-hero__eyebrow">
          <span className="video-hero__eyebrow-line" />
          Maison de Parfum · 2025
          <span className="video-hero__eyebrow-line" />
        </p>

        {/* Main heading */}
        <h1 className="video-hero__title">
          <span className="video-hero__title-line video-hero__title-line--1">The Art</span>
          <span className="video-hero__title-line video-hero__title-line--2">
            of <em className="video-hero__title-em">Luminous</em>
          </span>
          <span className="video-hero__title-line video-hero__title-line--3">Beauty</span>
        </h1>

        {/* Sub */}
        <p className="video-hero__sub">
          Rare ingredients. Masterful composition.<br />
          Crafted for those who find beauty in every detail.
        </p>

        {/* CTAs */}
        <div className="video-hero__ctas">
          <Link href="/category/perfumes" className="video-hero__cta video-hero__cta--primary" id="hero-cta-perfumes">
            Explore Collection
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
          <Link href="/category/cosmetics" className="video-hero__cta video-hero__cta--ghost" id="hero-cta-cosmetics">
            Shop Cosmetics
          </Link>
        </div>

        {/* Stats strip */}
        <div className="video-hero__stats">
          {[
            { num: "50+", label: "Fragrances" },
            { num: "12", label: "Collections" },
            { num: "100%", label: "Cruelty-free" },
            { num: "15+", label: "Countries" },
          ].map((s, i) => (
            <div key={i} className="video-hero__stat">
              <span className="video-hero__stat-num">{s.num}</span>
              <span className="video-hero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <div className="video-hero__scroll">
        <span className="video-hero__scroll-text">Scroll</span>
        <div className="video-hero__scroll-bar">
          <div className="video-hero__scroll-bar-inner" />
        </div>
      </div>
    </section>
  );
}
