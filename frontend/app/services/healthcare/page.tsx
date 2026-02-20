import ServicePageTemplate, {
  ServicePageConfig,
} from "@/components/ServicePageTemplate";

const config: ServicePageConfig = {
  hero: {
    label: "Healthcare Services",
    title: "Caring for Communities,",
    highlight: "Transforming Lives!",
    description:
      "Delivering accessible, quality healthcare services through our network of medical centers and healthcare professionals.",
    image: "/services/healthcare/hero.png",
    ctaText: "Learn More",
  },
  intro: {
    paragraphs: [
      "Healthcare is more than a service—it's a commitment to improving lives. BOSS Healthcare operates medical centers that provide comprehensive care to communities across Australia.",
      "Our facilities combine modern medical technology with compassionate care, ensuring patients receive the best possible treatment in welcoming environments.",
    ],
  },
  sections: [
    {
      label: "Medical Services",
      title: "Healthcare Solutions",
      description:
        "A wide range of healthcare services delivered by qualified professionals in state-of-the-art facilities.",
      services: [
        {
          id: 1,
          title: "General Practice",
          description:
            "Comprehensive primary care services including consultations, health checks, and preventive care.",
          icon: "/services/healthcare/gp.png",
        },
        {
          id: 2,
          title: "Specialist Services",
          description:
            "Access to specialists across cardiology, dermatology, orthopedics, and more.",
          icon: "/services/healthcare/specialist.png",
        },
        {
          id: 3,
          title: "Pathology & Diagnostics",
          description:
            "On-site pathology and diagnostic imaging for quick and accurate results.",
          icon: "/services/healthcare/pathology.png",
        },
        {
          id: 4,
          title: "Mental Health",
          description:
            "Counseling and mental health support services for individuals and families.",
          icon: "/services/healthcare/mental.png",
        },
        {
          id: 5,
          title: "Allied Health",
          description:
            "Physiotherapy, occupational therapy, and other allied health services.",
          icon: "/services/healthcare/allied.png",
        },
        {
          id: 6,
          title: "Telehealth",
          description:
            "Virtual consultations for convenient access to healthcare from anywhere.",
          icon: "/services/healthcare/telehealth.png",
        },
      ],
      columns: 3,
    },
  ],
  benefits: {
    title: "Why Choose",
    highlight: "BOSS Healthcare?",
    description:
      "Quality healthcare delivered with compassion and professionalism.",
    items: [
      {
        id: 1,
        title: "Qualified Doctors",
        description: "Experienced GPs and specialists committed to patient care.",
        icon: "/services/healthcare/doctors.png",
      },
      {
        id: 2,
        title: "Modern Facilities",
        description: "State-of-the-art medical centers with latest equipment.",
        icon: "/services/healthcare/facilities.png",
      },
      {
        id: 3,
        title: "Bulk Billing",
        description: "Affordable healthcare with bulk billing options available.",
        icon: "/services/healthcare/billing.png",
      },
      {
        id: 4,
        title: "Patient-Centered",
        description: "Personalized care focused on your health and wellbeing.",
        icon: "/services/healthcare/patient.png",
      },
    ],
  },
  cta: {
    label: "Your Health Matters",
    title: "Ready to Prioritize Your Health?",
    description:
      "Book an appointment at one of our medical centers and experience healthcare that cares.",
    primaryButton: { text: "Book Appointment", link: "/contact" },
    secondaryButton: { text: "Find a Center", link: "/locations" },
    image: "/littleboy.png",
  },
};

export default function HealthcarePage() {
  return <ServicePageTemplate config={config} />;
}
