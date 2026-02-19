"use client";

const IMPACT_CARDS = [
  {
    metric: "27K +",
    description: "Years of established presence",
    icon: "badge",
    color: "amber",
    featured: true,
  },
  {
    metric: "10K +",
    description: "Trusted, Satisfied Patrons",
    icon: "people",
    color: "orange",
    featured: false,
  },
  {
    metric: "8K +",
    description: "Employment opportunities created",
    icon: "growth",
    color: "emerald",
    featured: false,
  },
  {
    metric: "1M +",
    description: "Countless Lives Impacted",
    icon: "impact",
    color: "violet",
    featured: false,
  },
  {
    metric: "5 +",
    description: "Global operational locations",
    icon: "globe",
    color: "violet",
    featured: false,
  },
];

const ICON_COLOR_CLASS: Record<string, string> = {
  amber: "text-amber-200/90",
  orange: "text-orange-400",
  emerald: "text-emerald-400",
  violet: "text-violet-400",
};

function IconBadge({
  icon,
  color,
  featured,
}: {
  icon: string;
  color: string;
  featured: boolean;
  iconClass?: string;
}) {
  const size = 40;
  const stroke = "currentColor";
  const svgClass = featured ? "text-amber-200/90" : ICON_COLOR_CLASS[color] ?? "text-zinc-400";
  if (icon === "badge") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`shrink-0 ${svgClass}`}
      >
        <path d="M12 15c2.5 0 4.5-2 4.5-4.5S14.5 6 12 6s-4.5 2-4.5 4.5S9.5 15 12 15z" />
        <path d="M9 12l1.5 1.5L15 9" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    );
  }
  if (icon === "people") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`shrink-0 ${svgClass}`}
      >
        <circle cx="9" cy="7" r="2.5" />
        <circle cx="15" cy="7" r="2.5" />
        <path d="M5 20c0-2.5 2-4.5 4-4.5s4 2 4 4.5M15 20c0-2.5 2-4.5 4-4.5s4 2 4 4.5" />
        <path d="M12 14v2M10 16h4" />
      </svg>
    );
  }
  if (icon === "growth") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`shrink-0 ${svgClass}`}
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
        <path d="M8 12h2M14 12h2M12 10v4" />
      </svg>
    );
  }
  if (icon === "impact" || icon === "globe") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`shrink-0 ${svgClass}`}
      >
        <circle cx="12" cy="8" r="3" />
        <path d="M12 14v6M9 17h6" />
        <ellipse cx="12" cy="14" rx="4" ry="2" />
      </svg>
    );
  }
  return null;
}

export default function ImpactSection() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      {/* Soft gradient background for glass contrast */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-900/80 via-zinc-950 to-zinc-950"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-96 -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl">
        <h2 className="text-center text-2xl font-bold tracking-tight text-white sm:text-3xl xl:text-5xl">
          Not Just Numbers, But{" "}
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Real Impacts
          </span>
        </h2>

        <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-5 lg:gap-6">
          {IMPACT_CARDS.map((card, index) => (
            <article
              key={index}
              className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10
                ${
                  card.featured
                    ? "border-blue-500/40 bg-blue-600/20 shadow-lg shadow-blue-500/10 backdrop-blur-xl"
                    : "border-white/10 bg-white/5 backdrop-blur-xl hover:border-white/20 hover:bg-white/10"
                }`}
            >
              <div
                className={`flex flex-col p-6 sm:p-7 ${
                  card.featured ? "text-white" : "text-zinc-100"
                }`}
              >
                <div className="mb-4">
                  <IconBadge
                    icon={card.icon}
                    color={card.color}
                    featured={card.featured}
                  />
                </div>
                <p className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {card.metric}
                </p>
                <p
                  className={`mt-2 text-sm leading-snug sm:text-base ${
                    card.featured ? "text-blue-100/90" : "text-zinc-400"
                  }`}
                >
                  {card.description}
                </p>
              </div>
              {/* Subtle inner glow on hover for non-featured */}
              {!card.featured && (
                <div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    boxShadow: "inset 0 0 60px -20px rgba(59, 130, 246, 0.15)",
                  }}
                  aria-hidden
                />
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
