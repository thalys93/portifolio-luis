/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useMemo } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/shared/context/ThemeContext";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();
  const { colorMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = useMemo(
    () => [
      { id: "home", label: t("navigation.home") },
      { id: "about", label: t("navigation.about") },
      { id: "journey", label: t("navigation.journey") },
      { id: "skills", label: t("navigation.habilities") },
      { id: "projects", label: t("navigation.projects") },
      { id: "contact", label: t("navigation.contact") },
    ],
    [t]
  );

  useEffect(() => {
    const isProjectsRoute =
      location.pathname.startsWith("/projects") || location.pathname.startsWith("/project/");

    if (isProjectsRoute) {
      setActiveSection("projects");
      setIsScrolled(true);
      return;
    }

    if (location.pathname !== "/") {
      setActiveSection("home");
      setIsScrolled(true);
      return;
    }

    setIsScrolled(window.scrollY > 24);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/") return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);

      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname, navItems]);

  const scrollToElementWithOffset = (element: HTMLElement) => {
    const HEADER_OFFSET = 92;
    const top = Math.max(0, element.offsetTop - HEADER_OFFSET);
    window.scrollTo({ top, behavior: "smooth" });
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "projects") {
      navigate("/projects");
      return;
    }

    if (location.pathname !== "/") {
      navigate("/");
      window.setTimeout(() => {
        const target = document.getElementById(sectionId);
        if (target) {
          scrollToElementWithOffset(target);
        }
      }, 80);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      scrollToElementWithOffset(element);
    }
  };

  const isHomeLightHero = colorMode === "light" && activeSection === "home" && !isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color] duration-300 ${
        isScrolled ? "border-b border-border/70 bg-background/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav aria-label="Principal" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4 md:h-[4.25rem]">
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            className="shrink-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span
              className={cn(
                "font-display text-xl font-semibold tracking-tight sm:text-2xl",
                isHomeLightHero
                  ? "text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
                  : "text-foreground"
              )}
            >
              Thalys<span className="text-primary">.</span>
            </span>
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "px-3 py-2 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isHomeLightHero
                    ? activeSection === item.id
                      ? "text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]"
                      : "text-white/80 hover:text-white"
                    : activeSection === item.id
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
