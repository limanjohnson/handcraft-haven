import pool from '../../../../lib/db';

export async function GET(request: Request) {
  try {
    // Extract user_id from query params -> /api/wishlist?user_id=1
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');

    if (!userId) {
      return Response.json({ error: 'user_id is required' }, { status: 400 });
    }

    const query = `
      SELECT 
          w.id AS wishlist_id,
          p.id AS product_id,
          p.title,
          p.description,
          p.price,
          a.name AS artisan_name,
          COALESCE(ROUND(AVG(r.rating), 1), 0) AS average_rating,
          COUNT(r.id) AS total_reviews
      FROM wishlists w
      JOIN wishlist_items wi ON w.id = wi.wishlist_id
      JOIN products p ON wi.product_id = p.id
      JOIN artisans a ON p.artisan_id = a.id
      LEFT JOIN ratings r ON p.id = r.product_id
      WHERE w.user_id = $1
      GROUP BY w.id, p.id, a.name
      ORDER BY p.title;
    `;

    const result = await pool.query(query, [userId]);

    return Response.json(result.rows);
  } catch (error: unknown) {
    console.error('Error fetching wishlist:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
