import ServicePageTemplate, {
  ServicePageConfig,
} from "@/components/ServicePageTemplate";

const config: ServicePageConfig = {
  hero: {
    label: "Real Estate Services",
    title: "Building Wealth Through",
    highlight: "Strategic Property Investment!",
    description:
      "Expert real estate services from acquisition to management. We help you find, develop, and manage properties that deliver returns.",
    image: "/services/realestate/hero.png",
    ctaText: "View Properties",
  },
  intro: {
    paragraphs: [
      "Real estate is one of the most powerful wealth-building tools available. BOSS Real Estate brings decades of experience in property acquisition, development, and management across Australia.",
      "Whether you're looking to buy, sell, or invest, our team provides expert guidance and personalized service to help you achieve your property goals.",
    ],
  },
  sections: [
    {
      label: "Property Services",
      title: "Real Estate Solutions",
      description:
        "Comprehensive property services for investors, developers, and property owners.",
      services: [
        {
          id: 1,
          title: "Property Sales",
          description:
            "Expert marketing and negotiation to achieve the best sale price for your property.",
          icon: "/services/realestate/sales.png",
        },
        {
          id: 2,
          title: "Property Management",
          description:
            "Full-service management including tenant screening, maintenance, and rent collection.",
          icon: "/services/realestate/management.png",
        },
        {
          id: 3,
          title: "Investment Advisory",
          description:
            "Strategic advice on property investment opportunities and portfolio building.",
          icon: "/services/realestate/investment.png",
        },
        {
          id: 4,
          title: "Development Projects",
          description:
            "End-to-end project management for residential and commercial developments.",
          icon: "/services/realestate/development.png",
        },
        {
          id: 5,
          title: "Commercial Leasing",
          description:
            "Finding and securing the right commercial spaces for businesses.",
          icon: "/services/realestate/leasing.png",
        },
        {
          id: 6,
          title: "Property Valuations",
          description:
            "Accurate property valuations for sales, purchases, and financial planning.",
          icon: "/services/realestate/valuation.png",
        },
      ],
      columns: 3,
    },
  ],
  benefits: {
    title: "Why Choose",
    highlight: "BOSS Real Estate?",
    description:
      "Your trusted partner in property success.",
    items: [
      {
        id: 1,
        title: "Market Knowledge",
        description: "Deep understanding of Australian property markets.",
        icon: "/services/realestate/knowledge.png",
      },
      {
        id: 2,
        title: "Proven Results",
        description: "Track record of successful transactions and investments.",
        icon: "/services/realestate/results.png",
      },
      {
        id: 3,
        title: "Full Service",
        description: "From search to settlement, we handle everything.",
        icon: "/services/realestate/fullservice.png",
      },
      {
        id: 4,
        title: "Client Focus",
        description: "Personalized service tailored to your goals.",
        icon: "/services/realestate/client.png",
      },
    ],
  },
  cta: {
    label: "Invest Smart",
    title: "Ready to Make Your Move in Property?",
    description:
      "Connect with our real estate experts and discover opportunities that match your investment goals.",
    primaryButton: { text: "Book Consultation", link: "/contact" },
    secondaryButton: { text: "Browse Listings", link: "/properties" },
    image: "/littleboy.png",
  },
};

export default function RealEstatePage() {
  return <ServicePageTemplate config={config} />;
}
