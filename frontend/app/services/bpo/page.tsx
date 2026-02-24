"use client";

import Link from "next/link";
import Image from "next/image";
import AnimateOnScroll from "@/components/AnimateOnScroll";

const HR_SERVICES = [
  {
    id: 1,
    title: "Recruitment & Staffing",
    description:
      "From job postings to candidate screening, we handle the entire hiring process, finding the right talent for your business.",
    icon: "/serviceicons/recr.png",
  },
  {
    id: 2,
    title: "Payroll Management",
    description:
      "Accurate payroll processing, superannuation, and tax deductions – we handle it all with the highest level of efficiency.",
    icon: "/serviceicons/payment.png",
  },
  {
    id: 3,
    title: "Employee Relations",
    description:
      "Assistance with onboarding, performance reviews, and employee engagement, ensuring smooth internal operations.",
    icon: "/serviceicons/relation.png",
  },
];

const FINANCE_SERVICES = [
  {
    id: 1,
    title: "Account Processing",
    description:
      "We manage the end-to-end process of accounts payable and receivable, ensuring that your books are always accurate.",
    icon: "/serviceicons/bill.png",
    color: "from-rose-500 to-pink-600",
  },
  {
    id: 2,
    title: "Reconciliation Services",
    description:
      "Regular and precise reconciliation of accounts to ensure that your financial statements are up-to-date and error-free.",
    icon: "/serviceicons/Reconciliation.png",
    color: "from-violet-500 to-purple-600",
  },
  {
    id: 3,
    title: "Invoice Processing",
    description:
      "Timely and efficient processing of vendor and customer invoices, reducing bottlenecks in your payment cycles.",
    icon: "/serviceicons/invoice.png",
    color: "from-sky-500 to-blue-600",
  },
  {
    id: 4,
    title: "Payment Management",
    description:
      "We handle all your outgoing payments, including payroll, vendor payments, and taxes, ensuring everything is processed accurately and on time.",
    icon: "/serviceicons/pay-mag.png",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: 5,
    title: "Finance Analytics",
    description:
      "Gain deeper insights into your financial performance. Our team provides detailed reports and analysis to help you make informed decisions.",
    icon: "/serviceicons/finicaial.png",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: 6,
    title: "Budgeting & Forecasting",
    description:
      "Helping you plan for the future with accurate budgeting and financial forecasting services.",
    icon: "/serviceicons/budget.png",
    color: "from-blue-500 to-indigo-600",
  },
];

const BENEFITS = [
  {
    id: 1,
    title: "Local Expertise",
    description:
      "We understand Australian business regulations and compliance standards.",
    icon: "/serviceicons/grear.png",
  },
  {
    id: 2,
    title: "Comprehensive Solutions",
    description:
      "From HR to Finance, we handle payroll and reconciliation efficiently.",
    icon: "/serviceicons/puzeel.png",
  },
  {
    id: 3,
    title: "Cost-Effective",
    description:
      "Our commitment to high-quality services keeps you ahead for business.",
    icon: "/serviceicons/cost.png",
  },
  {
    id: 4,
    title: "Seasoned Professionals",
    description:
      "Our HR and Finance professionals deliver consistent, compliant services.",
    icon: "/serviceicons/star.png",
  },
];

export default function BPOPage() {
  return (
    <div className="min-h-screen bg-theme-muted">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-theme-muted px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-blue-950/40 via-transparent to-purple-950/30" />
        <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Text */}
            <div>
              <AnimateOnScroll>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-400">
                  BPO Services
                </p>
                <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-theme-heading sm:text-4xl lg:text-5xl">
                  Let Us Handle the Numbers,{" "}
                  <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    While You Focus Only on Growth!
                  </span>
                </h1>
                <p className="mb-8 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                  Let us handle your business operations with efficiency while
                  you focus on growth and strategy. Our BPO services streamline
                  processes, reduce costs, and boost productivity.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:bg-blue-500 hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Get Started
                </Link>
              </AnimateOnScroll>
            </div>

            {/* Illustration */}
            <AnimateOnScroll delay={100}>
              <div className="relative mx-auto aspect-square w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-800/50 bg-theme-card shadow-2xl lg:mx-0">
                <Image
                  src="/serviceicons/bpo_banner.png"
                  alt="BPO Services Illustration"
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 1124px) 120vw, 80vw"
                />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <AnimateOnScroll>
            <div className="rounded-2xl border p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute inset-0" />
        {/* <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" /> */}
        {/* <div className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-3xl" /> */}

              <p className="mb-4 text-base leading-relaxed text-zinc-600 sm:text-lg">
                In Australia&apos;s hyper-competitive and fast-paced business
                landscape, staying competitive means focusing on core growth
                strategies while efficiently managing day-to-day operations. At
                BOSS, we understand that handling time-consuming functions such
                as HR and Finance can pull you away from the heart of your
                business.
              </p>
              <p className="text-base leading-relaxed text-zinc-600 sm:text-lg">
                That&apos;s where we come in. Specializing in Business Process
                Outsourcing (BPO), we take over critical operational tasks,
                freeing you to focus on innovation, strategy, and growth. Our
                expert teams take care of your requirements ensuring your HR and
                Finance Operations run seamlessly and efficiently, without the
                stress or overheads of managing them in-house.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* HR Outsourcing Section */}
      <section className="bg-theme-muted px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <AnimateOnScroll>
            <div className="mb-10 lg:mb-14">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
                Human Resources
              </p>
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-theme-heading sm:text-4xl lg:text-[2.75rem]">
              HR {" "}  
              <span className="bg-linear-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                Outsourcing
              </span>
            </h2>
              <p className="max-w-3xl text-base text-zinc-400 sm:text-lg">
                Managing human resources is essential but can be a
                time-consuming process. We offer full-service HR outsourcing,
                covering all aspects of employee management while ensuring
                compliance with Australian employment laws.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {HR_SERVICES.map((service, idx) => (
              <AnimateOnScroll key={service.id} delay={60 + idx * 50}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-zinc-200/10 bg-white p-6 shadow-lg shadow-zinc-200/30 transition-all duration-300 hover:-translate-y-1 hover:border-blue-20 hover:shadow-xl sm:p-8">
                  {/* Icon */}
                  <div className="relative mb-5 h-14 w-14 overflow-hidden rounded-xl bg-linear-to-br from-blue-50 to-blue-100 p-3">
                    <Image
                      src={service.icon}
                      alt={service.title}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  <h3 className="mb-3 text-lg font-semibold text-zinc-900 transition-colors group-hover:text-blue-600">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-600">
                    {service.description}
                  </p>

                  {/* Hover accent */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-blue-500 to-blue-400 transition-all duration-500 group-hover:w-full" />
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Finance Operations Outsourcing Section */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <AnimateOnScroll>
            <div className="mb-10 lg:mb-14">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
                Financial Services
              </p>
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-theme-heading sm:text-4xl lg:text-[2.75rem]">
              Finance Operations{" "}
              <span className="bg-linear-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                Outsourcing
              </span>
            </h2>
              <p className="max-w-3xl text-base text-zinc-400 sm:text-lg">
                Effective financial management is the backbone of any successful
                business. BOSS takes care of your Finance Operations, from
                invoice processing to reconciliation, giving you more control
                over cash flow and financial stability.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {FINANCE_SERVICES.map((service, idx) => (
              <AnimateOnScroll key={service.id} delay={60 + idx * 40}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-zinc-100/10 bg-white p-6 shadow-lg shadow-zinc-200/20 transition-all duration-300 hover:-translate-y-1 hover:border-blue-20 hover:shadow-xl sm:p-8">
                  {/* Gradient top bar */}
                  <div
                    className={`absolute left-0 top-0 h-1 w-full bg-linear-to-r ${service.color}`}
                  />

                  {/* Icon */}
                  <div
                    className={`relative mb-5 h-14 w-14 overflow-hidden rounded-xl bg-linear-to-br ${service.color} p-3 shadow-md`}
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
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className=" bg-theme-muted px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <AnimateOnScroll>
            <div className="mb-10 text-center lg:mb-14">
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-theme-heading sm:text-4xl lg:text-[2.75rem]">
              Why Choose {" "}  
              <span className="bg-linear-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                BOSS BPO?
              </span>
            </h2> 
              <p className="mx-auto max-w-2xl text-base text-zinc-400">
                We bring local expertise and comprehensive solutions to help
                your business thrive.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {BENEFITS.map((benefit, idx) => (
              <AnimateOnScroll key={benefit.id} delay={60 + idx * 50}>
                <div className="group flex flex-col items-center rounded-2xl border border-zinc-200/80 bg-white p-6 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  {/* Icon */}
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

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-theme-muted px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* Background accents */}
        <div className="pointer-events-none absolute -left-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left: Text & Buttons */}
            <AnimateOnScroll>
              <div className="text-center lg:text-left">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-400">
                  Let&apos;s Work Together
                </p>
                <h2 className="mb-4 text-2xl font-bold text-theme-heading sm:text-3xl lg:text-4xl">
                  Ready to Streamline Your Operations?
                </h2>
                <p className="mb-8 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg lg:mx-0">
                  Let BOSS handle your HR and Finance operations so you can
                  focus on what matters most – growing your business.
                </p>
                <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:bg-blue-500 hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Get Now
                  </Link>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Right: Image */}
            <AnimateOnScroll delay={80}>
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-full bg-linear-to-br from-blue-500/20 to-purple-500/20 blur-2xl" />
                  <img
                    src="/littleboy.png"
                    alt="CTA Illustration"
                    className="relative w-[280px] object-contain drop-shadow-2xl sm:w-[320px] lg:w-[360px]"
                  />
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
}
