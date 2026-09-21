"use client";

import { useState } from "react";

type MediaItem = { url: string; type: "IMAGE" | "VIDEO"; alt: string };

export function MediaUploader({
  name = "mediaJson",
  initial = [],
}: {
  name?: string;
  initial?: MediaItem[];
}) {
  const [items, setItems] = useState<MediaItem[]>(initial);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onUpload(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    setError(null);
    try {
      const next = [...items];
      for (const file of Array.from(files)) {
        const body = new FormData();
        body.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");
        next.push({
          url: data.url,
          type: data.type,
          alt: file.name.replace(/\.[^.]+$/, ""),
        });
      }
      setItems(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={JSON.stringify(items)} />
      <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
        Project media
      </label>
      <input
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={(e) => onUpload(e.target.files)}
        className="block w-full text-sm"
      />
      {uploading && <p className="text-sm text-muted">Uploading...</p>}
      {error && <p className="text-sm text-red-700">{error}</p>}
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={`${item.url}-${index}`}
            className="flex flex-col gap-2 border border-line bg-white p-3 md:flex-row md:items-center"
          >
            <div className="min-w-0 flex-1 truncate text-xs">{item.url}</div>
            <select
              className="border border-line px-2 py-1 text-xs"
              value={item.type}
              onChange={(e) => {
                const copy = [...items];
                copy[index] = {
                  ...item,
                  type: e.target.value as "IMAGE" | "VIDEO",
                };
                setItems(copy);
              }}
            >
              <option value="IMAGE">Image</option>
              <option value="VIDEO">Video</option>
            </select>
            <input
              className="flex-1 border border-line px-2 py-1 text-xs"
              value={item.alt}
              placeholder="Alt text"
              onChange={(e) => {
                const copy = [...items];
                copy[index] = { ...item, alt: e.target.value };
                setItems(copy);
              }}
            />
            <button
              type="button"
              className="text-xs text-red-700"
              onClick={() => setItems(items.filter((_, i) => i !== index))}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SingleUploadField({
  name,
  label,
  initial = "",
}: {
  name: string;
  label: string;
  initial?: string;
}) {
  const [url, setUrl] = useState(initial);
  const [uploading, setUploading] = useState(false);

  async function onUpload(file: File | null) {
    if (!file) return;
    setUploading(true);
    const body = new FormData();
    body.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body });
    const data = await res.json();
    setUploading(false);
    if (res.ok) setUrl(data.url);
  }

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
        {label}
      </label>
      <input type="hidden" name={name} value={url} />
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full border border-line px-3 py-2 text-sm"
        placeholder="/brand/... or uploaded URL"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => onUpload(e.target.files?.[0] || null)}
      />
      {uploading && <p className="text-xs text-muted">Uploading...</p>}
    </div>
  );
}
