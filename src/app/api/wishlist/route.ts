// src/app/api/wishlist/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { pool } from '../../../../lib/db';

// GET /api/wishlist
export async function GET(req: NextRequest) {
  try {
    const result = await pool.query(`
      SELECT w.id, w.user_id, wi.product_id, p.title, p.image_url
      FROM wishlists w
      JOIN wishlist_items wi ON w.id = wi.wishlist_id
      JOIN products p ON wi.product_id = p.id
    `);

    return NextResponse.json({ wishlist: result.rows });
  } catch (err) {
    console.error('Error fetching wishlist:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
