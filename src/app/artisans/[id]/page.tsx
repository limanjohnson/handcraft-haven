"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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

type Product = {
  id: number;
  title: string;
  description?: string;
  price: number;
  stock: number;
  image_url?: string | null;
  created_at?: string;
};

export default function ArtisanDetailsPage() {
  const params = useParams();
  const artisanId = params?.id;

  const [artisan, setArtisan] = useState<Artisan | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (!artisanId) return;

    async function loadArtisan() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/artisans?id=${artisanId}`);
        if (!res.ok) throw new Error("Failed to fetch artisan");
        const data = await res.json();
        setArtisan(data.artisan || null);
        setProducts(data.products || []);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      }
      setLoading(false);
    }

    loadArtisan();
  }, [artisanId]);

  if (!mounted) return null;
  if (loading) return <p className="p-8 text-center">Loading artisan profile...</p>;
  if (error) return <p className="p-8 text-center text-red-500">{error}</p>;
  if (!artisan) return <p className="p-8 text-center">Artisan not found.</p>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Artisan Profile Header */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Profile Image/Avatar */}
          <div className="flex-shrink-0">
            {artisan.image_url ? (
              <img
                src={artisan.image_url}
                alt={artisan.name}
                className="w-48 h-48 rounded-full object-cover border-4 border-amber-500"
              />
            ) : (
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-6xl font-bold border-4 border-amber-500">
                {artisan.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Artisan Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-3">{artisan.name}</h1>
            
            {artisan.bio && (
              <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                {artisan.bio}
              </p>
            )}

            <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm">
              {artisan.contact_email && (
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                  <span className="font-semibold">📧</span>
                  <a 
                    href={`mailto:${artisan.contact_email}`}
                    className="text-amber-700 hover:underline"
                  >
                    {artisan.contact_email}
                  </a>
                </div>
              )}
              
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                <span className="font-semibold">🛍️</span>
                <span>{artisan.product_count || 0} Products</span>
              </div>

              {artisan.created_at && (
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                  <span className="font-semibold">📅</span>
                  <span>Member since {new Date(artisan.created_at).getFullYear()}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Products by {artisan.name}</h2>
          {products.length > 0 && (
            <span className="text-gray-500">
              {products.length} item{products.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {products.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-12 text-center">
            <p className="text-gray-600 text-lg">
              This artisan hasn't listed any products yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
              >
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  
                  {product.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-amber-700">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                  </div>
                  
                  <Link
                    href={`/products/${product.id}`}
                    className="block w-full text-center bg-amber-700 text-white px-4 py-2 rounded hover:bg-amber-800 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Back Button */}
      <div className="mt-8">
        <Link
          href="/artisans"
          className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 font-semibold"
        >
          <span>←</span> Back to All Artisans
        </Link>
      </div>
    </div>
  );
}
