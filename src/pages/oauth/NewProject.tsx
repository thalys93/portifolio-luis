import React from 'react'
import { Container, Row, Spinner } from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { languagesInterface, projectsInterface } from '@/utils/api/Consts'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ChevronDown, GalleryHorizontal, Globe2, HelpCircle, Menu, Plus, PlusCircle, XCircle } from 'lucide-react'
import { STATUSES, Types } from '@/utils/enums'
import ProgressChip from '@/components/progressChip'
import { CheckCircle, ComputerTower, CraneTower, DeviceMobile, Empty, FigmaLogo, GithubLogo, Globe, Laptop, PauseCircle, QuestionMark, WarningOctagon, WebhooksLogo } from "@phosphor-icons/react"
import { Textarea } from '@/components/ui/textarea'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'
import { TooltipTrigger } from '@radix-ui/react-tooltip'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { faker } from '@faker-js/faker'
import { collection, addDoc, getFirestore } from 'firebase/firestore'
import { useFirebase } from '@/utils/context/FirebaseProvider'


function NewProject() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [isAddingTech, setIsAddingTech] = React.useState(false)
  const [isRemovingTech, setIsRemovingTech] = React.useState(false)
  const firebaseApp = useFirebase();
  const db = getFirestore(firebaseApp)

  const projectDetailsSchema = Yup.object().shape({
    bigDescription: Yup.string().optional(),
    technologies: Yup.array().optional(),
  })

  const [technologies, setTechnologies] = React.useState<languagesInterface[]>([])

  const techValues: languagesInterface = {
    id: 0,
    name: '',
    icon: '',
    percent: 0
  }

  const TechValidation = Yup.object().shape({
    name: Yup.string().required("Nome não pode estar vazio"),
    icon: Yup.string().required("Icone não pode estar vazio"),
    percent: Yup.number().optional(),
  })

  const NewProjectSchema = Yup.object().shape({
    name: Yup.string().required("Nome não pode ser vazio"),
    description: Yup.string().required("Descrição nao pode ser vazia"),
    status: Yup.string().required("Status nao pode ser vazio"),
    details: projectDetailsSchema,
    type: Yup.string().required("Tipo nao pode ser vazio"),
    projectLive: Yup.string().optional(),
    projectRepository: Yup.string().optional(),
    image: Yup.string().optional(),
    conceptArt: Yup.string().optional(),
  })

  const NewProjectValues: Partial<projectsInterface> = {
    name: '',
    description: '',
    details: {
      bigDescription: '',
      technologies: [],
    },
    status: '',
    type: '',
    projectLive: '',
    projectRepository: '',
    image: '',
    conceptArt: '',
  }

  async function handleSaveNewProject(values: Partial<projectsInterface>) {
    setIsLoading(true)

    const mappedValues: Partial<projectsInterface> = {
      id: faker.string.uuid(),
      name: values.name,
      description: values.description,
      details: {
        bigDescription: values?.details?.bigDescription,
        technologies: technologies
      },
      status: values.status,
      type: values.type,
      projectLive: values.projectLive,
      projectRepository: values.projectRepository,
      image: values.image,
      conceptArt: values.conceptArt,
    }

    return await addDoc(collection(db, "projects"), mappedValues).then((res) => {
      console.log(res)      
    }).catch((err) => {
      console.log(err)
      setIsLoading(false)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  function getConditionalIcon(projectType: string | undefined) {
    const iconSize = 30
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

  function getConditionalColor(projectStatus: string | undefined) {
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

  function handleAddTech(index: number, values: languagesInterface, resetForm: () => void): void {
    setIsAddingTech(true)
    setTimeout(() => {
      setIsAddingTech(false)
    }, 1000);
    setTimeout(() => {
      resetForm()
      setTechnologies([...technologies, { id: index, name: values.name, icon: values.icon, percent: values.percent ? values.percent : 0 }])
    }, 1000);
  }

  function handleRemoveTech(index: number): void {
    setIsRemovingTech(true)
    setTimeout(() => {
      setIsRemovingTech(false)
    }, 1000);
    setTimeout(() => {
      setTechnologies(technologies.filter((tech) => tech.id !== index))
    }, 1000);
  }

  return (
    <Container>
      <Row>
        <section>
          <article className='mt-3 lg:m-5 select-none'>
            <h1 className='text-xl animate__animated animate__fadeIn animate__slower'> Novo Projeto </h1>
            <span className='text-stone-500 opacity-30 animate__animated animate__fadeIn animate__slower'>Insira os Dados do Projeto Abaixo </span>
            <hr className='my-2 w-[15rem] animate__animated animate__fadeIn animate__slower' />
          </article>

          <Formik initialValues={NewProjectValues} validationSchema={NewProjectSchema} onSubmit={handleSaveNewProject}>
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
              <section className='ml-5' >
                <div className='mt-2 mb-2'>
                  <span className='text-stone-500 opacity-30 animate__animated animate__fadeIn animate__slower'>Nome e Status</span>
                </div>

                <article className='flex flex-row gap-3'>
                  <div>
                    <Label htmlFor='project-name'>Nome do Projeto</Label>
                    <Input type='project-name' onChange={handleChange('name')} onBlur={handleBlur('name')} value={values.name} />
                    {touched.name && errors.name && <span className='text-red-500 text-sm select-none'>{errors.name}</span>}
                  </div>

                  <div>
                    <Label htmlFor='project-description'>Descrição Curta</Label>
                    <Input type='project-description' onChange={handleChange('description')} onBlur={handleBlur('description')} value={values.description} />
                    {touched.description && errors.description && <span className='text-red-500 text-sm select-none'>{errors.description}</span>}
                  </div>

                  <div>
                    <Label htmlFor='project-status'>Status</Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger className='flex flex-row items-center border-[1px] border-stone-50 rounded w-[13.5rem]'>
                        <div className='pt-1 pb-1 pl-2 pr-3'>
                          {getConditionalColor(values.status)}
                        </div>
                        {touched.status && errors.status && <span className='text-red-500 text-sm select-none'>{errors.status}</span>}
                        <ChevronDown className='absolute right-[38rem]' />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleChange('status')("")}>
                          <ProgressChip title="Em Teste" color="secondary" icon={<Empty size={15} />} />
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChange('status')(STATUSES.DEVELOPING)}>
                          <ProgressChip title={STATUSES.DEVELOPING} color="warning" icon={<CraneTower size={15} />} />
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChange('status')(STATUSES.DESIGN)}>
                          <ProgressChip title={STATUSES.DESIGN} color="info" icon={<FigmaLogo size={15} />} />
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChange('status')(STATUSES.NEW)}>
                          <ProgressChip title={STATUSES.NEW} color="primary" icon={<WarningOctagon size={15} />} />
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChange('status')(STATUSES.DONE)}>
                          <ProgressChip title={STATUSES.DONE} color="success" icon={<CheckCircle size={15} />} />
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChange('status')(STATUSES.PAUSED)}>
                          <ProgressChip title={STATUSES.PAUSED} color="dark" icon={<PauseCircle size={15} />} />
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChange('status')(STATUSES.DISCOUNTINUED)}>
                          <ProgressChip title={STATUSES.DISCOUNTINUED} color="danger" icon={<Empty size={15} />} />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </article>

                <div className='mt-3'>
                  <span className='text-stone-500 opacity-30 animate__animated animate__fadeIn animate__slower'>Detalhes</span>
                </div>

                <article className='flex flex-row gap-3'>
                  <div className='mt-[2rem]'>
                    <Label htmlFor='project-description'>Descrição Detalhada</Label>
                    <Textarea className='w-[20rem]' onChange={handleChange('details.bigDescription')} onBlur={handleBlur('details.bigDescription')} value={values.details?.bigDescription} />
                    {touched.details && errors.details && (
                      <span className='text-red-500 text-sm select-none'>
                        Descrição nao pode ser vazia
                      </span>
                    )}
                  </div>

                  {TechForm(touched, errors)}
                </article>

                <div className='mt-3 mb-[2rem]'>
                  <span className='text-stone-500 opacity-30 animate__animated animate__fadeIn animate__slower'>Outras Informações</span>
                </div>


                <div>
                  <Label htmlFor='project-status' className='mb-3'>Tipo de Projeto</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger className='flex flex-row items-center border-[1px] border-stone-50 rounded w-[13.5rem]'>
                      <div className='pt-1 pb-1 pl-2 pr-3 gap-1 flex flex-row justify-between items-center'>
                        <article className='flex flex-row items-center gap-3'>
                          {getConditionalIcon(values.type)} {values?.type ? values.type : 'Nenhum'}
                        </article>
                        <ChevronDown />
                      </div>
                      {touched.status && errors.status && <span className='text-red-500 text-sm select-none'>{errors.type}</span>}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {Object.values(Types).map((type) => (
                        <DropdownMenuItem onClick={() => handleChange('type')(type)}>
                          {getConditionalIcon(type)} {type.toString()}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <section className='flex flex-row items-center justify-between mt-3'>
                  <article className='flex flex-row gap-3'>
                    <div>
                      <Label htmlFor='project-status' className='flex flex-row items-center gap-2 mb-2'><Globe2 size={20} /> Projeto Hospedado</Label>
                      <Input type='project-link' onChange={handleChange('projectLive')} onBlur={handleBlur('projectLive')} value={values.projectLive as string} />
                      {touched.projectLive && errors.projectLive && <span className='text-red-500 text-sm select-none'>{errors.projectLive}</span>}
                    </div>

                    <div>
                      <Label htmlFor='project-status' className='flex flex-row items-center gap-2 mb-2'> <GithubLogo size={20} /> Repositório</Label>
                      <Input type='project-repository' onChange={handleChange('projectRepository')} onBlur={handleBlur('projectRepository')} value={values.projectRepository as string} />
                      {touched.projectRepository && errors.projectRepository && <span className='text-red-500 text-sm select-none'>{errors.projectRepository}</span>}
                    </div>
                  </article>

                  <article className='mr-[5rem] flex flex-row items-center gap-5'>
                    <div>
                      <Label htmlFor='project-status' className='flex flex-row items-center gap-2 mb-2'> <GalleryHorizontal size={20} /> Imagem do Projeto</Label>
                      <Input type='project-start-date' onChange={handleChange('image')} onBlur={handleBlur('image')} value={values.image as string} />
                      {touched.image && errors.image && <span className='text-red-500 text-sm select-none'>{errors.image}</span>}
                    </div>
                    <div>
                      <Avatar className='w-[9rem] h-[9rem] object-cover rounded-md shadow shadow-sky-500'>
                        <AvatarImage src={values.image as string} alt={values.name as string} />
                        <AvatarFallback>{values.name?.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                    </div>
                  </article>
                </section>

                <section>
                  <Button type='submit' className='bg-emerald-700 text-stone-50' disabled={isLoading} onClick={() => handleSubmit()}>
                    <PlusCircle size={20} color='#fff' /> Cadastrar Projeto
                  </Button>
                </section>
              </section>
            )}
          </Formik>
        </section>
      </Row>
    </Container >
  )

  function TechForm(touched: any, errors: any) {
    return <div>
      <Label htmlFor='project-description'>Tecnologias</Label>
      <Formik initialValues={techValues} validationSchema={TechValidation} onSubmit={(values) => console.log(values)}>
        {({ values, errors, touched, handleChange, handleBlur, resetForm }) => (
          <Table>
            <TableHeader className='select-none'>
              <TableRow>
                <TableHead>
                  Avatar
                </TableHead>
                <TableHead>
                  Tecnologia
                </TableHead>
                <TableHead>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className='flex flex-row items-center gap-2'>
                        <HelpCircle size={15} color='#fff' />
                        Icone
                      </TooltipTrigger>
                      <TooltipContent className='flex flex-col items-start justify-start'>
                        <p className='text-stone-50'>Insira o link da imagem da tecnologia</p>
                        <p className='text-stone-50'>Caso Precise de Icones <b><a href='https://devicon.dev/' target='_blank' rel='noreferrer'> acesse aqui </a></b></p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableHead>
                <TableHead>
                  Porcentagem
                </TableHead>
                <TableHead>
                  <Menu />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {technologies.length > 0 && technologies.map((tech, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={tech.icon} />
                      <AvatarFallback>{tech.name[0]}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <Input
                      disabled
                      value={tech.name} />
                  </TableCell>
                  <TableCell>
                    <Input
                      disabled
                      value={tech.icon} />
                  </TableCell>
                  <TableCell>
                    <Input
                      disabled
                      value={tech.percent} />
                  </TableCell>
                  <TableCell>
                    <Button variant={'destructive'} onClick={() => handleRemoveTech(tech.id)}>
                      {isRemovingTech ? <Spinner size='sm' variant='white' /> : <XCircle size={15} color='#fff' />}

                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={values.icon} />
                    <AvatarFallback>{values.name[0]}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>
                  <Input
                    onChange={handleChange(`name`)}
                    value={values.name}
                    onBlur={handleBlur(`name`)} />
                  {touched.name && errors.name && (
                    <span className='text-red-500 text-sm select-none animate__animated animate__fadeIn'>
                      {errors.name}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <Input
                    onChange={handleChange(`icon`)}
                    value={values.icon}
                    onBlur={handleBlur(`icon`)} />
                  {touched.icon && errors.icon && (
                    <span className='text-red-500 text-sm select-none animate__animated animate__fadeIn'>
                      {errors.icon}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <Input
                    onChange={handleChange(`percent`)}
                    value={values.percent}
                    onBlur={handleBlur(`percent`)} />
                </TableCell>
                <TableCell>
                  <Button variant={'default'} className={errors.icon || errors.name ? 'bg-red-500' : 'bg-emerald-500'} onClick={() => handleAddTech(technologies.length, values, resetForm)}>
                    {isAddingTech ? <Spinner size='sm' variant='white' /> : <Plus size={15} color='#fff' />}
                  </Button>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </Formik>
      {touched.details && errors.details && (
        <span className='text-red-500 text-sm select-none'>
          Tecnologias não Pode Estar Vazias
        </span>
      )}
    </div>
  }
}

export default NewProject