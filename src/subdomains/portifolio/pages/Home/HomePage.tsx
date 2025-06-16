import HeroSection from "@/subdomains/portifolio/components/HeroSection";
import PublicLayout from "../../layout/public-layout";
import AboutSection from "@/subdomains/portifolio/components/AboutSection";
import JourneySection from "@/subdomains/portifolio/components/JourneySection";
import SkillsSection from "@/subdomains/portifolio/components/SkillsSection";
import ProjectsSection from "@/subdomains/portifolio/components/ProjectsSection";
import ContactSection from "@/subdomains/portifolio/components/ContactSection";

function HomePage() {
  return (
    <PublicLayout>
      <HeroSection/>
      <AboutSection/>
      <JourneySection/>
      <SkillsSection/>
      <ProjectsSection/>
      <ContactSection/>      
    </PublicLayout>
  )
}

export default HomePage