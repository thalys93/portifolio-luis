import { trackEvent } from "@/services/firebase";
import { Code, Coffee, Lightbulb, Users } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SectionHeader } from "@/components/SectionHeader";

const AboutSection = () => {
  const { t } = useTranslation();
  const highlights = [
    {
      icon: Code,
      title: t("about.cards.cleanCode"),
      description: t("about.cards.cleanCodeDescription"),
    },
    {
      icon: Lightbulb,
      title: t("about.cards.innovation"),
      description: t("about.cards.innovationDescription"),
    },
    {
      icon: Users,
      title: t("about.cards.collaboration"),
      description: t("about.cards.collaborationDescription"),
    },
    {
      icon: Coffee,
      title: t("about.cards.dedication"),
      description: t("about.cards.dedicationDescription"),
    },
  ];

  useEffect(() => {
    trackEvent("about_section_viewed", { section: "about" });
  }, []);

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={t("navigation.about")}
          title={t("about.title_about")}
          highlight={t("about.title_me")}
          description={undefined}
        />

        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="border border-border/80 bg-card/40 p-8 sm:p-10">
            <h3 className="font-display text-2xl font-semibold text-primary sm:text-3xl">
              {t("about.cardTitle")}
            </h3>

            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>{t("about.cardParagraph1")}</p>
              <p>{t("about.cardParagraph2")}</p>
              <p>{t("about.cardParagraph3")}</p>
            </div>

            <div className="mt-10 border-t border-border/70 pt-10">
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {t("about.primaryTechs")}
              </h4>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "React",
                  "Node.js",
                  "TypeScript",
                  "React Native",
                  "PostgreSQL",
                  "MongoDB",
                  "Nest.js",
                  "Docker",
                ].map((tech) => (
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

          <div className="space-y-4">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="group flex gap-5 border border-border/60 bg-card/30 p-6 transition-colors hover:border-primary/40"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-primary/50 text-primary">
                  <item.icon className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <h4 className="font-display text-xl font-semibold text-foreground">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
