// app/products/page.tsx
"use client";

import { useEffect, useState } from "react";
import AddToCartButton from "@/components/AddToCartButton";

// Define what a product looks like
type Product = {
  id: number;
  title: string;
  price: number;
  created_at: string;
};

export default function ProductsPage() {
  // Store the list of products
  const [products, setProducts] = useState<Product[]>([]);
  // Track if we're loading data
  const [loading, setLoading] = useState(true);

  // Function to fetch products from the API
  async function loadProducts() {
    setLoading(true);

    try {
      // Call our API to get products
      const response = await fetch("/api/products");
      const data = await response.json();

      // Save the products to state
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    }

    setLoading(false);
  }

  // Load products when the page first loads
  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-[#003049]">Products</h1>

      {/* Loading message */}
      {loading && (
        <p className="text-center text-lg text-gray-600">Loading products...</p>
      )}

      {/* No products message */}
      {!loading && products.length === 0 && (
        <p className="text-center text-lg text-gray-600">
          No products found.
        </p>
      )}

      {/* Products grid */}
      {!loading && products.length > 0 && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between border border-gray-200 hover:shadow-lg transition"
            >
              {/* Product image placeholder */}
              <div className="w-full h-48 bg-[#Eae2b7] rounded-xl mb-4 flex items-center justify-center">
                <span className="text-gray-500">No image</span>
              </div>

              {/* Product info */}
              <div>
                <h2 className="text-lg font-semibold text-[#003049] mb-1">
                  {product.title}
                </h2>
                <p className="text-2xl font-bold text-[#D62828] mb-3">
                  ${Number(product.price).toFixed(2)}
                </p>

                <div className="flex flex-col gap-2">
                  <a
                    href={`/products/${product.id}`}
                    className="bg-[#003049] hover:bg-[#F77f00] text-white text-center py-2 px-4 rounded-xl transition"
                  >
                    View Details
                  </a>

                  {/* Botão de adicionar ao carrinho */}
                  <AddToCartButton
                    id={product.id}
                    title={product.title}
                    price={product.price}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
