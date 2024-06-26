import { ArchiveBox, Globe, Triangle } from "@phosphor-icons/react"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { projectsInterface } from "../../utils/api/Consts"


function ProjectCard({ ...props }: projectsInterface) {
    return (
        <Card className="bg-slate-950 border-slate-500 rounded-none text-slate-50 w-[15rem] h-[22rem] select-none group transition-all rounded-b ">
            <Triangle className="absolute top-[9.3rem] left-[6.7rem] text-sky-500 group-hover:text-emerald-300 text-2xl rotate-180 transition-all" weight="fill" />
            {props.image == null ? (
                <div className="flex justify-center items-center h-[10rem]">
                    {props.name === 'Portifólio' ? (
                        <Globe className="text-9xl text-slate-300" />
                    ) : (
                        <ArchiveBox className="text-9xl text-slate-300" />
                    )}
                </div>
            ) : (
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
            <button className={"p-3 bg-sky-300 hover:bg-sky-100 transition-all rounded-b"}>
                <Link to={`/project/${props.id}/${props.name}`} className="text-slate-800 hover:text-slate-600">Ver Projeto</Link>
            </button>
        </Card>
    )
}

export default ProjectCard