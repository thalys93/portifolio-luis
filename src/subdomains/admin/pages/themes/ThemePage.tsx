
import React, { useEffect } from 'react'
import PrivateLayout from '../../layout/private-layout'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FirebaseDB } from '@/services/firebase'
import { collection, addDoc, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore'
import { Palette, RefreshCw } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"

// Extended type to include color overrides
type ThemeForm = {
    name: string
    value: string // CSS ID/Class
    colors?: {
        primary: string
        secondary: string
        background: string
        foreground: string
        accent: string
    }
}

function ThemePage() {
    const { id } = useParams()
    const isNew = id === 'new'
    const navigate = useNavigate()

    const form = useForm<ThemeForm>({
        defaultValues: {
            name: '',
            value: '',
            colors: {
                primary: '#3b82f6',
                secondary: '#eab308',
                background: '#020817',
                foreground: '#f8fafc',
                accent: '#10b981'
            }
        }
    })

    const themeValue = form.watch('value')
    const watchedColors = form.watch('colors')

    // Helper to generate dynamic styles for preview
    const getPreviewStyle = (): React.CSSProperties => {
        if (!watchedColors) return {}
        return {
            '--primary': hexToHsl(watchedColors.primary),
            '--secondary': hexToHsl(watchedColors.secondary),
            '--gradient-start': `hsl(${hexToHsl(watchedColors.primary)})`, // Add gradient start
            '--gradient-end': `hsl(${hexToHsl(watchedColors.secondary)})`, // Add gradient end
            '--background': hexToHsl(watchedColors.background),
            '--foreground': hexToHsl(watchedColors.foreground),
            '--accent': hexToHsl(watchedColors.accent),
            '--muted': hexToHsl(watchedColors.background),
            '--card': hexToHsl(watchedColors.background),
            '--popover': hexToHsl(watchedColors.background),
            '--border': hexToHsl(watchedColors.secondary),
            '--input': hexToHsl(watchedColors.secondary),
            '--primary-foreground': '0 0% 100%',
            '--secondary-foreground': '0 0% 0%',
            '--muted-foreground': '215 20% 65%',
            '--card-foreground': hexToHsl(watchedColors.foreground),
            '--radius': '0.5rem',
        } as React.CSSProperties
    }

    const hexToHsl = (hex: string) => {
        // Very basic hex to HSL/Tw format converter for preview
        let c = hex.substring(1).split('')
        if (c.length === 3) c = [c[0], c[0], c[1], c[1], c[2], c[2]]
        const cVal = parseInt(c.join(''), 16)
        let r = (cVal >> 16) & 255
        let g = (cVal >> 8) & 255
        let b = cVal & 255

        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b)
        let h = 0, s = 0, l = (max + min) / 2
        if (max !== min) {
            const d = max - min
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break
                case g: h = (b - r) / d + 2; break
                case b: h = (r - g) / d + 4; break
            }
            h /= 6
        }
        // Return format: 'H S% L%' for Tailwind
        return `${(h * 360).toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%`
    }


    const PreviewCard = ({ className }: { className?: string }) => (
        <div className={`p-4 rounded-lg border shadow-sm ${className || ''}`}>
            <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded bg-primary text-primary-foreground flex items-center justify-center font-bold">P</div>
                <div>
                    <div className="h-2 w-20 bg-foreground/80 rounded mb-1"></div>
                    <div className="h-2 w-12 bg-muted-foreground rounded"></div>
                </div>
            </div>
            <div className="space-y-2">
                <div className="h-8 w-full bg-secondary/30 rounded flex items-center px-2">
                    <div className="w-4 h-4 bg-accent rounded-full"></div>
                </div>
                <div className="flex gap-2">
                    <div className="h-8 flex-1 bg-primary text-primary-foreground rounded text-xs flex items-center justify-center">Primary</div>
                    <div className="h-8 flex-1 border border-input text-foreground rounded text-xs flex items-center justify-center">Outline</div>
                </div>
                <div className="mt-2 text-center text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-[--gradient-start] to-[--gradient-end]">
                    Texto Gradiente
                </div>
                {/* <div className="h-8 w-full bg-destructive/20 text-destructive rounded text-xs flex items-center justify-center">Destructive</div> */}
            </div>
        </div>
    )

    const onSubmit = form.handleSubmit(async (values) => {
        const payload = {
            ...values,
            // In a real app we would probably generate the JSON for context/css variables here
        }

        if (isNew) {
            await addDoc(collection(FirebaseDB, 'themes'), payload)
        } else if (id) {
            await updateDoc(doc(FirebaseDB, 'themes', id), payload)
        }
        navigate('/themes')
    })

    useEffect(() => {
        if (!isNew && id) {
            getDoc(doc(FirebaseDB, 'themes', id)).then(snap => {
                if (snap.exists()) {
                    form.reset(snap.data() as ThemeForm)
                }
            })
        }
    }, [id, isNew])

    return (
        <PrivateLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-poppins">{isNew ? 'Novo Tema' : 'Editar Tema'}</h1>
                    {!isNew && (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    variant="default"
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                    onClick={async (e) => {
                                        if (themeValue) {
                                            await setDoc(doc(FirebaseDB, 'settings', 'global'), { activeThemeId: themeValue }, { merge: true });
                                        } else {
                                            e.preventDefault();
                                        }
                                    }}
                                >
                                    Definir como Global (Para Todos)
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Tema Global Atualizado</DialogTitle>
                                    <DialogDescription>
                                        O tema <strong>{themeValue}</strong> foi definido como o tema global do site. Todos os visitantes agora verão este tema.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex justify-end gap-2 mt-4">
                                    <DialogClose asChild>
                                        <Button variant='outline'>Fechar</Button>
                                    </DialogClose>
                                    <Button asChild>
                                        <Link to="/themes">Voltar para Temas</Link>
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="glass-effect md:col-span-1">
                        <CardHeader>
                            <CardTitle className="font-poppins flex items-center gap-2">
                                <Palette className="w-5 h-5" />
                                Configurações
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={onSubmit} className="space-y-4">
                                    <FormField control={form.control} name="name" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nome do Tema</FormLabel>
                                            <FormControl><Input {...field} placeholder="Ex: Natal" /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField control={form.control} name="value" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Identificador (Slug/Class)</FormLabel>
                                            <FormControl><Input {...field} placeholder="Ex: christmas" /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <div className="grid grid-cols-2 gap-4 mt-4 border-t pt-4">
                                        <div className='col-span-2 text-sm font-semibold mb-1'>Paleta de Cores (Preview)</div>

                                        <FormField control={form.control} name="colors.primary" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs">Primary</FormLabel>
                                                <div className="flex gap-2">
                                                    <Input type="color" className="w-12 h-8 p-1 px-1" {...field} />
                                                    <Input {...field} className="h-8 font-mono text-xs" />
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )} />

                                        <FormField control={form.control} name="colors.secondary" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs">Secondary</FormLabel>
                                                <div className="flex gap-2">
                                                    <Input type="color" className="w-12 h-8 p-1 px-1" {...field} />
                                                    <Input {...field} className="h-8 font-mono text-xs" />
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )} />

                                        <FormField control={form.control} name="colors.accent" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs">Accent</FormLabel>
                                                <div className="flex gap-2">
                                                    <Input type="color" className="w-12 h-8 p-1 px-1" {...field} />
                                                    <Input {...field} className="h-8 font-mono text-xs" />
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )} />

                                        <FormField control={form.control} name="colors.background" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs">Background</FormLabel>
                                                <div className="flex gap-2">
                                                    <Input type="color" className="w-12 h-8 p-1 px-1" {...field} />
                                                    <Input {...field} className="h-8 font-mono text-xs" />
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )} />

                                        <FormField control={form.control} name="colors.foreground" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs">Foreground (Texto)</FormLabel>
                                                <div className="flex gap-2">
                                                    <Input type="color" className="w-12 h-8 p-1 px-1" {...field} />
                                                    <Input {...field} className="h-8 font-mono text-xs" />
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>

                                    <div className="flex justify-end gap-2 pt-6">
                                        <Button type="button" variant="outline" asChild>
                                            <Link to="/themes">Cancelar</Link>
                                        </Button>
                                        <Button type="submit">Salvar</Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>

                    {/* Preview Section */}
                    <Card className="glass-effect md:col-span-1">
                        <CardHeader>
                            <CardTitle className="font-poppins flex items-center justify-between">
                                Visualização
                                <Button variant="ghost" size="sm" onClick={() => form.reset(form.getValues())} title="Atualizar">
                                    <RefreshCw className="w-4 h-4" />
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <p className="text-sm text-muted-foreground">
                                Simulação em tempo real baseada nas cores selecionadas ao lado.
                            </p>

                            {/* Dynamic Preview Container using inline styles for immediate feedback */}
                            <div
                                className={`p-6 rounded-xl border transition-colors duration-300 shadow-xl`}
                                style={getPreviewStyle()}
                            >
                                <div className="bg-background text-foreground p-4 rounded-lg">
                                    <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide opacity-70">
                                        Tema: {form.getValues('name') || 'Novo'}
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <PreviewCard />
                                        <PreviewCard className="bg-card text-card-foreground" />
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        <Button className='w-full'>Button Primary</Button>
                                        <Button variant="secondary" className='w-full'>Secondary</Button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 p-3 bg-secondary/10 rounded-lg text-sm border border-border">
                                <p className="font-semibold text-foreground mb-1">Nota:</p>
                                <p className="text-muted-foreground">
                                    Agora o sistema é 100% dinâmico! As variáveis de gradiente (<code>--gradient-start/end</code>) são geradas automaticamente baseadas no Primary e Secondary. Você não precisa mais editar o <code>index.css</code>.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </PrivateLayout>
    )
}

export default ThemePage
