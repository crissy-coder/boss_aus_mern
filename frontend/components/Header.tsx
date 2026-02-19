"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

const DROPDOWN_ITEMS = {
  "About Us": [
    { label: "Our Story", href: "/about" },
    { label: "Leadership", href: "/about/leadership" },
    { label: "Careers", href: "/careers" },
  ],
  "Our Services": [
    { label: "Consulting", href: "/services/consulting" },
    { label: "Development", href: "/services/development" },
    { label: "Support", href: "/services/support" },
  ],
  Global: [
    { label: "Locations", href: "/global/locations" },
    { label: "Partners", href: "/global/partners" },
  ],
} as const;

const NAV_LINKS = [
  { label: "Home", href: "/", hasDropdown: false },
  { label: "About Us", href: "/about", hasDropdown: true },
  { label: "Our Services", href: "/services", hasDropdown: true },
  { label: "Global", href: "/global", hasDropdown: true },
  { label: "News Building", href: "/news", hasDropdown: false },
  { label: "Contact Us", href: "/contact", hasDropdown: false },
] as const;

function Logo({ light }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`flex flex-col items-center gap-0.5 transition-opacity hover:opacity-90 ${light ? "[&_path]:fill-blue-400 [&_.logo-text]:text-blue-400" : ""}`}
    >
      {/* Stylized BO graphic */}
      <div className="flex items-center">
        <Image
          src="/bosslogo.png"
          alt="Logo"
          width={64}
          height={56} 
        />
      </div>
    </Link>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 1l4 4 4-4" />
    </svg>
  );
}

function SearchIcon({
  className,
  light,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label="Search"
      className={`rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 ${
        light ? "hover:bg-white/10 text-white" : "hover:bg-black/5 text-zinc-600"
      } ${className || ""}`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    </button>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll(); // Run on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [mobileMenuOpen]);

  const headerBg = scrolled
    ? "bg-white/95 backdrop-blur-md shadow-sm"
    : "bg-transparent";
  const light = !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex shrink-0">
          <Logo light={light} />
        </div>

        {/* Desktop Nav */}
        <nav
          className="hidden lg:flex flex-1 items-center justify-center gap-8 xl:gap-12"
          aria-label="Main"
        >
          {NAV_LINKS.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() =>
                link.hasDropdown && setOpenDropdown(link.label)
              }
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={link.href}
                className={`group relative flex items-center gap-1 py-2 text-sm font-medium tracking-wide transition-colors duration-200
                  ${
                    light
                      ? isActive(link.href)
                        ? "text-white"
                        : "text-zinc-300 hover:text-white"
                      : isActive(link.href)
                        ? "text-zinc-900"
                        : "text-zinc-600 hover:text-zinc-900"
                  }`}
              >
                {link.label}
                {/* Active underline */}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 transition-all duration-200 ${
                    light ? "bg-white" : "bg-zinc-900"
                  } ${isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"}`}
                  aria-hidden
                />
                {link.hasDropdown && (
                  <ChevronDown
                    className={`ml-0.5 transition-transform duration-200 ${
                      openDropdown === link.label ? "rotate-180" : ""
                    }`}
                  />
                )}
              </Link>

              {/* Dropdown */}
              {link.hasDropdown && link.label in DROPDOWN_ITEMS && (
                <div
                  className={`absolute left-1/2 top-full -translate-x-1/2 pt-2 transition-all duration-200 ${
                    openDropdown === link.label
                      ? "visible opacity-100 translate-y-0"
                      : "invisible opacity-0 -translate-y-2"
                  }`}
                >
                  <ul
                    className="min-w-[180px] rounded-lg border border-zinc-200 bg-white py-2 shadow-lg"
                    role="menu"
                  >
                    {(
                      DROPDOWN_ITEMS[
                        link.label as keyof typeof DROPDOWN_ITEMS
                      ] || []
                    ).map((item) => (
                      <li key={item.label} role="none">
                        <Link
                          href={item.href}
                          className="block px-4 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
                          role="menuitem"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Search (Desktop) */}
        <div className="hidden lg:flex shrink-0 items-center">
          <SearchIcon light={light} />
        </div>

        {/* Mobile: Hamburger + Search */}
        <div className="flex lg:hidden shrink-0 items-center gap-2">
          <SearchIcon light={light} />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            className={`rounded-lg p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 ${
              light ? "text-white hover:bg-white/10" : "text-zinc-600 hover:bg-zinc-100"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-200"
            >
              {mobileMenuOpen ? (
                <>
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </>
              ) : (
                <>
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${
          mobileMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav
          className="border-t border-zinc-200 bg-white px-4 py-4 shadow-lg"
          aria-label="Mobile"
        >
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-zinc-100 text-zinc-900"
                      : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
                {link.hasDropdown && link.label in DROPDOWN_ITEMS && (
                  <ul className="ml-4 mt-1 space-y-1 border-l-2 border-zinc-200 pl-4">
                    {(
                      DROPDOWN_ITEMS[
                        link.label as keyof typeof DROPDOWN_ITEMS
                      ] || []
                    ).map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          className="block py-2 text-sm text-zinc-500 hover:text-zinc-900"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
