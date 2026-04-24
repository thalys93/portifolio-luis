import { useEffect, useMemo, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderGit2, Languages, Globe, PlusCircle, Tags, ArrowUpRight, Activity, Layers, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import PrivateLayout from "../../layout/private-layout";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { useIsMobile } from "@/hooks/use-mobile";

const locales = import.meta.glob("/src/locale/*.json");
const PIE_COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))", "hsl(var(--muted-foreground))"];

function HomePage() {
  const isMobile = useIsMobile();
  const [projectCount, setProjectCount] = useState<number | null>(null);
  const [localeCount, setLocaleCount] = useState<number>(0);
  const [events, setEvents] = useState<{ name: string; count: number }[]>([]);
  const [projects, setProjects] = useState<Array<{ category?: string }>>([]);
  const [categories, setCategories] = useState<Array<{ slug?: string; i18n?: { ptbr?: { name?: string } } }>>([]);
  const [skills, setSkills] = useState<Array<{ title?: string; skills?: string[] }>>([]);

  useEffect(() => {
    const db = getFirestore();
    const run = async () => {
      const [projectsSnap, eventsSnap, categoriesSnap, skillsSnap] = await Promise.all([
        getDocs(collection(db, "projects")),
        getDocs(collection(db, "analytics_events")),
        getDocs(collection(db, "categories")),
        getDocs(collection(db, "skills")),
      ]);

      const projectItems = projectsSnap.docs.map((d) => d.data() as { category?: string });
      setProjects(projectItems);
      setProjectCount(projectItems.length);

      const eventItems = eventsSnap.docs
        .map((d) => ({
          name: d.id,
          count: (d.data() as { count?: number })?.count ?? 0,
        }))
        .sort((a, b) => b.count - a.count);
      setEvents(eventItems);

      setCategories(categoriesSnap.docs.map((d) => d.data() as { slug?: string; i18n?: { ptbr?: { name?: string } } }));
      setSkills(skillsSnap.docs.map((d) => d.data() as { title?: string; skills?: string[] }));
      setLocaleCount(Object.keys(locales).length);
    };

    run();
  }, []);

  const metrics = [
    { label: "Projetos cadastrados", value: projectCount ?? "...", icon: FolderGit2 },
    { label: "Projetos traduzidos", value: projectCount ?? "...", icon: Languages },
    { label: "Idiomas suportados", value: localeCount, icon: Globe },
  ];

  const categoryNameBySlug = useMemo(() => {
    const entries = categories
      .filter((c) => c.slug)
      .map((c) => [c.slug as string, c.i18n?.ptbr?.name || c.slug || "Sem categoria"] as const);
    return Object.fromEntries(entries);
  }, [categories]);

  const projectsByCategory = useMemo(() => {
    const bucket = new Map<string, number>();
    projects.forEach((project) => {
      const category = project.category || "sem-categoria";
      bucket.set(category, (bucket.get(category) ?? 0) + 1);
    });

    return Array.from(bucket.entries())
      .map(([category, total]) => ({
        category: categoryNameBySlug[category] ?? category,
        total,
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 8);
  }, [projects, categoryNameBySlug]);

  const topEvents = useMemo(() => events.slice(0, 8), [events]);

  const skillUsage = useMemo(() => {
    return skills
      .map((skill) => ({
        name: skill.title || "Sem nome",
        total: Array.isArray(skill.skills) ? skill.skills.length : 0,
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 8);
  }, [skills]);

  const eventsChartConfig = {
    count: { label: "Eventos", color: "hsl(var(--primary))" },
  } satisfies ChartConfig;

  const categoryChartConfig = {
    total: { label: "Projetos", color: "hsl(var(--primary))" },
  } satisfies ChartConfig;

  const skillChartConfig = {
    total: { label: "Itens", color: "hsl(var(--primary))" },
  } satisfies ChartConfig;

  const compactLabel = (value: string, max = 12) =>
    value.length > max ? `${value.slice(0, max)}...` : value;

  return (
    <PrivateLayout>
      <div className="overflow-x-hidden">
      <div className="mt-1 grid min-w-0 gap-6 xl:grid-cols-12">
        <Card className="min-w-0 border-border/80 bg-card/50 shadow-none xl:col-span-8">
          <CardHeader className="border-b border-border/60 pb-4">
            <CardTitle className="font-display text-xl font-semibold">Top eventos (GA)</CardTitle>
            <CardDescription>Eventos com mais interações no período atual.</CardDescription>
          </CardHeader>
          <CardContent className="pt-4 sm:pt-6">
            {topEvents.length > 0 ? (
              <ChartContainer config={eventsChartConfig} className="h-[170px] w-full max-w-full sm:h-[240px] lg:h-[300px]">
                <BarChart data={topEvents} margin={{ left: 0, right: 10, top: 2, bottom: 0 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    interval={isMobile ? "preserveStartEnd" : 0}
                    tick={{ fontSize: 11 }}
                    tickFormatter={(value) => compactLabel(String(value), isMobile ? 8 : 16)}
                  />
                  <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="var(--color-count)" radius={4} />
                </BarChart>
              </ChartContainer>
            ) : (
              <div className="grid h-48 place-items-center rounded-none border border-dashed border-border/80 text-sm text-muted-foreground">
                Sem dados ainda
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="min-w-0 border-border/80 bg-card/50 shadow-none xl:col-span-4">
          <CardHeader className="border-b border-border/60 pb-4">
            <CardTitle className="font-display text-xl font-semibold">Distribuição por evento</CardTitle>
            <CardDescription>Participação de cada evento no total.</CardDescription>
          </CardHeader>
          <CardContent className="pt-4 sm:pt-6">
            {events.length > 0 ? (
              <ChartContainer config={eventsChartConfig} className="h-[170px] w-full max-w-full sm:h-[240px] lg:h-[300px]">
                <PieChart>
                  <Pie
                    data={events.slice(0, 6)}
                    dataKey="count"
                    nameKey="name"
                    innerRadius={isMobile ? 26 : 65}
                    outerRadius={isMobile ? 48 : 100}
                    strokeWidth={2}
                  >
                    {events.slice(0, 6).map((_, index) => (
                      <Cell key={`event-pie-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip cursor={false} content={<ChartTooltipContent nameKey="name" />} />
                </PieChart>
              </ChartContainer>
            ) : (
              <div className="grid h-48 place-items-center rounded-none border border-dashed border-border/80 text-sm text-muted-foreground">
                Sem dados ainda
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid min-w-0 gap-6">
        <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {metrics.map((m) => (
            <Card key={m.label} className="h-auto min-h-32 border-border/80 bg-card/50 shadow-none transition-colors hover:border-primary/30">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{m.label}</CardTitle>
                <m.icon className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="font-display text-3xl font-semibold text-foreground">{m.value}</div>
                <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <ArrowUpRight className="h-3 w-3 text-primary" />
                  <span>Atualizado agora</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="min-w-0 border-border/80 bg-card/50 shadow-none">
          <CardHeader className="border-b border-border/60 pb-4">
            <CardTitle className="font-display text-xl font-semibold">Ações rápidas</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3 pt-4 sm:pt-6 md:grid-cols-4">
            {[
              { to: "/projects", icon: FolderGit2, label: "Gerenciar projetos" },
              { to: "/projects/new", icon: PlusCircle, label: "Novo Projeto" },
              { to: "/categories", icon: Tags, label: "Categorias" },
              { to: "/categories/new", icon: PlusCircle, label: "Nova Categoria" },
            ].map((action) => (
              <Button
                key={action.to}
                asChild
                variant="outline"
                className="group flex h-auto min-h-[5.5rem] w-full flex-col items-center justify-center gap-2 rounded-none border-border/80 bg-transparent py-3 text-foreground transition-colors hover:border-primary/50 hover:bg-muted/40 sm:min-h-[6.5rem] sm:py-4"
              >
                <Link to={action.to}>
                  <div className="flex h-10 w-10 items-center justify-center border border-primary/40 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <action.icon className="h-5 w-5" />
                  </div>
                  <span className="text-center text-xs font-medium leading-tight">{action.label}</span>
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid min-w-0 gap-6 xl:grid-cols-12">
        <Card className="min-w-0 border-border/80 bg-card/50 shadow-none xl:col-span-7">
          <CardHeader className="border-b border-border/60 pb-4">
            <CardTitle className="flex items-center gap-2 font-display text-xl font-semibold">
              <Layers className="h-5 w-5 text-primary" /> Projetos por categoria
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {projectsByCategory.length > 0 ? (
              <ChartContainer config={categoryChartConfig} className="h-[190px] w-full max-w-full sm:h-[240px] lg:h-[280px]">
                <BarChart data={projectsByCategory} layout="vertical" margin={{ left: 8, right: 6, top: 2, bottom: 0 }}>
                  <CartesianGrid horizontal={false} />
                  <XAxis type="number" allowDecimals={false} tickLine={false} axisLine={false} />
                  <YAxis
                    dataKey="category"
                    type="category"
                    width={isMobile ? 64 : 110}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11 }}
                    tickFormatter={(value) => compactLabel(String(value), isMobile ? 10 : 18)}
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <Bar dataKey="total" fill="var(--color-total)" radius={4} />
                </BarChart>
              </ChartContainer>
            ) : (
              <div className="grid h-48 place-items-center rounded-none border border-dashed border-border/80 text-sm text-muted-foreground">
                Sem categorias com projetos
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="min-w-0 border-border/80 bg-card/50 shadow-none xl:col-span-5">
          <CardHeader className="border-b border-border/60 pb-4">
            <CardTitle className="flex items-center gap-2 font-display text-xl font-semibold">
              <BarChart3 className="h-5 w-5 text-primary" /> Skills mais usadas
            </CardTitle>
            <CardDescription>Quantidade de itens por grupo de habilidade.</CardDescription>
          </CardHeader>
          <CardContent className="pt-4 sm:pt-6">
            {skillUsage.length > 0 ? (
              <ChartContainer config={skillChartConfig} className="h-[190px] w-full max-w-full sm:h-[240px] lg:h-[280px]">
                <BarChart data={skillUsage} margin={{ left: 0, right: 8, top: 2, bottom: 0 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    interval={isMobile ? "preserveStartEnd" : 0}
                    tick={{ fontSize: 11 }}
                    tickFormatter={(value) => compactLabel(String(value), isMobile ? 8 : 16)}
                  />
                  <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <Bar dataKey="total" fill="var(--color-total)" radius={4} />
                </BarChart>
              </ChartContainer>
            ) : (
              <div className="grid h-48 place-items-center rounded-none border border-dashed border-border/80 text-sm text-muted-foreground">
                Sem dados de skills
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 border-border/80 bg-card/50 shadow-none">
        <CardContent className="flex items-center gap-2 p-4 text-xs text-muted-foreground">
          <Activity className="h-4 w-4 text-primary" />
          Painel remodelado para leitura executiva em desktop e mobile, com foco em dados visuais.
        </CardContent>
      </Card>
      </div>
    </PrivateLayout>
  );
}

export default HomePage;
