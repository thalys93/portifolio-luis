import React from 'react'
import PrivateLayout from '@/subdomains/admin/layout/private-layout'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { FirebaseDB } from '@/services/firebase'
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import { AdminPageHeader } from '@/subdomains/admin/components/AdminPageHeader'

type FormValues = {
    slug: string
    i18nKey: string
    name_ptbr: string
    description_ptbr: string
    name_en: string
    description_en: string
    name_es: string
    description_es: string
}

function CategoryPage() {
    const { id } = useParams()
    const isNew = id === 'new'
    const navigate = useNavigate()

    const form = useForm<FormValues>({
        defaultValues: {
            slug: '',
            i18nKey: '',
            name_ptbr: '',
            description_ptbr: '',
            name_en: '',
            description_en: '',
            name_es: '',
            description_es: ''
        }
    })

    const onSubmit = form.handleSubmit(async (values) => {
        const base = {
            slug: values.slug,
            i18nKey: values.i18nKey,
            i18n: {
                ptbr: { name: values.name_ptbr, description: values.description_ptbr },
                en: { name: values.name_en, description: values.description_en },
                es: { name: values.name_es, description: values.description_es },
            }
        }

        if (isNew) {
            await addDoc(collection(FirebaseDB, 'categories'), base)
        } else if (id) {
            await updateDoc(doc(FirebaseDB, 'categories', id), base)
        }

        navigate('/categories')
    })

    React.useEffect(() => {
        const load = async () => {
            if (!isNew && id) {
                const snap = await getDoc(doc(FirebaseDB, 'categories', id))
                if (snap.exists()) {
                    const data = snap.data() as any
                    form.reset({
                        slug: data.slug || '',
                        i18nKey: data.i18nKey || '',
                        name_ptbr: data.i18n?.ptbr?.name || '',
                        description_ptbr: data.i18n?.ptbr?.description || '',
                        name_en: data.i18n?.en?.name || '',
                        description_en: data.i18n?.en?.description || '',
                        name_es: data.i18n?.es?.name || '',
                        description_es: data.i18n?.es?.description || ''
                    })
                }
            }
        }
        load()
    }, [id, isNew])

    return (
        <PrivateLayout>
            <div className="space-y-6">
                <AdminPageHeader
                    title={isNew ? 'Nova categoria' : 'Editar categoria'}
                    description="Preencha os dados e traduções da categoria."
                />

                <Form {...form}>
                    <form onSubmit={onSubmit} className="grid gap-6 md:grid-cols-2">
                        <Card className="border-border/80 bg-card/50 shadow-none md:col-span-2">
                            <CardHeader>
                                <CardTitle className="font-poppins">Tradução</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <FormField control={form.control} name="i18nKey" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Chave de tradução (namespace)</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="categories.sua-categoria" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <Tabs defaultValue="ptbr" className="mt-4">
                                    <TabsList>
                                        <TabsTrigger value="ptbr">PT-BR</TabsTrigger>
                                        <TabsTrigger value="en">EN</TabsTrigger>
                                        <TabsTrigger value="es">ES</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="ptbr" className="mt-3 grid gap-3">
                                        <FormField control={form.control} name="name_ptbr" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nome (ptbr)</FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="description_ptbr" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Descrição (ptbr)</FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </TabsContent>

                                    <TabsContent value="en" className="mt-3 grid gap-3">
                                        <FormField control={form.control} name="name_en" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nome (en)</FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="description_en" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Descrição (en)</FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </TabsContent>

                                    <TabsContent value="es" className="mt-3 grid gap-3">
                                        <FormField control={form.control} name="name_es" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nome (es)</FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="description_es" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Descrição (es)</FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>

                        <Card className="border-border/80 bg-card/50 shadow-none">
                            <CardHeader>
                                <CardTitle className="font-poppins">Detalhes</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <FormField control={form.control} name="slug" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Slug</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="ex.: Frontend, Fullstack" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </CardContent>
                        </Card>

                        <div className="md:col-span-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                            <Button type="button" variant="outline" className="w-full sm:w-auto" asChild>
                                <Link to="/categories">Cancelar</Link>
                            </Button>
                            <Button type="submit" className="w-full sm:w-auto">Salvar</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </PrivateLayout>
    )
}

export default CategoryPage