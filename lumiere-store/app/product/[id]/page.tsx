import React from "react";
import { notFound } from "next/navigation";
import { getProductById, getRelatedProducts } from "@/lib/products";
import ProductDetailClient from "./ProductDetailClient";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const related = getRelatedProducts(product, 6);

  return <ProductDetailClient product={product} related={related} />;
}
