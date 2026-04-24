import { FirebaseDB } from '@/services/firebase'
import { SkillsForms } from '@/types/form/skills.form'
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { useMemo, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PrivateLayout from '../../layout/private-layout'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowDown, ArrowUp, Brain, ChevronsUpDown, Trash, X } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandGroup, CommandItem, CommandList, CommandEmpty } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { IconsSelect } from '@/shared/consts/Icons'
import { buildSuggestions } from '@/shared/consts/tw-colors';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AdminPageHeader } from '@/subdomains/admin/components/AdminPageHeader'

function SkillPage() {
  const { id } = useParams()
  const isNew = id === 'new'
  const navigate = useNavigate()
  const allGradients = useMemo(() => buildSuggestions(), []);
  const [colorOpen, setColorOpen] = useState(false);

  const form = useForm<SkillsForms>({
    defaultValues: {
      title: '',
      color: '',
      skills: [],
      icon: ''
    }
  })

  const onSubmit = form.handleSubmit(async (values) => {
    if (isNew) {
      await addDoc(collection(FirebaseDB, 'skills'), values).then((res) => {
        if (res.id) navigate(`/skills/${res.id}`)
        else navigate('/skills')
      })
    } else if (id) {
      await updateDoc(doc(FirebaseDB, 'skills', id), values)
      navigate('/skills')
    }
  })

  React.useEffect(() => {
    const load = async () => {
      if (!isNew && id) {
        const snap = await getDoc(doc(FirebaseDB, 'skills', id))
        if (snap.exists()) {
          const data = snap.data() as any
          form.reset({
            title: data.title,
            color: data.color,
            icon: data.icon,
            skills: data.skills
          })
        }
      }
    }
    load()
  }, [id, isNew])

  const { fields: skillFields, append: addSkill, remove: removeSkill, move } = useFieldArray({
    control: form.control,
    name: 'skills'
  });

  return (
    <PrivateLayout>
      <div className='space-y-6'>
        <AdminPageHeader
          title={isNew ? 'Nova habilidade' : 'Editar habilidade'}
          description="Configure setor, gradiente e habilidades relacionadas."
        />
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <Card className='border-border/80 bg-card/50 shadow-none md:col-span-2'>
              <CardHeader>
                <CardTitle className='font-poppins'>
                  <h3>
                    <Brain className='inline-block mr-2 h-5 w-5' />Setor
                  </h3>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <FormItem>
                    <FormField control={form.control} name="icon" render={({ field }) => (
                      <FormItem >
                        <FormLabel>Icone</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {IconsSelect.map(ic => (
                              <SelectItem key={ic.value} value={ic.value}>{ic.icon} {ic.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                    />
                  </FormItem>

                  <FormItem>
                    <FormField control={form.control} name="title" render={({ field }) => (
                      <FormItem >
                        <FormLabel>Setor</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    />
                  </FormItem>

                  <FormItem>
                    <FormField control={form.control} name="color" render={({ field }) => {
                      const query = (field.value ?? '').toLowerCase();
                      const filtered = (allGradients ?? []).filter(g => g.toLowerCase().includes(query)).slice(0, 30);

                      const tokens = String(field.value ?? '').split(' ').filter(Boolean);
                      const fromClass = tokens.find(t => t.startsWith('from-'));
                      const toClass = tokens.find(t => t.startsWith('to-'));
                      const gradientClass = fromClass && toClass
                        ? `bg-gradient-to-r ${fromClass} ${toClass}`
                        : 'bg-slate-700';

                      return (
                        <FormItem>
                          <FormLabel>Cor (classe tw)</FormLabel>

                          <div className="flex items-start gap-2">
                            <div className={cn("rounded-md p-[2px] w-full", gradientClass)}>
                              <div className="rounded-md relative bg-slate-900">
                                <FormControl>
                                  <Input
                                    placeholder="from-slate-500 to-slate-600"
                                    value={field.value ?? ''}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    className="bg-transparent pr-10"
                                  />
                                </FormControl>

                                {!!field.value && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                                    onClick={() => field.onChange('')}
                                    aria-label="Limpar cor"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </div>

                            <Popover open={colorOpen} onOpenChange={setColorOpen}>
                              <PopoverTrigger asChild>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  aria-label="Abrir sugestões"
                                  onClick={() => setColorOpen(true)}
                                >
                                  <ChevronsUpDown className="h-4 w-4" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="p-0 w-[320px]" align="start">
                                <Command>
                                  <CommandList>
                                    <CommandEmpty>
                                      Nenhuma opção. Tente: "from-slate-500 to-slate-600"
                                    </CommandEmpty>

                                    <CommandGroup>
                                      {filtered.map((opt) => (
                                        <CommandItem
                                          key={opt}
                                          onSelect={() => {
                                            field.onChange(opt);
                                            setColorOpen(false);
                                          }}
                                        >
                                          {opt}
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          </div>

                          <FormMessage />
                        </FormItem>
                      );
                    }}
                    />
                  </FormItem>
                </div>

                <div className="md:col-span-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                  <Button type="button" variant="outline" className="w-full sm:w-auto" asChild>
                    <Link to="/skills">Cancelar</Link>
                  </Button>
                  <Button type="submit" className="w-full sm:w-auto">Salvar</Button>
                </div>
              </CardContent>
            </Card>
          </form>

          {!isNew && (
            <Card className="border-border/80 bg-card/50 shadow-none mt-6">
              <CardHeader>
                <CardTitle className='font-poppins'>Habilidades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addSkill({ name: '', level: 0 })}
                  >
                    Adicionar habilidade
                  </Button>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skillFields.map((sf, index) => (
                    <div key={sf.id} className="rounded-md border border-slate-700 p-4">
                      {/* Ações de item: mover e remover */}
                      <div className="flex justify-end gap-2 mb-3">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => move(index, index - 1)}
                          disabled={index === 0}
                          aria-label="Mover para cima"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => move(index, index + 1)}
                          disabled={index === skillFields.length - 1}
                          aria-label="Mover para baixo"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => removeSkill(index)}
                          aria-label="Remover habilidade"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <FormItem>
                          <FormField
                            control={form.control}
                            name={`skills.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Ex.: React" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </FormItem>

                        <FormItem>
                          <FormField
                            control={form.control}
                            name={`skills.${index}.level`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Porcentagem</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    min={0}
                                    max={100}
                                    step={1}
                                    placeholder="0–100"
                                    value={field.value ?? 0}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </FormItem>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end">
                  <Button type="button" onClick={onSubmit}>
                    Salvar alterações
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </Form>
      </div>
    </PrivateLayout>
  )
}

export default SkillPage