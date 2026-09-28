"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Toast = { message: string; tone: "success" | "error" };

export function AdminToast() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    const status = searchParams.get("status");
    const message = searchParams.get("message");
    if (!status || !message) return;

    setToast({
      message,
      tone: status === "error" ? "error" : "success",
    });

    const cleanUrl = pathname;
    router.replace(cleanUrl, { scroll: false });
  }, [pathname, router, searchParams]);

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