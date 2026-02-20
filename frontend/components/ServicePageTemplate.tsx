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
  "from-violet-500 to-purple-600",
  "from-sky-500 to-blue-600",
  "from-amber-500 to-orange-600",
  "from-emerald-500 to-teal-600",
  "from-blue-500 to-indigo-600",
  "from-cyan-500 to-blue-600",
  "from-fuchsia-500 to-pink-600",
];

function AccordionComponent({ accordion }: { accordion: AccordionSection }) {
  const [openId, setOpenId] = useState<number | null>(accordion.items[0]?.id || null);

  const toggleItem = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="relative overflow-hidden bg-zinc-950 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      {/* Dot pattern background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-blue-950/30 via-transparent to-purple-950/20" />
      <div className="pointer-events-none absolute -right-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Title */}
        <AnimateOnScroll>
          <h2 className="mb-12 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {accordion.title}{" "}
            {accordion.highlight && (
              <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
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
                <div className="pointer-events-none absolute inset-0 scale-90 rounded-full top-0 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />
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
                    className={`group overflow-hidden rounded-xl border backdrop-blur-md transition-all duration-300 ${
                      isOpen
                        ? "border-blue-500/60 bg-white/10 shadow-lg shadow-blue-500/20"
                        : "border-zinc-700/50 bg-zinc-800/40 hover:border-zinc-600/60 hover:bg-zinc-800/60"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors"
                    >
                      <span
                        className={`text-base font-semibold transition-colors sm:text-lg ${
                          isOpen ? "text-blue-400" : "text-white"
                        }`}
                      >
                        {item.title}
                      </span>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xl font-medium transition-all duration-300 ${
                          isOpen
                            ? "bg-blue-500 text-white"
                            : "bg-zinc-700/60 text-zinc-400 group-hover:bg-blue-500/20 group-hover:text-blue-400"
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
                      <p className="px-6 pb-5 text-sm leading-relaxed text-zinc-300 sm:text-base">
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
  const { hero, intro, sections, accordion, benefits, cta } = config;

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-zinc-950 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-blue-950/40 via-transparent to-purple-950/30" />
        {/* <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" /> */}
        {/* <div className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-3xl" /> */}

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <AnimateOnScroll>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-400">
                  {hero.label}
                </p>
                <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {hero.title}{" "}
                  <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {hero.highlight}
                  </span>
                </h1>
                <p className="mb-8 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                  {hero.description}
                </p>
                <Link
                  href={hero.ctaLink || "/contact"}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:bg-blue-500 hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {hero.ctaText || "Get Started"}
                </Link>
              </AnimateOnScroll>
            </div>

            <AnimateOnScroll delay={100}>
              <div className="relative mx-auto aspect-square w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/30 shadow-2xl lg:mx-0">
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
            <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-blue-950/40 via-transparent to-purple-950/30" />
        {/* <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" /> */}
        {/* <div className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-3xl" /> */}
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50/80 p-6 shadow-sm sm:p-8 lg:p-10">
                {intro.paragraphs.map((text, idx) => (
                  <p
                    key={idx}
                    className={`text-base leading-relaxed text-zinc-600 sm:text-lg ${idx < intro.paragraphs.length - 1 ? "mb-4" : ""}`}
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
            className={`px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 ${isGray ? "bg-zinc-950" : "bg-zinc-950"}`}
          >
            <div className="mx-auto max-w-7xl">
             <AnimateOnScroll>
              <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-blue-950/40 via-transparent to-purple-950/30" />
        {/* <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" /> */}
        {/* <div className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-3xl" /> */}
                <div className="mb-10 lg:mb-14">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
                    {section.label}
                  </p>
                  {/* <h2 className="mb-4 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                    {section.title}
                  </h2> */}
                   <h2 className="mb-6 text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
                   {section.title}{" "}
                   <span className="bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                   {section.highlight}
                   </span>
                   {section.Subtitle}
                    </h2>
                  <p className="max-w-3xl text-base text-zinc-400 sm:text-lg">
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
                      <div className="group relative h-full overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-lg shadow-zinc-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8">
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

                        <h3 className="mb-3 text-lg font-semibold text-zinc-900">
                          {service.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-zinc-600">
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
        <section className="border-t border-zinc-200 bg-zinc-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <AnimateOnScroll>
              <div className="mb-10 text-center lg:mb-14">
                <h2 className="mb-3 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                  {benefits.title}{" "}
                  <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {benefits.highlight}
                  </span>
                </h2>
                <p className="mx-auto max-w-2xl text-base text-zinc-600">
                  {benefits.description}
                </p>
              </div>
            </AnimateOnScroll>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {benefits.items.map((benefit, idx) => (
                <AnimateOnScroll key={benefit.id} delay={60 + idx * 50}>
                  <div className="group flex flex-col items-center rounded-2xl border border-zinc-200/80 bg-white p-6 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="relative mb-4 h-20 w-20 overflow-hidden rounded-full bg-linear-to-br from-blue-50 to-purple-50 p-4 transition-transform duration-300 group-hover:scale-110">
                      <Image
                        src={benefit.icon}
                        alt={benefit.title}
                        fill
                        className="object-contain p-3"
                      />
                    </div>

                    <h3 className="mb-2 text-base font-semibold text-zinc-900">
                      {benefit.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-600">
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
        <section className="relative overflow-hidden bg-zinc-950 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="pointer-events-none absolute -left-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-purple-500/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <AnimateOnScroll>
                <div className="text-center lg:text-left">
                  {cta.label && (
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-400">
                      {cta.label}
                    </p>
                  )}
                  <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                    {cta.title}
                  </h2>
                  <p className="mb-8 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg lg:mx-0">
                    {cta.description}
                  </p>
                  <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                    <Link
                      href={cta.primaryButton.link}
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:bg-blue-500 hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {cta.primaryButton.text}
                    </Link>
                    {cta.secondaryButton && (
                      <Link
                        href={cta.secondaryButton.link}
                        className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800/50 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-zinc-800 hover:border-zinc-600"
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
                      <div className="absolute -inset-4 rounded-full bg-linear-to-br from-blue-500/20 to-purple-500/20 blur-2xl" />
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
