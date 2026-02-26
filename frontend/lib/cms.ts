import { neon } from "@neondatabase/serverless";
import { put, list, del } from "@vercel/blob";

const DATABASE_URL = process.env.DATABASE_URL;
const BLOB_PREFIX = "cms/";

/** Where to show this page in the site menu (admin choice). */
export type MenuPlacement = "main" | "services" | "global" | "footer" | null;

export type PageMeta = {
  slug: string;
  title: string;
  type: "home" | "about" | "contact" | "team" | "service" | "custom";
  updatedAt: string;
  /** Optional: show in header (main nav / Our Services / Global) or footer only. */
  menuPlacement?: MenuPlacement;
};

export type PageContent = PageMeta & {
  content: Record<string, unknown>;
};

function getSql() {
  if (!DATABASE_URL) {
    throw new Error("Missing DATABASE_URL environment variable");
  }
  return neon(DATABASE_URL);
}

/** No-op for compatibility; file-based dirs are not used with Neon + Blob. */
export async function ensureDirs() {
  // No-op: storage is Neon (pages) + Vercel Blob (media)
}

export async function listPages(): Promise<PageMeta[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT slug, title, type, menu_placement, updated_at
    FROM cms_pages
    ORDER BY updated_at DESC
  `;
  return (rows as { slug: string; title: string; type: string; menu_placement: string | null; updated_at: Date }[]).map((r) => ({
    slug: r.slug,
    title: r.title,
    type: r.type as PageMeta["type"],
    updatedAt: new Date(r.updated_at).toISOString(),
    ...(r.menu_placement != null && { menuPlacement: r.menu_placement as MenuPlacement }),
  }));
}

export async function getPage(slug: string): Promise<PageContent | null> {
  const sql = getSql();
  const rows = await sql`
    SELECT slug, title, type, menu_placement, content, updated_at
    FROM cms_pages
    WHERE slug = ${slug}
    LIMIT 1
  `;
  const r = rows[0] as { slug: string; title: string; type: string; menu_placement: string | null; content: Record<string, unknown>; updated_at: Date } | undefined;
  if (!r) return null;
  return {
    slug: r.slug,
    title: r.title,
    type: r.type as PageContent["type"],
    updatedAt: new Date(r.updated_at).toISOString(),
    ...(r.menu_placement != null && { menuPlacement: r.menu_placement as MenuPlacement }),
    content: (r.content as Record<string, unknown>) ?? {},
  };
}

export async function savePage(page: PageContent): Promise<void> {
  const sql = getSql();
  await sql`
    INSERT INTO cms_pages (slug, title, type, menu_placement, content, updated_at)
    VALUES (
      ${page.slug},
      ${page.title},
      ${page.type},
      ${page.menuPlacement ?? null},
      ${JSON.stringify(page.content ?? {})}::jsonb,
      ${new Date(page.updatedAt || Date.now()).toISOString()}::timestamptz
    )
    ON CONFLICT (slug) DO UPDATE SET
      title = EXCLUDED.title,
      type = EXCLUDED.type,
      menu_placement = EXCLUDED.menu_placement,
      content = EXCLUDED.content,
      updated_at = EXCLUDED.updated_at
  `;
}

export async function deletePage(slug: string): Promise<void> {
  const sql = getSql();
  await sql`DELETE FROM cms_pages WHERE slug = ${slug}`;
}

export type MediaFile = {
  name: string;
  path: string;
  url: string;
  size: number;
  mime: string;
  uploadedAt: string;
};

export async function listMedia(): Promise<MediaFile[]> {
  try {
    const { blobs } = await list({ prefix: BLOB_PREFIX, limit: 1000 });
    return blobs
      .map((b) => ({
        name: b.pathname.slice(BLOB_PREFIX.length),
        path: b.pathname,
        url: b.url,
        size: b.size ?? 0,
        mime: "image/*",
        uploadedAt: (b.uploadedAt instanceof Date ? b.uploadedAt : new Date(b.uploadedAt)).toISOString(),
      }))
      .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
  } catch {
    return [];
  }
}

export async function saveUpload(file: File): Promise<MediaFile> {
  const ext = file.name.includes(".") ? file.name.slice(file.name.lastIndexOf(".")) : ".bin";
  const base = file.name.replace(/\.[^.]+$/, "").replace(/[^a-z0-9-_]/gi, "-");
  const name = `${base}-${Date.now()}${ext}`;
  const pathname = BLOB_PREFIX + name;
  const blob = await put(pathname, file, { access: "public" });
  return {
    name,
    path: blob.pathname,
    url: blob.url,
    size: file.size,
    mime: file.type || "image/*",
    uploadedAt: new Date().toISOString(),
  };
}

/** Delete an uploaded file by its name (must be a single filename, no path). */
export async function deleteMedia(name: string): Promise<void> {
  const base = name.replace(/^.*[/\\]/, "");
  if (!base || base.includes("..")) {
    throw new Error("Invalid file name");
  }
  const pathname = BLOB_PREFIX + base;
  await del(pathname);
}
