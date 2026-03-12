import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FolderGit2, Languages, Globe, PlusCircle, Tags, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import PrivateLayout from '../../layout/private-layout'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { ThemeSelector } from '../../components/ThemeSelector'
import { useTheme } from '@/shared/context/ThemeContext'

const locales = import.meta.glob('/src/locale/*.json')

function HomePage() {
  const [projectCount, setProjectCount] = useState<number | null>(null)
  const [localeCount, setLocaleCount] = useState<number>(0)
  const [events, setEvents] = useState<{ name: string; count: number }[]>([])
  const { theme } = useTheme();

  useEffect(() => {
    const db = getFirestore()
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, 'projects'))
      setProjectCount(querySnapshot.size)
    }
    const fetchAnalytics = async () => {
      const snap = await getDocs(collection(db, 'analytics_events'))
      const items = snap.docs.map((d) => ({ name: d.id, count: (d.data() as any)?.count ?? 0 }))
      items.sort((a, b) => b.count - a.count)
      setEvents(items)
    }

    fetchProjects()
    fetchAnalytics()
    setLocaleCount(Object.keys(locales).length)
  }, [])

  const metrics = [
    { label: 'Projetos cadastrados', value: projectCount ?? '...', icon: FolderGit2 },
    { label: 'Projetos traduzidos', value: projectCount ?? '...', icon: Languages },
    { label: 'Idiomas suportados', value: localeCount, icon: Globe },
  ]

  return (
    <PrivateLayout>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 grid gap-6 md:grid-cols-3">
          {metrics.map((m) => (
            <Card key={m.label} className={`glass-effect border-l-4 ${theme === 'christmas' ? 'border-l-primary' : 'border-l-primary'} shadow-sm hover:shadow-md transition-all duration-300`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{m.label}</CardTitle>
                <m.icon className={`h-5 w-5 ${theme === 'christmas' ? 'text-primary' : 'text-primary'}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{m.value}</div>
                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                  <span>Atualizado agora</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Theme Selector Column */}
        <div className="md:w-80">
          <ThemeSelector />
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <Card className="glass-effect md:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle className="font-poppins">Ações rápidas</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { to: "/projects", icon: FolderGit2, label: "Gerenciar projetos", color: "sky" },
              { to: "/projects/new", icon: PlusCircle, label: "Novo Projeto", color: "green" },
              { to: "/categories", icon: Tags, label: "Categorias", color: "purple" },
              { to: "/categories/new", icon: PlusCircle, label: "Nova Categoria", color: "pink" },
            ].map((action) => (
              <Button
                key={action.to}
                asChild
                variant="outline"
                className={`group flex flex-col items-center justify-center gap-2 h-28 w-full border-2 border-transparent bg-secondary/5 hover:bg-secondary/10 shadow-sm hover:shadow-md transition-all duration-300
                  ${theme === 'christmas'
                    ? 'hover:border-primary/50 text-foreground'
                    : 'hover:border-primary/50 text-foreground'}`}
              >
                <Link to={action.to}>
                  <div className={`p-3 rounded-full mb-1 transition-colors duration-300 ${theme === 'christmas' ? 'bg-primary/10 group-hover:bg-primary/20 text-primary' : 'bg-primary/10 group-hover:bg-primary/20 text-primary'}`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <span className="font-semibold">{action.label}</span>
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="font-poppins">Mais vistos (GA)</CardTitle>
          </CardHeader>
          <CardContent>
            {events.length > 0 ? (
              <div className="space-y-2">
                {events.slice(0, 6).map((e) => (
                  <div key={e.name} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{e.name}</span>
                    <span className="text-sm font-medium">{e.count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-md border border-dashed border-slate-600/50 h-32 grid place-items-center text-sm text-muted-foreground">
                Sem dados ainda
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PrivateLayout>
  )
}

export default HomePage