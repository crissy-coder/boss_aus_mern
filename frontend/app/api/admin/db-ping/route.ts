import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { neon } from "@neondatabase/serverless";

const ADMIN_COOKIE = "admin_session";

export async function GET() {
  const cookieStore = await cookies();
  if (!cookieStore.get(ADMIN_COOKIE)?.value) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL) {
    return NextResponse.json({ ok: false, error: "Missing DATABASE_URL" }, { status: 503 });
  }
  try {
    const sql = neon(DATABASE_URL);
    await sql`SELECT 1`;
    return NextResponse.json({ ok: true, message: "Neon Postgres connected" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Connection failed";
    return NextResponse.json({ ok: false, error: message }, { status: 503 });
  }
}
