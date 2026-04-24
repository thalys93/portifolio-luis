import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { DocumentHead } from "@/components/DocumentHead";
import {
  InteractiveMenu,
  type InteractiveMenuItem,
} from "@/components/ui/modern-mobile-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { Briefcase, Home, Mail, User, Wrench } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

type layoutProps = {
  children: React.ReactNode;
};

function PublicLayout({ children }: layoutProps) {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const mobileItems = React.useMemo<InteractiveMenuItem[]>(
    () => [
      { id: "home", label: t("navigation.home"), icon: Home },
      { id: "about", label: t("navigation.about"), icon: User },
      { id: "skills", label: t("navigation.habilities"), icon: Wrench },
      { id: "projects", label: t("navigation.projects"), icon: Briefcase, to: "/projects" },
      { id: "contact", label: t("navigation.contact"), icon: Mail },
    ],
    [t]
  );

  const handleMobileItemClick = React.useCallback((item: InteractiveMenuItem) => {
    if (item.id === "projects") {
      navigate("/projects");
      return;
    }

    if (location.pathname !== "/") {
      navigate("/");
      window.setTimeout(() => {
        document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
      }, 80);
      return;
    }

    const element = document.getElementById(item.id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.pathname, navigate]);

  return (
    <main
      className={`relative min-h-screen bg-background text-foreground ${
        isMobile ? "pb-24" : ""
      }`}
    >
      <DocumentHead />
      <Navigation />
      {children}
      <Footer />
      {isMobile ? (
        <InteractiveMenu items={mobileItems} onItemClick={handleMobileItemClick} />
      ) : null}
    </main>
  );
}

export default PublicLayout;
