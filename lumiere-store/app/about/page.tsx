import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind LUMIÈRE — rare ingredients, master perfumers, and a philosophy of extraordinary luxury.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] flex items-end overflow-hidden" aria-label="About hero">
        <Image
          src="https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=1600&q=85"
          alt="LUMIÈRE brand imagery — luxury perfume bottles"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6]/95 via-[#FAF9F6]/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12 pt-20">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#B76E79] mb-3">Our Story</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-[#1C1C1E]">About LUMIÈRE</h1>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20" aria-label="Mission">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#B76E79] mb-4">Philosophy</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#1C1C1E] mb-6 leading-tight">
              Luxury is an experience,<br />not a possession.
            </h2>
            <p className="text-[#4A4A4C] leading-relaxed mb-4">
              LUMIÈRE was founded on a single belief: that true luxury is felt, not flaunted. We source the world&apos;s most exceptional raw materials — from Turkish rose absolute to Mysore sandalwood — and transform them into compositions that tell a story.
            </p>
            <p className="text-[#4A4A4C] leading-relaxed">
              Every fragrance and cosmetic in our collection is crafted by master perfumers and formulation scientists who have dedicated decades to their craft. No shortcuts. No compromises.
            </p>
          </div>
          <div className="relative aspect-square rounded-3xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=800&q=80"
              alt="Artisanal fragrance crafting process"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#F0EDE8] py-20" aria-label="Brand values">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#B76E79] mb-3">What we stand for</p>
            <h2 className="font-display text-3xl font-semibold text-[#1C1C1E]">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Rare Ingredients", desc: "We travel the world to source exceptional raw materials — from Grasse rose fields to Indonesian patchouli forests.", icon: "✦" },
              { title: "Cruelty Free", desc: "Every formula is rigorously tested for safety and efficacy. Never on animals — always on our team of willing volunteers.", icon: "◎" },
              { title: "Sustainable Sourcing", desc: "We partner only with suppliers who uphold fair trade principles and environmental stewardship.", icon: "◇" },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-3xl p-8 card-shadow">
                <span className="text-3xl text-[#B76E79] mb-4 block" aria-hidden="true">{v.icon}</span>
                <h3 className="font-display text-xl font-semibold text-[#1C1C1E] mb-3">{v.title}</h3>
                <p className="text-[#4A4A4C] leading-relaxed text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center" aria-label="Discover our collections">
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#1C1C1E] mb-4">
          Ready to experience LUMIÈRE?
        </h2>
        <p className="text-[#4A4A4C] mb-8 leading-relaxed">
          Explore our curated collections of rare fragrances and precision cosmetics.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/category/perfumes" className="px-8 py-4 bg-[#1C1C1E] text-white text-sm font-semibold tracking-wider uppercase rounded-2xl hover:bg-[#B76E79] transition-colors duration-300">
            Shop Perfumes
          </Link>
          <Link href="/category/cosmetics" className="px-8 py-4 border-2 border-[#1C1C1E] text-[#1C1C1E] text-sm font-semibold tracking-wider uppercase rounded-2xl hover:border-[#B76E79] hover:text-[#B76E79] transition-colors duration-300">
            Shop Cosmetics
          </Link>
        </div>
      </section>
    </>
  );
}
