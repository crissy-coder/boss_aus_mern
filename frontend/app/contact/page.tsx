"use client";

import { useState } from "react";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { sendContact } from "@/services/api";

const CONTACT_INFO = [
  {
    id: 1,
    title: "Visit Us",
    content: "123 Business Street, Melbourne VIC 3000, Australia",
    icon: "location",
  },
  {
    id: 2,
    title: "Call Us",
    content: "+61 3 9000 0000",
    icon: "phone",
  },
  {
    id: 3,
    title: "Email Us",
    content: "info@bossgroup.com.au",
    icon: "email",
  },
  {
    id: 4,
    title: "Business Hours",
    content: "Mon - Fri: 9:00 AM - 6:00 PM",
    icon: "clock",
  },
];

const FAQS = [
  {
    id: 1,
    question: "How quickly can I expect a response?",
    answer:
      "We typically respond to all inquiries within 24-48 business hours. For urgent matters, please call us directly.",
  },
  {
    id: 2,
    question: "Do you offer free consultations?",
    answer:
      "Yes! We offer a free initial consultation to understand your needs and discuss how we can help you achieve your goals.",
  },
  {
    id: 3,
    question: "What services does BOSS Group offer?",
    answer:
      "We offer a wide range of services including BPO, Construction, Real Estate, Hospitality, Healthcare, and more across Australia.",
  },
];

const SOCIAL_LINKS = [
  { name: "LinkedIn", href: "#", icon: "linkedin" },
  { name: "Facebook", href: "#", icon: "facebook" },
  { name: "Twitter", href: "#", icon: "twitter" },
  { name: "Instagram", href: "#", icon: "instagram" },
];

function IconComponent({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    location: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    phone: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    email: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    clock: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    linkedin: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    facebook: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    twitter: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      </svg>
    ),
    instagram: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  };
  return <>{icons[name] || null}</>;
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await sendContact(form);
      setStatus("success");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-theme-section">
      {/* Dot pattern - theme-aware */}
      <div
        className="pointer-events-none fixed inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--page-pattern-color) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-brand-dark/50 via-transparent to-brand-dark/40" />
        <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-brand/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-brand/20 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <AnimateOnScroll>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-light">
              Get in Touch
            </p>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-theme-heading sm:text-5xl lg:text-6xl">
              Let&apos;s Start a{" "}
              <span className="bg-linear-to-r from-brand-light to-brand bg-clip-text text-transparent">
                Conversation
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-theme-muted">
              Have a question, project idea, or want to partner with us? We&apos;d love to hear from you.
              Our team is ready to help you achieve your goals.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Main Content: Form + Info */}
      <section className="relative px-4 pb-16 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-12 lg:py-16">
            {/* Contact Form - 3 cols */}
            <div className="lg:col-span-3">
              <AnimateOnScroll>
                <div className="overflow-hidden rounded-2xl border border-theme bg-theme-card p-6 shadow-2xl backdrop-blur-md sm:p-8 lg:p-10">
                  <h2 className="mb-2 text-2xl font-bold text-theme-heading">Send us a Message</h2>
                  <p className="mb-8 text-theme-muted">
                    Fill out the form below and we&apos;ll get back to you as soon as possible.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-theme-muted">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl border border-theme bg-theme-card px-4 py-3 text-theme-heading placeholder:text-theme-muted outline-none transition-all duration-200 focus:border-brand focus:ring-2 focus:ring-brand/20"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-theme-muted">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl border border-theme bg-theme-card px-4 py-3 text-theme-heading placeholder:text-theme-muted outline-none transition-all duration-200 focus:border-brand focus:ring-2 focus:ring-brand/20"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-theme-muted">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-theme bg-theme-card px-4 py-3 text-theme-heading placeholder:text-theme-muted outline-none transition-all duration-200 focus:border-brand focus:ring-2 focus:ring-brand/20"
                          placeholder="+61 400 000 000"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="mb-2 block text-sm font-medium text-theme-muted">
                          Subject *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl border border-theme bg-theme-card px-4 py-3 text-theme-heading outline-none transition-all duration-200 focus:border-brand focus:ring-2 focus:ring-brand/20"
                        >
                          <option value="">Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="services">Services</option>
                          <option value="partnership">Partnership</option>
                          <option value="careers">Careers</option>
                          <option value="support">Support</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="mb-2 block text-sm font-medium text-theme-muted">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full resize-none rounded-xl border border-theme bg-theme-card px-4 py-3 text-theme-heading placeholder:text-theme-muted outline-none transition-all duration-200 focus:border-brand focus:ring-2 focus:ring-brand/20"
                        placeholder="Tell us about your project or inquiry..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="group w-full rounded-xl bg-(--accent) px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand/25 transition-all duration-300 hover:bg-(--accent-hover) hover:shadow-brand/30 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === "loading" ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </button>

                    {status === "success" && (
                      <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-center text-green-400">
                        Thank you! Your message has been sent successfully.
                      </div>
                    )}
                    {status === "error" && (
                      <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-red-400">
                        Something went wrong. Please try again later.
                      </div>
                    )}
                  </form>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Contact Info - 2 cols */}
            <div className="space-y-6 lg:col-span-2">
              {CONTACT_INFO.map((info, idx) => (
                <AnimateOnScroll key={info.id} delay={60 + idx * 40}>
                  <div className="group overflow-hidden rounded-xl border border-theme bg-theme-card p-5 backdrop-blur-md transition-all duration-300 hover:border-brand/40 hover:bg-theme-card/80">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-brand/20 to-brand/15 text-brand-light transition-colors group-hover:from-brand/30 group-hover:to-brand/25">
                        <IconComponent name={info.icon} />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold text-theme-heading">{info.title}</h3>
                        <p className="text-sm text-theme-muted">{info.content}</p>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}

              {/* Social Links */}
              <AnimateOnScroll delay={220}>
                <div className="overflow-hidden rounded-xl border border-theme bg-theme-card p-5 backdrop-blur-md">
                  <h3 className="mb-4 font-semibold text-theme-heading">Follow Us</h3>
                  <div className="flex gap-3">
                    {SOCIAL_LINKS.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--page-pattern-color) text-theme-muted transition-all duration-200 hover:bg-brand/20 hover:text-brand-light"
                        aria-label={social.name}
                      >
                        <IconComponent name={social.icon} />
                      </a>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative border-t border-theme px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="relative mx-auto max-w-3xl">
          <AnimateOnScroll>
            <div className="mb-10 text-center">
              <h2 className="mb-3 text-2xl font-bold text-theme-heading sm:text-3xl">
                Frequently Asked{" "}
                <span className="bg-linear-to-r from-brand-light to-brand bg-clip-text text-transparent">
                  Questions
                </span>
              </h2>
              <p className="text-theme-muted">
                Can&apos;t find what you&apos;re looking for? Reach out to us directly.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === faq.id;
              return (
                <AnimateOnScroll key={faq.id} delay={60 + idx * 40}>
                  <div
                    className={`overflow-hidden rounded-xl border border-theme backdrop-blur-md transition-all duration-300 ${
                      isOpen
                        ? "border-brand/50 bg-theme-card/80"
                        : "bg-theme-card/50 hover:border-brand/30"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                      className="flex w-full items-center justify-between px-6 py-5 text-left"
                    >
                      <span className={`font-medium ${isOpen ? "text-brand-light" : "text-theme-heading"}`}>
                        {faq.question}
                      </span>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-lg transition-all duration-300 ${
                          isOpen
                            ? "bg-brand text-white"
                            : "bg-(--page-pattern-color) text-theme-muted"
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
                      <p className="px-6 pb-5 text-sm leading-relaxed text-theme-muted">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative border-t border-theme px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-brand-dark/20 to-transparent" />
        <div className="relative mx-auto max-w-4xl text-center">
          <AnimateOnScroll>
            <h2 className="mb-4 text-2xl font-bold text-theme-heading sm:text-3xl">
              Ready to Take the Next Step?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-theme-muted">
              Explore our services or learn more about how BOSS Group can help your business grow.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-xl bg-(--accent) px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand/25 transition-all duration-300 hover:bg-(--accent-hover) hover:shadow-brand/30"
              >
                Explore Services
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-xl border border-theme bg-theme-card/50 px-8 py-4 text-base font-semibold text-theme-heading transition-all duration-300 hover:bg-theme-card hover:border-theme"
              >
                About Us
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
