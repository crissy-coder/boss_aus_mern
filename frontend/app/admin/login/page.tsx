"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError("Invalid password");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-theme-section px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-theme bg-theme-card p-8 shadow-xl">
          <h1 className="mb-2 text-2xl font-bold text-theme-heading">BOSS CMS</h1>
          <p className="mb-6 text-sm text-theme-muted">Sign in to the admin panel</p>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-theme-muted">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-theme bg-theme-card px-4 py-3 text-theme-heading placeholder:text-theme-muted outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                placeholder="Admin password"
                required
              />
            </div>
            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-brand py-3 font-medium text-white transition-colors hover:bg-brand-light disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          {/* <p className="mt-4 text-xs text-theme-muted">
            On Vercel: set <code className="rounded bg-theme-card px-1">ADMIN_PASSWORD</code> in Project → Settings → Environment Variables.
          </p> */}
        </div>
      </div>
    </div>
  );
}
