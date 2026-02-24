import { NextRequest, NextResponse } from "next/server";
import { getPage } from "@/lib/cms";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const page = await getPage(decodeURIComponent(slug));
  if (!page) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(page);
}
