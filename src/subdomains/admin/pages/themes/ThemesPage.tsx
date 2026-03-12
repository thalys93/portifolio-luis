
import React from 'react'
import PrivateLayout from '../../layout/private-layout'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { FirebaseDB } from '@/services/firebase'
import { collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore'
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog'
import { useTheme } from '@/shared/context/ThemeContext'
import { Check, Edit, Trash2 } from 'lucide-react'
import { Switch } from '@/components/ui/switch'

type ThemeEntity = {
    id: string
    name: string
    value: string    
}

function ThemesPage() {
    const [themes, setThemes] = React.useState<ThemeEntity[]>([])
    const [loading, setLoading] = React.useState(true)
    const [deleteId, setDeleteId] = React.useState<string | null>(null)
    const { theme: currentTheme, setTheme } = useTheme()

    const loadThemes = async () => {
        try {
            const snap = await getDocs(collection(FirebaseDB, 'themes'))
            const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as ThemeEntity))

            // Seed if empty (as requested: include default and christmas)
            if (items.length === 0) {
                // No automatic seeding, wait for button
            }
            setThemes(items)
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        loadThemes()
    }, [])

    const seedThemes = async () => {
        setLoading(true)
        try {
            const batch = [
                { name: "Padrão (Dark)", value: "default" },
                { name: "Natal", value: "christmas" }
            ]

            for (const t of batch) {
                await addDoc(collection(FirebaseDB, 'themes'), t)
            }
            await loadThemes()
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!deleteId) return
        await deleteDoc(doc(FirebaseDB, 'themes', deleteId))
        setDeleteId(null)
        loadThemes()
    }

    const handleSwitchChange = (value: string) => {
        setTheme(value as any)
    }

    return (
        <PrivateLayout>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-poppins">Temas</h1>
                <Button asChild>
                    <Link to="/themes/new">Novo tema</Link>
                </Button>
            </div>

            <Card className="glass-effect">
                <CardHeader>
                    <CardTitle className="text-sm text-muted-foreground">Temas disponíveis</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nome</TableHead>
                                <TableHead>Valor (Classe)</TableHead>
                                <TableHead>Ativo (Local)</TableHead>
                                <TableHead className='text-right'>Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {themes.map(t => (
                                <TableRow key={t.id}>
                                    <TableCell className="font-medium">{t.name}</TableCell>
                                    <TableCell>
                                        <span className='bg-secondary/20 px-2 py-1 rounded text-xs font-mono'>{t.value}</span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                checked={currentTheme === t.value}
                                                onCheckedChange={() => handleSwitchChange(t.value)}
                                            />
                                            {currentTheme === t.value && <span className="text-xs text-primary font-bold">Ativo</span>}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" asChild>
                                            <Link to={`/themes/${t.id}`}><Edit className="w-4 h-4" /></Link>
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => setDeleteId(t.id)} className="text-destructive hover:text-destructive">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {themes.length === 0 && !loading && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                        <div className="flex flex-col items-center gap-2">
                                            <p>Nenhum tema cadastrado.</p>
                                            <Button variant="outline" size="sm" onClick={seedThemes}>
                                                <Check className="mr-2 w-4 h-4" />
                                                Gerar temas padrão (Seed)
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Excluir tema?</AlertDialogTitle>
                        <AlertDialogDescription>Essa ação não pode ser desfeita.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Confirmar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </PrivateLayout>
    )
}

export default ThemesPage
