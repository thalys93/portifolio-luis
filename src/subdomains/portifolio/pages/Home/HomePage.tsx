import HeroSection from "@/subdomains/portifolio/components/HeroSection";
import PublicLayout from "../../layout/public-layout";
import AboutSection from "@/subdomains/portifolio/components/AboutSection";
import JourneySection from "@/subdomains/portifolio/components/JourneySection";
import SkillsSection from "@/subdomains/portifolio/components/SkillsSection";
import ContactSection from "@/subdomains/portifolio/components/ContactSection";
import StatsSection from "@/subdomains/portifolio/components/StatsSection";

function HomePage() {
  return (
    <PublicLayout>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <SkillsSection />
      <JourneySection />
      <ContactSection />
    </PublicLayout>
  );
}

export default HomePage;
