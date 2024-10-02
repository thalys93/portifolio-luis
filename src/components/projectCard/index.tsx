import { ArchiveBox, CheckCircle, ComputerTower, CraneTower, DeviceMobile, Empty, FigmaLogo, Globe, Laptop, PauseCircle, QuestionMark, Triangle, WarningOctagon, WebhooksLogo } from "@phosphor-icons/react"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { projectsInterface } from "../../utils/api/Consts"
import { STATUSES, Types } from "../../utils/enums"
import ProgressChip from "../progressChip"


function ProjectCard({ ...props }: projectsInterface) {
    const iconSize = 30

    function getConditionalIcon(projectType: string) {

        switch (projectType) {
            case Types.API:
                return <WebhooksLogo size={iconSize} />
            case Types.SYSTEM:
                return <ComputerTower size={iconSize} />
            case Types.DESKTOP:
                return <Laptop size={iconSize} />
            case Types.MOBILE:
                return <DeviceMobile size={iconSize} />
            case Types.WEB:
                return <Globe size={iconSize} />
            default:
                return <QuestionMark size={iconSize} />
        }
    }

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
            default:
                return <ProgressChip title="Em Teste" color="secondary" icon={<Empty size={15} />} />
        }
    }

    return (
        <Card className="bg-slate-950 border-slate-500 rounded-none text-slate-50 w-[15rem] h-[25rem] select-none group transition-all rounded-b">
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
                {getConditionalColor(props.status)}
                <Card.Title className="font-redsans font-medium mt-2">
                    <div className="flex flex-row align items-center gap-2 justify-start">
                        {getConditionalIcon(props.type)}
                        {props.name}
                    </div>
                </Card.Title>
                <div className="flex flex-row gap-3 justify-center items-center">
                    <span className="text-start text-slate-400 text-ellipsis overflow-hidden">{props.description}</span>
                </div>
            </Card.Body>
            <button className={"p-3 bg-sky-300 hover:bg-sky-100 transition-all rounded-b"}>
                <Link to={`/project/${props.id}/${props.name}`} className="text-slate-800 hover:text-slate-600">Ver Projeto</Link>
            </button>
        </Card>
    )
}

export default ProjectCard