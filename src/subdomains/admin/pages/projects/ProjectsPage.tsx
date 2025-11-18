import React from 'react'
import PrivateLayout from '../../layout/private-layout'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { FirebaseDB, FirebaseStorage } from '@/services/firebase'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { deleteObject, ref as storageRef } from 'firebase/storage'
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog'
import { getIcon } from '@/shared/consts/Icons'

type Project = {
  id: string
  image: string
  imagePath?: string | null
  technologies: string[]
  category: string
  icon: string
  github: string | null
  demo: string | null
  date: string
  i18nKey?: string
  i18n?: {
    ptbr?: { title?: string; description?: string }
    en?: { title?: string; description?: string }
    es?: { title?: string; description?: string }
  }
}

function ProjectsPage() {
  const [projects, setProjects] = React.useState<Project[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [deleteId, setDeleteId] = React.useState<string | null>(null)
  const [deleting, setDeleting] = React.useState(false)

  React.useEffect(() => {
    const run = async () => {
      try {
        const snap = await getDocs(collection(FirebaseDB, 'projects'))
        const items: Project[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Project, 'id'>) }))
        setProjects(items)
      } catch (e: any) {
        setError(e?.message ?? 'Erro ao carregar projetos')
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  const confirmDelete = async () => {
    if (!deleteId) return
    setDeleting(true)
    try {
      const p = projects.find((x) => x.id === deleteId)
      if (p?.imagePath) {
        await deleteObject(storageRef(FirebaseStorage, p.imagePath))
      }
      await deleteDoc(doc(FirebaseDB, 'projects', deleteId))
      setProjects((prev) => prev.filter((p) => p.id !== deleteId))
    } finally {
      setDeleting(false)
      setDeleteId(null)
    }
  }

  return (
    <PrivateLayout>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-poppins">Projetos</h1>
        <Button asChild>
          <Link to="/projects/new">Novo projeto</Link>
        </Button>
      </div>

      {projects.length > 0 ? (
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Listagem</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Icone</TableHead>
                  <TableHead>Projeto</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Tecnologias</TableHead>
                  <TableHead>Demo</TableHead>
                  <TableHead>GitHub</TableHead>
                  <TableHead>Ano</TableHead>
                  <TableHead className="w-32">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="w-12">
                      {getIcon(p.icon)}
                    </TableCell>
                    <TableCell className="font-medium">{p.i18n?.ptbr?.title ?? '—'}</TableCell>
                    <TableCell>{p.category}</TableCell>
                    <TableCell>{p.technologies.join(', ')}</TableCell>
                    <TableCell>{p.demo ? <a href={p.demo} target="_blank" rel="noopener noreferrer" className="text-slate-300 underline">Abrir</a> : '—'}</TableCell>
                    <TableCell>{p.github ? <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-slate-300 underline">Repo</a> : '—'}</TableCell>
                    <TableCell>{p.date}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/projects/${p.id}`}>Editar</Link>
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => setDeleteId(p.id)}>
                        Excluir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card className="glass-effect">
          <CardContent className='mt-5'>
            <div className="rounded-md border border-dashed border-slate-600/50 h-32 grid place-items-center text-sm text-muted-foreground">
              Nenhum projeto cadastrado
            </div>
            <Button className="mt-3" asChild>
              <Link to="/projects/new">Criar projeto</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir projeto?</AlertDialogTitle>
            <AlertDialogDescription>Esta ação não pode ser desfeita.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} disabled={deleting}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PrivateLayout>
  )
}

export default ProjectsPage