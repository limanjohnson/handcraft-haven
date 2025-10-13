"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";

type Artisan = {
  id: number;
  name: string;
  bio?: string;
  contact_email?: string;
  image_url?: string | null;
  product_count?: number;
  created_at?: string;
};

export default function ArtisansPage() {
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "newest" | "products">("newest");

  useEffect(() => {
    setMounted(true);

    async function loadArtisans() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/artisans");
        if (!res.ok) throw new Error("Failed to fetch artisans");
        const data = await res.json();
        setArtisans(data.artisans || []);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      }
      setLoading(false);
    }

    loadArtisans();
  }, []);

  // Filter and sort artisans
  const filteredArtisans = useMemo(() => {
    let filtered = [...artisans];

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (artisan) =>
          artisan.name.toLowerCase().includes(searchLower) ||
          artisan.bio?.toLowerCase().includes(searchLower) ||
          artisan.contact_email?.toLowerCase().includes(searchLower)
      );
    }

    // Sorting
    switch (sortBy) {
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "products":
        filtered.sort((a, b) => (b.product_count || 0) - (a.product_count || 0));
        break;
      case "newest":
        filtered.sort((a, b) => {
          if (!a.created_at || !b.created_at) return 0;
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
        break;
    }

    return filtered;
  }, [artisans, searchTerm, sortBy]);

  if (!mounted) return null;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Meet Our Artisans</h1>
        <p className="text-gray-600">
          Discover talented craftspeople creating unique handmade products
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search Input */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium mb-1" style={{ color: '#5C4A3A' }}>
              Search Artisans
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, bio, or email..."
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ color: '#5C4A3A' }}
              onFocus={(e) => e.target.style.setProperty('--tw-ring-color', '#8B6F47')}
            />
          </div>

          {/* Sort By */}
          <div>
            <label htmlFor="sortBy" className="block text-sm font-medium mb-1" style={{ color: '#5C4A3A' }}>
              Sort By
            </label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ color: '#5C4A3A' }}
              onFocus={(e) => e.target.style.setProperty('--tw-ring-color', '#8B6F47')}
            >
              <option value="newest">Newest First</option>
              <option value="name">Name (A-Z)</option>
              <option value="products">Most Products</option>
            </select>
          </div>
        </div>
      </div>

      {loading && <p className="text-center py-8">Loading artisans...</p>}
      {error && <p className="text-red-500 text-center py-8">{error}</p>}
      {!loading && filteredArtisans.length === 0 && (
        <p className="text-gray-600 text-center py-8">
          {artisans.length === 0 ? "No artisans found." : "No artisans match your search."}
        </p>
      )}

      {/* Artisans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtisans.map((artisan) => (
          <div
            key={artisan.id}
            className="bg-white rounded-2xl shadow p-6 transition hover:shadow-lg"
          >
            {/* Artisan Image/Avatar */}
            <div className="flex flex-col items-center mb-4">
              {artisan.image_url ? (
                <img
                  src={artisan.image_url}
                  alt={artisan.name}
                  className="w-32 h-32 rounded-full object-cover mb-3"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-4xl font-bold mb-3">
                  {artisan.name.charAt(0).toUpperCase()}
                </div>
              )}
              <h2 className="text-xl font-semibold text-center">{artisan.name}</h2>
            </div>

            {/* Bio */}
            {artisan.bio && (
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {artisan.bio}
              </p>
            )}

            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>
                {artisan.product_count || 0} product{artisan.product_count !== 1 ? 's' : ''}
              </span>
              {artisan.contact_email && (
                <span className="truncate ml-2" title={artisan.contact_email}>
                  📧
                </span>
              )}
            </div>

            {/* Action Button */}
            <Link
              href={`/artisans/${artisan.id}`}
              className="block w-full text-center bg-[#8B6F47] text-white px-4 py-2 rounded hover:bg-[#7a603e] transition"
            >
              <span className="text-white font-semibold">View Profile</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}