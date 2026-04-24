import { trackEvent } from "@/services/firebase";
import { User, Code2, Lightbulb } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SectionHeader } from "@/components/SectionHeader";

const JourneySection = () => {
  const { t } = useTranslation();
  useEffect(() => {
    trackEvent("journey_section_viewed", { section: "journey" });
  }, []);

  return (
    <section
      id="journey"
      className="border-t border-border/60 bg-muted/10 py-20 px-4 sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={t("navigation.journey")}
          title={t("journey.title_my")}
          highlight={t("journey.title_journey")}
          description={t("journey.description")}
        />

        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="relative border border-border/70 bg-card/30 p-1">
              <img
                src="me_2.png"
                alt="Thalys Xavier - Desenvolvedor Full Stack"
                className="aspect-[4/5] w-full object-cover object-top"
              />
            </div>
          </div>

          <div className="space-y-10">
            {[
              {
                Icon: Lightbulb,
                title: t("journey.firstClick"),
                body: t("journey.firstDescription"),
              },
              {
                Icon: Code2,
                title: t("journey.continousLearning"),
                body: t("journey.continousDescription"),
              },
              {
                Icon: User,
                title: t("journey.connectingPeople"),
                body: t("journey.connectingPeopleDescription"),
              },
            ].map(({ Icon, title, body }) => (
              <div key={title} className="flex gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-border/80 text-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              </div>
            ))}

            <div className="border border-primary/30 bg-card/40 p-6">
              <p className="text-sm italic leading-relaxed text-muted-foreground">
                {t("journey.quote")}
              </p>
              <p className="mt-4 text-sm font-medium text-primary">{t("journey.quoteConnect")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
