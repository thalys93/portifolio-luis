import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import PublicLayout from "@/subdomains/portifolio/layout/public-layout";
import { FirebaseDB, trackEvent } from "@/services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ArrowLeft, ExternalLink, Github, ShieldAlert } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

type Project = {
  id: string;
  image?: string;
  technologies?: string[];
  category?: string;
  github?: string | null;
  demo?: string | null;
  date?: string;
  i18nKey?: string;
  i18n?: {
    ptbr?: { title?: string; description?: string };
    en?: { title?: string; description?: string };
    es?: { title?: string; description?: string };
  };
};

function ProjectDetailPage() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [project, setProject] = React.useState<Project | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [iframeBlocked, setIframeBlocked] = React.useState(false);

  React.useEffect(() => {
    const run = async () => {
      if (!id) return;
      try {
        const snap = await getDoc(doc(FirebaseDB, "projects", id));
        if (snap.exists()) {
          setProject({ id: snap.id, ...(snap.data() as Omit<Project, "id">) });
          trackEvent("project_detail_viewed", { projectId: snap.id });
        }
      } finally {
        setIsLoading(false);
      }
    };
    run();
  }, [id]);

  React.useEffect(() => {
    setIframeBlocked(false);
  }, [project?.demo]);

  const text = React.useMemo(() => {
    if (!project) return { title: "", description: "" };
    const lang = (i18n.language || "ptbr") as "ptbr" | "en" | "es";
    const fallbackTitle = project?.i18n?.[lang]?.title || project?.i18n?.ptbr?.title || "";
    const fallbackDesc =
      project?.i18n?.[lang]?.description || project?.i18n?.ptbr?.description || "";
    return {
      title: project.i18nKey
        ? t(`${project.i18nKey}.title`, { defaultValue: fallbackTitle })
        : fallbackTitle,
      description: project.i18nKey
        ? t(`${project.i18nKey}.description`, { defaultValue: fallbackDesc })
        : fallbackDesc,
    };
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
              <div>
                <Button variant="outline" className="rounded-none" asChild>
                  <Link to="/projects">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t("projectsPage.backToProjects")}
                  </Link>
                </Button>
              </div>

              <div className="border border-border/70 bg-card/40 p-5 sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="rounded-none uppercase tracking-[0.12em]">
                    {project.category || "-"}
                  </Badge>
                  <Badge variant="secondary" className="rounded-none">
                    {project.date || "-"}
                  </Badge>
                </div>

                <h1 className="mt-5 font-display text-4xl text-foreground">{text.title}</h1>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
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

                  <Button variant="outline" className="rounded-none" disabled={!project.demo} asChild>
                    <a href={project.demo ?? "#"} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {t("projectsPage.openLive")}
                    </a>
                  </Button>

                  <Button variant="outline" className="rounded-none" disabled={!project.github} asChild>
                    <a href={project.github ?? "#"} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                </div>
              </div>

              <div className="overflow-hidden border border-border/70 bg-card/30">
                <div className="border-b border-border/60 px-4 py-3 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  {t("projectsPage.previewTitle")}
                </div>
                {!project.demo ? (
                  <div className="grid min-h-[380px] place-items-center p-6 text-center">
                    <div className="max-w-xl">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={text.title}
                          className="mx-auto mb-5 max-h-72 w-full border border-border/60 object-cover"
                        />
                      ) : null}
                      <p className="mt-3 text-sm text-muted-foreground">
                        {t("projectsPage.noPreviewAvailable")}
                      </p>
                    </div>
                  </div>
                ) : iframeBlocked ? (
                  <div className="grid min-h-[380px] place-items-center p-6 text-center">
                    <div className="max-w-md">
                      <ShieldAlert className="mx-auto h-8 w-8 text-primary" />
                      <p className="mt-3 text-sm text-muted-foreground">
                        {t("projectsPage.embedBlocked")}
                      </p>
                      {project.demo ? (
                        <Button className="mt-4 rounded-none" asChild>
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            {t("projectsPage.openLive")}
                          </a>
                        </Button>
                      ) : null}
                    </div>
                  </div>
                ) : (
                  <iframe
                    title={`${text.title} preview`}
                    src={project.demo}
                    className="h-[65vh] w-full bg-background"
                    loading="lazy"
                    onError={() => setIframeBlocked(true)}
                    sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                  />
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
