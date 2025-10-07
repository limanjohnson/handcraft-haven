import { NextResponse } from 'next/server';
import {pool} from '../../../../lib/db';

// GET: all artisans
export async function GET() {
  try {
    const res = await pool.query('SELECT * FROM artisans ORDER BY id ASC');
    return NextResponse.json(res.rows);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching artisans' }, { status: 500 });
  }
}

// GET: single artisan by ID
// export async function GETSingle(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const res = await pool.query('SELECT * FROM artisans WHERE id = $1', [params.id]);
//     if (res.rows.length === 0) {
//       return NextResponse.json({ error: 'Artisan not found' }, { status: 404 });
//     }
//     return NextResponse.json(res.rows[0]);
//     } catch (error) {
//     return NextResponse.json({ error: 'Error fetching artisan' }, { status: 500 });
//   }
// }
