import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_COOKIE = "admin_session";
const SESSION_SECRET = process.env.ADMIN_PASSWORD || "admin123";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { password } = body || {};
  if (password === SESSION_SECRET) {
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE, "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ ok: false }, { status: 401 });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE);
  return NextResponse.json({ authenticated: !!session?.value });
}
