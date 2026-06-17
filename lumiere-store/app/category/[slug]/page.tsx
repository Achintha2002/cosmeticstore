import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductsByCategory, getCategoryBySlug, sortProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import type { Metadata } from "next";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string; minPrice?: string; maxPrice?: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return { title: "Category Not Found" };
  return {
    title: cat.label,
    description: cat.description,
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const { sort = "name-asc", minPrice, maxPrice } = await searchParams;

  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();

  let products = getProductsByCategory(slug);

  // Price filter
  if (minPrice) products = products.filter((p) => p.price >= Number(minPrice));
  if (maxPrice) products = products.filter((p) => p.price <= Number(maxPrice));

  // Sort
  const validSort = ["price-asc", "price-desc", "name-asc", "name-desc"].includes(sort)
    ? (sort as "price-asc" | "price-desc" | "name-asc" | "name-desc")
    : "name-asc";
  const sorted = sortProducts(products, validSort);

  const sortOptions = [
    { value: "name-asc", label: "Name A–Z" },
    { value: "name-desc", label: "Name Z–A" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-end overflow-hidden" aria-label={`${cat.label} hero`}>
        <Image
          src={cat.heroImage}
          alt={`${cat.label} collection hero`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E]/80 via-[#1C1C1E]/20 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12 pt-20">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#B76E79] mb-2">
            LUMIÈRE Collection
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
            {cat.label}
          </h1>
          <p className="text-white/80 text-base max-w-lg">{cat.description}</p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" aria-label="Product listing">
        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-[#E0DAD4]">
          <p className="text-sm text-[#4A4A4C]">
            <span className="font-semibold text-[#1C1C1E]">{sorted.length}</span>{" "}
            {sorted.length === 1 ? "product" : "products"}
          </p>

          {/* Sort selector */}
          <form className="flex items-center gap-3" aria-label="Sort products">
            <label htmlFor="sort-select" className="text-xs font-semibold tracking-wider uppercase text-[#4A4A4C]">
              Sort
            </label>
            <select
              id="sort-select"
              name="sort"
              defaultValue={validSort}
              onChange={(e) => {
                const url = new URL(window.location.href);
                url.searchParams.set("sort", e.target.value);
                window.location.href = url.toString();
              }}
              className="text-sm bg-white border border-[#E0DAD4] rounded-xl px-3 py-2 text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#B76E79] cursor-pointer"
              aria-label="Sort by"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </form>
        </div>

        {/* Scent family / skin type filter pills */}
        {cat.scentFamilies && (
          <div className="mb-8">
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#4A4A4C] mb-3">Scent Family</p>
            <div className="flex flex-wrap gap-2">
              {cat.scentFamilies.map((f) => (
                <span
                  key={f}
                  className="text-xs px-3.5 py-1.5 rounded-full border border-[#E0DAD4] text-[#4A4A4C] hover:border-[#B76E79] hover:text-[#B76E79] cursor-pointer transition-colors duration-200"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}
        {cat.skinTypes && (
          <div className="mb-8">
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#4A4A4C] mb-3">Skin Type</p>
            <div className="flex flex-wrap gap-2">
              {cat.skinTypes.map((t) => (
                <span
                  key={t}
                  className="text-xs px-3.5 py-1.5 rounded-full border border-[#E0DAD4] text-[#4A4A4C] hover:border-[#B76E79] hover:text-[#B76E79] cursor-pointer transition-colors duration-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Product grid */}
        {sorted.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sorted.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 4} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="font-display text-2xl text-[#1C1C1E] mb-2">No products found</p>
            <p className="text-[#4A4A4C]">Try adjusting your filters.</p>
          </div>
        )}
      </section>
    </>
  );
}
