import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { projects, projectsInterface } from "../../utils/api/Consts";
import Navigation from "../../components/navbar";
import { Col, Container, Row } from "react-bootstrap";
import { CheckCircle, CraneTower, PauseCircle, WarningOctagon, FigmaLogo, Empty } from "@phosphor-icons/react";
import ProgressChip from "../../components/progressChip";
import { STATUSES } from "../../utils/enums";

function Project() {
  const { id } = useParams()
  const navigate = useNavigate();
  const [project, setProject] = useState<projectsInterface>()
  const [activeIndex, setActiveIndex] = useState<number[]>([]);
  const [buttonEnabledStyle, setButtonEnabledStyle] = useState({
    filled: "",
    unfilled: ""
  })

  const [buttonDisabledStyle, setButtonDisabledStyle] = useState({
    filled: "",
    unfilled: ""
  })

  const [iconStyle, setIconStyle] = useState<string>("")

  useEffect(() => {
    const checkAndFilterProject = () => {
      if (id !== undefined) {
        const foundProject = projects.find((pj) => id == pj.id);
        if (foundProject) {
          setProject(foundProject);
        } else {
          navigate("/home");
        }
      }
    }

    checkAndFilterProject();
  }, [id])

  const showDescription = (index: number) => {
    if (activeIndex.includes(index)) {
      setActiveIndex(activeIndex.filter((item) => item !== index));
    } else {
      setActiveIndex([...activeIndex, index]);
    }
  }

  useEffect(() => {
    conditionalStyles(project?.name)
  }, [id, project?.name])

  const conditionalStyles = (name: string | undefined) => {
    switch (name) {
      case "Cade Meu Rango":
        setButtonEnabledStyle({
          filled: "p-2 bg-orange-500 border-[1px] border-orange-500 text-stone-50 rounded hover:bg-orange-300 transition-all hover:text-stone-50",
          unfilled: "p-2 border-orange-500 border-[1px] text-orange-500 rounded hover:border-orange-300 transition-all hover:text-orange-300"
        })

        setButtonDisabledStyle({
          filled: "p-2 bg-orange-900 border-[1px] border-orange-900 text-stone-50 rounded cursor-not-allowed",
          unfilled: "p-2 border-orange-900 border-[1px] text-orange-900 rounded cursor-not-allowed"
        })

        setIconStyle("w-[3rem] object-cover bg-orange-800 rounded-full p-1 hover:scale-95 transition-all")

        return [buttonEnabledStyle, iconStyle, buttonDisabledStyle]
      case "Home Stock - API":
        setButtonEnabledStyle({
          filled: "p-2 bg-green-500 border-[1px] border-green-500 text-stone-50 rounded hover:bg-green-300 transition-all hover:text-stone-50",
          unfilled: "p-2 border-green-500 border-[1px] text-green-500 rounded hover:border-green-300 transition-all hover:text-green-300"
        })

        setButtonDisabledStyle({
          filled: "p-2 bg-green-900 border-[1px] border-green-900 text-stone-50 rounded cursor-not-allowed",
          unfilled: "p-2 border-green-900 border-[1px] text-green-900 rounded cursor-not-allowed"
        })

        setIconStyle("w-[3rem] object-cover bg-green-800 rounded-full p-1 hover:scale-95 transition-all")

        return [buttonEnabledStyle, iconStyle, buttonDisabledStyle]
      case "Carteira de Saúde":
        setButtonEnabledStyle({
          filled: "p-2 bg-blue-500 border-[1px] border-blue-500 text-stone-50 rounded hover:bg-blue-300 transition-all hover:text-stone-50",
          unfilled: "p-2 border-blue-500 border-[1px] text-blue-500 rounded hover:border-blue-300 transition-all hover:text-blue-300"
        })

        setButtonDisabledStyle({
          filled: "p-2 bg-blue-900 border-[1px] border-blue-900 text-stone-50 rounded cursor-not-allowed",
          unfilled: "p-2 border-blue-900 border-[1px] text-blue-900 rounded cursor-not-allowed"
        })

        setIconStyle("w-[3rem] object-cover bg-blue-800 rounded-full p-1 hover:scale-95 transition-all")

        return [buttonEnabledStyle, iconStyle, buttonDisabledStyle]
      case "Gerenciamento de Clientes":
        setButtonEnabledStyle({
          filled: "p-2 bg-red-500 border-[1px] border-red-500 text-stone-50 rounded hover:bg-red-300 transition-all hover:text-stone-50",
          unfilled: "p-2 border-red-500 border-[1px] text-red-500 rounded hover:border-red-300 transition-all hover:text-red-300"
        })

        setButtonDisabledStyle({
          filled: "p-2 bg-red-900 border-[1px] border-red-900 text-stone-50 rounded cursor-not-allowed",
          unfilled: "p-2 border-red-900 border-[1px] text-red-900 rounded cursor-not-allowed"
        })

        setIconStyle("w-[3rem] object-cover bg-red-800 rounded-full p-1 hover:scale-95 transition-all")

        return [buttonEnabledStyle, iconStyle, buttonDisabledStyle]
      case "The Film DB":
        setButtonEnabledStyle({
          filled: "p-2 bg-yellow-500 border-[1px] border-yellow-500 text-stone-50 rounded hover:bg-yellow-300 transition-all hover:text-stone-50",
          unfilled: "p-2 border-yellow-500 border-[1px] text-yellow-500 rounded hover:border-yellow-300 transition-all hover:text-yellow-300"
        })

        setButtonDisabledStyle({
          filled: "p-2 bg-yellow-900 border-[1px] border-yellow-900 text-stone-50 rounded cursor-not-allowed",
          unfilled: "p-2 border-yellow-900 border-[1px] text-yellow-900 rounded cursor-not-allowed"
        })

        setIconStyle("w-[3rem] object-cover bg-yellow-800 rounded-full p-1 hover:scale-95 transition-all")

        return [buttonEnabledStyle, iconStyle, buttonDisabledStyle]
      case "Dream Nexus Studios":
        setButtonEnabledStyle({
          filled: "p-2 bg-red-500 border-[1px] border-red-500 text-stone-50 rounded hover:bg-red-300 transition-all hover:text-stone-50",
          unfilled: "p-2 border-red-500 border-[1px] text-red-500 rounded hover:border-red-300 transition-all hover:text-red-300"
        })

        setButtonDisabledStyle({
          filled: "p-2 bg-red-900 border-[1px] border-red-900 text-stone-50 rounded cursor-not-allowed",
          unfilled: "p-2 border-red-900 border-[1px] text-red-900 rounded cursor-not-allowed"
        })

        setIconStyle("w-[3rem] object-cover bg-red-800 rounded-full p-1 hover:scale-95 transition-all")

        return [buttonEnabledStyle, iconStyle, buttonDisabledStyle]
      case "Home Stock - App":
        setButtonEnabledStyle({
          filled: "p-2 bg-emerald-500 border-[1px] border-emerald-500 text-stone-50 rounded hover:bg-emerald-300 transition-all hover:text-stone-50",
          unfilled: "p-2 border-emerald-500 border-[1px] text-emerald-500 rounded hover:border-emerald-300 transition-all hover:text-emerald-300"
        })

        setButtonDisabledStyle({
          filled: "p-2 bg-emerald-900 border-[1px] border-emerald-900 text-stone-50 rounded cursor-not-allowed",
          unfilled: "p-2 border-emerald-900 border-[1px] text-emerald-900 rounded cursor-not-allowed"
        })

        setIconStyle("w-[3rem] object-cover bg-emerald-800 rounded-full p-1 hover:scale-95 transition-all")

        return [buttonEnabledStyle, iconStyle, buttonDisabledStyle]
      case "Portifólio":
        setButtonEnabledStyle({
          filled: "p-2 bg-sky-500 border-[1px] border-sky-500 text-sky-50 rounded hover:bg-sky-300 transition-all hover:text-sky-400",
          unfilled: "p-2 border-sky-500 border-[1px] text-sky-500 rounded hover:border-sky-300 transition-all hover:text-sky-300"
        })

        setButtonDisabledStyle({
          filled: "p-2 bg-sky-900 border-[1px] border-sky-900 text-stone-50 rounded cursor-not-allowed",
          unfilled: "p-2 border-sky-900 border-[1px] text-sky-900 rounded cursor-not-allowed"
        })

        setIconStyle("w-[3rem] object-cover bg-sky-800 rounded-full p-1 hover:scale-95 transition-all")

        return [buttonEnabledStyle, iconStyle, buttonDisabledStyle]
      case "Barber Pro":
        setButtonEnabledStyle({
          filled: "p-2 bg-yellow-500 border-[1px] border-yellow-500 text-stone-50 rounded hover:bg-yellow-300 transition-all hover:text-stone-50",
          unfilled: "p-2 border-yellow-500 border-[1px] text-yellow-500 rounded hover:border-yellow-300 transition-all hover:text-yellow-300"
        })

        setButtonDisabledStyle({
          filled: "p-2 bg-yellow-900 border-[1px] border-yellow-900 text-stone-50 rounded cursor-not-allowed",
          unfilled: "p-2 border-yellow-900 border-[1px] text-yellow-900 rounded cursor-not-allowed"
        })

        setIconStyle("w-[3rem] object-cover bg-yellow-800 rounded-full p-1 hover:scale-95 transition-all")

        return [buttonEnabledStyle, iconStyle, buttonDisabledStyle]
      case "Crypto Currency":
        setButtonEnabledStyle({
          filled: "p-2 bg-purple-500 border-[1px] border-purple-500 text-stone-50 rounded hover:bg-purple-300 transition-all hover:text-stone-50",
          unfilled: "p-2 border-purple-500 border-[1px] text-purple-500 rounded hover:border-purple-300 transition-all hover:text-purple-300"
        })

        setButtonDisabledStyle({
          filled: "p-2 bg-purple-900 border-[1px] border-purple-900 text-stone-50 rounded cursor-not-allowed",
          unfilled: "p-2 border-purple-900 border-[1px] text-purple-900 rounded cursor-not-allowed"
        })
        return [buttonEnabledStyle, iconStyle, buttonDisabledStyle];
      default:
        setButtonEnabledStyle({
          filled: "p-2 bg-stone-500 border-[1px] border-stone-500 text-stone-50 rounded hover:bg-stone-300 transition-all hover:text-stone-400",
          unfilled: "p-2 border-stone-500 border-[1px] text-stone-500 rounded hover:border-stone-300 transition-all hover:text-stone-300"
        })

        setButtonDisabledStyle({
          filled: "p-2 bg-stone-900 border-[1px] border-stone-900 text-stone-50 rounded cursor-not-allowed",
          unfilled: "p-2 border-stone-900 border-[1px] text-stone-900 rounded cursor-not-allowed"
        })

        setIconStyle("w-[3rem] object-cover bg-stone-800 rounded-full p-1 hover:scale-95 transition-all")
        return [buttonEnabledStyle, iconStyle, buttonDisabledStyle];
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
      case STATUSES.DISCOUNTINUED:
        return <ProgressChip title={STATUSES.DISCOUNTINUED} color="danger" icon={<Empty size={15} />} />
      default:
        return <ProgressChip title="Em Teste" color="secondary" icon={<Empty size={15} />} />
    }
  }


  return (
    <>
      <Navigation />
      <Container>
        <Row>
          <Col className="pt-[4rem]">
            <section>
              <article className="flex flex-col justify-start items-start gap-2 ml-3 lg:ml-[5rem]">
                <div className="flex flex-row gap-2 items-center justify-center">
                  {getConditionalColor(project?.status as string)}
                  <h1 className="text-stone-50 text-xl">{project?.name}</h1>
                </div>
                <span className="text-slate-500"> Tipo de Projeto: {project?.type}</span>
              </article>
            </section>

            <section className="ml-3 mt-[3rem] lg:ml-[5rem]">
              <h2 className="text-stone-50 text-xl">Descrição</h2>
              <p className="text-slate-500 lg:w-[30rem]">{project?.details.bigDescription}</p>
            </section>

            <section className="ml-3 mt-[3rem] lg:ml-[5rem] mb-[5rem]">
              <h2 className="text-stone-50 text-xl">Tecnologias</h2>
              <span className="text-slate-500"> Aqui você vê as tecnologias utilizadas neste projeto.</span>
              <ul className="text-slate-500 flex flex-row gap-3 flex-wrap w-[20rem] mt-3">
                {project?.details?.technologies?.map((tech, index) => (
                  <li key={index} onClick={() => showDescription(index)} className="flex flex-col justify-center items-center">
                    <img src={tech.icon} className={iconStyle} />
                    {activeIndex.includes(index) && (
                      <span className="animate__animated animate__fadeInDown select-none">{tech.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          </Col>

          <Col className="pt-[4rem]">
            <section className="flex flex-col gap-3">
              <article className="flex flex-col justify-center lg:ml-[5rem]">
                <h2 className="text-stone-50 text-xl">
                  {project?.conceptArt !== undefined ? "Imagem Conceitual" : "Imagem do Projeto"}
                </h2>
                <span className="text-slate-500">
                  {project?.conceptArt !== undefined ? "Aqui você vê a imagem conceitual do projeto." : "Aqui você vê a imagem do projeto."}
                </span>
              </article>
              <article className="flex flex-row gap-3 items-center justify-center">
                <img src={project?.conceptArt !== undefined ? project?.conceptArt : project?.image as string} className="w-[30rem] h-[20rem] object-cover rounded-lg" />
              </article>

              <article className="flex flex-row gap-3 items-center justify-center">
                {project?.projectRepository || project?.projectLive !== null ? (
                  <>
                    <button className={project?.projectRepository !== null ? buttonEnabledStyle.unfilled : buttonDisabledStyle.unfilled} disabled={project?.projectRepository !== null ? true : false}>
                      <a href={project?.projectRepository as string} target="_blank">
                        {project?.projectRepository === null ? "Projeto Privado" : "Repositório"}
                      </a>
                    </button>
                    <button className={project?.projectLive !== null ? buttonEnabledStyle.filled : buttonDisabledStyle.filled} disabled={project?.projectLive !== null ? true : false}>
                      <a href={project?.projectLive as string} target="_blank">
                        {project?.projectLive === null ? "Projeto Privado" : "Projeto Online"}
                      </a>
                    </button>
                  </>
                ) : (
                  <section className="select-none">
                    <h1 className="text-stone-50 text-xl font-robt hover:text-red-500 transition-all">
                      Projeto Privado (S/link)
                    </h1>
                  </section>
                )}
              </article>
            </section>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Project