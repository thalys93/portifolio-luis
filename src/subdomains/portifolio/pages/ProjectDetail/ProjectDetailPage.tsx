import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProject } from "@/hooks/use-projects";
import { getProjectText } from "@/lib/project-i18n";
import PublicLayout from "@/subdomains/portifolio/layout/public-layout";
import { trackEvent } from "@/services/firebase";
import { ExternalLink, Github } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

function ProjectDetailPage() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const { data: project, isLoading } = useProject(id);

  React.useEffect(() => {
    if (project?.id) {
      trackEvent("project_detail_viewed", { projectId: project.id });
    }
  }, [project?.id]);

  const text = React.useMemo(() => {
    if (!project) return { title: "", description: "" };
    return getProjectText(project, i18n.language, t);
  }, [i18n.language, project, t]);

  return (
    <PublicLayout>
      <section className="px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-6xl">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-[60vh] w-full" />
            </div>
          ) : !project ? (
            <div className="border border-dashed border-border/70 bg-card/20 p-8 text-center">
              <p className="text-sm text-muted-foreground">{t("projectsPage.detailNotFound")}</p>
              <Button className="mt-4 rounded-none" asChild>
                <Link to="/projects">{t("projectsPage.backToProjects")}</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="border border-border/70 bg-card/40 p-5 sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="rounded-none uppercase tracking-[0.12em]">
                    {project.category || ""}
                  </Badge>
                  {project.date ? (
                    <Badge variant="secondary" className="rounded-none">
                      {project.date}
                    </Badge>
                  ) : null}
                </div>

                <h1 className="mt-5 font-display text-4xl text-foreground sm:text-5xl">
                  {text.title}
                </h1>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {text.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {(project.technologies ?? []).map((tech) => (
                    <span
                      key={tech}
                      className="border border-border/70 bg-background/40 px-2 py-1 text-xs text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button className="rounded-none" asChild>
                    <Link to="/projects">{t("projectsPage.backToProjects")}</Link>
                  </Button>

                  {project.demo ? (
                    <Button variant="outline" className="rounded-none" asChild>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        {t("projectsPage.openLive")}
                      </a>
                    </Button>
                  ) : null}

                  {project.github ? (
                    <Button variant="outline" className="rounded-none" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                  ) : null}
                </div>
              </div>

              <div className="overflow-hidden border border-border/70 bg-card/30">
                <div className="border-b border-border/60 px-4 py-3 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  {t("projectsPage.previewTitle")}
                </div>
                {project.image ? (
                  <img
                    src={project.image}
                    alt={text.title}
                    className="w-full object-cover object-center"
                    loading="lazy"
                  />
                ) : (
                  <div className="grid min-h-[380px] place-items-center p-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      {t("projectsPage.noPreviewAvailable")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}

export default ProjectDetailPage;
