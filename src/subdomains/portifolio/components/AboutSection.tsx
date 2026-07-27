import { trackEvent } from "@/services/firebase";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SectionHeader } from "@/components/SectionHeader";
import { SITE } from "@/shared/consts/site";

const AboutSection = () => {
  const { t } = useTranslation();

  useEffect(() => {
    trackEvent("about_section_viewed", { section: "about" });
  }, []);

  return (
    <section id="about" className="bg-surface-solid px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={t("navigation.about")}
          title={t("about.title_about")}
          highlight={t("about.title_me")}
        />

        <div className="mx-auto max-w-3xl text-center lg:text-left">
          <h3 className="font-display text-3xl font-semibold text-primary sm:text-4xl">
            {t("about.cardTitle")}
          </h3>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>{t("about.cardParagraph1", { years: SITE.yearsExperience })}</p>
            <p>{t("about.cardParagraph2")}</p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-foreground/90 lg:justify-start">
            <p>{t("about.statYears", { years: SITE.yearsExperience })}</p>
            <p className="text-muted-foreground">{t("about.statFocus")}</p>
          </div>

          <div className="mt-10 border-t border-border/70 pt-8">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {t("about.primaryTechs")}
            </h4>
            <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
              {SITE.primaryTechs.map((tech) => (
                <span
                  key={tech}
                  className="border border-border/80 px-3 py-1 text-xs font-medium text-foreground/90"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
