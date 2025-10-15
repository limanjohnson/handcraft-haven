"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import ProductFilter from "@/components/ProductFilter";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import AddToCartButton from "@/components/AddToCartButton";
>>>>>>> 0ab31d013cb3aa3c6242908d08dff0de4b0861da
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import Image from "next/image";
=======
import AddToCartButton from "@/components/AddToCartButton";
>>>>>>> d080a4f (Checkout form, Cart Details and Number of Items on cart)

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

const PRODUCTS_PER_PAGE = 12;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
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
        const res = await fetch(`/api/products?limit=${PRODUCTS_PER_PAGE}&offset=0`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data.products || []);
        setHasMore(data.pagination?.hasMore ?? false);
        setOffset(PRODUCTS_PER_PAGE);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      }
      setLoading(false);
    }

    loadProducts();
  }, []);

  const loadMoreProducts = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    try {
      const res = await fetch(`/api/products?limit=${PRODUCTS_PER_PAGE}&offset=${offset}`);
      if (!res.ok) throw new Error("Failed to fetch more products");
      const data = await res.json();
      
      setProducts((prev) => [...prev, ...(data.products || [])]);
      setHasMore(data.pagination?.hasMore ?? false);
      setOffset((prev) => prev + PRODUCTS_PER_PAGE);
    } catch (err: any) {
      console.error("Error loading more products:", err);
    }
    setLoadingMore(false);
  }, [offset, hasMore, loadingMore]);

  const loaderRef = useInfiniteScroll(loadMoreProducts, loadingMore);

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
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={product.image_url}
                  alt={product.title}
                  fill
                  className="object-cover rounded"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
              </div>
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

      {/* Infinite Scroll Loader */}
      {!loading && hasMore && (
        <div 
          ref={loaderRef}
          className="flex justify-center items-center py-8"
        >
          {loadingMore ? (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 border-4 border-[#8B6F47] border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600">Loading more products...</span>
            </div>
          ) : (
            <div className="h-10"></div>
          )}
        </div>
      )}

      {/* End of Products Message */}
      {!loading && !hasMore && products.length > 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>You've reached the end of all products</p>
        </div>
      )}
    </div>
  );
}
