import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeader } from "@/components/SectionHeader";
import { usePublicServices } from "@/hooks/use-services";
import {
  formatServicePriceRange,
  translateServiceDeadline,
  translateServiceName,
} from "@/lib/service-i18n";
import { trackEvent } from "@/services/firebase";

const ServicesSection = () => {
  const { t, i18n } = useTranslation();
  const { data: services, isLoading, isError } = usePublicServices();
  const showFallback = isError || (!isLoading && (services?.length ?? 0) === 0);

  useEffect(() => {
    trackEvent("services_section_viewed", { section: "services" });
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="bg-surface-solid px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={t("services.eyebrow")}
          title={t("services.title")}
          highlight={t("services.highlight")}
          description={t("services.description")}
        />

        {isLoading ? (
          <div className="border-y border-border/70">
            <div className="hidden grid-cols-[3.5rem_1fr_10rem_12rem] gap-8 border-b border-border/50 py-3 md:grid">
              <Skeleton className="h-3 w-6" />
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-16 justify-self-end" />
              <Skeleton className="h-3 w-16 justify-self-end" />
            </div>
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="grid gap-4 border-b border-border/50 py-7 last:border-b-0 md:grid-cols-[3.5rem_1fr_10rem_12rem] md:items-start md:gap-8"
              >
                <Skeleton className="h-6 w-8" />
                <div className="space-y-3">
                  <Skeleton className="h-7 w-2/5" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <Skeleton className="h-4 w-24 md:justify-self-end" />
                <Skeleton className="h-4 w-28 md:justify-self-end" />
              </div>
            ))}
          </div>
        ) : showFallback ? (
          <div className="border border-border/70 px-6 py-12 text-center">
            <p className="text-base text-muted-foreground">{t("services.fallback")}</p>
            <Button
              size="lg"
              className="mt-8 rounded-none bg-primary px-10 text-primary-foreground hover:bg-primary/90"
              onClick={scrollToContact}
            >
              {t("services.cta")}
            </Button>
          </div>
        ) : (
          <div>
            <div
              className="mb-1 hidden grid-cols-[3.5rem_1fr_10rem_12rem] gap-8 border-b border-border/60 pb-3 md:grid"
              aria-hidden
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                #
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {t("services.colService")}
              </span>
              <span className="text-right text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {t("services.colDeadline")}
              </span>
              <span className="text-right text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {t("services.colPrice")}
              </span>
            </div>

            <ul className="border-b border-border/70">
              {(services ?? []).map((service, index) => {
                const priceRange = formatServicePriceRange(service, i18n.language, t);
                const label = translateServiceName(service, t, (key) => i18n.exists(key));
                const deadline = translateServiceDeadline(service.typicalDeadline, t, (key) =>
                  i18n.exists(key)
                );
                const indexLabel = String(index + 1).padStart(2, "0");

                return (
                  <li
                    key={service.id}
                    className="grid gap-3 border-t border-border/70 py-7 md:grid-cols-[3.5rem_1fr_10rem_12rem] md:items-start md:gap-8 md:py-8"
                  >
                    <span className="font-display text-xl font-medium tabular-nums tracking-tight text-foreground/55 md:text-2xl">
                      {indexLabel}
                    </span>

                    <div className="min-w-0">
                      <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]">
                        {label}
                      </h3>
                      {service.scopeIn ? (
                        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                          {service.scopeIn}
                        </p>
                      ) : null}
                    </div>

                    <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3 md:block md:text-right">
                      {deadline ? (
                        <div>
                          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground md:hidden">
                            {t("services.colDeadline")}
                          </p>
                          <p className="mt-0.5 text-sm text-foreground/85 md:mt-1">{deadline}</p>
                        </div>
                      ) : null}
                      {priceRange ? (
                        <div className="md:hidden">
                          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                            {t("services.colPrice")}
                          </p>
                          <p className="mt-0.5 text-base font-medium text-foreground">{priceRange}</p>
                        </div>
                      ) : null}
                    </div>

                    <div className="hidden md:block md:pt-1 md:text-right">
                      {priceRange ? (
                        <p className="text-base font-medium tabular-nums tracking-tight text-foreground">
                          {priceRange}
                        </p>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {!showFallback ? (
          <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <p className="max-w-md text-center text-sm text-muted-foreground sm:text-left">
              {t("services.note")}
            </p>
            <Button
              size="lg"
              className="rounded-none bg-primary px-10 text-primary-foreground hover:bg-primary/90"
              onClick={scrollToContact}
            >
              {t("services.cta")}
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default ServicesSection;
