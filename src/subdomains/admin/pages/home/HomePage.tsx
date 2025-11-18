import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FolderGit2, Languages, Globe, PlusCircle, Tags, List } from 'lucide-react'
import { Link } from 'react-router-dom'
import PrivateLayout from '../../layout/private-layout'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import AuroraBackground from '../login/components/animated-shader-bg'

const locales = import.meta.glob('/src/locale/*.json')

function HomePage() {
  const [projectCount, setProjectCount] = useState<number | null>(null)
  const [localeCount, setLocaleCount] = useState<number>(0)
  const [events, setEvents] = useState<{ name: string; count: number }[]>([])

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
        <div className="grid gap-6 md:grid-cols-3">
          {metrics.map((m) => (
            <Card key={m.label} className="glass-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">{m.label}</CardTitle>
              <m.icon className="h-5 w-5 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{m.value}</div>
              <div className="text-sm text-muted-foreground mt-1">Atualizado recentemente</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <Card className="glass-effect md:col-span-2">
          <CardHeader>
            <CardTitle className="font-poppins">Ações rápidas</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              asChild
              className="group flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-transparent hover:border-sky-400 transition-all duration-200 bg-neutral-800 shadow-md h-24 w-full hover:text-sky-500 font-semibold"
            >
              <Link to="/projects">
                <FolderGit2 className="h-6 w-6 group-hover:text-sky-400 transition-colors" />
                Gerenciar projetos
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="group flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-transparent hover:border-green-400 transition-all duration-200 bg-neutral-800 shadow-md h-24 w-full hover:text-emerald-500 font-semibold"
            >
              <Link to="/projects/new">
                <PlusCircle className="h-6 w-6 group-hover:text-green-400 transition-colors" />
                Cadastrar Projeto
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="group flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-transparent hover:border-purple-400 transition-all duration-200 bg-neutral-800 shadow-md h-24 w-full hover:text-purple-500 font-semibold"
            >
              <Link to="/categories">
                <Tags className="h-6 w-6 group-hover:text-purple-400 transition-colors" />
                Categorias
              </Link>
            </Button>
            
            <Button
              variant="outline"
              asChild
              className="group flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-transparent hover:border-purple-400 transition-all duration-200 bg-neutral-800 shadow-md h-24 w-full hover:text-purple-500 font-semibold"
            >
              <Link to="/categories/new">
                <PlusCircle className="h-6 w-6 group-hover:text-purple-400 transition-colors" />
                Cadastrar Categoria
              </Link>
            </Button>
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