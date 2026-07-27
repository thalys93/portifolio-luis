import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { trackEvent } from "@/services/firebase";
import { SITE } from "@/shared/consts/site";

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  instagram: Instagram,
} as const;

const HeroSection = () => {
  const { t } = useTranslation();

  useEffect(() => {
    trackEvent("hero_section_viewed", { section: "hero" });
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const stackItems = [...SITE.primaryTechs, ...SITE.primaryTechs];

  return (
    <section id="home" className="overflow-x-hidden bg-surface-solid">
      <div className="pb-16 pt-28 md:pb-24 lg:pb-32 lg:pt-36">
        <div className="relative mx-auto flex max-w-6xl flex-col px-4 sm:px-6 lg:block lg:px-8">
          <div className="relative z-10 mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-primary">
              {t("hero.brand")}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">{t("hero.person")}</p>

            <h1 className="mt-6 max-w-2xl text-balance font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:mt-10 xl:text-7xl">
              {t("hero.headline")}
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("hero.description")}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <Button
                size="lg"
                className="rounded-none bg-primary px-6 text-base text-primary-foreground hover:bg-primary/90"
                onClick={scrollToProjects}
              >
                {t("hero.button_one")}
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="rounded-none px-6 text-base text-foreground hover:bg-muted/60 hover:text-foreground"
                onClick={scrollToContact}
              >
                {t("hero.button_two")}
              </Button>
            </div>

            <div className="mt-8 flex justify-center gap-2 lg:justify-start">
              {SITE.socials.map(({ href, label, id }) => {
                const Icon = socialIcons[id];
                return (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex h-10 w-10 items-center justify-center border border-border/80 text-muted-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="pointer-events-none relative mx-auto mt-12 aspect-[3/4] w-full max-w-sm sm:max-w-md lg:absolute lg:inset-y-0 lg:right-0 lg:mx-0 lg:mt-0 lg:aspect-auto lg:h-auto lg:max-w-none lg:w-[42%]">
            <div className="absolute inset-0 overflow-hidden rounded-tl-[2.5rem] rounded-br-[2.5rem] sm:rounded-tl-[3.5rem] sm:rounded-br-[3.5rem] lg:inset-y-0 lg:right-0 lg:left-4">
              <img
                src={SITE.portraitUrl}
                alt={SITE.personName}
                width={720}
                height={960}
                decoding="async"
                className="h-full w-full object-cover object-[center_18%]"
              />
            </div>
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 z-[1] hidden w-28 bg-gradient-to-r from-background via-background/55 to-transparent lg:block"
            />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 z-[1] h-20 bg-gradient-to-t from-background to-transparent lg:hidden"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-border/60 bg-surface-solid pb-14 md:pb-20">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 md:flex-row md:gap-0">
            <div className="md:max-w-44 md:shrink-0 md:border-r md:border-border/70 md:pr-6">
              <p className="text-center text-sm text-muted-foreground md:text-end">
                {t("hero.stackLabel")}
              </p>
            </div>

            <div className="relative w-full overflow-hidden py-4 md:w-[calc(100%-11rem)]">
              <div className="flex w-max animate-[hero-stack-marquee_32s_linear_infinite] gap-14 pr-14 hover:[animation-play-state:paused] motion-reduce:animate-none">
                {stackItems.map((tech, index) => (
                  <span
                    key={`${tech}-${index}`}
                    className="shrink-0 text-sm font-medium uppercase tracking-[0.18em] text-foreground/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
