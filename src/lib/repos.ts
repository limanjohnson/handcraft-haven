import { query } from "@/lib/db";

export async function getFeaturedProducts(limit = 6) {
  const { rows } = await query(
    `select id, title, price, image_url, category, created_at
     from products
     order by created_at desc
     limit $1`,
    [limit]
  );
  return rows;
}

export async function getAllArtisans(limit = 12) {
  const { rows } = await query(
    `select id, name, specialty, avatar_url, bio, created_at
     from artisans
     order by created_at desc
     limit $1`,
    [limit]
  );
  return rows;
}