"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type PageMeta = {
  slug: string;
  title: string;
  type: string;
  updatedAt: string;
  menuPlacement?: string | null;
};

const BUILT_IN_SLUGS = new Set([
  "about",
  "contact",
  "team",
  "management",
  "news",
]);
const BUILT_IN_PREFIXES = ["services/", "global/"];

function isCmsOnlySlug(slug: string): boolean {
  if (BUILT_IN_SLUGS.has(slug)) return false;
  if (BUILT_IN_PREFIXES.some((p) => slug.startsWith(p))) return false;
  return true;
}

/** Show in footer only if not placed in header (main / services / global). */
function showInFooter(placement: string | null | undefined): boolean {
  if (placement === "main" || placement === "services" || placement === "global") return false;
  return true;
}

export default function CmsPageLinks() {
  const [pages, setPages] = useState<PageMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cms/pages")
      .then((r) => r.json())
      .then((list: PageMeta[]) =>
        setPages(
          list.filter(
            (p) => isCmsOnlySlug(p.slug) && showInFooter(p.menuPlacement)
          )
        )
      )
      .catch(() => setPages([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading || pages.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-theme-heading">
        More pages
      </h3>
      <ul className="mt-4 space-y-3">
        {pages.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/${p.slug}`}
              className="text-sm text-theme-muted transition-colors hover:text-theme-heading"
            >
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
