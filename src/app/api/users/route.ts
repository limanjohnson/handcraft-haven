// src/app/api/users/route.ts
import { NextResponse } from 'next/server';
import { pool } from '../../../../lib/db';

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM users');
    return NextResponse.json({ users: result.rows });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
