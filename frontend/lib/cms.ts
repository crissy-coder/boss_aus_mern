import { promises as fs } from "fs";
import path from "path";
import { createHash } from "crypto";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PAGES_DIR = path.join(CONTENT_DIR, "pages");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

/** Unique filename from slug so "test page" and "test!page" don't collide. */
function slugToFileId(slug: string): string {
  return createHash("sha256").update(slug).digest("hex").slice(0, 16);
}

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

export async function ensureDirs() {
  await fs.mkdir(PAGES_DIR, { recursive: true });
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
}

export async function listPages(): Promise<PageMeta[]> {
  await ensureDirs();
  const indexPath = path.join(PAGES_DIR, "index.json");
  try {
    const data = await fs.readFile(indexPath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function getPage(slug: string): Promise<PageContent | null> {
  await ensureDirs();
  const fileId = slugToFileId(slug);
  const filePath = path.join(PAGES_DIR, `${fileId}.json`);
  const legacySlug = slug.replace(/[^a-z0-9-_/]/gi, "");
  const legacyPath = path.join(PAGES_DIR, `${legacySlug}.json`);
  for (const p of [filePath, legacyPath]) {
    try {
      const data = await fs.readFile(p, "utf-8");
      const page = JSON.parse(data) as PageContent;
      if (page.slug !== slug) continue;
      return page;
    } catch {
      // try next path
    }
  }
  return null;
}

export async function savePage(page: PageContent): Promise<void> {
  await ensureDirs();
  const fileId = slugToFileId(page.slug);
  const filePath = path.join(PAGES_DIR, `${fileId}.json`);
  await fs.writeFile(filePath, JSON.stringify(page, null, 2), "utf-8");

  const legacySlug = page.slug.replace(/[^a-z0-9-_/]/gi, "");
  if (legacySlug !== fileId) {
    const legacyPath = path.join(PAGES_DIR, `${legacySlug}.json`);
    try {
      await fs.unlink(legacyPath);
    } catch {
      // ignore
    }
  }

  const indexPath = path.join(PAGES_DIR, "index.json");
  const list = await listPages();
  const existing = list.findIndex((p) => p.slug === page.slug);
  const meta: PageMeta = {
    slug: page.slug,
    title: page.title,
    type: page.type,
    updatedAt: new Date().toISOString(),
    ...(page.menuPlacement !== undefined && { menuPlacement: page.menuPlacement }),
  };
  if (existing >= 0) {
    list[existing] = meta;
  } else {
    list.push(meta);
  }
  await fs.writeFile(indexPath, JSON.stringify(list, null, 2), "utf-8");
}

export async function deletePage(slug: string): Promise<void> {
  const fileId = slugToFileId(slug);
  const legacySlug = slug.replace(/[^a-z0-9-_/]/gi, "");
  for (const id of [fileId, legacySlug]) {
    const filePath = path.join(PAGES_DIR, `${id}.json`);
    try {
      await fs.unlink(filePath);
    } catch {
      // ignore
    }
  }
  const list = (await listPages()).filter((p) => p.slug !== slug);
  const indexPath = path.join(PAGES_DIR, "index.json");
  await fs.writeFile(indexPath, JSON.stringify(list, null, 2), "utf-8");
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
  await ensureDirs();
  try {
    const names = await fs.readdir(UPLOADS_DIR);
    const files: MediaFile[] = [];
    for (const name of names) {
      const filePath = path.join(UPLOADS_DIR, name);
      const stat = await fs.stat(filePath);
      if (stat.isFile()) {
        files.push({
          name,
          path: filePath,
          url: `/uploads/${name}`,
          size: stat.size,
          mime: "image/*",
          uploadedAt: stat.mtime.toISOString(),
        });
      }
    }
    return files.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
  } catch {
    return [];
  }
}

export async function saveUpload(file: File): Promise<MediaFile> {
  await ensureDirs();
  const ext = path.extname(file.name) || ".bin";
  const base = path.basename(file.name, ext).replace(/[^a-z0-9-_]/gi, "-");
  const name = `${base}-${Date.now()}${ext}`;
  const filePath = path.join(UPLOADS_DIR, name);
  const buf = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buf);
  const stat = await fs.stat(filePath);
  return {
    name,
    path: filePath,
    url: `/uploads/${name}`,
    size: stat.size,
    mime: file.type,
    uploadedAt: stat.mtime.toISOString(),
  };
}

/** Delete an uploaded file by its name (must be a single filename, no path). */
export async function deleteMedia(name: string): Promise<void> {
  const base = path.basename(name);
  if (base !== name || base.includes("..")) {
    throw new Error("Invalid file name");
  }
  await ensureDirs();
  const filePath = path.join(UPLOADS_DIR, base);
  await fs.unlink(filePath);
}
