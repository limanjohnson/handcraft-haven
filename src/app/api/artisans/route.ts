import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  const { rows } = await query(
    `select id, name, specialty, avatar_url, bio, created_at
     from artisans order by created_at desc limit 100`
  );
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, specialty = null, avatar_url = null, bio = null } = body ?? {};
  if (!name) return NextResponse.json({ error: "name is required" }, { status: 400 });

  const { rows } = await query(
    `insert into artisans (name, specialty, avatar_url, bio)
     values ($1,$2,$3,$4)
     returning id, name, specialty, avatar_url, bio, created_at`,
    [name, specialty, avatar_url, bio]
  );

  return NextResponse.json(rows[0], { status: 201 });
}