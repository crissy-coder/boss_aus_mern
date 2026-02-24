"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-theme-section px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      {/* Subtle gradient overlay - theme-aware */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--section-bg)] via-transparent to-blue-950/20 pointer-events-none opacity-80" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/10 to-transparent pointer-events-none" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
        {/* Left Column - Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="mb-6 animate-fade-up text-3xl font-bold leading-tight tracking-tight text-theme-heading sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-5xl">
            Beyond Business, We&apos;re a{" "}
            <span className="block text-theme-heading">People-Powered</span>
            <span className="block text-theme-heading">Revolution for a Better</span>
            <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
              Tomorrow!
            </span>
          </h1>
          <p className="mb-8 max-w-xl text-base leading-relaxed text-theme-muted sm:text-lg lg:mx-0">
            Empowering individuals to create meaningful change through collective
            action. Together, we drive progress for a better tomorrow.
          </p>
          <div className="animate-fade-up flex justify-center lg:justify-start [animation-delay:200ms] [animation-fill-mode:both]">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:bg-[var(--accent-hover)] hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              Explore More
              <svg
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Right Column - Illustration */}
        <div className="relative w-full flex-1 lg:max-w-[55%]">
          <div className="animate-fade-up relative aspect-square overflow-hidden rounded-2xl border border-theme bg-theme-card/50 shadow-2xl shadow-black/20 [animation-delay:150ms] [animation-fill-mode:both] md:aspect-[4/3] lg:aspect-auto lg:min-h-[480px]">
            <Image
              src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=900&q=90"
              alt="People-powered revolution - vibrant urban community"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 55vw"
            />
            {/* Dark overlay to blend with theme */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--section-bg)]/60 via-transparent to-transparent mix-blend-multiply" />
          </div>
        </div>
      </div>
    </section>
  );
}
