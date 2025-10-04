import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "12", 10), 100);

  const params: any[] = [];
  const where: string[] = [];

  if (category) {
    params.push(category);
    where.push(`category = $${params.length}`);
  }

  const sql = `
    select id, title, price, created_at
    from products
    ${where.length ? `where ${where.join(" and ")}` : ""}
    order by created_at desc
    limit $${params.push(limit)}
  `;

  const { rows } = await query(sql, params);
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, price, description = null, stock = 0, category = null, image_url = null, artisan_id = null } = body ?? {};

  if (!title || typeof price !== "number") {
    return NextResponse.json({ error: "title and numeric price are required" }, { status: 400 });
  }

  const { rows } = await query(
    `insert into products (title, description, price, stock, category, image_url, artisan_id)
     values ($1,$2,$3,$4,$5,$6,$7)
     returning id, title, price, stock, category, image_url, artisan_id, created_at`,
    [title, description, price, stock, category, image_url, artisan_id]
  );

  return NextResponse.json(rows[0], { status: 201 });
}