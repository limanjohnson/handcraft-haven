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



