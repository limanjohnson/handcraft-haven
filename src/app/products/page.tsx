// app/products/page.tsx
"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category: string | null;
};

const categories = ["Jewelry", "Home Decor", "Clothing", "Art"];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  async function load() {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category) params.set("category", category);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    setLoading(true);
    const res = await fetch(`/api/products?${params.toString()}`);
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
        {/* Sidebar filters */}
        <aside aria-label="Filters" className="border rounded-lg p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              load();
            }}
          >
            <div className="mb-4">
              <label htmlFor="search" className="block text-sm font-medium">
                Search products
              </label>
              <input
                id="search"
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="mt-1 w-full border rounded px-3 py-2"
                placeholder="e.g., bowl, necklace"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 w-full border rounded px-3 py-2"
              >
                <option value="">All</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="minPrice" className="block text-sm font-medium">
                  Min price
                </label>
                <input
                  id="minPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="mt-1 w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="maxPrice" className="block text-sm font-medium">
                  Max price
                </label>
                <input
                  id="maxPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="mt-1 w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Apply filters
            </button>
          </form>
        </aside>

        {/* Main grid */}
        <section aria-live="polite">
          {loading ? (
            <p className="text-center">Loading products…</p>
          ) : products.length === 0 ? (
            <p className="text-center">No products found. Try adjusting filters.</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <li key={p.id} className="border rounded-lg shadow">
                  <article className="p-4">
                    <img
                      src={p.image_url ?? "https://via.placeholder.com/600x400"}
                      alt={p.name}
                      className="w-full h-48 object-cover rounded"
                    />
                    <h2 className="text-lg font-semibold mt-2">{p.name}</h2>
                    <p className="text-gray-600">
                      {p.category ? `${p.category} • ` : ""}${p.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-700 mt-1 line-clamp-2">
                      {p.description ?? "Beautiful handcrafted item."}
                    </p>
                    <div className="mt-3 flex gap-2">
                      <a
                        href={`/products/${p.id}`}
                        className="bg-gray-900 text-white px-3 py-2 rounded hover:bg-black"
                      >
                        View details
                      </a>
                      <button
                        aria-label={`Add ${p.name} to cart`}
                        className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
                      >
                        Add to cart
                      </button>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
