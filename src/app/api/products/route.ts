import { NextResponse } from "next/server";
import { query } from "../../../../lib/db";

type Artisan = {
  id: number;
  name: string;
  bio?: string;
  contact_email?: string;
  created_at?: string;
};

type Product = {
  id: number;
  artisan_id: number;
  title: string;
  description?: string;
  price: number; 
  stock: number; 
  created_at?: string;
  image_url?: string | null;
  artisan_name?: string;
  artisan_email?: string;
};

function normalizeProduct(row: any): Product {
  return {
    ...row,
    price: Number(row.price),
    stock: Number(row.stock),
    image_url: row.image_url || null,
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const productResult = await query(
        `SELECT p.*, a.name as artisan_name, a.contact_email as artisan_email
         FROM products p
         LEFT JOIN artisans a ON p.artisan_id = a.id
         WHERE p.id = $1`,
        [Number(id)]
      );

      if (productResult.rows.length === 0) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }

      const product = normalizeProduct(productResult.rows[0]);

      const relatedResult = await query(
        `SELECT * FROM products WHERE id != $1 AND artisan_id = $2 LIMIT 4`,
        [Number(id), product.artisan_id]
      );

      const related = relatedResult.rows.map(normalizeProduct);

      return NextResponse.json({ product, related });
    }

    const productsResult = await query(
      `SELECT p.*, a.name as artisan_name, a.contact_email as artisan_email
       FROM products p
       LEFT JOIN artisans a ON p.artisan_id = a.id
       ORDER BY p.created_at DESC`
    );

    const products = productsResult.rows.map(normalizeProduct);

    return NextResponse.json({ products });
  } catch (err) {
    console.error("Error fetching products:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, price, stock, artisanId } = body;

    const result = await query(
      `INSERT INTO products (title, description, price, stock, artisan_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title, description, price, stock || 0, artisanId]
    );

    const product = normalizeProduct(result.rows[0]);

    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    console.error("Error creating product:", err);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
