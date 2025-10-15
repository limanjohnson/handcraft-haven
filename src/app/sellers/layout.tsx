import type { Metadata } from "next";

// Simple SEO for sellers dashboard
export const metadata: Metadata = {
  title: "Seller Dashboard",
  description: "Manage your products and inventory. Add new handcrafted items to your store.",
};

export default function SellersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
