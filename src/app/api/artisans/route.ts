import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { query } from '../../../../lib/db';

type Artisan = {
  id: number;
  name: string;
  bio?: string;
  contact_email?: string;
  image_url?: string | null;
  created_at?: string;
  product_count?: number;
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      // Get single artisan with their products
      const artisanResult = await query(
        `SELECT a.*, 
         COUNT(p.id) as product_count
         FROM artisans a
         LEFT JOIN products p ON a.id = p.artisan_id
         WHERE a.id = $1
         GROUP BY a.id`,
        [Number(id)]
      );

      if (artisanResult.rows.length === 0) {
        return NextResponse.json({ error: "Artisan not found" }, { status: 404 });
      }

      const artisan = artisanResult.rows[0];

      // Get artisan's products
      const productsResult = await query(
        `SELECT id, title, description, price, stock, image_url, created_at
         FROM products
         WHERE artisan_id = $1
         ORDER BY created_at DESC`,
        [Number(id)]
      );

      return NextResponse.json({ 
        artisan: {
          ...artisan,
          product_count: Number(artisan.product_count)
        },
        products: productsResult.rows.map((p: any) => ({
          ...p,
          price: Number(p.price),
          stock: Number(p.stock)
        }))
      });
    }

    // Get all artisans with product counts
    const artisansResult = await query(
      `SELECT a.*, 
       COUNT(p.id) as product_count
       FROM artisans a
       LEFT JOIN products p ON a.id = p.artisan_id
       GROUP BY a.id
       ORDER BY a.created_at DESC`
    );

    const artisans = artisansResult.rows.map((row: any) => ({
      ...row,
      product_count: Number(row.product_count)
    }));

    return NextResponse.json({ artisans });
  } catch (error) {
    console.error('Error fetching artisans:', error);
    return NextResponse.json({ error: 'Error fetching artisans' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, {status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    // timestampt + original name to avoid collisions
    const filename = `${Date.now()}-${(file as any).name ?? 'upload'}`;
    const filePath = path.join(uploadsDir, filename);

    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    const imageUrl = `/uploads/${filename}`;

    return NextResponse.json({ imageUrl});
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'upload failed' }, { status: 500 });
  }
}
