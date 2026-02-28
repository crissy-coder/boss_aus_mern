"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import BlockEditor from "@/components/admin/BlockEditor";
import { contentToBlocks, blocksToContent } from "@/lib/blocks";

const TYPES = [
  { value: "custom", label: "Custom" },
  { value: "home", label: "Home" },
  { value: "about", label: "About" },
  { value: "contact", label: "Contact" },
  { value: "team", label: "Team" },
  { value: "service", label: "Service" },
];

const MENU_PLACEMENTS = [
  { value: "", label: "Footer only (default)" },
  { value: "main", label: "Main navigation (top bar)" },
  { value: "services", label: "Under Our Services dropdown" },
  { value: "global", label: "Under Global dropdown" },
  { value: "footer", label: "Footer – More pages" },
] as const;

export default function AdminNewPagePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const presetSlug = searchParams.get("slug") ?? "";
  const [slug, setSlug] = useState(presetSlug);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("custom");
  const [menuPlacement, setMenuPlacement] = useState("");
  const [blocks, setBlocks] = useState(() => contentToBlocks({}));
  const [useJsonMode, setUseJsonMode] = useState(false);
  const [contentJson, setContentJson] = useState("{}");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    let content: Record<string, unknown>;
    if (useJsonMode) {
      try {
        content = JSON.parse(contentJson) as Record<string, unknown>;
      } catch {
        setError("Content must be valid JSON");
        return;
      }
    } else {
      content = blocksToContent(blocks);
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: slug || "page",
          title: title || "Untitled",
          type,
          content,
          menuPlacement: menuPlacement || null,
        }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setError((d as { error?: string }).error || "Failed to create");
        return;
      }
      router.push("/admin/pages/" + encodeURIComponent(slug || "page"));
      router.refresh();
    } catch {
      setError("Request failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-theme-heading">New page</h1>
      <form onSubmit={submit} className="max-w-2xl space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-theme-muted">Slug (URL path)</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full rounded-lg border border-theme bg-theme-card px-4 py-2 text-theme-heading placeholder:text-theme-muted"
            placeholder="e.g. services/bpo"
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-theme-muted">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-theme bg-theme-card px-4 py-2 text-theme-heading placeholder:text-theme-muted"
            placeholder="e.g. BPO Services"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-theme-muted">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-lg border border-theme bg-theme-card px-4 py-2 text-theme-heading"
          >
            {TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-theme-muted">Show in menu</label>
          <select
            value={menuPlacement}
            onChange={(e) => setMenuPlacement(e.target.value)}
            className="w-full rounded-lg border border-theme bg-theme-card px-4 py-2 text-theme-heading"
          >
            {MENU_PLACEMENTS.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
          <p className="mt-1 text-xs text-theme-muted">Choose where this page link appears: header (main nav or under Services/Global) or footer.</p>
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-theme-muted">Content</label>
            <button
              type="button"
              onClick={() => {
                if (!useJsonMode) {
                  setContentJson(JSON.stringify(blocksToContent(blocks), null, 2));
                  setUseJsonMode(true);
                } else {
                  try {
                    const parsed = JSON.parse(contentJson || "{}") as Record<string, unknown>;
                    setBlocks(contentToBlocks(parsed));
                    setUseJsonMode(false);
                  } catch {
                    setError("Invalid JSON – fix before switching");
                  }
                }
              }}
              className="text-xs text-brand-light hover:underline"
            >
              {useJsonMode ? "Switch to block editor" : "Switch to JSON (advanced)"}
            </button>
          </div>
          {useJsonMode ? (
            <textarea
              value={contentJson}
              onChange={(e) => setContentJson(e.target.value)}
              rows={12}
              className="w-full rounded-lg border border-theme bg-theme-card px-4 py-2 font-mono text-sm text-theme-heading placeholder:text-theme-muted"
              placeholder='{"hero": {"title": "..."}}'
            />
          ) : (
            <BlockEditor blocks={blocks} onChange={setBlocks} />
          )}
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <div className="flex gap-4">
          <button type="submit" disabled={saving} className="rounded-lg bg-brand px-6 py-2 font-medium text-white hover:bg-brand-light disabled:opacity-50">
            {saving ? "Creating..." : "Create page"}
          </button>
          <button type="button" onClick={() => router.back()} className="rounded-lg border border-theme px-6 py-2 text-theme-heading hover:bg-(--page-pattern-color)">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
