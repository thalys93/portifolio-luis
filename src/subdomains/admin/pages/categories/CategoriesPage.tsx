import React from 'react'
import PrivateLayout from '@/subdomains/admin/layout/private-layout'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { FirebaseDB } from '@/services/firebase'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog'
import { AdminPageHeader } from '@/subdomains/admin/components/AdminPageHeader'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { EllipsisVertical } from 'lucide-react'

type Category = {
    id: string
    slug?: string
    i18nKey?: string
    i18n?: {
        ptbr?: { name?: string; description?: string }
        en?: { name?: string; description?: string }
        es?: { name?: string; description?: string }
    }
}

function CategoriesPage() {
    const [items, setItems] = React.useState<Category[]>([])
    const [deleteId, setDeleteId] = React.useState<string | null>(null)
    const [deleting, setDeleting] = React.useState(false)

    React.useEffect(() => {
        const run = async () => {
            const snap = await getDocs(collection(FirebaseDB, 'categories'))
            const list: Category[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Category, 'id'>) }))
            setItems(list)
        }
        run()
    }, [])

    const confirmDelete = async () => {
        if (!deleteId) return
        setDeleting(true)
        try {
            await deleteDoc(doc(FirebaseDB, 'categories', deleteId))
            setItems((prev) => prev.filter((c) => c.id !== deleteId))
        } finally {
            setDeleting(false)
            setDeleteId(null)
        }
    }

    return (
        <PrivateLayout>
            <AdminPageHeader
                title="Categorias"
                description="Gerencie as categorias usadas nos projetos."
                action={(
                <Button asChild>
                    <Link to="/categories/new">Nova categoria</Link>
                </Button>
                )}
            />

            {items.length > 0 ? (
                <Card className="border-border/80 bg-card/50 shadow-none">
                    <CardHeader>
                        <CardTitle className="text-sm text-muted-foreground">Listagem</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 md:p-0">
                        <div className="grid gap-3 md:hidden">
                            {items.map((c) => (
                                <div key={c.id} className="rounded-md border border-border/80 bg-card/60 p-3">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0 space-y-1">
                                            <p className="truncate text-sm font-semibold">{c.i18n?.ptbr?.name ?? '—'}</p>
                                            <p className="truncate text-xs text-muted-foreground">Slug: {c.slug ?? '—'}</p>
                                            <p className="truncate text-xs text-muted-foreground">Chave: {c.i18nKey ?? '—'}</p>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="icon" aria-label="Abrir ações da categoria">
                                                    <EllipsisVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild>
                                                    <Link to={`/categories/${c.id}`}>Editar</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setDeleteId(c.id)} className="text-destructive focus:text-destructive">
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
                                    <TableHead>Nome (pt-BR)</TableHead>
                                    <TableHead>Slug</TableHead>
                                    <TableHead>Chave</TableHead>
                                    <TableHead className="w-32">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {items.map((c) => (
                                    <TableRow key={c.id}>
                                        <TableCell className="font-medium">{c.i18n?.ptbr?.name ?? '—'}</TableCell>
                                        <TableCell>{c.slug ?? '—'}</TableCell>
                                        <TableCell>{c.i18nKey ?? '—'}</TableCell>
                                        <TableCell className="flex gap-2">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link to={`/categories/${c.id}`}>Editar</Link>
                                            </Button>
                                            <Button variant="destructive" size="sm" onClick={() => setDeleteId(c.id)}>Excluir</Button>
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
                    <CardContent>
                        <div className="mt-5 rounded-md border border-dashed border-slate-600/50 h-32 grid place-items-center text-sm text-muted-foreground">
                            Nenhuma categoria cadastrada
                        </div>
                        <Button className="mt-3" asChild>
                            <Link to="/categories/new">Criar categoria</Link>
                        </Button>
                    </CardContent>
                </Card>
            )}

            <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Excluir categoria?</AlertDialogTitle>
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

export default CategoriesPage