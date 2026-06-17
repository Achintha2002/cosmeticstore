import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "LUMIÈRE — Luxury Cosmetics & Perfumes",
    template: "%s | LUMIÈRE",
  },
  description:
    "Discover the art of luxury. LUMIÈRE brings you the finest cosmetics, perfumes, and beauty essentials — curated for those who appreciate the extraordinary.",
  keywords: ["luxury cosmetics", "perfume", "beauty", "skincare", "fragrance"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "LUMIÈRE",
    title: "LUMIÈRE — Luxury Cosmetics & Perfumes",
    description:
      "Discover the art of luxury. LUMIÈRE brings you the finest cosmetics, perfumes, and beauty essentials.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF9F6] text-[#1C1C1E]">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <PageTransition>
              <main className="flex-1">
                {children}
              </main>
            </PageTransition>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
