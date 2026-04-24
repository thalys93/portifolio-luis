import { ArrowDown, Github, Instagram, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { trackEvent } from "@/services/firebase";
import { useTheme } from "@/shared/context/ThemeContext";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";

const PORTRAIT_URL = "me.png";

const HeroSection = () => {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  const { t } = useTranslation();
  const { colorMode } = useTheme();
  const isMobile = useIsMobile();
  const isLight = colorMode === "light";
  const navigate = useNavigate();

  useEffect(() => {
    trackEvent("hero_section_viewed", { section: "hero" });
  }, []);

  return (
    <section
      id="home"
      className="relative isolate min-h-screen overflow-hidden bg-background text-foreground opacity-100 selection:bg-primary/25 selection:text-foreground"
    >      
      <div className="absolute inset-0" aria-hidden>        
        <img
          src={PORTRAIT_URL}
          alt=""
          className={"h-full w-full object-cover object-center brightness-[0.68] contrast-[0.9]"}
        />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-b",
            isLight
              ? "from-background/72 via-background/34 to-background/10"
              : "from-black/65 via-black/40 to-black/80"
          )}
        />
        
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 h-[min(70%,480px)] bg-gradient-to-t",
            isLight
              ? "from-background/92 via-background/58 to-transparent"
              : "from-black/75 via-black/35 to-transparent"
          )}
        />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-0 px-4 pb-28 pt-[4.5rem] sm:px-6 sm:pb-32 md:pb-36 md:pt-24">
        <div className="mx-auto w-full max-w-3xl space-y-4 pb-2 sm:space-y-5">          
          <div className="text-center">
            <p
              className={cn(
                "mb-2 uppercase",
                isMobile ? "text-[13px] tracking-[0.24em]" : "text-[11px] tracking-[0.35em]",
                isLight
                  ? "font-semibold text-white/95 drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]"
                  : "font-medium text-primary/90 drop-shadow-[0_1px_12px_rgba(0,0,0,0.85)]"
              )}
            >
              {t("hero.title")}
            </p>

            <h1
              className={cn(
                "text-balance",
                isLight
                  ? "drop-shadow-[0_3px_30px_rgba(0,0,0,0.78)]"
                  : "drop-shadow-[0_2px_24px_rgba(0,0,0,0.9)]"
              )}
            >
              <span
                className={cn(
                  "block font-sans leading-[1.05] tracking-tight",
                  isMobile
                    ? "text-[clamp(2.3rem,9vw,3.3rem)]"
                    : "text-[clamp(2rem,6vw,3.75rem)]",
                  isLight ? "font-light text-yellow-200" : "font-extralight text-primary"
                )}
              >
                {t("hero.headline_sans")}
              </span>
              <span
                className={cn(
                  "mt-0.5 block font-display italic leading-[1.02]",
                  isMobile
                    ? "text-[clamp(2.55rem,10vw,3.85rem)]"
                    : "text-[clamp(2.25rem,7vw,4.5rem)]",
                  isLight ? "font-medium text-white" : "font-normal text-primary"
                )}
              >
                {t("hero.headline_serif")}
              </span>
            </h1>

            <p
              className={cn(
                "mx-auto mt-4 max-w-md leading-relaxed sm:mt-5 sm:text-base",
                isMobile ? "text-xl" : "text-sm",
                isLight
                  ? "text-white/90 drop-shadow-[0_2px_16px_rgba(0,0,0,0.72)]"
                  : "text-primary/85 drop-shadow-[0_1px_14px_rgba(0,0,0,0.88)]"
              )}
            >
              {t("hero.description")}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-7">
              <Button
                size="lg"
                className="rounded-none border-0 bg-primary px-8 font-medium text-primary-foreground shadow-none hover:bg-primary/90"
                onClick={() => navigate("/projects")}
              >
                {t("hero.button_one")}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className={cn("rounded-none border-primary/70 px-6 backdrop-blur-sm hover:bg-primary/15 hover:text-primary", isLight ? "bg-black/25 text-white border-white" : "bg-primary/15 text-primary")}
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {t("hero.button_two")}
              </Button>
            </div>

            <div className="mt-6 flex justify-center gap-2 sm:mt-7 sm:gap-3">
              {[
                { href: "https://github.com/thalys93", Icon: Github, label: "GitHub" },
                {
                  href: "https://linkedin.com/in/thalys-dev202/",
                  Icon: Linkedin,
                  label: "LinkedIn",
                },
                { href: "mailto:thalys.dev@gmail.com", Icon: Mail, label: "Email" },
                {
                  href: "https://www.instagram.com/thalys.dev25/",
                  Icon: Instagram,
                  label: "Instagram",
                },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={cn("flex h-10 w-10 items-center justify-center border border-white/25 bg-black/30 backdrop-blur-sm transition-colors hover:border-primary hover:bg-black/45 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:h-11 sm:w-11", isLight ? "text-white" : "text-primary")}
                  aria-label={label}
                >
                  <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-28 bg-gradient-to-t from-background via-background/5 to-transparent md:h-16"
        aria-hidden
      />

      <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 sm:bottom-8">
        <button
          type="button"
          onClick={scrollToAbout}
          className="flex flex-col items-center gap-2 text-[10px] font-medium uppercase tracking-[0.3em] text-primary/80 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)] transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          aria-label="Scroll to about section"
        >
          <span className="hidden sm:inline">Scroll</span>
          <ArrowDown className="h-4 w-4 animate-bounce sm:h-5 sm:w-5" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
