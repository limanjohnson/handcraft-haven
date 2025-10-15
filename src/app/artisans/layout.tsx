import type { Metadata } from "next";

// Simple SEO for artisans page
export const metadata: Metadata = {
  title: "Artisans",
  description: "Meet our talented artisans and craftspeople. Discover the makers behind our unique handcrafted products.",
};

export default function ArtisansLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
