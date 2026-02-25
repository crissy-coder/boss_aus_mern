import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { listPages, savePage } from "@/lib/cms";

const ADMIN_COOKIE = "admin_session";

async function isAdmin() {
  const cookieStore = await cookies();
  return !!cookieStore.get(ADMIN_COOKIE)?.value;
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const pages = await listPages();
  return NextResponse.json(pages);
}

export async function POST(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const { slug, title, type, content, menuPlacement } = body;
  if (!slug || !title || type === undefined) {
    return NextResponse.json(
      { error: "slug, title, and type are required" },
      { status: 400 }
    );
  }
  await savePage({
    slug,
    title,
    type: type || "custom",
    updatedAt: new Date().toISOString(),
    content: content || {},
    ...(menuPlacement !== undefined && { menuPlacement: menuPlacement || null }),
  });
  return NextResponse.json({ ok: true });
}
