import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup, signOut } from 'firebase/auth';
import { FirebaseAuth, AuthProviders } from '@/services/firebase';
import { ArrowLeft, Github, Loader2 } from 'lucide-react';
import AuroraBackground from './components/animated-shader-bg';

function LoginPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onGithub = async () => {
        setError(null);
        setLoading(true);
        try {
            const cred = await signInWithPopup(FirebaseAuth, AuthProviders.Github);
            const email = cred?.user?.email?.toLowerCase();
            if (email !== import.meta.env.VITE_ADMIN_EMAIL) {
                setError('Conta não autorizada. Use o e-mail permitido.');
                await signOut(FirebaseAuth);
            } else {
                navigate('/home');
            }
        } catch (err: any) {
            setError(err?.message ?? 'Erro ao entrar com GitHub.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-20 text-foreground sm:px-6">
            <AuroraBackground />
            {loading && (
                <div
                    className="absolute inset-0 z-40 flex items-center justify-center bg-background/70 backdrop-blur-md"
                    role="status"
                    aria-live="polite"
                    aria-label="Autenticando com GitHub"
                >
                    <div className="flex min-w-64 flex-col items-center gap-4 rounded-2xl border border-border/60 bg-card/80 px-8 py-6 shadow-[0_24px_80px_-32px_hsl(var(--background)/0.85)]">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-sm font-medium text-foreground">Autenticando com GitHub...</p>
                    </div>
                </div>
            )}
            <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.16),transparent_56%),radial-gradient(circle_at_bottom_right,hsl(var(--accent-foreground)/0.12),transparent_52%)]" />
                <div className="absolute inset-0 opacity-25 mix-blend-soft-light bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:36px_36px]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,hsl(var(--background)/0.62),hsl(var(--background)/0.88),hsl(var(--background)/0.72))]" />
                <div className="absolute -top-28 -left-16 h-72 w-72 rounded-full bg-[hsl(var(--primary)/0.22)] blur-3xl" />
                <div className="absolute -bottom-28 -right-16 h-72 w-72 rounded-full bg-[hsl(var(--accent-foreground)/0.16)] blur-3xl" />
            </div>

            <nav className="absolute inset-x-0 top-0 z-20">
                <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
                    <Link to="/" className="text-sm font-semibold tracking-wide text-foreground/90 transition-colors hover:text-foreground">
                        Thalys Dev
                    </Link>
                    <div className="flex items-center gap-2">
                        <LanguageSwitcher />
                        <ThemeToggle />                        
                    </div>
                </div>
            </nav>

            <div className="relative z-10 flex w-full max-w-lg flex-col items-center gap-4">
            
                <Card className="relative w-full select-none overflow-hidden border-border/60 bg-card/55 shadow-[0_24px_80px_-32px_hsl(var(--background)/0.85)] backdrop-blur-xl animate-fade-in">
                    <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(130deg,hsl(var(--primary)/0.2),transparent_40%,hsl(var(--accent-foreground)/0.08)_82%)]" />
                    <div className="relative">
                        <CardHeader className="space-y-4 pb-5">
                            <div className="w-fit rounded-full border border-border/70 bg-background/25 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                                Painel administrativo
                            </div>
                            <div className="space-y-2 text-center">
                                <CardTitle className="font-poppins text-3xl leading-tight text-foreground sm:text-4xl">
                                    Acesse o gerenciador
                                </CardTitle>
                                <CardDescription className="mx-auto max-w-sm text-muted-foreground">
                                    Entre com sua conta GitHub autorizada para administrar projetos, conteúdos e atualizações do portfólio.
                                </CardDescription>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-4 pt-0">
                            {error && (
                                <div className="rounded-lg border border-red-400/45 bg-red-500/10 px-3 py-2 text-sm text-red-100">
                                    {error}
                                </div>
                            )}

                            <Button
                                className="h-11 w-full rounded-lg bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--primary)/0.92)] to-[hsl(var(--accent-foreground)/0.9)] font-medium text-primary-foreground transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_34px_-10px_hsl(var(--primary)/0.75)] focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring)/0.7)] focus-visible:ring-offset-0"
                                onClick={onGithub}
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Github className="mr-2 h-5 w-5" />}
                                {loading ? 'Conectando...' : 'Entrar com GitHub'}
                            </Button>

                            <Button asChild variant="outline" className="h-11 w-full rounded-lg border-border/70 bg-background/20 text-foreground hover:bg-accent/50">
                                <a href="/" onClick={(e) => { e.preventDefault(); window.open("/", "_self"); }}>
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Voltar para a landing page
                                </a>
                            </Button>

                            <p className="text-center text-xs text-muted-foreground">
                                O acesso é restrito ao e-mail configurado para administração.
                            </p>
                        </CardContent>
                    </div>
                    <div aria-hidden className="absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--primary)/0.45)] to-transparent" />
                    <div aria-hidden className="absolute -bottom-20 left-1/2 h-28 w-56 -translate-x-1/2 rounded-full bg-[hsl(var(--primary)/0.2)] blur-3xl" />
                </Card>
            </div>

            <footer className="absolute inset-x-0 bottom-0 z-20">
                <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-center px-4 sm:px-6">
                    <p className="text-xs text-slate-300/85">
                        © {new Date().getFullYear()} Thalys Dev. Todos os direitos reservados.
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default LoginPage