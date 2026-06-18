import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";

export type Category = "perfume" | "cosmetic" | "decant";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  images: string[];
  description: string;
  scentNotes: string[];
  ingredients: string[];
  inStock: boolean;
}

export interface CategoryMeta {
  slug: string;
  label: string;
  description: string;
  heroImage: string;
  scentFamilies?: string[];
  skinTypes?: string[];
  productCount: number;
}

const products: Product[] = productsData as Product[];
const categories: CategoryMeta[] = categoriesData as CategoryMeta[];

// ─── Product helpers ───────────────────────────────────────────────────────────

export function getAllProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(slug: string): Product[] {
  // Normalize: "perfumes" → "perfume", "cosmetics" → "cosmetic"
  const categoryMap: Record<string, Category> = {
    perfumes: "perfume",
    cosmetics: "cosmetic",
    perfume: "perfume",
    cosmetic: "cosmetic",
    decant: "decant",
    decants: "decant",
  };
  const category = categoryMap[slug.toLowerCase()];
  if (!category) return [];
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(count = 6): Product[] {
  return products.filter((p) => p.inStock).slice(0, count);
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, count);
}

export function searchProducts(query: string): Product[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.scentNotes.some((n) => n.toLowerCase().includes(q))
  );
}

export function sortProducts(
  items: Product[],
  sort: "price-asc" | "price-desc" | "name-asc" | "name-desc"
): Product[] {
  return [...items].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });
}

// ─── Category helpers ──────────────────────────────────────────────────────────

export function getAllCategories(): CategoryMeta[] {
  return categories;
}

export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
  return categories.find((c) => c.slug === slug);
}
