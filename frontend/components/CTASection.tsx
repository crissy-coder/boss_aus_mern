"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AnimateOnScroll from "./AnimateOnScroll";

/** Place your CTA illustration at public/images/cta-illustration.png (or update src below) */
const CTA_IMAGE_SRC = "/about.png";

export default function CTASection() {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative" style={{ paddingTop: "0px", paddingBottom: "80px" }}>
      <div className="mx-auto max-w-6xl">
        <AnimateOnScroll>
        <div className="overflow-hidden rounded-2xl border border-brand/50 bg-gradient-to-br from-brand-dark/90 via-brand/80 to-brand-dark/90 shadow-lg shadow-brand-dark/10">
          <div className="grid min-h-[320px] grid-cols-1 lg:grid-cols-12">
            <div className="relative flex flex-col justify-center px-8 py-12 sm:px-12 sm:py-16 lg:col-span-8 lg:px-16">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-white/90">
                Curious about our impact?
              </p>
              <h2 className="mb-8 text-3xl font-bold leading-tight tracking-tight text-theme-heading sm:text-4xl lg:text-5xl">
                Let&apos;s Get in Touch!
              </h2>
              <Link
                href="/contact"
                className="inline-flex w-fit items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-zinc-900 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-brand/10 hover:shadow-xl active:scale-[0.98]">
                Estimate Project
              </Link>
            </div>
            {/* RIGHT - col-4 */}
            <div className="relative hidden lg:flex lg:col-span-4 items-end justify-end p-4">
              <img
                src="/littleboy.png"   // your image path
                alt="CTA"
                className="w-[290px] object-contain opacity-90"
              />
            </div>
          </div>
        </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
