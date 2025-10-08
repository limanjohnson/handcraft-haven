"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  description?: string;
  price: number;
  stock: number;
  image_url?: string | null;
  artisan_name?: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    async function loadProducts() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      }
      setLoading(false);
    }

    loadProducts();
  }, []);

  if (!mounted) return null;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && products.length === 0 && <p>No products found.</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded mb-4">
                No Image
              </div>
            )}
            <h2 className="font-semibold">{product.title}</h2>
            <p className="text-gray-600">Price: ${product.price.toFixed(2)}</p>
            <p className="text-gray-500">Stock: {product.stock}</p>
            {product.artisan_name && <p className="text-sm text-gray-500">By: {product.artisan_name}</p>}
            <a
              href={`/products/${product.id}`}
              className="inline-block mt-2 bg-amber-700 text-white px-4 py-2 rounded hover:bg-amber-800"
            >
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
