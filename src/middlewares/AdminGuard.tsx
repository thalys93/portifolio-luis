import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "@/services/firebase";
import { useLocation, useNavigate } from "react-router-dom";

const WHITELIST = new Set([import.meta.env.VITE_ADMIN_EMAIL]);

type Props = { children: React.ReactNode };

export default function AdminGuard({ children }: Props) {
    const [checking, setChecking] = React.useState(true);
    const [authorized, setAuthorized] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
        const unsub = onAuthStateChanged(FirebaseAuth, (user) => {
            const email = user?.email?.toLowerCase() || "";
            const ok = !!user && WHITELIST.has(email);
            setAuthorized(ok);
            setChecking(false);
            if (!ok) {
                navigate("/oauth/login", { replace: true, state: { from: location.pathname } });
            }
        });
        return () => unsub();
    }, [navigate, location.pathname]);

    if (checking) {
        return <div className="min-h-screen flex items-center justify-center bg-background text-foreground" />;
    }

    if (!authorized) return null;

    return <>{children}</>;
}