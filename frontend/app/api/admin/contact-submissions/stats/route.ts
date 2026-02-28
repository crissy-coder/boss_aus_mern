import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getStats, getCounts } from "@/lib/contact-submissions";

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
  const type = searchParams.get("type"); // "counts" | "chart"
  try {
    if (type === "chart") {
      const from = searchParams.get("from");
      const to = searchParams.get("to");
      if (!from || !to) {
        return NextResponse.json(
          { error: "from and to date required for chart" },
          { status: 400 }
        );
      }
      const stats = await getStats({ from, to });
      return NextResponse.json(stats);
    }
    const counts = await getCounts();
    return NextResponse.json(counts);
  } catch (err) {
    console.error("[contact-submissions/stats]", err);
    return NextResponse.json(
      { error: "Failed to load stats" },
      { status: 500 }
    );
  }
}
