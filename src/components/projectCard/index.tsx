import { ArchiveBox, Globe, Triangle } from "@phosphor-icons/react"
import { Card } from "react-bootstrap"

interface ProjectCardProps {
    id: number,
    name: string,
    type: string,
    link: string | null,
    image: string | null,
    description: string,
}

function ProjectCard({ ...props }: ProjectCardProps) {
    return (
        <Card className="bg-slate-950 border-slate-500 rounded-none text-slate-50 w-[15rem] h-[22rem] select-none group transition-all rounded-b ">
            <Triangle className="absolute top-[9.3rem] left-[6.7rem] text-sky-500 group-hover:text-emerald-300 text-2xl rotate-180 transition-all" weight="fill"/>
            {props.image == null ? (
                <div className="flex justify-center items-center h-[10rem]">
                    {props.name === 'Portifólio' ? (
                        <Globe className="text-9xl text-slate-300" />
                    ): (
                        <ArchiveBox className="text-9xl text-slate-300" />
                    )}
                </div>
            ): (
            <Card.Img variant='top' src={props.image ?? ''} className="h-[10rem] object-cover" />
            )}
            <Card.Body>
                <Card.Title className="text-center font-redsans font-medium">{props.name}</Card.Title>
                <div className="flex flex-row gap-3 justify-center items-center">
                    <span className="text-center text-slate-400">
                        <b>{props.type}</b> - {props.description}
                    </span>
                </div>
            </Card.Body>
            <button className={props.link ? "p-3 bg-sky-300 hover:bg-sky-100 transition-all rounded-b" : "p-3 bg-stone-400 select-none pointer-events-none transition-all rounded-b"}>
                {props.link ? (
                    <a href={props.link} target='_blank' className="text-slate-800 hover:text-slate-600">Ver Projeto</a>
                ) : (
                    <span className="text-slate-800">Projeto Privado</span>
                )}
            </button>
        </Card>
    )
}

export default ProjectCard