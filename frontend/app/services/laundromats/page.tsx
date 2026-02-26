import ServicePageTemplate, {
  ServicePageConfig,
} from "@/components/ServicePageTemplate";

const config: ServicePageConfig = {
  hero: {
    label: "",
    title: "Transform Your Laundry Day Blues into a Breeze with Our Advanced Laundromats!",
    highlight: "Our Advanced Laundromats!",
    description:"From Site Discovery to Project Handoff, We're Your Steadfast Partner, Bringing Your Vision to Life!",
    image:"/banner/laundromats.png",
    ctaText: "Explore Programs",
  },
  intro: {
    paragraphs: [
      "Tired of laundry day blues? Let us take the stress out of your laundry routine. Our state-of-the-art laundromats offer you a convenient, efficient, and enjoyable experience. Whether you’re a professional juggling work commitments, a student with a packed schedule, or a family managing multiple tasks, we have everything you need to tackle your laundry with ease.","Our self-service laundries are equipped with the latest technology, featuring high-efficiency washers and dryers that not only save time but also deliver exceptional cleaning results.",
          ],
  },
  sections: [
    {
      label: "Boss Aus",
      title: "Simplifying Laundry",
      description:
        "",
      services: [
        {
          id: 1,
          title: "Coin-Operated Machines",
          description:
            "Prefer a hands-on approach? Our easy-to-use coin-operated washers and dryers are available in various sizes to accommodate any load, from a few items to large batches. Enjoy the flexibility to do your laundry on your own terms.",
          icon: "/services/education/vocational.png",
        },
        {
          id: 2,
          title: "Auto Soap and Softener Dispensing",
          description:
            "Experience the ultimate convenience with our auto soap and softener dispensing system. Our machines are equipped to automatically dispense the right amount of detergent and fabric softener for each load, ensuring optimal cleaning without the hassle. Just load your laundry, select your settings, and let us take care of the rest!",
          icon: "/services/education/corporate.png",
        },
        {
          id: 3,
          title: "Laundromats",
          description:
            "Forgot your detergent but want to add your own? No worries! Our laundromats are fully stocked with essential laundry supplies, including detergents, fabric softeners, and dryer sheets. Grab what you need while you’re here and make laundry day effortless!",
          icon: "/services/education/professional.png",
        },
        {
          id: 4,
          title: "Bulk Laundry",
          description:
            "Have a large load to wash? Our laundromats are equipped to handle bulk laundry with ease. Whether it’s bedding, towels, or a week’s worth of clothes, we’ve got the capacity to get the job done efficiently and effectively.",
          icon: "/services/education/online.png",
        },
      ],
      columns: 2,
    },
  ],
  accordion: {
    title: "Here's What Sets Us",
    highlight: "Apart",
    image: "/banner/whyus.png",
    items: [
      {
        id: 1,
        title: "State-of-the-art Facilities",
        description:
          "Our laundromats feature the latest high-efficiency washers and dryers, ensuring your clothes are cleaned and dried to perfection every time.",
      },
      {
        id: 2,
        title: "Convenient Locations",
        description:
          "With multiple locations across the city, you're never far from a clean and comfortable laundry experience. Find one near you!",
      },
      {
        id: 3,
        title: "Flexible Operating Hours",
        description:
          "Extended hours to fit your busy lifestyle—wash whenever you want! Early morning or late night, we're here for you.",
      },
      {
        id: 4,
        title: "Eco-Friendly Practices",
        description:
          "We care about the environment. Our machines use less water and energy, and we offer eco-friendly detergent options.",
      },
    ],
  },
  cta: {
    label: "Visit Us Today",
    title: "Ready for a Better Laundry Experience?",
    description:
      "Find your nearest BOSS Laundromat and enjoy convenient, efficient laundry services.",
    primaryButton: { text: "Find Locations", link: "/contact" },
    // secondaryButton: { text: "Contact Us", link: "/contact" },
    image: "/littleboy.png",
  },
};

export default function LaundromatPage() {
  return <ServicePageTemplate config={config} />;
}
