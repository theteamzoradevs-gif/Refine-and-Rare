"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Login failed");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
          Email
        </label>
        <input
          name="email"
          type="email"
          required
          className="w-full border border-line px-4 py-3 text-sm outline-none focus:border-teal"
          placeholder="admin@refineandrare.com"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
          Password
        </label>
        <input
          name="password"
          type="password"
          required
          className="w-full border border-line px-4 py-3 text-sm outline-none focus:border-teal"
        />
      </div>
      {error && <p className="text-sm text-red-700">{error}</p>}
      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
