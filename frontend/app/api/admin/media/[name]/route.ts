import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { deleteMedia } from "@/lib/cms";

const ADMIN_COOKIE = "admin_session";

async function isAdmin() {
  const cookieStore = await cookies();
  return !!cookieStore.get(ADMIN_COOKIE)?.value;
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const name = decodeURIComponent(params.name);
  try {
    await deleteMedia(name);
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Delete failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
