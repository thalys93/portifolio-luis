import React from 'react'
import PrivateLayout from '../../layout/private-layout'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { SkillEntity } from '@/types/form/skills.form'
import { collection, deleteDoc, doc, getDocs, writeBatch } from 'firebase/firestore'
import { FirebaseDB } from '@/services/firebase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getIcon } from '@/shared/consts/Icons'
import { ArrowUp, ArrowDown, EllipsisVertical } from 'lucide-react'
import { AdminPageHeader } from '@/subdomains/admin/components/AdminPageHeader'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

function SkillsPage() {
    const [skills, setSkills] = React.useState<SkillEntity[]>([])
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState<string | null>(null)
    const [deleteId, setDeleteId] = React.useState<string | null>(null)
    const [deleting, setDeleting] = React.useState(false)

    React.useEffect(() => {
        const run = async () => {
            try {
                const snap = await getDocs(collection(FirebaseDB, 'skills'))
                const items: SkillEntity[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<SkillEntity, 'id'>) }))
                const normalized = items.map((it, i) => ({ ...it, order: typeof it.order === 'number' ? it.order : i }))
                normalized.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                setSkills(normalized)
            } catch (e: any) {
                setError(e?.message ?? 'Erro ao carregar habilidades')
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
            await deleteDoc(doc(FirebaseDB, 'skills', deleteId))
            setSkills((prev) => prev.filter((p) => p.id !== deleteId))
        } finally {
            setDeleting(false)
            setDeleteId(null)
        }
    }

    // Reordena itens da tabela localmente
    const moveRow = async (from: number, to: number) => {
        if (to < 0 || to >= skills.length || from === to) return

        const next = [...skills]
        const [item] = next.splice(from, 1)
        next.splice(to, 0, item)

        const nextWithOrder = next.map((s, idx) => ({ ...s, order: idx }))
        setSkills(nextWithOrder)

        try {
            const batch = writeBatch(FirebaseDB)
            const start = Math.min(from, to)
            const end = Math.max(from, to)
            for (let i = start; i <= end; i++) {
                const s = nextWithOrder[i]
                batch.update(doc(FirebaseDB, 'skills', s.id), { order: s.order })
            }
            await batch.commit()
        } catch (e) {
            // opcional: feedback/toast
        }
    }

    return (
        <PrivateLayout>
            {error && (
                <div className="mb-3 rounded border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                    {error}
                </div>
            )}
            <AdminPageHeader
                title="Habilidades"
                description="Gerencie setores, gradientes e itens de skill."
                action={(
                <Button asChild>
                    <Link to="/skills/new">
                        Nova Habilidade
                    </Link>
                </Button>
                )}
            />

            {loading ? (
                <Card className="border-border/80 bg-card/50 shadow-none">
                    <CardContent className="py-10 text-center text-sm text-muted-foreground">
                        Carregando habilidades...
                    </CardContent>
                </Card>
            ) : skills.length > 0 ? (
                <Card className="border-border/80 bg-card/50 shadow-none">
                    <CardHeader>
                        <CardTitle className="text-sm text-muted-foreground">Listagem</CardTitle>
                    </CardHeader>
                    <CardContent className='p-3 md:p-0'>
                        <div className="grid gap-3 md:hidden">
                            {skills.map((skill, index) => (
                                <div key={skill.id} className="rounded-md border border-border/80 bg-card/60 p-3">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0 space-y-1">
                                            <p className="flex items-center gap-2 text-sm font-semibold">
                                                <span className="shrink-0">{getIcon(skill.icon)}</span>
                                                <span className="truncate">{skill.title}</span>
                                            </p>
                                            <p className="text-xs text-muted-foreground">Habilidades: {skill.skills.length}</p>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <div className={`h-3 w-8 rounded bg-gradient-to-r ${skill.color}`} />
                                                <span className="truncate">{skill.color}</span>
                                            </div>
                                        </div>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="icon" aria-label="Abrir ações da habilidade">
                                                    <EllipsisVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => moveRow(index, index - 1)} disabled={index === 0}>
                                                    Mover para cima
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => moveRow(index, index + 1)} disabled={index === skills.length - 1}>
                                                    Mover para baixo
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link to={`/skills/${skill.id}`}>Editar</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setDeleteId(skill.id)} className="text-destructive focus:text-destructive">
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
                                    <TableHead>Setor</TableHead>
                                    <TableHead>Gradiente</TableHead>
                                    <TableHead>Habilidades</TableHead>
                                    <TableHead className="w-12">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {skills.map((skill, index) => (
                                    <TableRow key={skill.id}>
                                        <TableCell className="w-12">
                                            {getIcon(skill.icon)}
                                        </TableCell>
                                        <TableCell>{skill.title}</TableCell>
                                        <TableCell className='flex flex-row gap-2 items-center'>
                                            <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${skill.color}`}></div>
                                            <span className='ml-2'>{skill.color}</span>
                                        </TableCell>
                                        <TableCell>
                                            {skill.skills.length} habilidades
                                        </TableCell>
                                        <TableCell className="w-12">
                                            <div className="flex items-center gap-2">
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
                                                    disabled={index === skills.length - 1}
                                                    aria-label="Mover para baixo"
                                                >
                                                    <ArrowDown className="h-4 w-4" />
                                                </Button>
                                                <Button asChild>
                                                    <Link to={`/skills/${skill.id}`}>
                                                        Editar
                                                    </Link>
                                                </Button>
                                                <Button variant="destructive" size="sm" onClick={() => setDeleteId(skill.id)}>
                                                    Excluir
                                                </Button>
                                            </div>
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
                            Nenhuma habilidade cadastrada
                        </div>
                        <Button className="mt-3" asChild>
                            <Link to="/skills/new">Criar habilidade</Link>
                        </Button>
                    </CardContent>
                </Card>
            )}

            <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Excluir habilidade?</AlertDialogTitle>
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

export default SkillsPage