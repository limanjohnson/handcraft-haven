import "./globals.css";
import { Roboto } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import type { Metadata } from "next";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// Simple SEO metadata for the entire site
export const metadata: Metadata = {
  title: {
    default: "Handcraft Haven - Unique Handmade Products",
    template: "%s | Handcraft Haven"
  },
  description: "Discover unique handcrafted products from talented artisans. Quality handmade items for your home and lifestyle.",
  keywords: ["handmade", "handcraft", "artisan", "crafts", "unique gifts", "handmade products"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Suppress hydration warnings in development
              if (typeof window !== 'undefined') {
                const originalError = console.error;
                console.error = (...args) => {
                  if (args[0]?.includes?.('Hydration') || args[0]?.includes?.('hydration')) {
                    return;
                  }
                  originalError.apply(console, args);
                };
              }
            `,
          }}
        />
      </head>
      <body className={`${roboto.className} flex flex-col min-h-screen bg-gray-300`} suppressHydrationWarning>
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}