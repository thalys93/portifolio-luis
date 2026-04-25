import { SectionHeader } from "@/components/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import PublicLayout from "@/subdomains/portifolio/layout/public-layout";
import { FirebaseDB, trackEvent } from "@/services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ArrowRight, Code, Search } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

type Project = {
  id: string;
  image?: string;
  technologies?: string[];
  category?: string;
  icon?: string;
  date?: string;
  order?: number;
  i18nKey?: string;
  i18n?: {
    ptbr?: { title?: string; description?: string };
    en?: { title?: string; description?: string };
    es?: { title?: string; description?: string };
  };
};

const iconMap: Record<string, React.ElementType> = {
  code: Code,
};

function ProjectsPage() {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [categories, setCategories] = React.useState<any[]>([]);
  const [query, setQuery] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState("Todos");
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    trackEvent("projects_page_viewed");
  }, []);

  React.useEffect(() => {
    const load = async () => {
      try {
        const [projectSnap, categoriesSnap] = await Promise.all([
          getDocs(collection(FirebaseDB, "projects")),
          getDocs(collection(FirebaseDB, "categories")),
        ]);

        const items = projectSnap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<Project, "id">),
        }));

        const ordered = items.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
        setProjects(ordered);
        setCategories(categoriesSnap.docs.map((d) => d.data()));
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const getText = React.useCallback(
    (project: Project) => {
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
    },
    [i18n.language, t]
  );

  const getCategoryName = React.useCallback(
    (slug?: string) => {
      if (!slug || slug === "Todos") return t("projectsPage.filters.all");
      const category = categories.find((item) => item.slug === slug);
      if (!category) return slug;
      const lang = (i18n.language || "ptbr") as "ptbr" | "en" | "es";
      const fallback = category?.i18n?.[lang]?.name || category?.i18n?.ptbr?.name || slug;
      return category.i18nKey
        ? t(`${category.i18nKey}.name`, { defaultValue: fallback })
        : fallback;
    },
    [categories, i18n.language, t]
  );

  const categoryOptions = React.useMemo(() => {
    const set = new Set<string>(["Todos"]);
    projects.forEach((project) => {
      if (project.category) set.add(project.category);
    });
    return Array.from(set);
  }, [projects]);

  const filteredProjects = React.useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return projects.filter((project) => {
      const byCategory =
        activeCategory === "Todos" ? true : project.category === activeCategory;
      if (!byCategory) return false;
      if (!normalized) return true;

      const text = getText(project);
      const searchable = [
        text.title,
        text.description,
        ...(project.technologies ?? []),
        getCategoryName(project.category),
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(normalized);
    });
  }, [activeCategory, getCategoryName, getText, projects, query]);

  return (
    <PublicLayout>
      <section className="px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow={t("navigation.projects")}
            title={t("projectsPage.titleStart")}
            highlight={t("projectsPage.titleHighlight")}
            description={t("projectsPage.description")}
          />

          <div className="mt-10 border border-border/70 bg-card/40 p-4 sm:p-5">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-[1fr_auto] md:items-center">
              <label htmlFor="project-search" className="relative block">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <Input
                  id="project-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t("projectsPage.searchPlaceholder")}
                  className="h-11 rounded-none border-border bg-background pl-10"
                />
              </label>

              <div className="flex flex-wrap gap-2">
                {categoryOptions.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      "border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors",
                      activeCategory === category
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border/80 text-muted-foreground hover:border-primary/60 hover:text-foreground"
                    )}
                  >
                    {getCategoryName(category)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <article key={`skeleton-${index}`} className="border border-border/70 bg-card/30 p-4">
                  <Skeleton className="h-36 w-full" />
                  <Skeleton className="mt-4 h-5 w-2/3" />
                  <Skeleton className="mt-2 h-4 w-full" />
                  <Skeleton className="mt-2 h-4 w-5/6" />
                </article>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="mt-8 border border-dashed border-border/70 bg-card/20 p-10 text-center">
              <p className="text-sm text-muted-foreground">{t("projectsPage.empty")}</p>
            </div>
          ) : (
            <div className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-3">
              {filteredProjects.map((project) => {
                const Icon = iconMap[project.icon ?? ""] ?? Code;
                const text = getText(project);
                return (
                  <article
                    key={project.id}
                    onClick={() => navigate(`/projects/${project.id}`)}
                    className="group border border-border/70 bg-card/30 transition-all hover:rounded-b-lg hover:border-primary/40 duration-200"
                  >
                    <div className="relative h-44 overflow-hidden border-b border-border/60">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={text.title}
                          className="h-full w-full object-cover duration-500"
                        />
                      ) : (
                        <div className="grid h-full place-items-center bg-muted/20 text-muted-foreground">
                          <Code className="h-8 w-8" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-4 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <Badge variant="outline" className="rounded-none text-[10px] uppercase tracking-[0.14em]">
                          {getCategoryName(project.category)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{project.date ?? "-"}</span>
                      </div>

                      <div>
                        <h2 className="font-display text-2xl text-foreground">{text.title}</h2>
                        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                          {text.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-border/60 pt-3">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Icon className="h-3.5 w-3.5 text-primary" />
                          <span>{(project.technologies ?? []).slice(0, 2).join(" • ") || "—"}</span>
                        </div>
                        <Link
                          to={`/projects/${project.id}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary"
                        >
                          {t("projectsPage.openProject")}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}

export default ProjectsPage;
