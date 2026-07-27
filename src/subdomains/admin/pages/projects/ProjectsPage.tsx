import React from 'react'
import PrivateLayout from '../../layout/private-layout'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { FirebaseDB, FirebaseStorage } from '@/services/firebase'
import { collection, getDocs, deleteDoc, doc, writeBatch } from 'firebase/firestore'
import { deleteObject, ref as storageRef } from 'firebase/storage'
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog'
import { getIcon } from '@/shared/consts/Icons'
import { ArrowUp, ArrowDown, EllipsisVertical } from 'lucide-react'
import { AdminPageHeader } from '@/subdomains/admin/components/AdminPageHeader'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { toShortTitle } from '@/lib/project-short-title'

type ProjectLocale = {
  title?: string
  shortTitle?: string
  description?: string
}

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
    ptbr?: ProjectLocale
    en?: ProjectLocale
    es?: ProjectLocale
  }
  order?: number
}

function withShortTitles(i18n: Project['i18n']): { next: Project['i18n']; changed: boolean } {
  const locales = ['ptbr', 'en', 'es'] as const
  let changed = false
  const next: NonNullable<Project['i18n']> = { ...(i18n ?? {}) }

  for (const locale of locales) {
    const current = i18n?.[locale] ?? {}
    const title = current.title ?? ''
    const shortTitle = (current.shortTitle ?? '').trim()
    if (!shortTitle && title) {
      changed = true
      next[locale] = {
        ...current,
        shortTitle: toShortTitle(title),
      }
    } else {
      next[locale] = current
    }
  }

  return { next, changed }
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
        const batch = writeBatch(FirebaseDB)
        let batchCount = 0

        const normalized = items.map((it, i) => {
          const { next, changed } = withShortTitles(it.i18n)
          if (changed) {
            batch.update(doc(FirebaseDB, 'projects', it.id), { i18n: next })
            batchCount += 1
          }
          return {
            ...it,
            i18n: next,
            order: typeof it.order === 'number' ? it.order : i,
          }
        })

        if (batchCount > 0) {
          await batch.commit()
        }

        normalized.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        setProjects(normalized)
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

  const moveRow = async (from: number, to: number) => {
    if (to < 0 || to >= projects.length || from === to) return

    const next = [...projects]
    const [item] = next.splice(from, 1)
    next.splice(to, 0, item)

    const nextWithOrder = next.map((p, idx) => ({ ...p, order: idx }))
    setProjects(nextWithOrder)

    try {
      const batch = writeBatch(FirebaseDB)
      // Salva "order" para todos os itens: garante que quem não tinha passa a ter
      for (const p of nextWithOrder) {
        batch.update(doc(FirebaseDB, 'projects', p.id), { order: p.order })
      }
      await batch.commit()
    } catch (e: any) {
      console.error('Falha ao salvar ordenação de projetos', e)
      setError(e?.message ?? 'Falha ao salvar ordenação de projetos')
    }
  }

  return (
    <PrivateLayout>
      {error && (
        <div className="mb-3 rounded border border-red-500/40 bg-red-500/10 text-red-300 px-3 py-2 text-sm">
          {error}
        </div>
      )}
      <AdminPageHeader
        title="Projetos"
        description="Gerencie portfólio, links e ordem de exibição."
        action={(
        <Button asChild>
          <Link to="/projects/new">Novo projeto</Link>
        </Button>
        )}
      />

      {loading ? (
        <Card className="border-border/80 bg-card/50 shadow-none">
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            Carregando projetos...
          </CardContent>
        </Card>
      ) : projects.length > 0 ? (
        <Card className="border-border/80 bg-card/50 shadow-none">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Listagem</CardTitle>
          </CardHeader>
          <CardContent className="p-3 md:p-0">
            <div className="grid gap-3 md:hidden">
              {projects.map((p, index) => (
                <div key={p.id} className="rounded-md border border-border/80 bg-card/60 p-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1 space-y-1">
                      <p className="flex items-center gap-1.5 text-xs font-semibold leading-tight">
                        <span className="shrink-0">{getIcon(p.icon)}</span>
                        <span className="min-w-0 flex-1 truncate">{p.i18n?.ptbr?.title ?? '—'}</span>
                      </p>
                      <div className="flex flex-wrap items-center gap-1">
                        <span className="inline-flex max-w-full items-center rounded-full border border-border/70 bg-muted/40 px-2 py-0.5 text-[10px] text-muted-foreground">
                          <span className="truncate">Categoria: {p.category || '—'}</span>
                        </span>
                        <span className="inline-flex items-center rounded-full border border-border/70 bg-muted/40 px-2 py-0.5 text-[10px] text-muted-foreground">
                          Ano: {p.date || '—'}
                        </span>
                      </div>
                      <p className="truncate text-[10px] text-muted-foreground">
                        Tecnologias: {p.technologies.length > 0 ? `${p.technologies.length} itens` : '—'}
                      </p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="h-8 w-8" aria-label="Abrir ações do projeto">
                          <EllipsisVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => moveRow(index, index - 1)} disabled={index === 0}>
                          Mover para cima
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => moveRow(index, index + 1)} disabled={index === projects.length - 1}>
                          Mover para baixo
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/projects/${p.id}`}>Editar</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDeleteId(p.id)} className="text-destructive focus:text-destructive">
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden md:block">
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
                {projects.map((p, index) => (
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
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => moveRow(index, index - 1)}
                        disabled={index === 0}
                        aria-label="Mover para cima"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => moveRow(index, index + 1)}
                        disabled={index === projects.length - 1}
                        aria-label="Mover para baixo"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
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
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-border/80 bg-card/50 shadow-none">
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