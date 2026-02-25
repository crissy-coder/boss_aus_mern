import { NextResponse } from "next/server";
import { listPages } from "@/lib/cms";

/** Public API: list all CMS pages (slug, title) so the site can show links for users. */
export async function GET() {
  const pages = await listPages();
  return NextResponse.json(pages);
}
