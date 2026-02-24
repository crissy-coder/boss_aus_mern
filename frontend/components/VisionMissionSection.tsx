"use client";

import AnimateOnScroll from "./AnimateOnScroll";

const PILLARS = [
  {
    id: 1,
    title: "Our Vision",
    description:
      "To build a diversified, trusted organization delivering sustainable growth across education, healthcare, energy, transport, hospitality, and community services through innovation, integrity, leadership, and societal impact.",
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Our Mission",
    description:
      "To provide high-quality, people-focused services by combining expertise, ethical practices, and operational excellence, creating value for customers, partners, employees, and communities we serve globally responsibly.",
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Our Process",
    description:
      "Our process integrates strategic planning, cross-sector collaboration, technology adoption, continuous improvement, and accountability to ensure efficient execution, measurable outcomes, customer satisfaction, and long-term organizational resilience.",
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    ),
  },
];

export default function VisionMissionSection() {
  return (
    <section className="relative overflow-hidden bg-theme-section px-4 py-16 sm:px-6 sm:py-10 lg:px-8 lg:pb-24">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header: two columns */}
        <div className="mb-12 grid gap-8 lg:mb-16 lg:grid-cols-2 lg:gap-12">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-theme-heading sm:text-4xl lg:text-[2.75rem]">
              An Award Winning Sector{" "}
              <span className="bg-linear-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                Beyond Vision
              </span>
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll delay={60}>
            <p className="text-base leading-relaxed text-theme-muted lg:text-lg">
              A unified organization driven by clear vision, purposeful mission,
              and structured processes to deliver sustainable, high-quality
              services across diverse sectors efficiently.
            </p>
          </AnimateOnScroll>
        </div>

        {/* Pillars grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {PILLARS.map((pillar, idx) => (
            <AnimateOnScroll key={pillar.id} delay={80 + idx * 60}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-zinc-100/20 bg-theme-card p-6 shadow-lg shadow-zinc-200/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-200/20 hover:shadow-xl hover:shadow-blue-100/10 sm:p-8">
                {/* Hover gradient overlay */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-blue-50/0 via-blue-50/0 to-blue-100/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Icon */}
                <div className="relative mb-5 inline-flex items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-blue-600 p-3 text-white shadow-md shadow-blue-500/30 transition-transform duration-300 group-hover:scale-105">
                  {pillar.icon}
                </div>

                {/* Title */}
                <h3 className="relative mb-3 text-xl font-semibold text-theme-heading transition-colors duration-300 group-hover:text-blue-600">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="relative text-sm leading-relaxed text-theme-muted sm:text-base">
                  {pillar.description}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 rounded-b-2xl bg-linear-to-r from-blue-500 to-blue-400 transition-all duration-500 group-hover:w-full" />
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
