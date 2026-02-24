"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type PageMeta = { slug: string; title: string; type: string; updatedAt: string };

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

  useEffect(() => {
    fetch("/api/admin/pages")
      .then((r) => r.json())
      .then(setPages)
      .catch(() => setPages([]))
      .finally(() => setLoading(false));
  }, []);

  const existingSet = new Set(pages.map((p) => p.slug));
  const suggested = EXISTING_SLUGS.filter((s) => !existingSet.has(s));

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Pages</h1>
        <Link
          href="/admin/pages/new"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
        >
          + New page
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
        </div>
      ) : (
        <div className="space-y-4">
          {pages.length === 0 ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 text-center">
              <p className="text-zinc-400">No pages in CMS yet.</p>
              <p className="mt-2 text-sm text-zinc-500">
                Create a page to manage content, or your site uses hardcoded content from the codebase.
              </p>
              <Link
                href="/admin/pages/new"
                className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500"
              >
                Create first page
              </Link>
            </div>
          ) : (
            pages.map((p) => (
              <div
                key={p.slug}
                className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 px-6 py-4"
              >
                <div>
                  <p className="font-medium text-white">{p.title}</p>
                  <p className="text-sm text-zinc-500">/{p.slug} · {p.type}</p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`/${p.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  >
                    View
                  </a>
                  <Link
                    href={`/admin/pages/${encodeURIComponent(p.slug)}`}
                    className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-500"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))
          )}
          {suggested.length > 0 && (
            <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
              <h2 className="mb-3 text-sm font-semibold text-zinc-400">Import existing routes as CMS pages</h2>
              <p className="mb-4 text-xs text-zinc-500">
                These slugs match your app routes. Create a CMS page to override content.
              </p>
              <div className="flex flex-wrap gap-2">
                {suggested.map((slug) => (
                  <Link
                    key={slug}
                    href={`/admin/pages/new?slug=${encodeURIComponent(slug)}`}
                    className="rounded-lg bg-zinc-800 px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-700 hover:text-white"
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
