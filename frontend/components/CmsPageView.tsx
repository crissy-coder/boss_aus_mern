"use client";

import Link from "next/link";
import Image from "next/image";
import ServicePageTemplate, {
  ServicePageConfig,
} from "@/components/ServicePageTemplate";

type PageContent = {
  slug: string;
  title: string;
  type: string;
  updatedAt: string;
  content: Record<string, unknown>;
};

function isServiceConfig(content: Record<string, unknown>): content is ServicePageConfig {
  return (
    typeof content === "object" &&
    content !== null &&
    "hero" in content &&
    typeof (content as { hero?: unknown }).hero === "object"
  );
}

export default function CmsPageView({ page }: { page: PageContent }) {
  const { content, type } = page;

  if (type === "service" && isServiceConfig(content as ServicePageConfig)) {
    const raw = content as Record<string, unknown>;
    const heroRaw = (raw.hero as Record<string, unknown> | null) ?? {};
    const serviceConfig: ServicePageConfig = {
      hero: {
        label: (heroRaw.label as string) ?? "",
        title: (heroRaw.title as string) ?? (raw.Heading as string) ?? page.title,
        highlight: (heroRaw.highlight as string) ?? "",
        description: (heroRaw.description as string) ?? (raw.subheading as string) ?? "",
        image: (heroRaw.image as string) ?? "",
        ctaText: heroRaw.ctaText as string | undefined,
        ctaLink: heroRaw.ctaLink as string | undefined,
      },
      intro: raw.intro as ServicePageConfig["intro"],
      sections: Array.isArray(raw.sections) ? (raw.sections as ServicePageConfig["sections"]) : [],
      accordion: raw.accordion as ServicePageConfig["accordion"],
      benefits: raw.benefits as ServicePageConfig["benefits"],
      cta: raw.cta as ServicePageConfig["cta"],
    };
    return <ServicePageTemplate config={serviceConfig} />;
  }

  const hero = content.hero as { title?: string; description?: string; image?: string } | undefined;
  const body = content.body as string | undefined;
  const sections = content.sections as Array<{ title?: string; text?: string }> | undefined;

  /** Row/column layouts: rows[].layout = "6-6" | "8-4" | "4-4-4" | "12" etc (spans out of 12), rows[].cells = [{ title?, text?, image? }, ...] */
  const rows = content.rows as Array<{
    layout?: string;
    cells?: Array<{ title?: string; text?: string; image?: string }>;
  }> | undefined;
  const layoutRows = Array.isArray(rows)
    ? rows.filter((r) => r && Array.isArray(r.cells) && r.cells.length > 0)
    : [];

  // Parse "6-6" or "8-4" -> [6, 6] or [8, 4]; must sum to 12
  function parseLayout(layout: string | undefined): number[] {
    if (!layout || typeof layout !== "string") return [12];
    const parts = layout.trim().split(/[-,\s]+/).map((s) => parseInt(s, 10)).filter((n) => !Number.isNaN(n) && n > 0);
    if (parts.length === 0) return [12];
    const sum = parts.reduce((a, b) => a + b, 0);
    if (sum !== 12) return [12];
    return parts;
  }

  // Support common custom keys: Heading, heading, subheading, Subheading
  const heading =
    hero?.title ??
    (content.Heading as string | undefined) ??
    (content.heading as string | undefined);
  const subheading =
    hero?.description ??
    (content.subheading as string | undefined) ??
    (content.Subheading as string | undefined);

  // Any other top-level string fields (for simple custom content)
  const reservedKeys = ["hero", "body", "sections", "rows", "Heading", "heading", "subheading", "Subheading"];
  const customFields = Object.entries(content).filter(
    ([key]) => !reservedKeys.includes(key) && typeof content[key] === "string"
  );
  const hasContent =
    heading ||
    subheading ||
    body ||
    (sections && sections.length > 0) ||
    layoutRows.length > 0 ||
    customFields.length > 0 ||
    hero?.image;

  return (
    <div className="min-h-screen bg-zinc-950">
      <div
        className="pointer-events-none fixed inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <section className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-brand-dark/40 via-transparent to-brand-dark/30" />
        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {heading ?? page.title}
          </h1>
          {subheading && (
            <p className="mx-auto max-w-2xl text-lg text-zinc-400">
              {String(subheading)}
            </p>
          )}
          {hero?.image && (
            <div className="relative mx-auto mt-10 aspect-video w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-800">
              <Image
                src={String(hero.image)}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>
          )}
        </div>
      </section>

      {(body || (sections && sections.length > 0) || layoutRows.length > 0 || customFields.length > 0) && (
        <section className="relative px-4 py-12 sm:px-6 lg:px-8">
          <div className="relative mx-auto max-w-6xl">
            {body && (
              <div className="prose prose-invert max-w-none rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-6 sm:p-8">
                <p className="whitespace-pre-wrap text-zinc-300">{String(body)}</p>
              </div>
            )}
            {sections && sections.length > 0 && (
              <div className="mt-10 space-y-8">
                {sections.map((sec, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-6 sm:p-8"
                  >
                    {sec.title && (
                      <h2 className="mb-3 text-xl font-semibold text-white">
                        {String(sec.title)}
                      </h2>
                    )}
                    {sec.text && (
                      <p className="whitespace-pre-wrap text-zinc-400">
                        {String(sec.text)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Row/column layouts: layout "6-6", "8-4", "4-4-4" etc (spans out of 12) */}
            {layoutRows.length > 0 && (
              <div className="mt-10 space-y-8">
                {layoutRows.map((row, rowIdx) => {
                  const spans = parseLayout(row.layout);
                  const cells = row.cells ?? [];
                  return (
                    <div
                      key={rowIdx}
                      className="grid grid-cols-12 gap-4 sm:gap-6"
                    >
                      {cells.slice(0, spans.length).map((cell, cellIdx) => {
                        const span = Math.min(spans[cellIdx] ?? 12, 12);
                        const spanClassMap: Record<number, string> = {
                          1: "col-span-12 sm:col-span-1",
                          2: "col-span-12 sm:col-span-2",
                          3: "col-span-12 sm:col-span-3",
                          4: "col-span-12 sm:col-span-4",
                          5: "col-span-12 sm:col-span-5",
                          6: "col-span-12 sm:col-span-6",
                          7: "col-span-12 sm:col-span-7",
                          8: "col-span-12 sm:col-span-8",
                          9: "col-span-12 sm:col-span-9",
                          10: "col-span-12 sm:col-span-10",
                          11: "col-span-12 sm:col-span-11",
                          12: "col-span-12",
                        };
                        const spanClass = spanClassMap[span] ?? "col-span-12";
                        return (
                        <div
                          key={cellIdx}
                          className={`min-w-0 rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-6 sm:p-8 ${spanClass}`}
                        >
                          <div>
                            {cell.image && (
                              <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-xl border border-zinc-800">
                                <Image
                                  src={String(cell.image)}
                                  alt=""
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 640px) 100vw, 50vw"
                                />
                              </div>
                            )}
                            {cell.title && (
                              <h2 className="mb-2 text-xl font-semibold text-white">
                                {String(cell.title)}
                              </h2>
                            )}
                            {cell.text && (
                              <p className="whitespace-pre-wrap text-zinc-400">
                                {String(cell.text)}
                              </p>
                            )}
                          </div>
                        </div>
                      ); })}
                    </div>
                  );
                })}
              </div>
            )}

            {customFields.length > 0 && (
              <div className="mt-10 space-y-4">
                {customFields.map(([key, value]) => (
                  <div
                    key={key}
                    className="rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-6 sm:p-8"
                  >
                    <h2 className="mb-2 text-lg font-semibold capitalize text-white">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </h2>
                    <p className="whitespace-pre-wrap text-zinc-400">{String(value)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {!hasContent && (
        <section className="relative px-4 py-12">
          <div className="relative mx-auto max-w-2xl rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-8 text-center">
            <p className="text-zinc-400">
              This page has no content yet. Edit it in the{" "}
              <Link href="/admin/pages" className="text-brand-light hover:underline">
                admin panel
              </Link>{" "}
              and add <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm">Heading</code>,{" "}
              <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm">body</code>,{" "}
              <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm">sections</code>, or{" "}
              <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm">rows</code> (row/column layouts like 6-6, 8-4) in the content JSON.
            </p>
          </div>
        </section>
      )}

      <section className="border-t border-zinc-800/50 px-4 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800/50 px-6 py-3 text-white hover:bg-zinc-800"
          >
            ← Back to home
          </Link>
        </div>
      </section>
    </div>
  );
}
