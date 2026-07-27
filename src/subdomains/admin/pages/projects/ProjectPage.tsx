import React, { useState } from 'react'
import PrivateLayout from '../../layout/private-layout'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import ImageDropzone from '@/components/dropzone'
import { FirebaseDB, FirebaseStorage } from '@/services/firebase'
import { collection, addDoc, doc, getDoc, updateDoc, getDocs } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { Globe, Image, List } from 'lucide-react'
import { IconsSelect } from '@/shared/consts/Icons'
import { ProjectForm } from '@/types/form/project.form'
import { AdminPageHeader } from '@/subdomains/admin/components/AdminPageHeader'
import { PROJECT_SHORT_TITLE_MAX, toShortTitle } from '@/lib/project-short-title'

function ProjectPage() {
    const { id } = useParams()
    const isNew = id === 'new'
    const navigate = useNavigate()
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [initialImage, setInitialImage] = useState<string | null>(null)
    const [categories, setCategories] = useState<{ slug: string; i18nKey?: string; i18n?: any }[]>([])

    const form = useForm<ProjectForm>({
        defaultValues: {
            title: '',
            description: '',
            image: '',
            technologies: '',
            category: '',
            icon: 'code',
            github: '',
            demo: '',
            date: '',
            i18nKey: '',
            title_ptbr: '',
            shortTitle_ptbr: '',
            description_ptbr: '',
            title_en: '',
            shortTitle_en: '',
            description_en: '',
            title_es: '',
            shortTitle_es: '',
            description_es: ''
        }
    })

    const onSubmit = form.handleSubmit(async (values) => {
        const techs = values.technologies.split(',').map((t) => t.trim()).filter(Boolean)
        const base = {
            title: values.title,
            description: values.description,
            category: values.category,
            icon: values.icon,
            github: values.github || null,
            demo: values.demo || null,
            date: values.date,
            technologies: techs,
            i18nKey: values.i18nKey,
            i18n: {
                ptbr: {
                    title: values.title_ptbr,
                    shortTitle: values.shortTitle_ptbr.trim(),
                    description: values.description_ptbr,
                },
                en: {
                    title: values.title_en,
                    shortTitle: values.shortTitle_en.trim(),
                    description: values.description_en,
                },
                es: {
                    title: values.title_es,
                    shortTitle: values.shortTitle_es.trim(),
                    description: values.description_es,
                },
            }
        }

        if (isNew) {
            if (imageFile) {
                const tmp = await addDoc(collection(FirebaseDB, 'projects'), { ...base, image: '', imagePath: '' })
                const ext = imageFile.name.split('.').pop() || 'jpg'
                const storagePath = `projects/${tmp.id}.${ext}`
                const sref = ref(FirebaseStorage, storagePath)
                await uploadBytes(sref, imageFile)
                const url = await getDownloadURL(sref)
                await updateDoc(tmp, { ...base, image: url, imagePath: storagePath })
            } else {
                await addDoc(collection(FirebaseDB, 'projects'), { ...base, image: values.image, imagePath: null })
            }
        } else if (id) {
            const dref = doc(FirebaseDB, 'projects', id)
            if (imageFile) {
                const ext = imageFile.name.split('.').pop() || 'jpg'
                const storagePath = `projects/${id}.${ext}`
                const sref = ref(FirebaseStorage, storagePath)
                await uploadBytes(sref, imageFile)
                const url = await getDownloadURL(sref)
                await updateDoc(dref, { ...base, image: url, imagePath: storagePath })
            } else {
                await updateDoc(dref, { ...base, image: values.image })
            }
        }

        navigate('/projects')
    })

    React.useEffect(() => {
        const run = async () => {
            const snap = await getDocs(collection(FirebaseDB, 'categories'))
            setCategories(snap.docs.map((d) => ({ ...(d.data() as any) })))
        }
        run()
    }, [])

    React.useEffect(() => {
        const load = async () => {
            if (!isNew && id) {
                const snap = await getDoc(doc(FirebaseDB, 'projects', id))
                if (snap.exists()) {
                    const data = snap.data() as any
                    form.reset({
                        title: data.title || '',
                        description: data.description || '',
                        image: data.image || '',
                        technologies: (data.technologies || []).join(', '),
                        category: data.category || '',
                        icon: data.icon || 'code',
                        github: data.github || '',
                        demo: data.demo || '',
                        date: data.date || '',
                        i18nKey: data.i18nKey || '',
                        title_ptbr: data.i18n?.ptbr?.title || '',
                        shortTitle_ptbr: data.i18n?.ptbr?.shortTitle || toShortTitle(data.i18n?.ptbr?.title || ''),
                        description_ptbr: data.i18n?.ptbr?.description || '',
                        title_en: data.i18n?.en?.title || '',
                        shortTitle_en: data.i18n?.en?.shortTitle || toShortTitle(data.i18n?.en?.title || ''),
                        description_en: data.i18n?.en?.description || '',
                        title_es: data.i18n?.es?.title || '',
                        shortTitle_es: data.i18n?.es?.shortTitle || toShortTitle(data.i18n?.es?.title || ''),
                        description_es: data.i18n?.es?.description || ''
                    })
                    setInitialImage(data.image || null)
                }
            }
        }
        load()
    }, [id, isNew])

    return (
        <PrivateLayout>
            <div className="space-y-6">
                <AdminPageHeader
                    title={isNew ? 'Novo projeto' : 'Editar projeto'}
                    description="Configure conteúdo, metadados e mídia do projeto."
                />

                <Form {...form}>
                    <form onSubmit={onSubmit} className="grid gap-6 md:grid-cols-2">
                        <Card className="border-border/80 bg-card/50 shadow-none md:col-span-2">
                            <CardHeader>
                                <CardTitle className="font-poppins"><Globe className='w-5 h-5 mr-1 inline-block' /> Tradução</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <FormItem className="mt-4">
                                    <FormLabel>Traduções</FormLabel>
                                    <Tabs defaultValue="ptbr" className="mt-2">
                                        <TabsList>
                                            <TabsTrigger value="ptbr">PT-BR</TabsTrigger>
                                            <TabsTrigger value="en">EN</TabsTrigger>
                                            <TabsTrigger value="es">ES</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="ptbr" className="mt-3">
                                            <div className="grid gap-3">
                                                <FormField control={form.control} name="title_ptbr" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Título (ptbr)</FormLabel>
                                                        <FormControl><Input {...field} /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                                <FormField control={form.control} name="shortTitle_ptbr" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Short title (ptbr)</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                maxLength={PROJECT_SHORT_TITLE_MAX}
                                                                placeholder="Título curto da home"
                                                            />
                                                        </FormControl>
                                                        <p className="text-xs text-muted-foreground">
                                                            {(field.value ?? '').length}/{PROJECT_SHORT_TITLE_MAX} · uma linha na home
                                                        </p>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                                <FormField control={form.control} name="description_ptbr" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Descrição (ptbr)</FormLabel>
                                                        <FormControl><Textarea {...field} rows={3} /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="en" className="mt-3">
                                            <div className="grid gap-3">
                                                <FormField control={form.control} name="title_en" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Título (en)</FormLabel>
                                                        <FormControl><Input {...field} /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                                <FormField control={form.control} name="shortTitle_en" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Short title (en)</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                maxLength={PROJECT_SHORT_TITLE_MAX}
                                                                placeholder="Home card short title"
                                                            />
                                                        </FormControl>
                                                        <p className="text-xs text-muted-foreground">
                                                            {(field.value ?? '').length}/{PROJECT_SHORT_TITLE_MAX} · one line on home
                                                        </p>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                                <FormField control={form.control} name="description_en" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Descrição (en)</FormLabel>
                                                        <FormControl><Textarea {...field} rows={3} /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="es" className="mt-3">
                                            <div className="grid gap-3">
                                                <FormField control={form.control} name="title_es" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Título (es)</FormLabel>
                                                        <FormControl><Input {...field} /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                                <FormField control={form.control} name="shortTitle_es" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Short title (es)</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                maxLength={PROJECT_SHORT_TITLE_MAX}
                                                                placeholder="Título corto del home"
                                                            />
                                                        </FormControl>
                                                        <p className="text-xs text-muted-foreground">
                                                            {(field.value ?? '').length}/{PROJECT_SHORT_TITLE_MAX} · una línea en el home
                                                        </p>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                                <FormField control={form.control} name="description_es" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Descrição (es)</FormLabel>
                                                        <FormControl><Textarea {...field} rows={3} /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                            </div>
                                        </TabsContent>
                                    </Tabs>

                                    <FormField control={form.control} name="i18nKey" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Chave de tradução (namespace)</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="projects.seu-projeto" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </FormItem>
                            </CardContent>
                        </Card>

                        <Card className="border-border/80 bg-card/50 shadow-none">
                            <CardHeader>
                                <CardTitle className="font-poppins"><List className='w-5 h-5 mr-1 inline-block' /> Detalhes</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-2">
                                <FormField control={form.control} name="technologies" render={({ field }) => (
                                    <FormItem className="md:col-span-2">
                                        <FormLabel>Tecnologias (separadas por vírgula)</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="React, Nest.js, Docker" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="icon" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ícone</FormLabel>
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
                                )} />

                                <FormField control={form.control} name="date" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ano</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="2025" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="demo" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Demo (URL)</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="github" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>GitHub (URL)</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="category" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Categoria</FormLabel>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories
                                                    .filter((c) => typeof c.slug === 'string' && c.slug.trim().length > 0)
                                                    .map((c) => (
                                                        <SelectItem key={c.slug} value={c.slug.trim()}>
                                                            {c.i18n?.ptbr?.name ?? c.slug}
                                                        </SelectItem>
                                                    ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </CardContent>
                        </Card>

                        <Card className="border-border/80 bg-card/50 shadow-none">
                            <CardHeader>
                                <CardTitle className="font-poppins"><Image className='w-5 h-5 mr-1 inline-block' /> Imagem</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-2">
                                    <ImageDropzone label="Imagem do projeto" setFile={setImageFile} size="wide" initialImage={initialImage ?? undefined} onRemove={() => { setImageFile(null); form.setValue('image', ''); }} />
                                    <FormField control={form.control} name="image" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Imagem (URL) alternativa</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="https://..." />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="md:col-span-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                            <Button type="button" variant="outline" className="w-full sm:w-auto" asChild>
                                <Link to="/projects">Cancelar</Link>
                            </Button>
                            <Button type="submit" className="w-full sm:w-auto">Salvar</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </PrivateLayout>


    )
}

export default ProjectPage