import React from 'react'
import PrivateLayout from '@/subdomains/admin/layout/private-layout'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { FirebaseDB } from '@/services/firebase'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog'

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
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-poppins">Categorias</h1>
                <Button asChild>
                    <Link to="/categories/new">Nova categoria</Link>
                </Button>
            </div>

            {items.length > 0 ? (
                <Card className="glass-effect">
                    <CardHeader>
                        <CardTitle className="text-sm text-muted-foreground">Listagem</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
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
                    </CardContent>
                </Card>
            ) : (
                <Card className="glass-effect">
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