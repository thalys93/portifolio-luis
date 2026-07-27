import { ArrowRight, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { trackEvent } from "@/services/firebase";
import { SectionHeader } from "@/components/SectionHeader";
import { useFeaturedProjects } from "@/hooks/use-projects";
import { useCategories } from "@/hooks/use-categories";
import { getCategoryName, getProjectText } from "@/lib/project-i18n";
import { Link, useNavigate } from "react-router-dom";

const ProjectsSection = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { data: projects, isLoading } = useFeaturedProjects(4);
  const { data: categories = [] } = useCategories();

  useEffect(() => {
    trackEvent("projects_section_viewed", { section: "projects" });
  }, []);

  return (
    <section id="projects" className="bg-grid-saas px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={t("navigation.projects")}
          title={t("projects.title_my")}
          highlight={t("projects.title_projects")}
          description={t("projects.description")}
        />

        {isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <article key={index} className="border border-border/70 bg-card/30">
                <Skeleton className="h-44 w-full" />
                <div className="space-y-4 p-5">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-8 w-28" />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {(projects ?? []).map((project, index) => {
              const text = getProjectText(project, i18n.language, t);
              return (
                <article
                  key={project.id}
                  onClick={() => navigate(`/projects/${project.id}`)}
                  className="group flex cursor-pointer flex-col border border-border/70 bg-card/25 transition-colors duration-300 hover:border-primary/40"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="relative h-44 overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={text.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="grid h-full place-items-center bg-muted/30 text-muted-foreground">
                        <Code className="h-7 w-7" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/15 to-transparent" />
                    <span className="absolute left-3 top-3 border border-border/80 bg-background/80 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.12em] text-foreground backdrop-blur-sm">
                      {getCategoryName(
                        project.category,
                        categories,
                        i18n.language,
                        t,
                        t("projectsPage.filters.all")
                      )}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-5 border-t border-border/60 p-5">
                    <h3 className="truncate text-lg font-semibold tracking-tight text-foreground">
                      {text.shortTitle}
                    </h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-auto h-9 w-fit rounded-none border-border/80 px-3 text-[11px] uppercase tracking-[0.12em] text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground"
                      onClick={(event) => {
                        event.stopPropagation();
                        navigate(`/projects/${project.id}`);
                      }}
                    >
                      {t("projectsPage.openProject")}
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className="mt-14 flex flex-col items-center gap-5 text-center">
          <Button
            variant="outline"
            size="lg"
            className="rounded-none border-primary/60 px-8 text-primary hover:bg-primary hover:text-primary-foreground"
            asChild
          >
            <Link to="/projects">{t("projects.viewAll")}</Link>
          </Button>
          <p className="max-w-md text-sm text-muted-foreground">{t("projects.interest")}</p>
          <Button
            size="lg"
            className="rounded-none bg-primary px-10 text-primary-foreground hover:bg-primary/90"
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            {t("projects.interestButton")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
