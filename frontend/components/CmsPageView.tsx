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
    return <ServicePageTemplate config={content as ServicePageConfig} />;
  }

  const hero = content.hero as { title?: string; description?: string; image?: string } | undefined;
  const body = content.body as string | undefined;
  const sections = content.sections as Array<{ title?: string; text?: string }> | undefined;

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
  const customFields = Object.entries(content).filter(
    ([key]) =>
      !["hero", "body", "sections", "Heading", "heading", "subheading", "Subheading"].includes(key) &&
      typeof content[key] === "string"
  );
  const hasContent =
    heading ||
    subheading ||
    body ||
    (sections && sections.length > 0) ||
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
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-blue-950/40 via-transparent to-purple-950/30" />
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

      {(body || (sections && sections.length > 0) || customFields.length > 0) && (
        <section className="relative px-4 py-12 sm:px-6 lg:px-8">
          <div className="relative mx-auto max-w-3xl">
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
              <Link href="/admin/pages" className="text-blue-400 hover:underline">
                admin panel
              </Link>{" "}
              and add <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm">Heading</code>,{" "}
              <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm">subheading</code>,{" "}
              <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm">body</code>, or{" "}
              <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm">hero</code> /{" "}
              <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm">sections</code> in the
              content JSON.
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
