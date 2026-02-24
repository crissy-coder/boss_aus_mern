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
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-xl">
          <h1 className="mb-2 text-2xl font-bold text-white">BOSS CMS</h1>
          <p className="mb-6 text-sm text-zinc-400">Sign in to the admin panel</p>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-zinc-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
              className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition-colors hover:bg-blue-500 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          {/* <p className="mt-4 text-xs text-zinc-500">
            Set ADMIN_PASSWORD in .env for production.
          </p> */}
        </div>
      </div>
    </div>
  );
}
