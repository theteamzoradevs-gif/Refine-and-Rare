"use client";

import Image from "next/image";
import { useRef, useState } from "react";

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
  const fileRef = useRef<HTMLInputElement>(null);

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
      if (fileRef.current) fileRef.current.value = "";
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
    <div className="space-y-5">
      <input type="hidden" name={name} value={JSON.stringify(items)} />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="admin-option-box space-y-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink">
              Upload files
            </p>
            <p className="mt-1 text-xs text-muted">
              Images or videos from your device.
            </p>
          </div>
          <label className="admin-media-drop">
            <input
              ref={fileRef}
              type="file"
              accept="image/*,video/*"
              multiple
              className="sr-only"
              onChange={(e) => onUpload(e.target.files)}
            />
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal/10 text-teal">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden
              >
                <path d="M12 16V4" strokeLinecap="round" />
                <path d="M7 9l5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" />
              </svg>
            </span>
            <span className="text-sm font-medium text-ink">
              {uploading ? "Uploading…" : "Click to choose files"}
            </span>
            <span className="text-xs text-muted">PNG, JPG, WEBP, MP4</span>
          </label>
        </div>

        <div className="admin-option-box space-y-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink">
              Paste a link
            </p>
            <p className="mt-1 text-xs text-muted">
              Full https URL or a local path like /brand/...
            </p>
          </div>
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://example.com/photo.jpg"
            className="w-full"
          />
          <div className="grid gap-2 sm:grid-cols-[8rem_1fr_auto]">
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
              value={linkAlt}
              onChange={(e) => setLinkAlt(e.target.value)}
              placeholder="Alt text (optional)"
              className="w-full"
            />
            <button
              type="button"
              onClick={addFromLink}
              className="rounded-xl bg-teal px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-ink"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line/80 bg-cream/30 px-4 py-8 text-center">
          <p className="text-sm text-muted">No media yet — upload or paste a link.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              key={`${item.url}-${index}`}
              className="flex flex-col gap-3 rounded-2xl border border-line/70 bg-white p-3 sm:flex-row sm:items-center"
            >
              <div className="admin-media-thumb">
                {item.type === "IMAGE" ? (
                  <Image
                    src={item.url}
                    alt={item.alt || "Media"}
                    fill
                    className="object-cover"
                    sizes="64px"
                    unoptimized={item.url.startsWith("http")}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-ink/90 text-[10px] font-semibold uppercase tracking-wider text-gold">
                    Video
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1 space-y-2">
                <p className="truncate text-xs text-muted" title={item.url}>
                  {item.url}
                </p>
                <div className="flex flex-col gap-2 sm:flex-row">
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
                    className="sm:w-32"
                  >
                    <option value="IMAGE">Image</option>
                    <option value="VIDEO">Video</option>
                  </select>
                  <input
                    className="w-full flex-1"
                    value={item.alt}
                    placeholder="Alt text"
                    onChange={(e) => {
                      const copy = [...items];
                      copy[index] = { ...item, alt: e.target.value };
                      setItems(copy);
                    }}
                  />
                </div>
              </div>
              <button
                type="button"
                className="admin-danger self-start sm:self-center"
                onClick={() => setItems(items.filter((_, i) => i !== index))}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function SingleUploadField({
  name,
  label,
  hint,
  initial = "",
  accept = "image/*",
}: {
  name: string;
  label: string;
  hint?: string;
  initial?: string;
  accept?: string;
}) {
  const [url, setUrl] = useState(initial);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

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
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="admin-label mb-0">{label}</p>
        {hint ? <p className="admin-hint mt-1">{hint}</p> : null}
      </div>
      <input type="hidden" name={name} value={url} />

      <div className="grid gap-4 md:grid-cols-[11rem_1fr]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line/70 bg-cream/50">
          {url && !isLikelyVideo(url) ? (
            <Image
              src={url}
              alt="Preview"
              fill
              className="object-cover"
              sizes="176px"
              unoptimized={url.startsWith("http")}
            />
          ) : url ? (
            <div className="flex h-full items-center justify-center text-xs font-semibold uppercase tracking-wider text-muted">
              Media set
            </div>
          ) : (
            <div className="flex h-full items-center justify-center px-3 text-center text-xs text-muted">
              No image yet
            </div>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="admin-media-drop min-h-[7rem]">
            <input
              ref={fileRef}
              type="file"
              accept={accept}
              className="sr-only"
              onChange={(e) => onUpload(e.target.files?.[0] || null)}
            />
            <span className="text-sm font-medium text-ink">
              {uploading ? "Uploading…" : "Upload file"}
            </span>
            <span className="text-xs text-muted">From your device</span>
          </label>

          <div className="admin-option-box flex flex-col justify-center space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink">
              Or paste link
            </p>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://… or /brand/…"
              className="w-full"
            />
            {url ? (
              <button
                type="button"
                className="admin-danger self-start"
                onClick={() => setUrl("")}
              >
                Clear
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
