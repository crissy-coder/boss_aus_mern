"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTheme } from "@/components/ThemeProvider";

type DropdownChild = {
  label: string;
  href: string;
};

type DropdownItem = {
  label: string;
  href?: string;
  children?: DropdownChild[];
};

const DROPDOWN_ITEMS: Record<string, DropdownItem[]> = {
  "About Us": [
    { label: "About Us", href: "/about" },
    { label: "Team", href: "/team" },
  ],
  "Our Services": [
    { label: "BPO", href: "/services/bpo" },
    { label: "Construction", href: "/services/construction" },
    { label: "Laundromats", href: "/services/laundromats" },
    { label: "Hotel Motel", href: "/services/hotel-motel" },
  ],
  Global: [
    { label: "Boss Aus", href: "https://bossusa.com/" },
    { label: "Boss Container", href: "https://bosscontainerline.com/" },
    {
      label: "Hotel",
      children: [
        { label: "Cos Moon Bank", href: "https://eminenceonbank.com.au/" },
        { label: "Arkana Motorinn", href: "https://arkanamotorinn.com.au/" },
        { label: "Pitts Motorinn", href: "https://www.pittsworthmotorinn.com/" },
        { label: "High Field Motel", href: "https://highfieldsmotel.com.au/" },
      ],
    },
  ],
};

const NAV_LINKS = [
  { label: "Home", href: "/", hasDropdown: false },
  { label: "About Us", href: "/about", hasDropdown: true },
  { label: "Our Services", href: "/services", hasDropdown: true },
  { label: "Global", href: "/global", hasDropdown: true },
  // { label: "News Building", href: "#", hasDropdown: false },
  { label: "Contact Us", href: "/contact", hasDropdown: false },
] as const;

type CmsPageMeta = { slug: string; title: string; menuPlacement?: string | null };

function Logo({ light }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`flex flex-col items-center gap-0.5 transition-opacity hover:opacity-90 ${light ? "[&_path]:fill-brand [&_.logo-text]:text-brand" : ""}`}
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
  darkBackground,
  onClick,
}: {
  className?: string;
  darkBackground?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label="Search"
      onClick={onClick}
      className={`rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 ${
        darkBackground ? "hover:bg-white/10 text-white" : "hover:bg-black/5 text-zinc-600"
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

const SEARCH_LINKS = [
  { label: "BPO Services", href: "/services/bpo" },
  { label: "Construction", href: "/services/construction" },
  { label: "Hotel & Motel", href: "/services/hotel-motel" },
  { label: "Laundromats", href: "/services/laundromats" },
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/team" },
  { label: "Contact Us", href: "/contact" },
];

function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredLinks = query
    ? SEARCH_LINKS.filter((link) =>
        link.label.toLowerCase().includes(query.toLowerCase())
      )
    : SEARCH_LINKS;

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-start justify-center pt-20 sm:pt-32">
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-4 animate-fade-up">
        <div className="overflow-hidden rounded-2xl border border-zinc-800/60 bg-theme-card shadow-2xl backdrop-blur-md">
          {/* Search Input */}
          <div className="flex items-center gap-4 border-b border-zinc-800/60 px-5 py-4">
            <svg
              className="h-5 w-5 shrink-0 text-theme-heading"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pages, services..."
              className="flex-1 bg-transparent text-white placeholder-zinc-500 outline-none"
            />
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-theme-heading px-2 py-1 text-xs font-medium text-zinc-400 transition-colors hover:bg-zinc-700/60 hover:text-white"
            >
              ESC
            </button>
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto p-2">
            {filteredLinks.length > 0 ? (
              <>
                <p className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-theme-heading">
                  {query ? "Results" : "Quick Links"}
                </p>
                <ul>
                  {filteredLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-zinc-300 transition-colors hover:bg-zinc-800/60 hover:text-white"
                      >
                        <svg
                          className="h-4 w-4 text-zinc-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="px-3 py-8 text-center text-sm text-zinc-500">
                No results found for &quot;{query}&quot;
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-zinc-800/60 px-5 py-3">
            <p className="text-xs text-zinc-500">
              Press <span className="rounded bg-zinc-800 px-1.5 py-0.5 font-medium text-zinc-400">Enter</span> to search or <span className="rounded bg-zinc-800 px-1.5 py-0.5 font-medium text-zinc-400">ESC</span> to close
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [mobileExpandedItems, setMobileExpandedItems] = useState<string[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme } = useTheme();
  const [cmsPages, setCmsPages] = useState<CmsPageMeta[]>([]);

  useEffect(() => {
    fetch("/api/cms/pages")
      .then((r) => r.json())
      .then((list: CmsPageMeta[]) => setCmsPages(list || []))
      .catch(() => setCmsPages([]));
  }, []);

  const cmsMain = cmsPages.filter((p) => p.menuPlacement === "main");
  const cmsServices = cmsPages.filter((p) => p.menuPlacement === "services");
  const cmsGlobal = cmsPages.filter((p) => p.menuPlacement === "global");
  const mergedDropdowns: Record<string, DropdownItem[]> = {
    "About Us": DROPDOWN_ITEMS["About Us"] || [],
    "Our Services": [
      ...(DROPDOWN_ITEMS["Our Services"] || []),
      ...cmsServices.map((p) => ({ label: p.title, href: `/${p.slug}` })),
    ],
    Global: [
      ...(DROPDOWN_ITEMS["Global"] || []),
      ...cmsGlobal.map((p) => ({ label: p.title, href: `/${p.slug}` })),
    ],
  };
  const navLinksWithCms: Array<{ label: string; href: string; hasDropdown: boolean }> = [
    ...NAV_LINKS,
    ...cmsMain.map((p) => ({ label: p.title, href: `/${p.slug}`, hasDropdown: false })),
  ];

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
    ? theme === "light"
      ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-zinc-200/80"
      : "bg-zinc-900/95 backdrop-blur-md shadow-sm border-b border-zinc-800/80"
    : "bg-transparent";
  const overDarkBackground = !scrolled && theme === "dark";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo - light accent when over dark hero (dark theme + not scrolled) */}
        <div className="flex shrink-0">
          <Logo light={overDarkBackground} />
        </div>

        {/* Desktop Nav */}
        <nav
          className="hidden lg:flex flex-1 items-center justify-center gap-8 xl:gap-12"
          aria-label="Main"
        >
          {navLinksWithCms.map((link) => (
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
                    theme === "dark"
                      ? isActive(link.href)
                        ? "text-white"
                        : scrolled
                          ? "text-zinc-400 hover:text-white"
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
                    theme === "dark" ? "bg-white" : "bg-zinc-900"
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
              {link.hasDropdown && link.label in mergedDropdowns && (
                <div
                  className={`absolute left-1/2 top-full -translate-x-1/2 pt-2 transition-all duration-200 ${
                    openDropdown === link.label
                      ? "visible opacity-100 translate-y-0"
                      : "invisible opacity-0 -translate-y-2"
                  }`}
                >
                  <ul
                    className="min-w-[200px] rounded-lg border border-theme bg-theme-card py-2 shadow-lg"
                    role="menu"
                  >
                    {(mergedDropdowns[link.label] || []).map((item) => (
                      <li
                        key={item.label}
                        role="none"
                        className="relative"
                        onMouseEnter={() =>
                          item.children && setOpenSubmenu(item.label)
                        }
                        onMouseLeave={() => setOpenSubmenu(null)}
                      >
                        {item.children ? (
                          <>
                            <button
                              type="button"
                              className="flex w-full items-center justify-between px-4 py-2 text-sm text-theme-muted transition-colors hover:bg-(--page-pattern-color) hover:text-theme-heading"
                            >
                              {item.label}
                              <ChevronDown className="-rotate-90 ml-2" />
                            </button>
                            {/* Nested submenu */}
                            <div
                              className={`absolute left-full top-0 pl-1 transition-all duration-200 ${
                                openSubmenu === item.label
                                  ? "visible opacity-100 translate-x-0"
                                  : "invisible opacity-0 -translate-x-2"
                              }`}
                            >
                              <ul className="min-w-[180px] rounded-lg border border-theme bg-theme-card py-2 shadow-lg">
                                {item.children.map((child) => (
                                  <li key={child.label} role="none">
                                    <Link
                                      href={child.href}
                                      className="block px-4 py-2 text-sm text-theme-muted transition-colors hover:bg-(--page-pattern-color) hover:text-theme-heading"
                                      role="menuitem"
                                      onClick={() => {
                                        setOpenDropdown(null);
                                        setOpenSubmenu(null);
                                      }}
                                      target={
                                        child.href.startsWith("http")
                                          ? "_blank"
                                          : undefined
                                      }
                                    >
                                      {child.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </>
                        ) : (
                          <Link
                            href={item.href || "#"}
                            className="block px-4 py-2 text-sm text-theme-muted transition-colors hover:bg-(--page-pattern-color) hover:text-theme-heading"
                            role="menuitem"
                            onClick={() => setOpenDropdown(null)}
                            target={
                              item.href?.startsWith("http") ? "_blank" : undefined
                            }
                          >
                            {item.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Options: Search (Desktop) - theme toggle fixed on right */}
        <div className="hidden lg:flex shrink-0 items-center gap-1">
          <SearchIcon darkBackground={theme === "dark"} onClick={() => setSearchOpen(true)} />
        </div>

        {/* Mobile: Search + Hamburger - theme toggle fixed on right */}
        <div className="flex lg:hidden shrink-0 items-center gap-2">
          <SearchIcon darkBackground={theme === "dark"} onClick={() => setSearchOpen(true)} />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            className={`rounded-lg p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 ${
              theme === "dark"
                ? "text-white hover:bg-white/10"
                : "text-zinc-600 hover:bg-zinc-100"
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
          className="border-t border-theme bg-theme-card px-4 py-4 shadow-lg"
          aria-label="Mobile"
        >
          <ul className="space-y-1">
            {navLinksWithCms.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-(--page-pattern-color) text-theme-heading"
                      : "text-theme-muted hover:bg-(--page-pattern-color) hover:text-theme-heading"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
                {link.hasDropdown && link.label in mergedDropdowns && (
                  <ul className="ml-4 mt-1 space-y-1 border-l-2 border-theme pl-4">
                    {(mergedDropdowns[link.label] || []).map((item) => (
                      <li key={item.label}>
                        {item.children ? (
                          <>
                            <button
                              type="button"
                              onClick={() =>
                                setMobileExpandedItems((prev) =>
                                  prev.includes(item.label)
                                    ? prev.filter((i) => i !== item.label)
                                    : [...prev, item.label]
                                )
                              }
                              className="flex w-full items-center justify-between py-2 text-sm text-theme-muted hover:text-theme-heading"
                            >
                              {item.label}
                              <ChevronDown
                                className={`transition-transform duration-200 ${
                                  mobileExpandedItems.includes(item.label)
                                    ? "rotate-180"
                                    : ""
                                }`}
                              />
                            </button>
                            {mobileExpandedItems.includes(item.label) && (
                              <ul className="ml-4 space-y-1 border-l-2 border-theme pl-4">
                                {item.children.map((child) => (
                                  <li key={child.label}>
                                    <Link
                                      href={child.href}
                                      className="block py-2 text-sm text-theme-muted hover:text-theme-heading"
                                      onClick={() => setMobileMenuOpen(false)}
                                      target={
                                        child.href.startsWith("http")
                                          ? "_blank"
                                          : undefined
                                      }
                                    >
                                      {child.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </>
                        ) : (
                          <Link
                            href={item.href || "#"}
                            className="block py-2 text-sm text-theme-muted hover:text-theme-heading"
                            onClick={() => setMobileMenuOpen(false)}
                            target={
                              item.href?.startsWith("http") ? "_blank" : undefined
                            }
                          >
                            {item.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
