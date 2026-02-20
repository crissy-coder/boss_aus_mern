import ServicePageTemplate, {
  ServicePageConfig,
} from "@/components/ServicePageTemplate";

const config: ServicePageConfig = {
  hero: {
    label: "Construction",
    title: "A Force in Australian Construction,",
    highlight: "Crafting Spaces Where Dreams Take Shape!",
    description:
      "From Site Discovery to Project Handoff, We're Your Steadfast Partner, Bringing Your Vision to Life!",
    image: "/banner/construction.png",
    ctaText: "Start Your Project",
  },
  intro: {
    paragraphs: [
      "Elite Construction & Projects, a proud subsidiary of the BOSS Group, stands as a beacon of excellence in the Australian construction industry. With a rich legacy spanning 15 + years, we specialize in crafting both commercial and residential masterpieces that cater to a diverse range of needs.",
      " Whether you're buying your first home, downsizing for retirement, building your dream lifestyle home, a seasoned investor, or a business owner hunting a new workspace - we handle everything from finding the perfect site to handing you the keys."
    ],
  },
  sections: [
    {
      label: "BOSS AUS",
      title: "Construction Services",
      description: "",
      services: [
        {
          id: 1,
          title: "Commercial",
          description:
            "Office buildings, retail stores, restaurants, warehouses, medical facilities, shopping malls, educational institutions, boutique builds and more",
          icon: "/serviceicons/building.png",
        },
        {
          id: 2,
          title: "Residential",
          description:
            "Single-family homes, townhouses, apartments, duplexes, luxury villas, bungalows, cottages, boutique builds and more",
          icon: "/serviceicons/realestate.png",
        },
      ],
      columns: 2,
    },
    {
      label: "",
      title: "Your Reliable Partner in",
      highlight: "Every Phase",
      Subtitle: " of Construction",
      description:
        "A streamlined approach to bring your construction project from concept to completion.",
      services: [
        {
          id: 1,
          title: "Strategic Site Discovery & Buyer Advocacy",
          description:
            "Find the perfect location with our expert site discovery and buyer advocacy. We navigate the market to find prime sites tailored perfectly to your needs. Fiercely advocating for your interests, our professionals ensure a seamless acquisition process from start to finish.",
          icon: "/serviceicons/location-star.png",
        },
        {
          id: 2,
          title: "Comprehensive Due Diligence",
          description:
            "Rest assured with our meticulous due diligence process. We thoroughly investigate every aspect of your project, from legal and financial checks to environmental and structural assessments. By identifying and mitigating potential risks, we ensure a solid foundation for your project's success.",
          icon: "/serviceicons/budget.png",
        },
        {
          id: 3,
          title: "Streamlined Development Approvals",
          description:
            "Fast-track your project with our streamlined development approval process. We manage all the paperwork, collaborate with regulatory authorities, and navigate complex approval procedures. Our experts ensure timely, hassle-free approvals, allowing you to focus on what matters most - bringing your vision to life.",
          icon: "/serviceicons/relation.png",
        },
        {
          id: 4,
          title: "Precise Cost Estimation",
          description:
            "Confidently stay within your budget with our meticulous cost estimation services. We deliver precise, transparent projections that account for every detail of your project. Our thorough approach ensures you have a clear understanding of costs from start to finish, empowering informed decision-making and financial control.",
          icon: "/serviceicons/bill.png",
        },
      ],
      columns: 2,
    },
  ],
  // benefits: {
  //   title: "Why Choose",
  //   highlight: "BOSS Construction?",
  //   description:
  //     "We bring expertise, reliability, and quality to every project.",
  //   items: [
  //     {
  //       id: 1,
  //       title: "Licensed & Insured",
  //       description: "Fully licensed builders with comprehensive insurance coverage.",
  //       icon: "/services/construction/licensed.png",
  //     },
  //     {
  //       id: 2,
  //       title: "Quality Materials",
  //       description: "We use only premium materials from trusted suppliers.",
  //       icon: "/services/construction/materials.png",
  //     },
  //     {
  //       id: 3,
  //       title: "On-Time Delivery",
  //       description: "Committed to meeting deadlines without compromising quality.",
  //       icon: "/services/construction/ontime.png",
  //     },
  //     {
  //       id: 4,
  //       title: "Transparent Pricing",
  //       description: "Clear quotes with no hidden costs or surprise charges.",
  //       icon: "/services/construction/pricing.png",
  //     },
  //   ],
  // },
  cta: {
    label: "Start Building",
    title: "Ready to Build Your Dream Project?",
    description:
      "Contact us today for a free consultation and quote. Let's bring your vision to life.",
    primaryButton: { text: "Get Free Quote", link: "/contact" },
    secondaryButton: { text: "View Portfolio", link: "/portfolio" },
    image: "/littleboy.png",
  },
};

export default function ConstructionPage() {
  return <ServicePageTemplate config={config} />;
}
