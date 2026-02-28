"use client";

import { useEffect, useState } from "react";

type MediaFile = { name: string; url: string };

export default function ImagePicker({
  value,
  onChange,
  placeholder = "Image URL or pick from library",
}: {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
}) {
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/media")
      .then((r) => r.json())
      .then((list: MediaFile[]) => setMedia(Array.isArray(list) ? list : []))
      .catch(() => setMedia([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-theme bg-theme-card px-3 py-2 text-sm text-theme-heading placeholder:text-theme-muted"
      />
      {!loading && media.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {media.slice(0, 12).map((f) => (
            <button
              key={f.name}
              type="button"
              onClick={() => onChange(f.url)}
              className={`overflow-hidden rounded-lg border-2 transition-all ${
                value === f.url
                  ? "border-brand ring-1 ring-brand"
                  : "border-theme hover:border-theme"
              }`}
            >
              <img
                src={f.url}
                alt={f.name}
                className="h-16 w-16 object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
