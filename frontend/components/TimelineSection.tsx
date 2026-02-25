"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";

const TIMELINE_ENTRIES = [
  {
    year: "2000",
    title: "The Spark Ignites",
    description:
      "Two visionary minds laid the foundation for BOSS Australia.",
    image:
      "https://dev.mirakitech.com/boss_grp/wp-content/uploads/2026/02/01-2.png",
  },
  {
    year: "2002",
    title: "The First Step in Wollongong",
    description:
      "Opened our first outlet in Wollongong, marking the beginning of our Service Station business.",
    image:
      "https://dev.mirakitech.com/boss_grp/wp-content/uploads/2026/02/grow.png",
  },
  {
    year: "2004",
    title: "Expanding Horizons",
    description: "Expanding Horizons",
    image:
      "https://dev.mirakitech.com/boss_grp/wp-content/uploads/2026/02/2.png",
  },
  {
    year: "2005",
    title: "A New Home",
    description:
      "Established our headquarters in Brisbane, centralizing our operations.",
    image:
      "https://dev.mirakitech.com/boss_grp/wp-content/uploads/2026/02/1.png",
  },
  {
    year: "2009",
    title: "Diversifying Our Offerings",
    description:
      "Launched our first convenience store (Spar), catering to the everyday needs of our customers",
    image:
      "https://dev.mirakitech.com/boss_grp/wp-content/uploads/2026/02/3.png",
  },
  {
    year: "2011",
    title: "A Leap Forward",
    description:
      "Secured three sites and freeholds in a single transaction, showcasing our growth strategy.",
    image:
      "https://dev.mirakitech.com/boss_grp/wp-content/uploads/2026/02/4.png",
  },
  {
    year: "2014",
    title: "Milestone Achieved",
    description:
      "Celebrated reaching over 10 operational sites, a testament to our expanding influence.",
    image:
      "https://dev.mirakitech.com/boss_grp/wp-content/uploads/2026/02/5.png",
  },
  {
    year: "2016",
    title: "New Partnerships",
    description: "A strategic alliance with AMPOL, strengthening our position.",
    image:
      "https://dev.mirakitech.com/boss_grp/wp-content/uploads/2026/02/6.png",
  },
  {
    year: "2017",
    title: "A Greenfield Venture",
    description:
      "Inaugurated our first complete greenfield site in Hattonvale, setting new standards.",
    image:
      "https://dev.mirakitech.com/boss_grp/wp-content/uploads/2026/02/7-scaled.jpg",
  },
  {
    year: "2018",
    title: "Expanding Our Network",
    description:
      "Established a strategic relationship with SHELL, enhancing our fuel offerings.",
    image:
      "https://dev.mirakitech.com/boss_grp/wp-content/uploads/2026/02/10.png",
  },
  {
    year: "2019",
    title: "Widening Our Reach",
    description: "Another greenfield site, Ampol Wacol, come to life.",
    image:
      "https://dev.mirakitech.com/boss_grp/wp-content/uploads/2026/02/0.png",
  },
  {
    year: "2022",
    title: "Building Excellence",
    description:
      "Launched Elite Constructions & Projects, expanding our capabilities in construction.",
    image:
      "https://dev.mirakitech.com/boss_grp/wp-content/uploads/2026/02/11.png",
  },
  {
    year: "2022",
    title: "Medical Expansion",
    description:
      "Acquired Boroondara Medical Centre (BMC), venturing into healthcare.",
    image:
      "https://dev.mirakitech.com/boss_grp/wp-content/uploads/2026/02/12.png",
  },
  {
    year: "2022",
    title: "Hospitality Ventures",
    description: "Acquired our first hotel in Adelaide, diversifying our portfolio.",
    image:
      "https://dev.mirakitech.com/boss_grp/wp-content/uploads/2026/02/13.png",
  },
  {
    year: "2022",
    title: "Tying Up with CALTEX",
    description: "Strengthened our position by partnering with CALTEX.",
    image:
      "https://dev.mirakitech.com/boss_grp/wp-content/uploads/2026/02/14.png",
  },
  {
    year: "2023",
    title: "A Milestone Achieved",
    description:
      "Achieved an impressive fuel volume of 75 million liters per annum, showcasing our operational efficiency.",
    image:
      "https://dev.mirakitech.com/boss_grp/wp-content/uploads/2026/02/15.png",
  },
  {
    year: "2024",
    title: "A New Era Begins",
    description:
      "Our first EV site opens, paving the way for a sustainable future.",
    image:
      "https://dev.mirakitech.com/boss_grp/wp-content/uploads/2026/02/16.png",
  },
];

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export default function TimelineSection() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const total = TIMELINE_ENTRIES.length;

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent((prev) => {
        let next = index;
        if (index < 0) next = total - 1;
        if (index >= total) next = 0;
        return next;
      });
      setTimeout(() => setIsTransitioning(false), 350);
    },
    [total, isTransitioning]
  );

  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);
  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goPrev, goNext]);

  const entry = TIMELINE_ENTRIES[current];

  return (
    <section className="relative overflow-hidden bg-theme-section py-16 sm:py-20 lg:py-24">
      {/* Subtle background so glass panel blur is visible in light mode */}
      <div className="timeline-section-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-center text-2xl font-bold tracking-tight text-theme-heading sm:text-3xl xl:text-5xl lg:mb-14">
          Making History In {" "}
          <span className="bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Our Industry
          </span>
        </h2>

        <div className="glass-panel glass-panel-glass relative overflow-hidden rounded-2xl border shadow-2xl">
          {/* Slide content */}
          <div
            className="animate-timeline-in flex min-h-[420px] flex-col lg:min-h-[380px] lg:flex-row"
            key={current}
          >
            {/* Image - order 1 on mobile, left on desktop */}
            <div className="relative h-56 w-full shrink-0 overflow-hidden lg:h-auto lg:w-1/3">
              <Image
                src={entry.image}
                alt={`${entry.year} - ${entry.title}`}
                fill
                className="object-cover transition-opacity duration-300"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-zinc-950/40 to-transparent lg:from-transparent lg:via-transparent lg:to-transparent" />
            </div>

            {/* Text block */}
            <div className="flex flex-1 flex-col justify-center px-6 py-8 sm:px-8 lg:py-10">
              <div
                className="text-5xl font-black leading-none text-blue-500 sm:text-6xl lg:text-7xl"
                style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
              >
                {entry.year}
              </div>
              <div className="mt-4 lg:mt-6">
                <h3 className="text-xl font-bold text-theme-heading sm:text-2xl">
                  {entry.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-theme-muted sm:text-base">
                  {entry.description}
                </p>
              </div>
            </div>
          </div>

          {/* Arrows - theme-aware glass style */}
          <div className="absolute bottom-6 left-4 flex gap-2 lg:left-6">
            <button
              type="button"
              aria-label="Previous"
              onClick={goPrev}
              disabled={isTransitioning}
              className="timeline-nav-btn flex h-11 w-11 items-center justify-center rounded-xl border shadow-lg transition-all duration-200 disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={goNext}
              disabled={isTransitioning}
              className="timeline-nav-btn flex h-11 w-11 items-center justify-center rounded-xl border shadow-lg transition-all duration-200 disabled:opacity-50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Timeline dots / year strip */}
        <div className="mt-8 sm:mt-10">
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 sm:gap-3 sm:flex-wrap sm:overflow-visible sm:pb-0">
            {TIMELINE_ENTRIES.map((item, index) => {
              const isActive = index === current;
              const year = item.year;
              return (
                <button
                  key={`${year}-${index}`}
                  type="button"
                  onClick={() => goTo(index)}
                  className={`flex h-10 min-w-[2.5rem] items-center justify-center rounded-lg px-3 text-sm font-bold transition-all duration-200 sm:min-w-[3rem] sm:px-4 sm:text-base ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105"
                      : "timeline-pill hover:opacity-90"
                  }`}
                >
                  {year}
                </button>
              );
            })}
          </div>
        </div>

        {/* Progress indicator - theme-aware */}
        <div className="mt-6 flex justify-center">
          <div className="timeline-progress-track h-1 w-48 overflow-hidden rounded-full">
            <div
              className="h-full rounded-full bg-blue-500 transition-all duration-300 ease-out"
              style={{
                width: `${((current + 1) / total) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
