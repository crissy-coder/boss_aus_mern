"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AnimateOnScroll from "./AnimateOnScroll";

export type ServiceItem = {
  id: number;
  title: string;
  description: string;
  icon: string;
  color?: string;
};

export type ServiceSection = {
  label: string;
  title: string;
  description: string;
  highlight?: string;
  Subtitle?: string;
  services: ServiceItem[];
  columns?: 2 | 3 | 4;
  background?: "white" | "gray";
};

export type Benefit = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

export type AccordionItem = {
  id: number;
  title: string;
  description: string;
};

export type AccordionSection = {
  title: string;
  highlight?: string;
  image: string;
  items: AccordionItem[];
  background?: "white" | "gray" | "dark";
};

export type ServicePageConfig = {
  hero: {
    label: string;
    title: string;
    highlight: string;
    description: string;
    image: string;
    ctaText?: string;
    ctaLink?: string;
  };
  intro?: {
    paragraphs: string[];
  };
  sections: ServiceSection[];
  accordion?: AccordionSection;
  benefits?: {
    title: string;
    highlight: string;
    description: string;
    items: Benefit[];
  };
  cta?: {
    label?: string;
    title: string;
    description: string;
    primaryButton: { text: string; link: string };
    secondaryButton?: { text: string; link: string };
    image?: string;
  };
};

const GRADIENT_COLORS = [
  "from-rose-500 to-pink-600",
  "from-brand to-brand-dark",
  "from-brand-light to-brand",
  "from-amber-500 to-orange-600",
  "from-emerald-500 to-teal-600",
  "from-brand-dark to-brand",
  "from-brand to-brand-light",
  "from-fuchsia-500 to-pink-600",
];

function AccordionComponent({ accordion }: { accordion: AccordionSection }) {
  const [openId, setOpenId] = useState<number | null>(accordion.items[0]?.id || null);

  const toggleItem = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="relative overflow-hidden bg-theme-muted px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      {/* Dot pattern background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 bg-theme-muted"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--page-pattern-color) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-brand-dark/30" />
      <div className="pointer-events-none absolute -right-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-brand/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[400px] w-[400px] rounded-full bg-brand/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl bg-theme-muted">
        {/* Title */}
        <AnimateOnScroll>
          <h2 className="mb-12 text-3xl font-bold tracking-tight text-theme-heading sm:text-4xl lg:text-5xl">
            {accordion.title}{" "}
            {accordion.highlight && (
              <span className="bg-linear-to-r from-brand-light to-brand bg-clip-text text-transparent">
                {accordion.highlight}
              </span>
            )}
          </h2>
        </AnimateOnScroll>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Image */}
          <AnimateOnScroll>
            <div className="relative flex justify-center lg:justify-start">
              <div className="relative h-[350px] w-[350px] sm:h-[450px] sm:w-[450px] lg:h-[500px] lg:w-[500px]">
                {/* Glow background */}
                {/* pointer-events-none absolute inset-0 bg-linear-to-br from-blue-950/40 via-transparent to-purple-950/30 */}
                <div className="pointer-events-none absolute inset-0 scale-90 rounded-full top-0 h-[500px] w-[500px] rounded-full bg-brand/10 blur-3xl" />
                <Image
                  src={accordion.image}
                  alt="Feature illustration"
                  fill
                  className="object-contain drop-shadow-2xl"
                  sizes="(max-width: 640px) 420px, 500px"
                />
              </div>
            </div>
          </AnimateOnScroll>

          {/* Right: Accordion items */}
          <div className="space-y-4">
            {accordion.items.map((item, idx) => {
              const isOpen = openId === item.id;

              return (
                <AnimateOnScroll key={item.id} delay={60 + idx * 40}>
                  <div
                    className={`group overflow-hidden rounded-xl border border-theme transition-all duration-300 ${
                      isOpen
                        ? "border-brand/60 bg-theme-card/80 shadow-lg shadow-brand/20"
                        : "bg-theme-card/50 hover:border-brand/30 hover:bg-theme-card/80"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors"
                    >
                      <span
                        className={`text-base font-semibold transition-colors sm:text-lg ${
                          isOpen ? "text-brand-light" : "text-theme-heading"
                        }`}
                      >
                        {item.title}
                      </span>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xl font-medium transition-all duration-300 ${
                          isOpen
                            ? "bg-brand text-white"
                            : "bg-(--page-pattern-color) text-theme-muted group-hover:bg-brand/20 group-hover:text-brand-light"
                        }`}
                      >
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-out ${
                        isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-theme-muted sm:text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ServicePageTemplate({
  config,
}: {
  config: ServicePageConfig;
}) {
  const { hero, intro, sections = [], accordion, benefits, cta } = config;

  return (
    <div className="min-h-screen bg-theme-section">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-theme-section px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br" />
        {/* <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-brand/10 blur-3xl" /> */}
        {/* <div className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-brand/10 blur-3xl" /> */}

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <AnimateOnScroll>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-light">
                  {hero.label}
                </p>
                <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-theme-heading sm:text-4xl lg:text-5xl">
                  {hero.title}{" "}
                  <span className="bg-linear-to-r from-brand-light to-brand bg-clip-text text-transparent">
                    {hero.highlight}
                  </span>
                </h1>
                <p className="mb-8 max-w-xl text-base leading-relaxed text-theme-muted sm:text-lg">
                  {hero.description}
                </p>
                <Link
                  href={hero.ctaLink || "/contact"}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand/25 transition-all duration-300 hover:bg-brand-light hover:shadow-brand/30 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {hero.ctaText || "Get Started"}
                </Link>
              </AnimateOnScroll>
            </div>

            <AnimateOnScroll delay={100}>
              <div className="relative mx-auto aspect-square w-full max-w-lg overflow-hidden rounded-2xl border border-theme bg-theme-card/30 shadow-2xl lg:mx-0">
                <Image
                  src={hero.image}
                  alt={hero.title}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      {intro && intro.paragraphs.length > 0 && (
        <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          
          <div className="mx-auto max-w-4xl">
            
            <AnimateOnScroll>
            <div className="pointer-events-none absolute inset-0 bg-linear-to-br" />
        {/* <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-brand/10 blur-3xl" /> */}
        {/* <div className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-brand/10 blur-3xl" /> */}
              <div className="rounded-2xl border border-theme bg-theme-card/80 p-6 shadow-sm sm:p-8 lg:p-10">
                {intro.paragraphs.map((text, idx) => (
                  <p
                    key={idx}
                    className={`text-base leading-relaxed text-theme-muted sm:text-lg ${idx < intro.paragraphs.length - 1 ? "mb-4" : ""}`}
                  >
                    {text}
                  </p>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      )}

      {/* Dynamic Sections */}
      {sections.map((section, sectionIdx) => {
        const isGray = section.background === "gray" || sectionIdx % 2 === 0;
        const cols = section.columns || 3;

        return (
          <section
            key={sectionIdx}
            className={`px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 bg-theme-section`}
          >
            <div className="mx-auto max-w-7xl">
             <AnimateOnScroll>
              <div className="pointer-events-none absolute inset-0 bg-linear-to-br" />
        {/* <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-brand/10 blur-3xl" /> */}
        {/* <div className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-brand/10 blur-3xl" /> */}
                <div className="mb-10 lg:mb-14">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand">
                    {section.label}
                  </p>
                  {/* <h2 className="mb-4 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                    {section.title}
                  </h2> */}
                   <h2 className="mb-6 text-2xl font-bold leading-tight tracking-tight text-theme-heading sm:text-3xl lg:text-4xl">
                   {section.title}{" "}
                   <span className="bg-linear-to-r from-brand-light to-brand bg-clip-text text-transparent">
                   {section.highlight}
                   </span>
                   {section.Subtitle}
                    </h2>
                  <p className="max-w-3xl text-base text-theme-muted sm:text-lg">
                    {section.description}
                  </p>
                </div>
              </AnimateOnScroll>

              <div
                className={`grid gap-6 sm:grid-cols-2 lg:gap-8 ${
                  cols === 2
                    ? "lg:grid-cols-2"
                    : cols === 4
                      ? "lg:grid-cols-4"
                      : "lg:grid-cols-3"
                }`}
              >
                {section.services.map((service, idx) => {
                  const color =
                    service.color || GRADIENT_COLORS[idx % GRADIENT_COLORS.length];

                  return (
                    <AnimateOnScroll key={service.id} delay={60 + idx * 40}>
                      <div className="group relative h-full overflow-hidden rounded-2xl border border-theme bg-theme-card p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8">
                        <div
                          className={`absolute left-0 top-0 h-1 w-full bg-linear-to-r ${color}`}
                        />

                        <div
                          className={`relative mb-5 h-14 w-14 overflow-hidden rounded-xl bg-linear-to-br ${color} p-3 shadow-md`}
                        >
                          <Image
                            src={service.icon}
                            alt={service.title}
                            fill
                            className="object-contain p-2"
                          />
                        </div>

                        <h3 className="mb-3 text-lg font-semibold text-theme-heading">
                          {service.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-theme-muted">
                          {service.description}
                        </p>
                      </div>
                    </AnimateOnScroll>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* Accordion Section */}
      {accordion && <AccordionComponent accordion={accordion} />}

      {/* Benefits Section */}
      {benefits && (
        <section className="border-t border-theme bg-theme-section px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <AnimateOnScroll>
              <div className="mb-10 text-center lg:mb-14">
                <h2 className="mb-3 text-2xl font-bold tracking-tight text-theme-heading sm:text-3xl">
                  {benefits.title}{" "}
                  <span className="bg-linear-to-r from-brand to-brand-dark bg-clip-text text-transparent">
                    {benefits.highlight}
                  </span>
                </h2>
                <p className="mx-auto max-w-2xl text-base text-theme-muted">
                  {benefits.description}
                </p>
              </div>
            </AnimateOnScroll>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {benefits.items.map((benefit, idx) => (
                <AnimateOnScroll key={benefit.id} delay={60 + idx * 50}>
                  <div className="group flex flex-col items-center rounded-2xl border border-theme bg-theme-card p-6 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="relative mb-4 h-20 w-20 overflow-hidden rounded-full bg-linear-to-br from-brand/10 to-brand/5 p-4 transition-transform duration-300 group-hover:scale-110">
                      <Image
                        src={benefit.icon}
                        alt={benefit.title}
                        fill
                        className="object-contain p-3"
                      />
                    </div>

                    <h3 className="mb-2 text-base font-semibold text-theme-heading">
                      {benefit.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-theme-muted">
                      {benefit.description}
                    </p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {cta && (
        <section className="relative overflow-hidden bg-theme-section px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="pointer-events-none absolute -left-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-brand/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-brand/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <AnimateOnScroll>
                <div className="text-center lg:text-left">
                  {cta.label && (
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-light">
                      {cta.label}
                    </p>
                  )}
                  <h2 className="mb-4 text-2xl font-bold text-theme-heading sm:text-3xl lg:text-4xl">
                    {cta.title}
                  </h2>
                  <p className="mb-8 max-w-xl text-base leading-relaxed text-theme-muted sm:text-lg lg:mx-0">
                    {cta.description}
                  </p>
                  <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                    <Link
                      href={cta.primaryButton.link}
                      className="inline-flex items-center gap-2 rounded-xl bg-(--accent) px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand/25 transition-all duration-300 hover:bg-(--accent-hover) hover:shadow-brand/30 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {cta.primaryButton.text}
                    </Link>
                    {cta.secondaryButton && (
                      <Link
                        href={cta.secondaryButton.link}
                        className="inline-flex items-center gap-2 rounded-xl border border-theme bg-theme-card/50 px-8 py-4 text-base font-semibold text-theme-heading transition-all duration-300 hover:bg-theme-card hover:border-theme"
                      >
                        {cta.secondaryButton.text}
                      </Link>
                    )}
                  </div>
                </div>
              </AnimateOnScroll>

              {cta.image && (
                <AnimateOnScroll delay={80}>
                  <div className="flex justify-center lg:justify-end">
                    <div className="relative">
                      <div className="absolute -inset-4 rounded-full bg-linear-to-br from-brand/20 to-brand/15 blur-2xl" />
                      <img
                        src={cta.image}
                        alt="CTA Illustration"
                        className="relative w-[280px] object-contain drop-shadow-2xl sm:w-[320px] lg:w-[360px]"
                      />
                    </div>
                  </div>
                </AnimateOnScroll>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
