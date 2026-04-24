import { trackEvent } from "@/services/firebase";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FirebaseDB } from "@/services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { getIcon } from "@/shared/consts/Icons";
import { SectionHeader } from "@/components/SectionHeader";

const SkillsSection = () => {
  const { t } = useTranslation();

  const [skillGroups, setSkillGroups] = useState<any[]>([]);
  const otherSkills = [
    "Agile Methods",
    "Scrum",
    "TDD",
    "Clean Architecture",
    "Microservices",
    "RESTful APIs",
    "WebSockets",
    "Performance Optimization",
    "SEO",
    "Accessibility",
  ];
  const splitIndex = Math.ceil(otherSkills.length / 2);
  const firstRowBaseSkills = otherSkills.slice(0, splitIndex);
  const secondRowBaseSkills = otherSkills.slice(splitIndex);
  const firstRowSkills = [...firstRowBaseSkills, ...firstRowBaseSkills];
  const secondRowSkills = [...secondRowBaseSkills, ...secondRowBaseSkills];

  useEffect(() => {
    trackEvent("skills_section_viewed", { section: "skills" });
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDocs(collection(FirebaseDB, "skills"));
        const items = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
        setSkillGroups(items);
      } catch { }
    };
    load();
  }, []);

  return (
    <section
      id="skills"
      className="border-t border-border/60 bg-muted/10 py-20 px-4 sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={t("navigation.habilities")}
          title={t("skills.title_my")}
          highlight={t("skills.title_skills")}
          description={t("skills.description")}
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups
            .sort((a, b) => a.order - b.order)
            .map((category) => {
              const gradient = category?.color
                ? `bg-gradient-to-r ${category.color}`
                : "bg-primary";
              const IconComp = getIcon(category?.icon);

              return (
                <div
                  key={category.id || category.title}
                  className="border border-border/70 bg-card/40 p-6 transition-colors hover:border-primary/35"
                >
                  <div className="mb-6 flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-sm ${gradient}`}
                    >
                      {React.cloneElement(IconComp, {
                        className: "h-6 w-6 text-primary-foreground",
                      })}
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {category?.title ?? "—"}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {(category?.skills ?? []).map((skill: any, skillIndex: number) => (
                      <div key={`${category.id}-${skill?.name}-${skillIndex}`}>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">
                            {skill?.name ?? "—"}
                          </span>
                          <span className="text-xs font-semibold tabular-nums text-primary">
                            {Number(skill?.level ?? 0)}%
                          </span>
                        </div>
                        <div className="h-1 w-full overflow-hidden bg-muted">
                          <div
                            className={`h-full ${gradient} transition-all duration-700`}
                            style={{ width: `${Number(skill?.level ?? 0)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>

        <div className="mt-16 border-t border-border/60 pt-14">
          <h3 className="text-center font-display text-2xl font-semibold text-primary">
            {t("skills.otherSkills")}
          </h3>
          <div className="mt-8 space-y-3 md:hidden">
            <div className="overflow-hidden">
              <div className="flex w-max animate-[skills-marquee-left_30s_linear_infinite] gap-2 pr-2">
                {firstRowSkills.map((skill, index) => (
                  <span
                    key={`first-row-${skill}-${index}`}
                    className="whitespace-nowrap border border-border/70 px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="overflow-hidden">
              <div className="ml-[-50%] flex w-max animate-[skills-marquee-right_26s_linear_infinite] gap-2 pr-2">
                {secondRowSkills.map((skill, index) => (
                  <span
                    key={`second-row-${skill}-${index}`}
                    className="whitespace-nowrap border border-border/70 px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 hidden space-y-3 md:block">
            <div className="flex flex-wrap justify-center gap-2">
              {firstRowBaseSkills.map((skill) => (
                <span
                  key={`desktop-first-row-${skill}`}
                  className="whitespace-nowrap border border-border/70 px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {secondRowBaseSkills.map((skill) => (
                <span
                  key={`desktop-second-row-${skill}`}
                  className="whitespace-nowrap border border-border/70 px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
          @keyframes skills-marquee-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          @keyframes skills-marquee-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        `}
      </style>
    </section>
  );
};

export default SkillsSection;
