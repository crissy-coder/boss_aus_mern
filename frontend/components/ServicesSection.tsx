"use client";

import Image from "next/image";
import AnimateOnScroll from "./AnimateOnScroll";

const SERVICES = [
  {
    title: "BPO",
    description:
      "Paving your path to success with BPO services crafted to optimize operations & maximize efficiency",
    icon: "bpo",
  },
  {
    title: "Construction",
    description:
      "From site discovery to construction, we're your steadfast partner, bringing your vision to life",
    icon: "construction",
  },
  {
    title: "Laundromats",
    description:
      "Fuel & convenience for all at affordable rates, backed by unparalleled customer service excellence",
    icon: "laundromats",
  },
  {
    title: "Container Line",
    description:
      "Empowering businesses and shaping futures with purpose-driven technology solutions & services",
    icon: "container",
  },
  {
    title: "Hotel Motel",
    description:
      "Where weary travelers find their second home on the road with unmatched comfort & affordability",
    icon: "hotel",
  },
  {
    title: "Real Estate",
    description:
      "From re-leasing existing properties to facilitating land deals, our services are driven by passion",
    icon: "realestate",
  },
  // {
  //   title: "Service Stations",
  //   description:
  //     "We truly believe that every journey deserves a great pit stop. Our strategically located service stations across Australia are designed to provide 'Something for Everyone!'",
  //   icon: "fuel",
  // },
];

const ICON_SIZE = 48;

/** Loads icon from public/serviceicons/{icon}.png (or set icon to "filename" without extension if you use .svg/.webp) */
function ServiceIcon({ icon, title }: { icon: string; title: string }) {
  const src = icon.includes(".") ? `/serviceicons/${icon}` : `/serviceicons/${icon}.png`;
  return (
    <Image
      src={src}
      alt={title}
      width={ICON_SIZE}
      height={ICON_SIZE}
      className="shrink-0 object-contain"
      sizes="48px"
    />
  );
}

export default function ServicesSection() {
  return (
    <section className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Split header */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <AnimateOnScroll className="lg:col-span-6">
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl xl:text-5xl">
              Shaping Tomorrow with{" "}
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Our Services Today!
              </span>
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll className="lg:col-span-6" delay={80}>
            <p className="max-w-lg text-base leading-relaxed text-zinc-400 sm:text-lg">
              Unlock your business&apos;s potential with our innovative and
              future-focused services. Together, we turn today&apos;s challenges
              into tomorrow&apos;s success stories.
            </p>
          </AnimateOnScroll>
        </div>

        {/* Services grid */}
        <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <AnimateOnScroll key={service.title} delay={index * 50}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:bg-white/8 hover:shadow-lg hover:shadow-blue-500/5 sm:p-7">
                <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
                  <ServiceIcon icon={service.icon} title={service.title} />
                </div>
                <h3 className="text-xl font-bold text-white sm:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">
                  {service.description}
                </p>
              </article>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
