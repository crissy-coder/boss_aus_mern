import HeroSection from "@/components/HeroSection";
import TimelineSection from "@/components/TimelineSection";
import ImpactSection from "@/components/ImpactSection";
import ServicesSection from "@/components/ServicesSection";

export default function Home() {
  return (
    <div className="page-pattern min-h-screen bg-theme-section">
      <HeroSection />
      <TimelineSection />
      <ImpactSection />
      <ServicesSection />
    </div>
  );
}