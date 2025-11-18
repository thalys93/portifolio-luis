import React from 'react'
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, signOut } from 'firebase/auth';
import { FirebaseAuth, AuthProviders } from '@/services/firebase';
import { Github } from 'lucide-react';

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
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background text-foreground">
            <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 opacity-15 mix-blend-overlay bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-background to-slate-900/20" />
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-slate-500/10 rounded-full blur-3xl" />
            </div>

            <Card className="relative mx-5 md:mx-auto w-full max-w-md glass-effect animate-fade-in select-none">
                <CardHeader>
                    <CardTitle className="text-2xl font-poppins">Bem-vindo</CardTitle>
                    <CardDescription>Use sua conta do GitHub para acessar o Gerenciador de Projetos</CardDescription>
                </CardHeader>

                <CardContent>
                    {error && (
                        <div className="mb-4 rounded-md border border-red-500/50 bg-red-500/10 px-3 py-2 text-red-200">
                            {error}
                        </div>
                    )}

                    <Button className="w-full bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white" onClick={onGithub} disabled={loading}>
                        <Github className="mr-2 h-5 w-5" />
                        {loading ? 'Entrando...' : 'Entrar com GitHub'}
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginPage