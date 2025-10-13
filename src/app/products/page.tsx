"use client";

import { useEffect, useState, useMemo } from "react";
import ProductFilter from "@/components/ProductFilter";
import AddToCartButton from "@/components/AddToCartButton";

type Product = {
  id: number;
  title: string;
  description?: string;
  price: number;
  stock: number;
  image_url?: string | null;
  artisan_name?: string;
  created_at?: string;
};

type FilterOptions = {
  search: string;
  minPrice: string;
  maxPrice: string;
  inStock: boolean;
  sortBy: "price-asc" | "price-desc" | "name-asc" | "name-desc" | "newest";
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    minPrice: "",
    maxPrice: "",
    inStock: false,
    sortBy: "newest",
  });

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

  // Apply filters and sorting to products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchLower) ||
          product.description?.toLowerCase().includes(searchLower) ||
          product.artisan_name?.toLowerCase().includes(searchLower)
      );
    }

    // Price range filter
    if (filters.minPrice) {
      const min = parseFloat(filters.minPrice);
      filtered = filtered.filter((product) => product.price >= min);
    }
    if (filters.maxPrice) {
      const max = parseFloat(filters.maxPrice);
      filtered = filtered.filter((product) => product.price <= max);
    }

    // Stock filter
    if (filters.inStock) {
      filtered = filtered.filter((product) => product.stock > 0);
    }

    // Sorting
    switch (filters.sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "newest":
        filtered.sort((a, b) => {
          if (!a.created_at || !b.created_at) return 0;
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
        break;
    }

    return filtered;
  }, [products, filters]);

  if (!mounted) return null;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <ProductFilter onFilterChange={setFilters} />

      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && filteredProducts.length === 0 && (
        <p className="text-gray-600 text-center py-8">
          {products.length === 0 ? "No products found." : "No products match your filters."}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl shadow p-6 transition hover:shadow-lg">
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
              className="inline-block mt-2 bg-[#8B6F47] text-white px-4 py-2 rounded hover:bg-[#7a603e] transition-colors"
            >
              <span className="text-white font-semibold">View Details</span>
            </a>

              <AddToCartButton
                id={product.id}
                title={product.title}
                price={product.price}
              />
          </div>
        ))}
      </div>
    </div>
  );
}
