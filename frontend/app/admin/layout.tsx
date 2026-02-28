"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

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

  // Redirect to login when not authenticated (must run in effect, not during render)
  useEffect(() => {
    if (auth === false && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
  }, [auth, pathname, router]);

  if (auth === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-theme-section">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
      </div>
    );
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!auth) {
    return null;
  }

  const nav = [
    { label: "Dashboard", href: "/admin" },
    { label: "Pages", href: "/admin/pages" },
    { label: "Media", href: "/admin/media" },
    { label: "Contact", href: "/admin/contact" },
  ];

  const logout = () => {
    fetch("/api/admin/auth", { method: "DELETE" })
      .then(() => {
        setAuth(false);
        router.push("/admin/login");
      })
      .catch(() => {
        setAuth(false);
        router.push("/admin/login");
      });
  };

  return (
    <div className="min-h-screen bg-theme-section">
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-theme bg-theme-card">
        <div className="flex h-16 items-center justify-between gap-2 border-b border-theme px-6">
          <span className="text-lg font-bold text-theme-heading">BOSS CMS</span>
          <ThemeToggle />
        </div>
        <nav className="space-y-1 p-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                pathname === item.href
                  ? "bg-brand text-white"
                  : "text-theme-muted hover:bg-(--page-pattern-color) hover:text-theme-heading"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t border-theme p-4">
          <Link
            href="/"
            target="_blank"
            className="mb-2 block rounded-lg px-4 py-2 text-sm text-theme-muted hover:bg-(--page-pattern-color) hover:text-theme-heading"
          >
            View site →
          </Link>
          <button
            type="button"
            onClick={logout}
            className="w-full rounded-lg px-4 py-2 text-left text-sm text-theme-muted hover:bg-(--page-pattern-color) hover:text-theme-heading"
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
