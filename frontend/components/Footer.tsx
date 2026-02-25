import Link from "next/link";
import Image from "next/image";
import CmsPageLinks from "@/components/CmsPageLinks";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Management", href: "/management" },
  { label: "News Building", href: "/news" },
  { label: "Contact Us", href: "/contact" },
];

const OUR_SERVICES = [
  { label: "BPO", href: "/services/bpo" },
  { label: "Construction", href: "/services/construction" },
  { label: "Laundromats", href: "/services/laundromats" },
  // { label: "Container Line", href: "/services/container-line" },
  { label: "Hotel Motel", href: "/services/hotel-motel" },
  // { label: "Real Estate", href: "/services/real-estate" },
];

const GLOBAL = [
  { label: "Boss Aus", href: "/global/boss-aus" },
  { label: "Boss Container Line", href: "/global/boss-container-line" },
  { label: "Cos Moon Bank", href: "/global/cos-moon-bank" },
  { label: "Arkana Motorinn", href: "/global/arkana-motorinn" },
  { label: "Pitts Motorinn", href: "/global/pitts-motorinn" },
  { label: "High Field Motel", href: "/global/high-field-motel" },
];

function FooterLogo() {
  return (
    <Link href="/" className="inline-flex flex-col items-start gap-0.5 transition-opacity hover:opacity-90">
    <Image
      src="/bosslogo.png"
      alt="Logo"
      width={100}
      height={100}
    />
    </Link>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-theme-heading">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm font-semibold text-theme-muted transition-colors hover:text-theme-heading"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-theme bg-theme-section">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-14 lg:px-8 lg:py-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Company */}
          <div className="sm:col-span-2 lg:col-span-1">
            <FooterLogo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-theme-muted">
              Driven and united by the bond of friendship that has stood the test
              of time, we&apos;re not just a business empire; we&apos;re a
              tightly-knit community of change makers.
            </p>
          </div>

          {/* Quick Links */}
          <FooterColumn title="Quick Links" links={QUICK_LINKS} />

          {/* Our Services */}
          <FooterColumn title="Our Services" links={OUR_SERVICES} />

          {/* Global */}
          <FooterColumn title="Global" links={GLOBAL} />

          {/* CMS pages (e.g. testingpage, news) – so users can access newly created pages */}
          <CmsPageLinks />
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-zinc-800 pt-8">
          <p className="text-center text-xs text-theme-muted">
            © {new Date().getFullYear()} BOSS Group. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
