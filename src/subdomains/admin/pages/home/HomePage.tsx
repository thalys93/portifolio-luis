import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FolderGit2, Languages, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'
import PrivateLayout from '../../layout/private-layout'

function HomePage() {
  const metrics = [
    { label: 'Projetos cadastrados', value: 12, icon: FolderGit2 },
    { label: 'Projetos traduzidos', value: 8, icon: Languages },
    { label: 'Idiomas suportados', value: 3, icon: Globe },
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
          <CardContent className="flex gap-3">
            <Button asChild>
              <Link to="/projects">Gerenciar projetos</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/projects">Cadastrar novo</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="font-poppins">Google Ads (teste)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-dashed border-slate-600/50 h-32 grid place-items-center text-sm text-muted-foreground">
              Slot de anúncio para teste
            </div>
            <Button className="mt-3 w-full" variant="outline">Simular preenchimento</Button>
          </CardContent>
        </Card>
      </div>
    </PrivateLayout>
  )
}

export default HomePage