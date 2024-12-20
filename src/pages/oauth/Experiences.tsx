import React, { useEffect } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import { Formik } from 'formik'
import { CompaniesThatIWorkedInterface } from '@/utils/api/Consts'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Pencil, Plus, XCircle } from 'lucide-react'
import { CheckCircle } from "@phosphor-icons/react"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { getFirestore, doc, updateDoc, collection, getDocs, deleteDoc, addDoc, query, orderBy } from 'firebase/firestore'
import { useFirebase } from '@/utils/context/FirebaseProvider'
import { faker } from '@faker-js/faker'
import { AlertDialogTrigger, AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'

function Experiences() {
  const [experiences, setExperiences] = React.useState<CompaniesThatIWorkedInterface[]>([])
  const [filterTxt, setFilterTxt] = React.useState<string>('')
  const [filteredExperiences, setFilteredExperiences] = React.useState<CompaniesThatIWorkedInterface[]>([])
  const firebaseApp = useFirebase()
  const [warnings, setWarnings] = React.useState<any>({})
  const [loading, setLoading] = React.useState(false)
  const [isAdding, setIsAdding] = React.useState(false)
  const initialValues: CompaniesThatIWorkedInterface = {
    id: faker.string.uuid(),
    name: "",
    position: "",
    description: "",
    startDate: "",
    endDate: "",
  }
  const [editingindex, setEditingindex] = React.useState<number | null>(null)

  const updateValues: Partial<CompaniesThatIWorkedInterface> = editingindex !== null
    ? {
      name: experiences[editingindex].name,
      position: experiences[editingindex].position,
      description: experiences[editingindex].description,
      startDate: experiences[editingindex].startDate,
      endDate: experiences[editingindex].endDate
    }
    : {};

  const db = getFirestore(firebaseApp)

  function handleFilterExperiences(text: string) {
    setFilterTxt(text)
    if (text === "") {
      setFilteredExperiences(experiences)
    } else {
      setFilteredExperiences(experiences.filter(exp => exp.name.toLowerCase().includes(text.toLowerCase())))
    }
  }

  const tableHeaders = [
    { name: "Id" },
    { name: "Nome" },
    { name: "Cargo" },
    { name: "Descrição" },
    { name: "Data de Inicio" },
    { name: "Data de Fim" },
    { name: "Ações" }
  ]


  async function handleGetExperiences() {
    const projectsRef = collection(db, "experiences")
    const q = query(projectsRef, orderBy("endDate", "desc"))

    return await getDocs(q).then((res) => {
      console.log(res.docs)
      const data = res.docs.map((doc) => {
        return {
          id: doc.id,
          name: doc.data().name,
          position: doc.data().position,
          description: doc.data().description,
          startDate: doc.data().startDate,
          endDate: doc.data().endDate
        }
      })
      console.log(data)
      setExperiences(data)
      setFilteredExperiences(data)
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    handleGetExperiences()
  }, [])

  async function handleAddDocument(values: CompaniesThatIWorkedInterface) {
    setLoading(true)

    return await addDoc(collection(db, "experiences"), values).then((res) => {
      if (res) {
        console.log(res)
      }
    }).catch((err) => {
      console.log(err)
      setLoading(false)
      setIsAdding(false)
    }).finally(() => {
      setTimeout(() => {
        handleGetExperiences()
        setLoading(false)
        setIsAdding(false)
      }, 1000)
    })
  }

  async function handleEditDocument(values: CompaniesThatIWorkedInterface) {    
    setLoading(true)

    const mappedValues: Partial<CompaniesThatIWorkedInterface> = {
      name: values.name,
      position: values.position,
      description: values.description,
      startDate: values.startDate,
      endDate: values.endDate
    }

    const docRef = doc(db, "experiences", experiences[editingindex ?? 0].id as string);
    return await updateDoc(docRef, mappedValues).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
      setLoading(false)
    }).finally(() => {
      setTimeout(() => {
        handleGetExperiences()
        setLoading(false)        
        setEditingindex(null)
      }, 1000)
    })
  }

  async function handleRemoveDocument(id: string) {
    const docRef = doc(db, "experiences", id as string);
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
        handleGetExperiences()
        setWarnings(false)
        setLoading(false)
      }, 1500)
    })
  }

  function handleCancelAndResetForm(onResetForm: () => void) {
    onResetForm()
    setIsAdding(false)    
    setEditingindex(null)
  }


  function expData(exp: CompaniesThatIWorkedInterface, i: number) {
    return (
      <>
        <TableCell>{exp.id}</TableCell>
        <TableCell>{exp.name}</TableCell>
        <TableCell>{exp.position}</TableCell>
        <TableCell>{exp.description}</TableCell>
        <TableCell>{exp.startDate}</TableCell>
        <TableCell>{exp.endDate}</TableCell>
        <TableCell>
          <div className='flex flex-row items-center justify-center gap-2'>
            <Button type='button'
              className='bg-amber-500 text-stone-50'
              onClick={() => setEditingindex(i as number)} disabled={loading}>
              {loading ? (
                <Spinner size="sm" />
              ) : (
                <Pencil size={15} />
              )}
              Editar
            </Button>
            <AlertDialog open={warnings[exp.id]} onOpenChange={(open) => setWarnings({ ...warnings, [exp.id]: open })}>
              <AlertDialogTrigger>
                <Button type='button'
                  className='bg-red-500 text-stone-50'>
                  Remover
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className='select-none'>
                    Você Tem Certeza Disso?
                  </AlertDialogTitle>
                  <AlertDialogDescription className='select-none'>
                    Deseja realmente excluir esse projeto? ele não poderá ser recuperado e nem listado na tela de projetos.
                  </AlertDialogDescription>

                  <AlertDialogDescription className='select-none'>
                    ID do Projeto: {exp.id}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className='flex flex-row items-center '>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <Button type='button'
                    className='bg-red-500 text-stone-50'
                    onClick={() => handleRemoveDocument(exp.id as string)} disabled={loading}>
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
          </div>
        </TableCell>
      </>
    )
  }

  function expEditableData(exp: CompaniesThatIWorkedInterface, i: number) {
    if (editingindex !== i) return null;

    return (
      <Formik initialValues={updateValues as any} onSubmit={handleEditDocument} key={editingindex} disabled={editingindex === null}>
        {({ values, handleChange, handleBlur, handleSubmit, resetForm }) => (
          <>
            <TableCell className='select-none'>
              {exp.id}
            </TableCell>
            <TableCell>
              <Input type='text' placeholder='Empresa' value={values.name} onChange={handleChange("name")} onBlur={handleBlur("name")} />
            </TableCell>
            <TableCell>
              <Input type='text' placeholder='Cargo' value={values.position} onChange={handleChange("position")} onBlur={handleBlur("position")} />
            </TableCell>
            <TableCell>
              <Input type='text' placeholder='Descrição' value={values.description} onChange={handleChange("description")} onBlur={handleBlur("description")} />
            </TableCell>
            <TableCell>
              <Input type='text' placeholder='Data de Inicio' value={values.startDate} onChange={handleChange("startDate")} onBlur={handleBlur("startDate")} />
            </TableCell>
            <TableCell>
              <Input type='text' placeholder='Data de Fim' value={values.endDate} onChange={handleChange("endDate")} onBlur={handleBlur("endDate")} />
            </TableCell>
            <TableCell>
              <div className='flex flex-row items-center justify-center gap-2'>
                <Button
                  type='submit'
                  className='bg-sky-500 text-stone-50'
                  onClick={() => handleSubmit()}
                  disabled={loading}>
                  {loading ? (
                    <Spinner size="sm" />
                  ) : (
                    <Pencil size={15} />
                  )}
                  Confirmar
                </Button>
                <Button type='reset' onClick={() => handleCancelAndResetForm(resetForm)} className='bg-red-500 text-stone-50'>
                  <XCircle size={15} />
                  Cancelar
                </Button>
              </div>
            </TableCell>
          </>
        )}
      </Formik>
    )
  }

  return (
    <Container>
      <section>
        <article className='flex flex-col gap-1 items-start'>
          <article className='mt-3 lg:m-5'>
            <h1 className='text-xl animate__animated animate__fadeIn animate__slower'> Lista das suas Experiências </h1>
            <hr className='my-2 w-[15rem] animate__animated animate__fadeIn animate__slower' />
          </article>

          <article className='mt-3 lg:m-5 w-[80%] lg:w-[30%]'>
            <Label htmlFor='text' className='mb-3'>Filtrar Experiências</Label>
            <Input type='text' placeholder='Buscar por Nome' value={filterTxt} onChange={(e) => handleFilterExperiences(e.target.value)} />
          </article>
        </article>

        <article>
          <Table>
            <TableHeader>
              <TableRow>
                {tableHeaders.map((header) => (
                  <TableHead key={header.name} className='select-none'>
                    {header.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExperiences.map((exp, i) => (
                <TableRow key={exp.id}>
                  {editingindex === i ? expEditableData(exp, i) : expData(exp, i)}
                </TableRow>
              ))}
              {isAdding && (
                <Formik initialValues={initialValues} onSubmit={handleAddDocument}>
                  {({ values, handleChange, handleBlur, resetForm, handleSubmit }) => (
                    <TableRow>
                      <TableCell>{experiences.length + 1}</TableCell>
                      <TableCell>
                        <Input type='text' placeholder='Empresa' value={values.name} onChange={handleChange("name")} onBlur={handleBlur("name")} />
                      </TableCell>
                      <TableCell>
                        <Input type='text' placeholder='Cargo' value={values.position} onChange={handleChange("position")} onBlur={handleBlur("position")} />
                      </TableCell>
                      <TableCell>
                        <Input
                          className='w-[15rem]'
                          type='text'
                          placeholder='Descrição do Cargo'
                          value={values.description}
                          onChange={handleChange("description")}
                          onBlur={handleBlur("description")} />
                      </TableCell>
                      <TableCell>
                        <Input type='text' placeholder='Inicio' value={values.startDate} onChange={handleChange("startDate")} onBlur={handleBlur("startDate")} />
                      </TableCell>
                      <TableCell>
                        <Input type='text' placeholder='Final' value={values.endDate} onChange={handleChange("endDate")} onBlur={handleBlur("endDate")} />
                      </TableCell>
                      <TableCell>
                        <div className='flex flex-row items-center justify-center gap-2'>
                          <Button
                            className='bg-emerald-500 text-stone-50'
                            onClick={() => handleSubmit()} disabled={loading}>
                            {loading ? (
                              <Spinner size="sm" />
                            ) : (
                              <CheckCircle size={20} weight='fill' />
                            )}
                            Adicionar
                          </Button>
                          <Button
                            onClick={() => handleCancelAndResetForm(resetForm)}
                            className='bg-red-500 text-stone-50'
                            disabled={loading}>
                            {loading ? (
                              <Spinner size="sm" />
                            ) : (
                              <XCircle size={20} />
                            )}
                            Cancelar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </Formik>
              )}

            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={10}>
                  <div className='flex flex-row  justify-start items-start ml-[1.8rem]'>
                    <Button type='button'
                      className='bg-sky-500 text-stone-50'
                      onClick={() => setIsAdding(true)} disabled={loading}>
                      {loading ? (
                        <Spinner size="sm" />
                      ) : (
                        <Plus size={15} />
                      )}
                      Novo Projeto
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </article>
      </section>
    </Container>
  )
}

export default Experiences