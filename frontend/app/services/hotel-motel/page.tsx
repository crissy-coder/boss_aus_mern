import ServicePageTemplate, {
  ServicePageConfig,
} from "@/components/ServicePageTemplate";

const config: ServicePageConfig = {
  hero: {
    label: "",
    title: "A Perfect Stay for Every Journey:",
    highlight: "Work, Leisure, Solo, Couple, or Family!",
    description:
      "From Site Discovery to Project Handoff, We're Your Steadfast Partner, Bringing Your Vision to Life!",
    image: "/banner/hotel.png",
    ctaText: "Partner With Us",
  },
  intro: {
    paragraphs: [
    "Your stay is just as crucial as your destination - it shapes your overall travel experience. That’s why each of our hotels and motels is thoughtfully designed and perfectly positioned in Australia’s most desirable locations. Whether you are on a road trip, attending business meetings, or simply exploring local attractions, our motels offer easy access to everything you need."," With ample parking, seamless check-in and check-out, and 24/7 support, we ensure that your journey is seamless, giving you more time to savor the adventure and less time worrying about the logistics.",
    ],
  },
  sections: [
    {
      label: "Our Expertise",
      title: "Hospitality Solutions",
      description:
        "Comprehensive hospitality management services designed to elevate guest experiences and optimize operations.",
      services: [
        {
          id: 1,
          title: "Hotel Management",
          description:
            "Full-service hotel operations including front desk, housekeeping, and guest services management.",
          icon: "/services/hospitality/hotel.png",
        },
        {
          id: 2,
          title: "Food & Beverage",
          description:
            "Restaurant and catering operations with focus on quality, presentation, and customer satisfaction.",
          icon: "/services/hospitality/food.png",
        },
        {
          id: 3,
          title: "Guest Relations",
          description:
            "Dedicated guest services ensuring every visitor receives personalized attention and care.",
          icon: "/services/hospitality/guest.png",
        },
        {
          id: 4,
          title: "Event Management",
          description:
            "Planning and execution of conferences, weddings, and corporate events with precision.",
          icon: "/services/hospitality/event.png",
        },
        {
          id: 5,
          title: "Revenue Management",
          description:
            "Strategic pricing and inventory optimization to maximize occupancy and revenue.",
          icon: "/services/hospitality/revenue.png",
        },
        {
          id: 6,
          title: "Quality Assurance",
          description:
            "Regular audits and training programs to maintain the highest service standards.",
          icon: "/services/hospitality/quality.png",
        },
      ],
      columns: 3,
    },
  ],
  benefits: {
    title: "Why Choose",
    highlight: "BOSS Hospitality?",
    description:
      "Experience excellence in hospitality management with proven results.",
    items: [
      {
        id: 1,
        title: "Industry Experience",
        description: "Decades of experience managing diverse hospitality properties.",
        icon: "/services/hospitality/experience.png",
      },
      {
        id: 2,
        title: "Trained Staff",
        description: "Professional teams trained in service excellence.",
        icon: "/services/hospitality/staff.png",
      },
      {
        id: 3,
        title: "Guest Satisfaction",
        description: "Consistently high ratings and positive guest reviews.",
        icon: "/services/hospitality/satisfaction.png",
      },
      {
        id: 4,
        title: "Operational Excellence",
        description: "Efficient operations that reduce costs while improving quality.",
        icon: "/services/hospitality/operations.png",
      },
    ],
  },
  cta: {
    label: "Let's Collaborate",
    title: "Ready to Elevate Your Hospitality Business?",
    description:
      "Partner with BOSS for hospitality management that delivers results and exceeds expectations.",
    primaryButton: { text: "Get in Touch", link: "/contact" },
    secondaryButton: { text: "Our Properties", link: "/portfolio" },
    image: "/littleboy.png",
  },
};

export default function HospitalityPage() {
  return <ServicePageTemplate config={config} />;
}
