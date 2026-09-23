"use client";

import { useState } from "react";

type MediaItem = { url: string; type: "IMAGE" | "VIDEO"; alt: string };

function isLikelyVideo(url: string) {
  return /\.(mp4|webm|mov|m4v)(\?|$)/i.test(url);
}

function normalizeUrl(raw: string) {
  return raw.trim();
}

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
  const [linkUrl, setLinkUrl] = useState("");
  const [linkType, setLinkType] = useState<"IMAGE" | "VIDEO" | "AUTO">("AUTO");
  const [linkAlt, setLinkAlt] = useState("");

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

  function addFromLink() {
    const url = normalizeUrl(linkUrl);
    if (!url) {
      setError("Paste an image or video URL first.");
      return;
    }
    if (!/^https?:\/\//i.test(url) && !url.startsWith("/")) {
      setError("URL must start with https:// or /");
      return;
    }

    const type =
      linkType === "AUTO"
        ? isLikelyVideo(url)
          ? "VIDEO"
          : "IMAGE"
        : linkType;

    setItems([
      ...items,
      {
        url,
        type,
        alt: linkAlt.trim() || "Project media",
      },
    ]);
    setLinkUrl("");
    setLinkAlt("");
    setLinkType("AUTO");
    setError(null);
  }

  return (
    <div className="space-y-4">
      <input type="hidden" name={name} value={JSON.stringify(items)} />
      <label className="admin-label">Project media</label>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="admin-option-box space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink">
            Option 1 — Upload file
          </p>
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={(e) => onUpload(e.target.files)}
          />
          {uploading && <p className="text-sm text-muted">Uploading...</p>}
        </div>

        <div className="admin-option-box space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink">
            Option 2 — Paste online link
          </p>
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://example.com/photo.jpg"
          />
          <div className="flex flex-wrap gap-2">
            <select
              value={linkType}
              onChange={(e) =>
                setLinkType(e.target.value as "IMAGE" | "VIDEO" | "AUTO")
              }
            >
              <option value="AUTO">Auto type</option>
              <option value="IMAGE">Image</option>
              <option value="VIDEO">Video</option>
            </select>
            <input
              className="min-w-[8rem] flex-1"
              value={linkAlt}
              onChange={(e) => setLinkAlt(e.target.value)}
              placeholder="Alt text (optional)"
            />
            <button
              type="button"
              onClick={addFromLink}
              className="rounded-xl border border-ink/20 px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-ink transition hover:border-teal hover:text-teal"
            >
              Add link
            </button>
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-red-700">{error}</p>}

      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={`${item.url}-${index}`}
            className="flex flex-col gap-2 rounded-2xl border border-line/70 bg-white p-3 md:flex-row md:items-center"
          >
            <div className="min-w-0 flex-1 truncate text-xs">{item.url}</div>
            <select
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
              className="flex-1"
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
              className="admin-danger"
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
  accept = "image/*",
}: {
  name: string;
  label: string;
  initial?: string;
  accept?: string;
}) {
  const [url, setUrl] = useState(initial);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onUpload(file: File | null) {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      <label className="admin-label">{label}</label>
      <input type="hidden" name={name} value={url} />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="admin-option-box space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink">
            Option 1 — Upload file
          </p>
          <input
            type="file"
            accept={accept}
            onChange={(e) => onUpload(e.target.files?.[0] || null)}
          />
          {uploading && <p className="text-xs text-muted">Uploading...</p>}
        </div>

        <div className="admin-option-box space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink">
            Option 2 — Paste online link
          </p>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
          <p className="text-[11px] text-muted">
            Full https:// link, or a local path like /brand/...
          </p>
        </div>
      </div>

      {url ? (
        <p className="truncate text-xs text-muted">
          Current: <span className="text-ink">{url}</span>
        </p>
      ) : null}
      {error && <p className="text-sm text-red-700">{error}</p>}
    </div>
  );
}
