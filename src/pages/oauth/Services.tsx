
import ServiceCard from "@/components/serviceCard"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { servicesInterface } from "@/utils/api/Consts"
import { useFirebase } from "@/utils/context/FirebaseProvider"
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore"
import { ChevronDown, PlusCircle, XCircle } from "lucide-react"
import React, { useRef } from "react"
import { Card, Container, Spinner } from "react-bootstrap"
import { Browser, DeviceMobile, Devices, Envelope, GithubLogo, InstagramLogo, LinkedinLogo, PipeWrench, Users, WebhooksLogo, WhatsappLogo } from '@phosphor-icons/react';
import { Formik } from "formik"
import * as Yup from 'yup'
import { faker } from "@faker-js/faker"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Textarea } from "@/components/ui/textarea"

function Services() {
  const [services, setServices] = React.useState<servicesInterface[]>([])
  const [warnings, setWarnings] = React.useState<any>({})
  const [loading, setLoading] = React.useState(false)
  const [isAdding, setIsAdding] = React.useState(false)
  const [editingindex, setEditingindex] = React.useState<number | null>(null)
  const [selectedIcon, setSelectedIcon] = React.useState<JSX.Element>()
  const [selectedIconName, setSelectedIconName] = React.useState<string>("")
  const [selectedService, setSelectedService] = React.useState<servicesInterface>()

  const initialValues: servicesInterface = {
    id: faker.string.uuid(),
    title: "",
    short_description: "",
    icon: "",
  }

  const updateValues: servicesInterface = {
    id: editingindex ? services[editingindex].id : "",
    title: selectedService?.title ?? "",
    short_description: selectedService?.short_description ?? "",
    icon: selectedService?.icon ?? "",
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Campo obrigatório"),
    short_description: Yup.string().required("Campo obrigatório"),
  })

  const iconMap = [
    { name: "Github", icon: <GithubLogo />, },
    { name: "Linkedin", icon: <LinkedinLogo />, },
    { name: "Instagram", icon: <InstagramLogo />, },
    { name: "Whatsapp", icon: <WhatsappLogo />, },
    { name: "Geral", icon: <Users />, },
    { name: "Webhooks", icon: <WebhooksLogo />, },
    { name: "Email", icon: <Envelope />, },
    { name: "Outros", icon: <PipeWrench />, },
    { name: "Celular", icon: <DeviceMobile />, },
    { name: "Desktop", icon: <Browser />, },
    { name: "Tablet", icon: <Devices />, },
  ]

  const firebaseApp = useFirebase()
  const db = getFirestore(firebaseApp)

  async function getServices() {
    const servicesRef = collection(db, 'services');

    return await getDocs(servicesRef).then((res) => {
      console.log(res.docs)
      const data = res.docs.map((doc) => {
        return {
          id: doc.id,
          title: doc.data().title,
          short_description: doc.data().short_description,
          icon: doc.data().icon
        }
      })

      setServices(data)
    }).catch((err) => {
      console.log(err)
    })
  }

  React.useEffect(() => { getServices() }, [])

  async function handleSaveService(values: servicesInterface) {
    setLoading(true)

    const mappedValues = {
      title: values.title,
      short_description: values.short_description,
      icon: selectedIconName
    }

    return await addDoc(collection(db, "services"), mappedValues).then((res) => {
      if (res) {
        console.log(res)
      }
    }).catch((err) => {
      console.log(err)
      setLoading(false)
    }).finally(() => {
      setTimeout(() => {
        setLoading(false)
        setIsAdding(false)
        getServices()
      }, 1000)
    })
  }

  async function handleUpdateService(values: servicesInterface) {
    setLoading(true)

    const mappedValues: Partial<servicesInterface> = {
      title: values.title,
      short_description: values.short_description,
      icon: selectedIconName
    }

    const docRef = doc(db, "services", services[editingindex ?? 0].id as string);
    return await updateDoc(docRef, mappedValues).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
      setLoading(false)
    }).finally(() => {
      setTimeout(() => {
        setEditingindex(null)        
        setLoading(false)
        setIsAdding(false)
        getServices()
      }, 1000)
    })

  }

  function NewCardButton() {
    return (
      <button onClick={() => setIsAdding(true)}>
        <Card className='bg-slate-950 border-slate-500 rounded-none text-slate-50 w-[15rem] h-[15rem] select-none group transition-all hover:bg-slate-500'>
          <Card.Body className='flex flex-col justify-center items-center gap-2'>
            <h1 className='text-center font-monts text-lg'>Novo Serviço</h1>
            <PlusCircle size={30} />
          </Card.Body>
        </Card>
      </button>
    )
  }

  const formRef = useRef(null);

  function NewCard() {
    return (
      <Formik innerRef={formRef} initialValues={initialValues} onSubmit={handleSaveService} validationSchema={validationSchema}>
        {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
          <Card className='bg-slate-950 border-slate-500 rounded-none text-slate-50 w-[17rem] select-none group transition-all justify-center items-center'>
            <Card.Header className="flex flex-col justify-center items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex flex-row items-center gap-2"> Icone <ChevronDown size={15} /> </DropdownMenuTrigger>
                <DropdownMenuContent className="h-[14rem] overflow-y-scroll">
                  {iconMap.map((element: any, i) => (
                    <DropdownMenuItem key={i} onClick={(e) => {
                      e.preventDefault(); setSelectedIcon(element.icon), setSelectedIconName(element.name)
                    }}>
                      {element.icon}
                      {element.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              {selectedIcon && (
                React.cloneElement(selectedIcon, { className: 'text-4xl' })
              )}
            </Card.Header>
            <Card.Body className='flex flex-col justify-center items-center gap-3'>
              <div className="flex flex-col gap-1">
                <Input type="text" onChange={handleChange("title")} onBlur={handleBlur("title")} value={values.title} placeholder="Titulo" className="w-[12rem]" />
                {errors.title && touched.title && <p className="text-red-500 text-xs">{errors.title}</p>}
              </div>
              <div className="flex flex-col gap-1">
                <Textarea onChange={handleChange("short_description")} onBlur={handleBlur("short_description")} value={values.short_description} placeholder="Descrição" className="w-[12rem]" />
                {errors.short_description && touched.short_description && <p className="text-red-500 text-xs">{errors.short_description}</p>}
              </div>
            </Card.Body>
            <Card.Footer className="flex flex-row gap-1">
              <Button type="reset" variant={'outline'} onClick={() => setIsAdding(false)}>Cancelar</Button>
              <Button disabled={loading} onClick={() => handleSubmit()} type="submit" className="ml-2 bg-emerald-500 text-stone-50 flex flex-row items-center">
                {loading && (<Spinner size="sm" />)}
                Salvar
              </Button>
            </Card.Footer>
          </Card>
        )}
      </Formik>
    )
  }

  function EditingCard({ index }: { index: number }) {
    return (
      <Formik key={index} innerRef={formRef} initialValues={updateValues} onSubmit={handleUpdateService} validationSchema={validationSchema}>
        {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => ( 
          <Card className='bg-slate-950 border-yellow-500 rounded-none text-slate-50 w-[17rem] select-none group transition-all justify-center items-center'>
            <Card.Header className="flex flex-col justify-center items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex flex-row items-center gap-2"> Icone <ChevronDown size={15} /> </DropdownMenuTrigger>
                <DropdownMenuContent className="h-[14rem] overflow-y-scroll">
                  {iconMap.map((element: any, i) => (
                    <DropdownMenuItem key={i} onClick={(e) => {
                      e.preventDefault(); setSelectedIcon(element.icon), setSelectedIconName(element.name)
                    }}>
                      {element.icon}
                      {element.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              {selectedIcon && (
                React.cloneElement(selectedIcon, { className: 'text-4xl' })
              )}
            </Card.Header>
            <Card.Body className='flex flex-col justify-center items-center gap-3'>
              <div className="flex flex-col gap-1">
                <Textarea onChange={handleChange("title")} onBlur={handleBlur("title")} value={values.title} placeholder="Titulo" className="w-[12rem]" />
                {errors.title && touched.title && <p className="text-red-500 text-xs">{errors.title}</p>}
              </div>
              <div className="flex flex-col gap-1">
                <Textarea onChange={handleChange("short_description")} onBlur={handleBlur("short_description")} value={values.short_description} placeholder="Descrição" className="w-[12rem]" />
                {errors.short_description && touched.short_description && <p className="text-red-500 text-xs">{errors.short_description}</p>}
              </div>
            </Card.Body>
            <Card.Footer className="flex flex-row gap-1">
              <Button type="reset" variant={'outline'} onClick={() => handleCancelEditService()}>Cancelar</Button>
              <Button disabled={loading} onClick={() => handleSubmit()} type="submit" className="ml-2 bg-emerald-500 text-stone-50 flex flex-row items-center">
                {loading && (<Spinner size="sm" />)}
                Salvar
              </Button>
            </Card.Footer>
          </Card>
        )}
      </Formik>
    )
  }

  function handleEditService(index: number, service: servicesInterface) {
    setEditingindex(index)
    setSelectedService(service)
    setSelectedIconName(service.icon)
    setSelectedIcon(iconMap.find((element: any) => element.name === service.icon)?.icon)
  }

  function handleCancelEditService() {
    setSelectedIconName("")
    setSelectedService(undefined)
    setEditingindex(null)
  }

  async function handleDeleteService(id: string) {
    const docRef = doc(db, "services", id);
    setLoading(true)
    setWarnings({ ...warnings, [id]: true })
    return await deleteDoc(docRef).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
      setLoading(false)
      setWarnings(false)
    }).finally(() => {
      setTimeout(() => {
        getServices()
        setWarnings(false)
        setLoading(false)
      }, 1500)
    })
  }

  return (
    <Container>
      <section>
        <article className='mt-3 lg:m-5'>
          <h1 className='text-xl animate__animated animate__fadeIn animate__slower'> Lista Dos Seus Serviços </h1>
          <hr className='my-2 w-[15rem] animate__animated animate__fadeIn animate__slower' />
        </article>


        <article className="flex flex-row items-start flex-wrap gap-5">

          {services.map((service, index) => (
            <>
              {editingindex === index && <EditingCard index={index}/>}

              {editingindex !== index &&
                <ServiceCard
                  key={index}
                  id={service.id}
                  title={service.title}
                  short_description={service.short_description}
                  icon={service.icon}
                  type="admin"
                  onEditAction={() => handleEditService(index, service)}
                  onDeleteAction={() => setWarnings({ ...warnings, [service.id]: true })}
                />}

              <AlertDialog open={warnings[service.id]} onOpenChange={(open) => setWarnings({ ...warnings, [service.id]: open })}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className='select-none'>
                      Você Tem Certeza Disso?
                    </AlertDialogTitle>
                    <AlertDialogDescription className='select-none'>
                      Deseja realmente excluir esse Serviço? ele não poderá ser recuperado e nem listado na aba de Serviços.
                    </AlertDialogDescription>

                    <AlertDialogDescription className='select-none'>
                      ID do Serviço: {service.id}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className='flex flex-row items-center '>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <Button type='button'
                      className='bg-red-500 text-stone-50'
                      onClick={() => handleDeleteService(service.id as string)} disabled={loading}>
                      {loading ? (
                        <Spinner size="sm" />
                      ) : (
                        <XCircle size={15} />
                      )}
                      Remover
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ))}


          {isAdding && (
            <NewCard />
          )}

          <NewCardButton />

        </article>
      </section>
    </Container>
  )
}

export default Services