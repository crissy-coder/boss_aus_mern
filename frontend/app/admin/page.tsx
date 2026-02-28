"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type PageMeta = { slug: string; title: string; type: string; updatedAt: string };
type ContactCounts = { total: number; thisWeek: number; thisMonth: number };

export default function AdminDashboardPage() {
  const [pages, setPages] = useState<PageMeta[]>([]);
  const [mediaCount, setMediaCount] = useState(0);
  const [contactCounts, setContactCounts] = useState<ContactCounts | null>(null);

  useEffect(() => {
    fetch("/api/admin/pages")
      .then((r) => r.json())
      .then(setPages)
      .catch(() => setPages([]));
    fetch("/api/admin/media")
      .then((r) => r.json())
      .then((list: unknown[]) => setMediaCount(list.length))
      .catch(() => setMediaCount(0));
    fetch("/api/admin/contact-submissions/stats")
      .then((r) => r.json())
      .then(setContactCounts)
      .catch(() => setContactCounts(null));
  }, []);

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-white">Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-zinc-700">
          <p className="text-sm font-medium text-zinc-400">Pages</p>
          <p className="mt-2 text-3xl font-bold text-white">{pages.length}</p>
          <Link
            href="/admin/pages"
            className="mt-4 inline-block text-sm font-medium text-brand-light hover:text-brand"
          >
            Manage pages →
          </Link>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-zinc-700">
          <p className="text-sm font-medium text-zinc-400">Media files</p>
          <p className="mt-2 text-3xl font-bold text-white">{mediaCount}</p>
          <Link
            href="/admin/media"
            className="mt-4 inline-block text-sm font-medium text-brand-light hover:text-brand"
          >
            Manage media →
          </Link>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-zinc-700">
          <p className="text-sm font-medium text-zinc-400">Contact submissions</p>
          <p className="mt-2 text-3xl font-bold text-white">{contactCounts?.total ?? "—"}</p>
          <p className="mt-1 text-xs text-zinc-500">
            {contactCounts != null ? `${contactCounts.thisWeek} this week · ${contactCounts.thisMonth} this month` : ""}
          </p>
          <Link
            href="/admin/contact"
            className="mt-4 inline-block text-sm font-medium text-brand-light hover:text-brand"
          >
            View all →
          </Link>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <p className="text-sm font-medium text-zinc-400">Quick actions</p>
          <div className="mt-4 space-y-2">
            <Link
              href="/admin/pages/new"
              className="block rounded-lg bg-brand/20 px-4 py-2 text-sm font-medium text-brand-light hover:bg-brand/30"
            >
              + New page
            </Link>
            <Link
              href="/admin/media"
              className="block rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-700"
            >
              Upload image
            </Link>
          </div>
        </div>
      </div>
      {pages.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-white">Recent pages</h2>
          <ul className="space-y-2">
            {pages.slice(0, 5).map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/admin/pages/${encodeURIComponent(p.slug)}`}
                  className="flex items-center justify-between rounded-lg border border-zinc-800 px-4 py-3 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800/50 hover:text-white"
                >
                  <span>{p.title}</span>
                  <span className="text-xs text-zinc-500">{p.type}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
