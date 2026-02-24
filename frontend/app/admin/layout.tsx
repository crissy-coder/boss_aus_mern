"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/admin/auth")
      .then((r) => r.json())
      .then((d) => setAuth(d.authenticated))
      .catch(() => setAuth(false));
  }, []);

  if (auth === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!auth) {
    router.replace("/admin/login");
    return null;
  }

  const nav = [
    { label: "Dashboard", href: "/admin" },
    { label: "Pages", href: "/admin/pages" },
    { label: "Media", href: "/admin/media" },
  ];

  const logout = () => {
    fetch("/api/admin/auth", { method: "DELETE" }).then(() => {
      setAuth(false);
      router.push("/admin/login");
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-zinc-800 bg-zinc-900">
        <div className="flex h-16 items-center gap-2 border-b border-zinc-800 px-6">
          <span className="text-lg font-bold text-white">BOSS CMS</span>
        </div>
        <nav className="space-y-1 p-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                pathname === item.href
                  ? "bg-blue-600 text-white"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t border-zinc-800 p-4">
          <Link
            href="/"
            target="_blank"
            className="mb-2 block rounded-lg px-4 py-2 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white"
          >
            View site →
          </Link>
          <button
            type="button"
            onClick={logout}
            className="w-full rounded-lg px-4 py-2 text-left text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white"
          >
            Logout
          </button>
        </div>
      </aside>
      <main className="pl-64 min-h-screen">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
