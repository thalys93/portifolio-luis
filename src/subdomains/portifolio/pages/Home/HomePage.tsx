import HeroSection from "@/components/HeroSection";
import PublicLayout from "../../layout/public-layout";
import AboutSection from "@/components/AboutSection";
import JourneySection from "@/components/JourneySection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";

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