import ServicePageTemplate, {
  ServicePageConfig,
} from "@/components/ServicePageTemplate";

const config: ServicePageConfig = {
  hero: {
    label: "IT Services",
    title: "Empowering Your Business with",
    highlight: "Smart Technology Solutions!",
    description:
      "From cloud computing to cybersecurity, we deliver cutting-edge IT solutions that drive growth and efficiency.",
    image: "/services/it/hero.png",
    ctaText: "Explore Solutions",
  },
  intro: {
    paragraphs: [
      "In today's digital landscape, having the right technology partner is crucial for business success. BOSS IT Services provides comprehensive technology solutions tailored to your unique needs.",
      "Our team of certified professionals brings expertise across cloud, security, development, and support services to help you stay ahead of the competition.",
    ],
  },
  sections: [
    {
      label: "Technology Solutions",
      title: "IT Services",
      description:
        "End-to-end technology services designed to modernize your operations and secure your digital assets.",
      services: [
        {
          id: 1,
          title: "Cloud Solutions",
          description:
            "Migrate to the cloud with AWS, Azure, or Google Cloud. We handle setup, migration, and ongoing management.",
          icon: "/services/it/cloud.png",
        },
        {
          id: 2,
          title: "Cybersecurity",
          description:
            "Protect your business with advanced security solutions including threat detection, firewalls, and compliance.",
          icon: "/services/it/security.png",
        },
        {
          id: 3,
          title: "Software Development",
          description:
            "Custom web and mobile applications built with modern technologies to meet your business requirements.",
          icon: "/services/it/development.png",
        },
        {
          id: 4,
          title: "IT Support",
          description:
            "24/7 helpdesk and technical support to keep your systems running smoothly.",
          icon: "/services/it/support.png",
        },
        {
          id: 5,
          title: "Network Infrastructure",
          description:
            "Design, implementation, and management of robust network solutions for your organization.",
          icon: "/services/it/network.png",
        },
        {
          id: 6,
          title: "Data Analytics",
          description:
            "Turn your data into actionable insights with our analytics and business intelligence services.",
          icon: "/services/it/analytics.png",
        },
      ],
      columns: 3,
    },
  ],
  benefits: {
    title: "Why Choose",
    highlight: "BOSS IT?",
    description:
      "Expert technology solutions backed by certified professionals.",
    items: [
      {
        id: 1,
        title: "Certified Experts",
        description: "AWS, Azure, and Cisco certified professionals on our team.",
        icon: "/services/it/certified.png",
      },
      {
        id: 2,
        title: "24/7 Support",
        description: "Round-the-clock monitoring and support for critical systems.",
        icon: "/services/it/24-7.png",
      },
      {
        id: 3,
        title: "Scalable Solutions",
        description: "Flexible services that grow with your business needs.",
        icon: "/services/it/scalable.png",
      },
      {
        id: 4,
        title: "Cost Effective",
        description: "Reduce IT costs while improving performance and security.",
        icon: "/services/it/cost.png",
      },
    ],
  },
  cta: {
    label: "Let's Connect",
    title: "Ready to Transform Your IT?",
    description:
      "Get a free technology assessment and discover how we can optimize your IT infrastructure.",
    primaryButton: { text: "Free IT Assessment", link: "/contact" },
    secondaryButton: { text: "Our Solutions", link: "/services" },
    image: "/littleboy.png",
  },
};

export default function ITServicesPage() {
  return <ServicePageTemplate config={config} />;
}
