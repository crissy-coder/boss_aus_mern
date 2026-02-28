import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { listSubmissions } from "@/lib/contact-submissions";

const ADMIN_COOKIE = "admin_session";

async function isAdmin() {
  const cookieStore = await cookies();
  return !!cookieStore.get(ADMIN_COOKIE)?.value;
}

export async function GET(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from") ?? undefined;
  const to = searchParams.get("to") ?? undefined;
  const limit = searchParams.get("limit");
  const offset = searchParams.get("offset");
  try {
    const result = await listSubmissions({
      from,
      to,
      limit: limit ? parseInt(limit, 10) : undefined,
      offset: offset ? parseInt(offset, 10) : undefined,
    });
    return NextResponse.json(result);
  } catch (err) {
    console.error("[contact-submissions]", err);
    return NextResponse.json(
      { error: "Failed to load submissions" },
      { status: 500 }
    );
  }
}
