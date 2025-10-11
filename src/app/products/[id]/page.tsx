"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProductReviews from "../../../components/ProductReview";

function handleAddToCart() {
  alert("Added to cart!");
}

type Product = {
  id: number;
  title: string;
  description?: string;
  price: number;
  stock: number;
  image_url?: string | null;
  artisan_name?: string;
  artisan_email?: string;
};

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = params?.id;
  const numericId = Number(productId);

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (!productId) return;

    async function loadProduct() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/products?id=${productId}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data.product || null);
        setRelated(data.related || []);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      }
      setLoading(false);
    }

    loadProduct();
  }, [productId]);

  if (!mounted) return null;
  if (loading) return <p className="p-8 text-center">Loading product...</p>;
  if (error) return <p className="p-8 text-center text-red-500">{error}</p>;
  if (!product) return <p className="p-8 text-center">Product not found.</p>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {product.image_url ? (
        <img src={product.image_url} alt={product.title} className="w-full h-96 object-cover rounded mb-6" />
      ) : (
        <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded mb-6">
          No Image
        </div>
      )}


      <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-2xl font-semibold mb-2">${product.price.toFixed(2)}</p>
      <p className="text-gray-500 mb-4">Stock: {product.stock}</p>

      <button
        onClick={handleAddToCart}
        className="bg-[#8B6F47] text-white px-6 py-3 rounded-md font-semibold cursor-pointer mt-2 hover:bg-[#7a603e] transition-colors"
      >
        🛒 Add to Cart
      </button>

      {product.artisan_name && (
        <div className="mt-6 border-t pt-4 border-b mb-6">
          <p className="font-semibold">{product.artisan_name}</p>
          {product.artisan_email && <p className="mb-4 text-gray-500">{product.artisan_email}</p>}
        </div>
      )}

      <ProductReviews productId={numericId} />

      {related.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((rel) => (
              <div key={rel.id} className="bg-white rounded-2xl shadow p-6 transition hover:shadow-lg">
                {rel.image_url ? (
                  <img src={rel.image_url} alt={rel.title} className="w-full h-48 object-cover rounded mb-4" />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded mb-4">
                    No Image
                  </div>
                )}
                <h3 className="font-semibold">{rel.title}</h3>
                <p className="text-gray-600">Price: ${rel.price.toFixed(2)}</p>
                <p className="text-gray-500">Stock: {rel.stock}</p>
                {rel.artisan_name && <p className="text-sm text-gray-500">By: {rel.artisan_name}</p>}
                <a
                  href={`/products/${rel.id}`}
                  className="inline-block mt-2 bg-[#8B6F47] text-white px-4 py-2 rounded hover:bg-[#7a603e] transition-colors"
                >
                  <span className="text-white font-semibold">View</span>
                </a>
              </div>
            ))}
          </div>
          <div className="mt-12 text-left">
          <Link href="/products">
            <span className="font-bold hover:text-[#7a603e]">← Back to All Products</span>
          </Link>
          </div>
        </div>
      )}
    </div>
  );
}
