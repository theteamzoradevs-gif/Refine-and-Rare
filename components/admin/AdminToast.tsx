"use client";

import { useEffect, useState } from "react";

type Toast = { message: string; tone: "success" | "error" };

export function AdminToast() {
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    function readUrlToast() {
      const url = new URL(window.location.href);
      const status = url.searchParams.get("status");
      const message = url.searchParams.get("message");
      if (!status || !message) return;

      setToast({
        message,
        tone: status === "error" ? "error" : "success",
      });

      url.searchParams.delete("status");
      url.searchParams.delete("message");
      window.history.replaceState(
        {},
        "",
        `${url.pathname}${url.search}${url.hash}`
      );
    }

    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;
    const notifyUrlChange = () =>
      window.dispatchEvent(new Event("admin-url-change"));

    window.history.pushState = function (...args) {
      originalPushState.apply(window.history, args);
      notifyUrlChange();
    };
    window.history.replaceState = function (...args) {
      originalReplaceState.apply(window.history, args);
      notifyUrlChange();
    };

    window.addEventListener("popstate", readUrlToast);
    window.addEventListener("admin-url-change", readUrlToast);
    readUrlToast();

    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.removeEventListener("popstate", readUrlToast);
      window.removeEventListener("admin-url-change", readUrlToast);
    };
  }, []);

  useEffect(() => {
    function showToast(event: Event) {
      const detail = (event as CustomEvent<Toast>).detail;
      setToast(detail);
    }

    window.addEventListener("admin-toast", showToast);
    return () => window.removeEventListener("admin-toast", showToast);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 4500);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`admin-toast ${toast.tone === "error" ? "admin-toast-error" : "admin-toast-success"}`}
    >
      <span aria-hidden>{toast.tone === "error" ? "!" : "✓"}</span>
      <p>{toast.message}</p>
      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={() => setToast(null)}
      >
        ×
      </button>
    </div>
  );
}