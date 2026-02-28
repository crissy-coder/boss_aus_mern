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
      <h1 className="mb-8 text-2xl font-bold text-theme-heading">Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-theme bg-theme-card p-6 transition-all hover:border-theme">
          <p className="text-sm font-medium text-theme-muted">Pages</p>
          <p className="mt-2 text-3xl font-bold text-theme-heading">{pages.length}</p>
          <Link
            href="/admin/pages"
            className="mt-4 inline-block text-sm font-medium text-brand-light hover:text-brand"
          >
            Manage pages →
          </Link>
        </div>
        <div className="rounded-xl border border-theme bg-theme-card p-6 transition-all hover:border-theme">
          <p className="text-sm font-medium text-theme-muted">Media files</p>
          <p className="mt-2 text-3xl font-bold text-theme-heading">{mediaCount}</p>
          <Link
            href="/admin/media"
            className="mt-4 inline-block text-sm font-medium text-brand-light hover:text-brand"
          >
            Manage media →
          </Link>
        </div>
        <div className="rounded-xl border border-theme bg-theme-card p-6 transition-all hover:border-theme">
          <p className="text-sm font-medium text-theme-muted">Contact submissions</p>
          <p className="mt-2 text-3xl font-bold text-theme-heading">{contactCounts?.total ?? "—"}</p>
          <p className="mt-1 text-xs text-theme-muted">
            {contactCounts != null ? `${contactCounts.thisWeek} this week · ${contactCounts.thisMonth} this month` : ""}
          </p>
          <Link
            href="/admin/contact"
            className="mt-4 inline-block text-sm font-medium text-brand-light hover:text-brand"
          >
            View all →
          </Link>
        </div>
        <div className="rounded-xl border border-theme bg-theme-card p-6">
          <p className="text-sm font-medium text-theme-muted">Quick actions</p>
          <div className="mt-4 space-y-2">
            <Link
              href="/admin/pages/new"
              className="block rounded-lg bg-brand/20 px-4 py-2 text-sm font-medium text-brand-light hover:bg-brand/30"
            >
              + New page
            </Link>
            <Link
              href="/admin/media"
              className="block rounded-lg bg-theme-card px-4 py-2 text-sm font-medium text-theme-heading hover:bg-(--page-pattern-color)"
            >
              Upload image
            </Link>
          </div>
        </div>
      </div>
      {pages.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-theme-heading">Recent pages</h2>
          <ul className="space-y-2">
            {pages.slice(0, 5).map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/admin/pages/${encodeURIComponent(p.slug)}`}
                  className="flex items-center justify-between rounded-lg border border-theme bg-theme-card px-4 py-3 text-theme-heading hover:border-theme hover:bg-(--page-pattern-color)"
                >
                  <span>{p.title}</span>
                  <span className="text-xs text-theme-muted">{p.type}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
