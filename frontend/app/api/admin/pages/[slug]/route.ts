import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getPage, savePage, deletePage } from "@/lib/cms";

const ADMIN_COOKIE = "admin_session";

async function isAdmin() {
  const cookieStore = await cookies();
  return !!cookieStore.get(ADMIN_COOKIE)?.value;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const page = await getPage(decoded);
  if (!page) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(page);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const body = await request.json();
  const existing = await getPage(decoded);
  const slugFinal = body.slug !== undefined ? body.slug : decoded;
  const page = {
    slug: slugFinal,
    title: body.title ?? existing?.title ?? "Untitled",
    type: body.type ?? existing?.type ?? "custom",
    updatedAt: new Date().toISOString(),
    content: body.content ?? existing?.content ?? {},
  };
  await savePage(page);
  if (slugFinal !== decoded) {
    await deletePage(decoded);
  }
  return NextResponse.json(page);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;
  await deletePage(decodeURIComponent(slug));
  return NextResponse.json({ ok: true });
}
