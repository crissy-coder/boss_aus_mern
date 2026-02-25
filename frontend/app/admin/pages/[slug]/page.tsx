"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

type PageContent = {
  slug: string;
  title: string;
  type: string;
  updatedAt: string;
  menuPlacement?: string | null;
  content: Record<string, unknown>;
};

const MENU_PLACEMENTS = [
  { value: "", label: "Footer only (default)" },
  { value: "main", label: "Main navigation (top bar)" },
  { value: "services", label: "Under Our Services dropdown" },
  { value: "global", label: "Under Global dropdown" },
  { value: "footer", label: "Footer – More pages" },
] as const;

const TYPES = [
  { value: "custom", label: "Custom" },
  { value: "home", label: "Home" },
  { value: "about", label: "About" },
  { value: "contact", label: "Contact" },
  { value: "team", label: "Team" },
  { value: "service", label: "Service" },
] as const;

export default function AdminEditPagePage() {
  const params = useParams();
  const router = useRouter();
  const slug = decodeURIComponent((params.slug as string) || "");
  const [page, setPage] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("custom");
  const [menuPlacement, setMenuPlacement] = useState("");
  const [contentJson, setContentJson] = useState("{}");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (slug && slug !== "new") {
      fetch(`/api/admin/pages/${encodeURIComponent(slug)}`)
        .then((r) => {
          if (!r.ok) throw new Error("Not found");
          return r.json();
        })
        .then((p: PageContent) => {
          setPage(p);
          setTitle(p.title);
          setType(p.type);
          setMenuPlacement(p.menuPlacement ?? "");
          setContentJson(JSON.stringify(p.content, null, 2));
        })
        .catch(() => setPage(null))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [slug]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    let content = {};
    try {
      content = JSON.parse(contentJson);
    } catch {
      setError("Content must be valid JSON");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/pages/${encodeURIComponent(slug)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, title, type, content, menuPlacement: menuPlacement || null }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setError(d.error || "Failed to update");
        return;
      }
      const updated = await res.json();
      setPage(updated);
      if (updated.slug !== slug) {
        router.replace(`/admin/pages/${encodeURIComponent(updated.slug)}`);
      }
      setError("");
    } catch {
      setError("Request failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Delete page "${slug}"? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/pages/${encodeURIComponent(slug)}`, { method: "DELETE" });
      if (res.ok) router.replace("/admin/pages");
      else {
        const d = await res.json().catch(() => ({}));
        setError(d.error || "Failed to delete");
      }
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (!page && slug !== "new") {
    return (
      <div>
        <p className="text-zinc-400">Page not found.</p>
        <Link href="/admin/pages" className="mt-4 inline-block text-blue-400 hover:underline">
          ← Back to pages
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Edit page</h1>
        <div className="flex gap-2">
          <a
            href={`/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white"
          >
            View on site
          </a>
          <Link
            href="/admin/pages"
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white"
          >
            ← Back
          </Link>
        </div>
      </div>

      <form onSubmit={submit} className="max-w-2xl space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">Slug</label>
          <input
            type="text"
            value={slug}
            readOnly
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2 text-zinc-500"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white"
          >
            {TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">Show in menu</label>
          <select
            value={menuPlacement}
            onChange={(e) => setMenuPlacement(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white"
          >
            {MENU_PLACEMENTS.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
          <p className="mt-1 text-xs text-zinc-500">Where this page link appears: header (main nav or under Services/Global) or footer.</p>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">Content (JSON)</label>
          <textarea
            value={contentJson}
            onChange={(e) => setContentJson(e.target.value)}
            rows={16}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 font-mono text-sm text-white placeholder-zinc-500"
          />
          <p className="mt-1 text-xs text-zinc-500">
            Optional row/column layouts: use <code className="rounded bg-zinc-800 px-1">rows</code> with <code className="rounded bg-zinc-800 px-1">layout</code> (e.g. &quot;6-6&quot;, &quot;8-4&quot;, &quot;4-4-4&quot;) and <code className="rounded bg-zinc-800 px-1">cells</code> (title, text, image). See docs.
          </p>
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-500 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting || saving}
            className="rounded-lg border border-red-800 px-6 py-2 font-medium text-red-400 hover:bg-red-900/30 disabled:opacity-50"
          >
            {deleting ? "Deleting…" : "Delete page"}
          </button>
        </div>
      </form>
    </div>
  );
}
