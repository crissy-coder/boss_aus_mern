"use client";

import { useState, useEffect } from "react";
import ThemeToggle from "@/components/ThemeToggle";

export default function FixedThemeToggle() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial check
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed right-4 top-1/2 z-100 -translate-y-1/2 transition-all duration-300 md:right-6 md:top-[27%] md:translate-y-0 ${
        scrolled
          ? "translate-x-0 opacity-100 scale-100"
          : "translate-x-1 opacity-90 scale-95"
      }`}
      aria-hidden
    >
      <ThemeToggle />
    </div>
  );
}
