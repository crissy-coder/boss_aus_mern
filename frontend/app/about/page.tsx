import AnimateOnScroll from "@/components/AnimateOnScroll";
import TimelineSection from "@/components/TimelineSection";
import CTASection from "@/components/CTASection";

import "./about-image.css";

export default function AboutPage() {
  return (
    <>
    <TimelineSection />
        <div className="page-pattern min-h-screen bg-theme-muted">
      {/* Page header */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <AnimateOnScroll>
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-blue-500">
              About us
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-theme-heading sm:text-4xl lg:text-5xl">
              The Story Behind Our Inception
            </h1>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Main content */}
      <section className="px-4">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-2xl bg-zinc-900/100 px-6 py-10 shadow-xl backdrop-blur-sm sm:px-10 sm:py-14">
            <div className="relative">
              {/* Accent line */}
              <div className="absolute left-0 top-0 h-full w-1 rounded-full bg-linear-to-b from-blue-500 to-blue-700/60" />

              <div className="space-y-8 pl-6 sm:pl-8">
                <AnimateOnScroll>
                  <p className="text-base leading-relaxed text-zinc-300 sm:text-lg">
                    The BOSS (Aust) Consulting Pty Ltd. was born from a shared
                    vision among childhood friends who merged their diverse
                    expertise into a powerful force. Each of our leaders hails
                    from different fields—real estate, construction, IT,
                    hospitality—but we are united by core values: trust,
                    integrity, and a passion for building something meaningful.
                  </p>
                </AnimateOnScroll>

                <AnimateOnScroll delay={80}>
                  <p className="text-base leading-relaxed text-zinc-300 sm:text-lg">
                    In 2002, we transformed that vision into reality. What began
                    as a united group of professionals has evolved into a
                    thriving enterprise, making a significant impact across
                    various industries in Australia. Every step of our journey
                    has been fueled by an unwavering commitment to excellence
                    and the belief that together, we can achieve far more than
                    any individual could alone.
                  </p>
                </AnimateOnScroll>

                <AnimateOnScroll delay={120}>
                  <p className="text-base leading-relaxed text-zinc-300 sm:text-lg">
                    Our growth is not just a business success; it&apos;s a
                    compelling narrative of friendship, resilience, and a vision
                    that continues to propel us forward.
                  </p>
                </AnimateOnScroll>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are - two columns: globe graphic + text */}
      <section className=" px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
            {/* Left: Image placeholder – replace src with your image (e.g. public/about-who-we-are.png) */}
            <AnimateOnScroll className="relative flex justify-center lg:justify-end">
              <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-xl">
                <div
                  className="absolute inset-0"
                  style={{
                    animation: "about-image-rotate 30s linear infinite",
                    transformOrigin: "center center",
                    willChange: "transform",
                  }}
                >
                  <img
                    src="/about.png"
                    alt="Who we are – global reach"
                    className="h-full w-full object-cover object-center"
                    style={{ display: "block" }}
                  />
                </div>
              </div>
            </AnimateOnScroll>

            {/* Right: Who We Are text */}
            <div className="4">
              <AnimateOnScroll delay={80}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-500">
                  Who We Are
                </p>
                <h2 className="mb-6 text-2xl font-bold leading-tight tracking-tight text-theme-heading sm:text-3xl lg:text-4xl">
                  Creative Agency that Help you{" "}
                  <span className="bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  go Ahead.
              </span>
                </h2>
                <div className="text-base leading-relaxed text-theme-muted sm:text-lg">
                  <p>
                    Born with a simple yet bold idea – to impact lives
                    meaningfully – today, the BOSS Group has blossomed into a
                    dynamic group of businesses that spans across diverse
                    industries. From service stations to real estate,
                    construction, IT, hotels, motels, laundromats, and medical
                    centers, we&apos;ve built a strong and lasting presence
                    across these sectors, making a significant impact with our
                    commitment to excellence and integrity.
                  </p>
                  <br />
                  <p>
                    At the heart of BOSS, we believe in the power of people.
                    Whether it&apos;s our employees, our customers, or the
                    communities we serve, people are our foundation. We take
                    pride in being approachable and down-to-earth, no matter how
                    far we&apos;ve come. Our journey is about more than
                    business; it&apos;s about building connections, delivering
                    value, and impacting lives.
                  </p>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>
    </div>
    <CTASection />
    </>
  );
}
