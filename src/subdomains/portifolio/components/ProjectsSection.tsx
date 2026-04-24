import React, { useState } from "react";
import { ExternalLink, Github, Calendar, Code, Globe, Rocket, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { FirebaseDB, trackEvent } from "@/services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { SectionHeader } from "@/components/SectionHeader";

const ProjectsSection = () => {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState<any[]>([]);
  const [catList, setCatList] = useState<any[]>([]);

  React.useEffect(() => {
    trackEvent("projects_section_viewed", { section: "projects" });
  }, []);

  React.useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDocs(collection(FirebaseDB, "projects"));
        const items = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
        setProjects(items);
      } catch {
        /* empty */
      }
    };
    load();
  }, []);

  React.useEffect(() => {
    const loadCats = async () => {
      try {
        const snap = await getDocs(collection(FirebaseDB, "categories"));
        setCatList(snap.docs.map((d) => ({ ...(d.data() as any) })));
      } catch {
        /* empty */
      }
    };
    loadCats();
  }, []);

  const categories = React.useMemo(() => {
    const set = new Set<string>(["Todos"]);
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [projects]);

  const iconMap: Record<string, any> = {
    code: Code,
    globe: Globe,
    rocket: Rocket,
    "dollar-sign": DollarSign,
  };

  const getText = (p: any) => {
    const lang = (i18n.language || "ptbr") as "ptbr" | "en" | "es";
    const fallbackTitle = p?.i18n?.[lang]?.title || p?.i18n?.ptbr?.title || "";
    const fallbackDesc =
      p?.i18n?.[lang]?.description || p?.i18n?.ptbr?.description || "";
    return {
      title: p.i18nKey
        ? t(`${p.i18nKey}.title`, { defaultValue: fallbackTitle })
        : fallbackTitle,
      description: p.i18nKey
        ? t(`${p.i18nKey}.description`, { defaultValue: fallbackDesc })
        : fallbackDesc,
    };
  };

  const getCategoryName = (slug: string) => {
    if (!slug || slug === "Todos") return slug;
    const c = catList.find((x) => x.slug === slug);
    if (!c) return slug;
    const lang = (i18n.language || "ptbr") as "ptbr" | "en" | "es";
    const fallback = c?.i18n?.[lang]?.name || c?.i18n?.ptbr?.name || slug;
    return c.i18nKey ? t(`${c.i18nKey}.name`, { defaultValue: fallback }) : fallback;
  };

  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredProjects =
    activeCategory === "Todos"
      ? projects.sort((a, b) => a.order - b.order)
      : projects?.filter((project) => project?.category === activeCategory);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={t("navigation.projects")}
          title={t("projects.title_my")}
          highlight={t("projects.title_projects")}
          description={t("projects.description")}
        />

        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={cn(
                "border px-5 py-2 text-xs font-medium uppercase tracking-[0.15em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                activeCategory === category
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border/80 text-muted-foreground hover:border-primary/50 hover:text-foreground"
              )}
            >
              {category === "Todos" ? "Todos" : getCategoryName(category)}
            </button>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {filteredProjects?.map((project) => (
            <article
              key={project.id}
              className="group border border-border/70 bg-card/30 transition-colors hover:border-primary/35"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={project.image}
                  alt={getText(project).title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                <div className="absolute left-4 top-4 flex items-center gap-2 border border-border/80 bg-background/80 px-3 py-1 text-xs text-foreground backdrop-blur-sm">
                  {React.createElement(iconMap[project.icon] || Code, {
                    className: "h-3.5 w-3.5 text-primary",
                  })}
                  <span>{getCategoryName(project.category)}</span>
                </div>

                <div className="absolute right-4 top-4 flex items-center gap-1 border border-border/80 bg-background/80 px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
                  <Calendar className="h-3 w-3" aria-hidden />
                  {project.date}
                </div>
              </div>

              <div className="border-t border-border/60 p-6">
                <h3 className="font-display text-2xl font-semibold text-primary">
                  {getText(project).title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {getText(project).description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech: string) => (
                    <span
                      key={tech}
                      className="border border-border/60 px-2 py-0.5 text-[11px] text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "flex-1 rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground",
                      !project.github && "pointer-events-none opacity-40"
                    )}
                    asChild
                    disabled={!project.github}
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      {project.github ? "GitHub" : t("projects.unavaliable")}
                    </a>
                  </Button>

                  <Button
                    size="sm"
                    className={cn(
                      "flex-1 rounded-none bg-primary text-primary-foreground hover:bg-primary/90",
                      !project.demo && "pointer-events-none opacity-40"
                    )}
                    asChild
                    disabled={!project.demo}
                  >
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {project.demo ? "Live" : t("projects.unavaliable")}
                    </a>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground">{t("projects.interest")}</p>
          <Button
            size="lg"
            className="mt-6 rounded-none border border-primary bg-transparent px-10 text-primary hover:bg-primary hover:text-primary-foreground"
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
