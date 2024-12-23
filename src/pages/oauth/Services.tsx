
import ServiceCard from "@/components/serviceCard"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { servicesInterface } from "@/utils/api/Consts"
import { useFirebase } from "@/utils/context/FirebaseProvider"
import { collection, getDocs, getFirestore } from "firebase/firestore"
import { ChevronDown, PlusCircle } from "lucide-react"
import React from "react"
import { Card, Container } from "react-bootstrap"

function Services() {
  const [services, setServices] = React.useState<servicesInterface[]>([])
  const [warnings, setWarnings] = React.useState<any>({})
  const [loading, setLoading] = React.useState(false)
  const [isAdding, setIsAdding] = React.useState(false)
  const [editingindex, setEditingindex] = React.useState<number | null>(null)

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

  function NewCard() {
    return (
      <Card className='bg-slate-950 border-slate-500 rounded-none text-slate-50 w-[15rem] h-[15rem] select-none group transition-all'>
        <Card.Header className="flex flex-col justify-center items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-row items-center gap-2"> Icone <ChevronDown size={15} /> </DropdownMenuTrigger>
            <DropdownMenuContent>
                  {/* todo: criar uma Lista de Icones e incluir no dropdown */}
            </DropdownMenuContent>
          </DropdownMenu>
        </Card.Header>        
        <Card.Body className='flex flex-col justify-center items-center gap-3'>
          <Input type="text" placeholder="Titulo" className="w-[12rem]"/>
          <Input type="text" placeholder="Descrição" className="w-[12rem]" />
        </Card.Body>
        <Card.Footer>
          <Button variant={'outline'}>Cancelar</Button>
          <Button className="ml-2 bg-emerald-500 text-stone-50">Salvar</Button>
        </Card.Footer>
      </Card>
    )
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
            <ServiceCard
              key={index}
              id={service.id}
              title={service.title}
              short_description={service.short_description}
              icon={service.icon}
            />
          ))}

          <NewCardButton />

          {isAdding && (
            <NewCard />
          )}
        </article>
      </section>
    </Container>
  )
}

export default Services