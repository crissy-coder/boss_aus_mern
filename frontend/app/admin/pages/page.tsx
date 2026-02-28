"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type PageMeta = { slug: string; title: string; type: string; updatedAt: string };

function useCopyPageLink() {
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const copyPageLink = (slug: string) => {
    const url = `${typeof window !== "undefined" ? window.location.origin : ""}/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };
  return { copyPageLink, copiedSlug };
}

const EXISTING_SLUGS = [
  "home",
  "about",
  "contact",
  "team",
  "services/bpo",
  "services/construction",
  "services/laundromats",
  "services/hotel-motel",
  "services/healthcare",
  "services/education",
  "services/energy",
  "services/transport",
  "services/realestate",
  "services/it",
  "services/container-line",
];

export default function AdminPagesPage() {
  const [pages, setPages] = useState<PageMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const { copyPageLink, copiedSlug } = useCopyPageLink();

  const load = () => {
    setLoading(true);
    fetch("/api/admin/pages")
      .then((r) => r.json())
      .then(setPages)
      .catch(() => setPages([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const deletePage = async (slug: string) => {
    if (!confirm(`Delete page "${slug}"? This cannot be undone.`)) return;
    setDeletingSlug(slug);
    try {
      const res = await fetch(`/api/admin/pages/${encodeURIComponent(slug)}`, { method: "DELETE" });
      if (res.ok) setPages((prev) => prev.filter((p) => p.slug !== slug));
      else alert("Failed to delete.");
    } finally {
      setDeletingSlug(null);
    }
  };

  const existingSet = new Set(pages.map((p) => p.slug));
  const suggested = EXISTING_SLUGS.filter((s) => !existingSet.has(s));

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-theme-heading">Pages</h1>
        <Link
          href="/admin/pages/new"
          className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-light"
        >
          + New page
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
        </div>
      ) : (
        <div className="space-y-4">
          {pages.length === 0 ? (
            <div className="rounded-xl border border-theme bg-theme-card p-8 text-center">
              <p className="text-theme-muted">No pages in CMS yet.</p>
              <p className="mt-2 text-sm text-theme-muted">
                Create a page to manage content, or your site uses hardcoded content from the codebase.
              </p>
              <Link
                href="/admin/pages/new"
                className="mt-4 inline-block rounded-lg bg-brand px-4 py-2 text-sm text-white hover:bg-brand-light"
              >
                Create first page
              </Link>
            </div>
          ) : (
            pages.map((p) => (
              <div
                key={p.slug}
                className="flex items-center justify-between rounded-xl border border-theme bg-theme-card px-6 py-4"
              >
                <div>
                  <p className="font-medium text-theme-heading">{p.title}</p>
                  <p className="text-sm text-theme-muted">/{p.slug} · {p.type}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`/${p.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-theme px-3 py-2 text-sm text-theme-muted hover:bg-(--page-pattern-color) hover:text-theme-heading"
                  >
                    View
                  </a>
                  <button
                    type="button"
                    onClick={() => copyPageLink(p.slug)}
                    className="rounded-lg border border-theme px-3 py-2 text-sm text-theme-muted hover:bg-(--page-pattern-color) hover:text-theme-heading"
                    title="Copy public page URL"
                  >
                    {copiedSlug === p.slug ? "Copied!" : "Copy link"}
                  </button>
                  <Link
                    href={`/admin/pages/${encodeURIComponent(p.slug)}`}
                    className="rounded-lg bg-brand px-3 py-2 text-sm text-white hover:bg-brand-light"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => deletePage(p.slug)}
                    disabled={deletingSlug === p.slug}
                    className="rounded-lg border border-red-800 px-3 py-2 text-sm text-red-400 hover:bg-red-900/30 hover:text-red-300 disabled:opacity-50"
                    title="Delete this page"
                  >
                    {deletingSlug === p.slug ? "Deleting…" : "Delete"}
                  </button>
                </div>
              </div>
            ))
          )}
          {suggested.length > 0 && (
            <div className="mt-8 rounded-xl border border-theme bg-theme-card p-6">
              <h2 className="mb-3 text-sm font-semibold text-theme-muted">Import existing routes as CMS pages</h2>
              <p className="mb-4 text-xs text-theme-muted">
                These slugs match your app routes. Create a CMS page to override content.
              </p>
              <div className="flex flex-wrap gap-2">
                {suggested.map((slug) => (
                  <Link
                    key={slug}
                    href={`/admin/pages/new?slug=${encodeURIComponent(slug)}`}
                    className="rounded-lg bg-theme-card px-3 py-2 text-sm text-theme-heading hover:bg-(--page-pattern-color)"
                  >
                    + {slug}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
