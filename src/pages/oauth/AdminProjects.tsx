import ProgressChip from '@/components/progressChip'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { projectsInterface } from '@/utils/api/Consts'
import { Hash, Image, List, Pen, PlusCircle, Square, Trash } from 'lucide-react'
import React, { useEffect } from 'react'
import { CheckCircle, CraneTower, PauseCircle, WarningOctagon, FigmaLogo, Empty } from "@phosphor-icons/react";
import { STATUSES } from "../../utils/enums";
import { Container } from 'react-bootstrap'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { collection, doc, getDocs, getFirestore } from 'firebase/firestore'
import { useFirebase } from '@/utils/context/FirebaseProvider'

function AdminProjects() {
    const [projects, setProjects] = React.useState<projectsInterface[]>([])
    const [filterTxt, setFilterTxt] = React.useState("")
    const [filteredProjects, setFilteredProjects] = React.useState<projectsInterface[]>([])
    const firebaseApp = useFirebase();
    const db = getFirestore(firebaseApp)

    function getConditionalColor(projectStatus: string) {
        switch (projectStatus) {
            case STATUSES.DONE:
                return <ProgressChip title={STATUSES.DONE} color="success" icon={<CheckCircle size={15} />} />
            case STATUSES.DEVELOPING:
                return <ProgressChip title={STATUSES.DEVELOPING} color="warning" icon={<CraneTower size={15} />} />
            case STATUSES.PAUSED:
                return <ProgressChip title={STATUSES.PAUSED} color="dark" icon={<PauseCircle size={15} />} />
            case STATUSES.NEW:
                return <ProgressChip title={STATUSES.NEW} color="primary" icon={<WarningOctagon size={15} />} />
            case STATUSES.DESIGN:
                return <ProgressChip title={STATUSES.DESIGN} color="info" icon={<FigmaLogo size={15} />} />
            case STATUSES.DISCOUNTINUED:
                return <ProgressChip title={STATUSES.DISCOUNTINUED} color="danger" icon={<Empty size={15} />} />
            default:
                return <ProgressChip title="Em Teste" color="secondary" icon={<Empty size={15} />} />
        }
    }

    function handleFilterProjects(text: string) {
        setFilterTxt(text)
        if (text === "") {
            setFilteredProjects(projects)
        } else {
            setFilteredProjects(projects.filter(pj => pj.name.toLowerCase().includes(text.toLowerCase())))
        }
    }

    async function handleGetProjects() {
        const projectsRef = collection(db, "projects",);

        return await getDocs(projectsRef).then((res) => {
            const data = res.docs.map((doc) => {
                return {
                    id: doc.id,
                    name: doc.data().name,
                    description: doc.data().description,
                    status: doc.data().status,
                    type: doc.data().type,
                    projectLive: doc.data().projectLive,
                    projectRepository: doc.data().projectRepository,
                    image: doc.data().image,
                    conceptArt: doc.data().conceptArt,
                    details: doc.data().details
                }
            })
            console.log(data)
            setProjects(data)
            setFilteredProjects(data)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        handleGetProjects()
    }, [])

    // todo: terminar essa função e a função de edição de projetos
    async function handleRemoveDocument(id: string) {

    }

    return (
        <Container>
            <section>
                <article className='mt-3 lg:m-5'>
                    <h1 className='text-xl animate__animated animate__fadeIn animate__slower'> Lista dos Seus Projetos </h1>
                    <hr className='my-2 w-[15rem] animate__animated animate__fadeIn animate__slower' />
                </article>


                <article className='mt-3 lg:m-5 w-[30%]'>
                    <Label htmlFor='text' className='mb-3'>Filtrar Projetos</Label>
                    <Input type='text' placeholder='Buscar por Nome' value={filterTxt} onChange={(e) => handleFilterProjects(e.target.value)} />
                </article>
                <article>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    <div className='flex flex-row items-center gap-1'>
                                        <Image size={20} />
                                        Logo
                                    </div>
                                </TableHead>
                                <TableHead>
                                    <div className='flex flex-row items-center gap-1'>
                                        <List size={20} />
                                        Nome
                                    </div>
                                </TableHead>
                                <TableHead>
                                    <div className='flex flex-row items-center gap-1'>
                                        <List size={20} />
                                        Tipo
                                    </div>
                                </TableHead>
                                <TableHead>
                                    <div className='flex flex-row items-center gap-1'>
                                        <List size={20} />
                                        Status
                                    </div>
                                </TableHead>
                                <TableHead>
                                    <div className='flex flex-row items-center gap-1'>
                                        <List size={20} />
                                        Ações
                                    </div>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProjects.length > 0 ? filteredProjects.map((pj, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage src={pj.image as string} />
                                            <AvatarFallback>{pj.name.slice(0, 1)}</AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/project/${pj.id}/${pj.name}`}>
                                            {pj.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell className='select-none'> {pj.type} </TableCell>
                                    <TableCell> {getConditionalColor(pj?.status as string)} </TableCell>
                                    <TableCell className='flex flex-row gap-3'>
                                        <Button className='bg-sky-500' title='Editar'>
                                            <Pen size={15} color='#fff' />
                                        </Button>
                                        <Button variant="destructive" title='Excluir'>
                                            <Trash size={15} color='#fff' />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell>
                                        <Link to={"new"}>
                                            <Button variant="outline">
                                                <PlusCircle /> Novo Projeto
                                            </Button>
                                        </Link>
                                    </TableCell>
                                    <TableCell colSpan={5} className="h-24 text-center">
                                        Nenhum projeto encontrado.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </article>
            </section>
        </Container>
    )
}

export default AdminProjects