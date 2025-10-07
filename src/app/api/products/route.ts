import { NextResponse } from 'next/server';
import {pool} from '../../../../lib/db';

// GET: all products
export async function GET() {
  try {
    const res = await pool.query('SELECT * FROM products ORDER BY id ASC');
    return NextResponse.json(res.rows);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
  }
}

// GET: single product by ID
// export async function GETSingle(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const res = await pool.query('SELECT * FROM products WHERE id = $1', [params.id]);
//     if (res.rows.length === 0) {
//       return NextResponse.json({ error: 'Product not found' }, { status: 404 });
//     }
//     return NextResponse.json(res.rows[0]);
//     } catch (error) {
//     return NextResponse.json({ error: 'Error fetching product' }, { status: 500 });
//   }
// }

//GET: products by user ID
// export async function GETByUser(req: Request, { params }: { params: { user_id: string } }) {
//   try {
//     const res = await pool.query('SELECT * FROM products WHERE user_id = $1 ORDER BY id ASC', [params.user_id]);
//     return NextResponse.json(res.rows);
//   } catch (error) {
//     return NextResponse.json({ error: 'Error fetching products for user' }, { status: 500 });
//   }
// }


// POST: new product
// export async function POST(req: Request) {
//   try {
//     const { title, description, price, image_url, user_id } = await req.json();
//     const res = await pool.query(
//       'INSERT INTO products (title, description, price, image_url, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
//       [title, description, price, image_url, user_id]
//     );
//     return NextResponse.json(res.rows[0]);
//   } catch (error) {
//     return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
//   }
// }

// PUT: update product by ID
// export async function PUT(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const { title, description, price, image_url } = await req.json();
//     const res = await pool.query(
//       'UPDATE products SET title = $1, description = $2, price = $3, image_url = $4 WHERE id = $5 RETURNING *',
//       [title, description, price, image_url, params.id]
//     );
//     if (res.rows.length === 0) {
//         return NextResponse.json({ error: 'Product not found' }, { status: 404 });
//     }
//     return NextResponse.json(res.rows[0]);
//   } catch (error) {
//     return NextResponse.json({ error: 'Error updating product' }, { status: 500 });
//   }
// }

// DELETE: product by ID
// export async function DELETE(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const res = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [params.id]);
//     if (res.rows.length === 0) {
//       return NextResponse.json({ error: 'Product not found' }, { status: 404 });
//     }
//     return NextResponse.json({ message: 'Product deleted successfully' });
//   } catch (error) {
//     return NextResponse.json({ error: 'Error deleting product' }, { status: 500 });
//   }
// }
