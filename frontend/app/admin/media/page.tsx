"use client";

import { useEffect, useState } from "react";

type MediaFile = {
  name: string;
  url: string;
  size: number;
  uploadedAt: string;
};

export default function AdminMediaPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copyMsg, setCopyMsg] = useState("");
  const [deletingName, setDeletingName] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/media")
      .then((r) => r.json())
      .then(setFiles)
      .catch(() => setFiles([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    try {
      await fetch("/api/admin/media", { method: "POST", body: form });
      load();
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const copyUrl = (url: string) => {
    const full = `${window.location.origin}${url}`;
    navigator.clipboard.writeText(full);
    setCopyMsg("Copied!");
    setTimeout(() => setCopyMsg(""), 2000);
  };

  const deleteFile = async (name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeletingName(name);
    try {
      const res = await fetch(`/api/admin/media/${encodeURIComponent(name)}`, { method: "DELETE" });
      if (res.ok) setFiles((prev) => prev.filter((f) => f.name !== name));
      else {
        const d = await res.json().catch(() => ({}));
        alert(d.error || "Failed to delete.");
      }
    } finally {
      setDeletingName(null);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-theme-heading">Media</h1>
        <label className="cursor-pointer rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-light">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onUpload}
            disabled={uploading}
          />
          {uploading ? "Uploading..." : "+ Upload image"}
        </label>
      </div>

      {copyMsg && (
        <div className="mb-4 rounded-lg bg-green-600/20 px-4 py-2 text-sm text-green-400">
          {copyMsg}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
        </div>
      ) : files.length === 0 ? (
        <div className="rounded-xl border border-theme bg-theme-card p-12 text-center">
          <p className="text-theme-muted">No images yet.</p>
          <p className="mt-2 text-sm text-theme-muted">
            Upload images to use in pages. They are stored in public/uploads.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {files.map((f) => (
            <div
              key={f.name}
              className="overflow-hidden rounded-xl border border-theme bg-theme-card"
            >
              <div className="aspect-square bg-theme-section">
                <img
                  src={f.url}
                  alt={f.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-medium text-theme-heading" title={f.name}>
                  {f.name}
                </p>
                <p className="text-xs text-theme-muted">{formatSize(f.size)}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => copyUrl(f.url)}
                    className="rounded bg-theme-card px-2 py-1 text-xs text-theme-muted hover:bg-(--page-pattern-color) hover:text-theme-heading"
                  >
                    Copy URL
                  </button>
                  <a
                    href={f.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded bg-theme-card px-2 py-1 text-xs text-theme-muted hover:bg-(--page-pattern-color) hover:text-theme-heading"
                  >
                    Open
                  </a>
                  <button
                    type="button"
                    onClick={() => deleteFile(f.name)}
                    disabled={deletingName === f.name}
                    className="rounded bg-red-900/40 px-2 py-1 text-xs text-red-400 hover:bg-red-900/60 disabled:opacity-50"
                    title="Delete this image"
                  >
                    {deletingName === f.name ? "Deleting…" : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
