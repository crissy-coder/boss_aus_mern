import ServicePageTemplate, {
  ServicePageConfig,
} from "@/components/ServicePageTemplate";

const config: ServicePageConfig = {
  hero: {
    label: "Energy Services",
    title: "Powering Progress,",
    highlight: "Fueling Growth!",
    description:
      "Operating petrol stations and energy solutions that keep Australia moving. Quality fuel, convenience, and exceptional service at every stop.",
    image: "/services/energy/hero.png",
    ctaText: "Find a Station",
  },
  intro: {
    paragraphs: [
      "Energy is the lifeblood of modern society. BOSS Energy operates a network of petrol and convenience stores under the BP banner, providing essential fuel and services to communities across Australia.",
      "With 26+ locations, we're committed to delivering quality products, competitive pricing, and outstanding customer service at every station.",
    ],
  },
  sections: [
    {
      label: "Our Offerings",
      title: "Energy & Convenience",
      description:
        "More than just fuel—we provide a complete range of products and services for travelers and locals alike.",
      services: [
        {
          id: 1,
          title: "Quality Fuels",
          description:
            "Premium BP fuels including unleaded, diesel, and high-performance options for all vehicles.",
          icon: "/services/energy/fuel.png",
        },
        {
          id: 2,
          title: "Convenience Stores",
          description:
            "Well-stocked stores with snacks, beverages, groceries, and everyday essentials.",
          icon: "/services/energy/convenience.png",
        },
        {
          id: 3,
          title: "Car Care",
          description:
            "Car wash facilities, air and water, and automotive products to keep your vehicle in top condition.",
          icon: "/services/energy/carcare.png",
        },
        {
          id: 4,
          title: "Food & Coffee",
          description:
            "Fresh food options and quality coffee to fuel your journey.",
          icon: "/services/energy/coffee.png",
        },
        {
          id: 5,
          title: "Fleet Services",
          description:
            "Fleet card programs and bulk fuel solutions for businesses.",
          icon: "/services/energy/fleet.png",
        },
        {
          id: 6,
          title: "24/7 Operations",
          description:
            "Many locations open around the clock for your convenience.",
          icon: "/services/energy/24-7.png",
        },
      ],
      columns: 3,
    },
  ],
  benefits: {
    title: "Why Choose",
    highlight: "BOSS Energy?",
    description:
      "Trusted fuel and convenience services across Australia.",
    items: [
      {
        id: 1,
        title: "BP Partnership",
        description: "Premium BP fuels you can trust for your vehicle.",
        icon: "/services/energy/bp.png",
      },
      {
        id: 2,
        title: "26+ Locations",
        description: "Convenient locations across Australia.",
        icon: "/services/energy/locations.png",
      },
      {
        id: 3,
        title: "Competitive Pricing",
        description: "Fair prices on fuel and convenience items.",
        icon: "/services/energy/pricing.png",
      },
      {
        id: 4,
        title: "Clean Facilities",
        description: "Well-maintained stations with clean restrooms.",
        icon: "/services/energy/clean.png",
      },
    ],
  },
  cta: {
    label: "On the Road",
    title: "Find Your Nearest BOSS Station",
    description:
      "Quality fuel, great prices, and friendly service at every location. Visit us today!",
    primaryButton: { text: "Find Locations", link: "/locations" },
    secondaryButton: { text: "Fleet Solutions", link: "/contact" },
    image: "/littleboy.png",
  },
};

export default function EnergyPage() {
  return <ServicePageTemplate config={config} />;
}
