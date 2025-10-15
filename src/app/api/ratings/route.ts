// src/app/api/ratings/route.ts
import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

type Rating = {
    id: number;
    user_id: number;
    product_id: number;
    rating: number;
    comment: string;
    created_at: string;
};

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const productId = searchParams.get("product_id");
        if (!productId) {
            return NextResponse.json({ error: "product_id is required" }, { status: 400 });
        }
        const ratingsResult = await query(
            `SELECT 
                r.id, 
                r.user_id, 
                u.name AS user_name,
                r.product_id, 
                r.rating, 
                r.comment, 
                r.created_at
            FROM ratings r
            JOIN users u ON r.user_id = u.id
            WHERE r.product_id = $1
            ORDER BY r.created_at DESC`,
            [Number(productId)]
        );
        return NextResponse.json(ratingsResult.rows);
    } catch (error) {
        console.error("Error fetching ratings:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user_id, product_id, rating, comment } = body;

    // validation
    if (!user_id || !product_id || !rating) {
      console.warn("Missing required fields:", { user_id, product_id, rating });
      return NextResponse.json(
        { error: "user_id, product_id y rating son requeridos" },
        { status: 400 }
      );
    }

    // insert into the database
    const result = await query(
      `INSERT INTO ratings (user_id, product_id, rating, comment)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (user_id, product_id)
        DO UPDATE SET rating = EXCLUDED.rating, comment = EXCLUDED.comment, created_at = NOW()
        RETURNING id, user_id, product_id, rating, comment, created_at`,
      [user_id, product_id, rating, comment || null]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error: any) {
    console.error("Error creating rating:", error.message || error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}



