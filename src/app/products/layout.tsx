import type { Metadata } from "next";

// Simple SEO for products page
export const metadata: Metadata = {
  title: "Products",
  description: "Browse our collection of unique handcrafted products. Find handmade jewelry, pottery, furniture, and more from talented artisans.",
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
