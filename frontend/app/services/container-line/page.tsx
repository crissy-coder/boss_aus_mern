import ServicePageTemplate, {
  ServicePageConfig,
} from "@/components/ServicePageTemplate";

const config: ServicePageConfig = {
  hero: {
    label: "Transport Services",
    title: "Moving Australia Forward,",
    highlight: "Safely & Efficiently!",
    description:
      "Comprehensive transport and logistics solutions that keep goods and people moving across the nation with reliability and care.",
    image: "/services/transport/hero.png",
    ctaText: "Get a Quote",
  },
  intro: {
    paragraphs: [
      "In a country as vast as Australia, efficient transport is essential for business and communities. BOSS Transport provides reliable logistics and transportation services that connect people and products.",
      "From local deliveries to long-haul transport, our fleet and experienced drivers ensure your cargo arrives safely and on time, every time.",
    ],
  },
  sections: [
    {
      label: "Our Services",
      title: "Transport Solutions",
      description:
        "End-to-end transport and logistics services tailored to your business needs.",
      services: [
        {
          id: 1,
          title: "Freight Transport",
          description:
            "Reliable road freight services for general cargo across Australia.",
          icon: "/services/transport/freight.png",
        },
        {
          id: 2,
          title: "Express Delivery",
          description:
            "Time-critical deliveries with guaranteed pickup and delivery windows.",
          icon: "/services/transport/express.png",
        },
        {
          id: 3,
          title: "Warehousing",
          description:
            "Secure storage facilities with inventory management and distribution services.",
          icon: "/services/transport/warehouse.png",
        },
        {
          id: 4,
          title: "Fleet Management",
          description:
            "Complete fleet solutions including vehicles, drivers, and maintenance.",
          icon: "/services/transport/fleet.png",
        },
        {
          id: 5,
          title: "Last Mile Delivery",
          description:
            "Final delivery to customers with tracking and proof of delivery.",
          icon: "/services/transport/lastmile.png",
        },
        {
          id: 6,
          title: "Specialized Transport",
          description:
            "Handling of oversized, fragile, or temperature-sensitive goods.",
          icon: "/services/transport/specialized.png",
        },
      ],
      columns: 3,
    },
  ],
  benefits: {
    title: "Why Choose",
    highlight: "BOSS Transport?",
    description:
      "Reliable logistics partner committed to your success.",
    items: [
      {
        id: 1,
        title: "Modern Fleet",
        description: "Well-maintained vehicles equipped with GPS tracking.",
        icon: "/services/transport/modern.png",
      },
      {
        id: 2,
        title: "Experienced Drivers",
        description: "Professional drivers with excellent safety records.",
        icon: "/services/transport/drivers.png",
      },
      {
        id: 3,
        title: "National Coverage",
        description: "Delivery services across all Australian states.",
        icon: "/services/transport/coverage.png",
      },
      {
        id: 4,
        title: "Real-Time Tracking",
        description: "Track your shipments in real-time for peace of mind.",
        icon: "/services/transport/tracking.png",
      },
    ],
  },
  cta: {
    label: "Ship With Us",
    title: "Ready to Streamline Your Logistics?",
    description:
      "Get a competitive quote for your transport needs. Fast, reliable, and cost-effective.",
    primaryButton: { text: "Request Quote", link: "/contact" },
    secondaryButton: { text: "Track Shipment", link: "/tracking" },
    image: "/littleboy.png",
  },
};

export default function TransportPage() {
  return <ServicePageTemplate config={config} />;
}
