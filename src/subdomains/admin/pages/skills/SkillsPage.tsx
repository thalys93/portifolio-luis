import React from 'react'
import PrivateLayout from '../../layout/private-layout'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { SkillEntity, SkillsForms } from '@/types/form/skills.form'
import { collection, deleteDoc, doc, getDocs, writeBatch } from 'firebase/firestore'
import { FirebaseDB, FirebaseStorage } from '@/services/firebase'
import { deleteObject } from 'firebase/storage'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getIcon } from '@/shared/consts/Icons'
import { ArrowUp, ArrowDown } from 'lucide-react'

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
            const p = skills.find((x) => x.id === deleteId)
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
            <div className="flex items-center justify-between mb-4">
                <h1 className='text-xl font-poppins'>Habilidades</h1>
                <Button asChild>
                    <Link to="/skills/new">
                        Nova Habilidade
                    </Link>
                </Button>
            </div>

            {skills.length > 0 ? (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm text-muted-foreground">Listagem</CardTitle>
                    </CardHeader>
                    <CardContent className='p-0'>
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
                                        <TableHead className="w-12">
                                            {getIcon(skill.icon)}
                                        </TableHead>
                                        <TableHead>{skill.title}</TableHead>
                                        <TableHead className='flex flex-row gap-2 items-center'>
                                            <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${skill.color}`}></div>
                                            <span className='ml-2'>{skill.color}</span>
                                        </TableHead>
                                        <TableHead>
                                            {skill.skills.length} habilidades
                                        </TableHead>
                                        <TableHead className="w-12">
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
                                            </div>
                                        </TableHead>
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
                            Nenhuma habilidade cadastrada
                        </div>
                        <Button className="mt-3" asChild>
                            <Link to="/skills/new">Criar habilidade</Link>
                        </Button>
                    </CardContent>
                </Card>
            )}
        </PrivateLayout>
    )
}

export default SkillsPage