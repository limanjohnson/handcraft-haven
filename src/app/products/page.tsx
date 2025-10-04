// app/products/page.tsx
"use client";

import { useEffect, useState } from "react";

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
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}>
        Products
      </h1>

      {/* Show loading message */}
      {loading && (
        <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
          Loading products...
        </p>
      )}

      {/* Show message if no products found */}
      {!loading && products.length === 0 && (
        <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
          No products found.
        </p>
      )}

      {/* Show products in a grid */}
      {!loading && products.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "2rem",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "1.5rem",
                backgroundColor: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              {/* Product image placeholder */}
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "8px",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: "#999" }}>No image</span>
              </div>

              {/* Product title */}
              <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>
                {product.title}
              </h2>

              {/* Product price */}
              <p style={{ fontSize: "1.5rem", fontWeight: "700", color: "#8B6F47", marginBottom: "1rem" }}>
                ${Number(product.price).toFixed(2)}
              </p>

              {/* View button */}
              <a
                href={`/products/${product.id}`}
                style={{
                  display: "inline-block",
                  backgroundColor: "#8B6F47",
                  color: "#fff",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                View Details
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
