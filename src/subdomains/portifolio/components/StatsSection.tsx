import { trackEvent } from "@/services/firebase";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function StatsSection() {
  const { t } = useTranslation();

  useEffect(() => {
    trackEvent("stats_section_viewed", { section: "stats" });
  }, []);

  const stats = [
    { number: "10+", label: t("about.expCards.projectsDone") },
    { number: "5+", label: t("about.expCards.yearsOfExperience") },
    { number: "20+", label: t("about.expCards.clientSatisfaction") },
    { number: "100%", label: t("about.expCards.commitment") },
  ];

  return (
    <section id="stats" className="border-y border-border/70 bg-muted/15 py-16 sm:py-20">
      <h2 className="sr-only">Indicadores</h2>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center md:border-l md:border-border/60 md:first:border-l-0 md:pl-10 md:first:pl-0"
            >
              <p className="font-display text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
                {stat.number}
              </p>
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
