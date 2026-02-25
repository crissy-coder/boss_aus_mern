"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import VisionMissionSection from "@/components/VisionMissionSection";
import CTASection from "@/components/CTASection";


const TEAM = [
  {
    id: 1,
    name: "Mr. SMG. Prasad Kalla",
    role: "Director",
    bio: "MBA from Victoria University of Technology, Melbourne. Leads BOSS (Aust) Consulting Pty Ltd with 26 petrol",
    image: "/images/team/kalla.jpg",
    fallbackImage: "/about.png",
  },
  {
    id: 2,
    name: "Kris",
    role: "Leadership",
    bio: "Experienced professional driving strategic initiatives and team excellence across BOSS Group's operations.",
    image: "/images/team/kris.jpg",
    fallbackImage: "/about.png",
  },
  {
    id: 3,
    name: "Nivas",
    role: "Management",
    bio: "Focused on operational excellence and sustainable growth in our diverse business segments.",
    image: "/images/team/Nivas.jpg",
    fallbackImage: "/about.png",
  },
  {
    id: 4,
    name: "Raj",
    role: "Leadership",
    bio: "Brings expertise in cross-functional collaboration and innovation to our leadership team.",
    image: "/images/team/raj.jpg",
    fallbackImage: "/about.png",
  },
  {
    id: 5,
    name: "Sash",
    role: "Leadership",
    bio: "Brings expertise in cross-functional collaboration and innovation to our leadership team.",
    image: "/images/team/Sash.jpg",
    fallbackImage: "/about.png",
  },
  {
    id: 6,
    name: "Kal",
    role: "Leadership",
    bio: "Brings expertise in cross-functional collaboration and innovation to our leadership team.",
    image: "/images/team/kal.jpg",
    fallbackImage: "/about.png",
  },
  {
    id: 7,
    name: "Ganesh",
    role: "Leadership",
    bio: "Brings expertise in cross-functional collaboration and innovation to our leadership team.",
    image: "/images/team/Ganesh.jpg",
    fallbackImage: "/about.png",
  },
];

const SLIDE_DURATION_MS = 6000;

export default function TeamPage() {
  const [index, setIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % TEAM.length);
  }, []);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + TEAM.length) % TEAM.length);
  }, []);

  useEffect(() => {
    const t = setInterval(goNext, SLIDE_DURATION_MS);
    return () => clearInterval(t);
  }, [goNext]);

  const handleImageError = (id: number) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="page-pattern min-h-screen bg-theme-muted">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand/20 blur-3xl" />
        {/* <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-800/30 blur-3xl" /> */}
      </div>

        <div className="absolute inset-0 bg-linear-to-br from-zinc-900/60 via-transparent to-brand-dark/20 pointer-events-none" />
        <div className="relative mx-auto max-w-4xl text-center">
          <AnimateOnScroll>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Leadership & {""}
              <span className="bg-gradient-to-r from-brand-light to-brand bg-clip-text text-transparent">
              Management Team
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-base text-zinc-400 sm:text-lg">
              Our leadership and management team brings together experienced
              professionals who strategically guide BOSS Group&apos;s diverse
              operations.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-brand px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand/25 transition-all duration-300 hover:bg-brand-light hover:shadow-brand/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Started
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Two columns: col-8 slider + col-4 text */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            {/* col-8: Slider */}
            <div className="lg:col-span-8">
              <AnimateOnScroll>
                <div className="relative overflow-hidden rounded-2xl border border-zinc-800/60 bg-theme-card shadow-xl backdrop-blur-sm">
                  <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${index * 100}%)` }}
                  >
                    {TEAM.map((member) => (
                      <div
                        key={member.id}
                        className="min-w-full shrink-0 px-4 py-4"
                      >
                        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
                          <div className="relative mx-auto aspect-3/4 w-full max-w-[280px] shrink-0 overflow-hidden rounded-xl bg-zinc-800/60 sm:mx-0">
                            <Image
                              src={
                                imageErrors[member.id]
                                  ? member.fallbackImage
                                  : member.image
                              }
                              alt={member.name}
                              fill
                              className="object-cover transition-opacity duration-300"
                              sizes="(max-width: 640px) 100vw, 280px"
                              onError={() => handleImageError(member.id)}
                            />
                          </div>
                          <div className="flex flex-1 flex-col justify-center">
                            <p className="text-sm font-medium uppercase tracking-wider text-brand">
                              {member.role}
                            </p>
                            <h2 className="mt-1 text-2xl font-bold text-theme-heading sm:text-3xl">
                              {member.name}
                            </h2>
                            <p className="mt-4 text-theme-heading leading-relaxed">
                              {member.bio}
                            </p>
                            <Link
                              href="/about"
                              className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-light hover:scale-[1.02] active:scale-[0.98]"
                            >
                              Know More
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Slider controls */}
                  <div className="flex items-center justify-between px-6 py-4 sm:px-10">
                    <button
                      type="button"
                      onClick={goPrev}
                      className="rounded-lg border border-zinc-700/80 bg-theme-card px-4 py-2 text-sm font-medium text-theme-heading transition-colors hover:bg-zinc-700/60 hover:text-white"
                      aria-label="Previous team member"
                    >
                      Previous
                    </button>
                    <div className="flex gap-2">
                      {TEAM.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setIndex(i)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            i === index
                              ? "w-8 bg-brand"
                              : "w-2 bg-zinc-600 hover:bg-zinc-500"
                          }`}
                          aria-label={`Go to slide ${i + 1}`}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={goNext}
                      className="rounded-lg border border-zinc-700/80 bg-theme-card px-4 py-2 text-sm font-medium text-theme-heading transition-colors hover:bg-zinc-700/60 hover:text-white"
                      aria-label="Next team member"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

            {/* col-4: Text */}
            <div className="lg:col-span-4 flex items-center justify-center">
            <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand/40 blur-3xl" />
        {/* <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-800/30 blur-3xl" /> */}
      </div>
              <AnimateOnScroll delay={80}>
                <div className="sticky top-28 rounded-lg border border-zinc-800/60 bg-theme-card p-6 shadow-xl backdrop-blur-sm sm:p-8">
                  <div className="absolute left-0 top-0 h-full w-1 rounded-l-3xl bg-linear-to-b from-brand to-brand-dark/60" />
                  <div className="pl-4 sm:pl-5">
                  <h2 className="mb-6 text-2xl font-bold leading-tight tracking-tight text-theme-heading sm:text-3xl lg:text-4xl">
                      Our {""}
                      <span className="bg-gradient-to-r from-brand-light to-brand bg-clip-text text-transparent">
                      Culture
                     </span>
                    </h2>
                    <p className="mt-4 text-zinc-400 leading-relaxed">
                      Effective teams communicate openly, leverage strengths, and
                      embrace diversity for success.
                    </p>
                    <p className="mt-4 text-zinc-400 leading-relaxed">
                      Our leadership combines deep industry experience with a
                      commitment to integrity and innovation across education,
                      healthcare, energy, hospitality, and transportation.
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>
      <VisionMissionSection />
      <CTASection />
    </div>
  );
}
