import HeroSection from "@/subdomains/portifolio/components/HeroSection";
import PublicLayout from "../../layout/public-layout";
import AboutSection from "@/subdomains/portifolio/components/AboutSection";
import ProjectsSection from "@/subdomains/portifolio/components/ProjectsSection";
import ServicesSection from "@/subdomains/portifolio/components/ServicesSection";
import ContactSection from "@/subdomains/portifolio/components/ContactSection";

function HomePage() {
  return (
    <PublicLayout>
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
    </PublicLayout>
  );
}

export default HomePage;
