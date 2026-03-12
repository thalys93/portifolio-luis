import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from './components/ui/tooltip.tsx';
import { Toaster } from './components/ui/toaster.tsx';
import { Toaster as Sonner } from "@/components/ui/sonner";
import "./i18n.ts"
import { ThemeProvider } from './shared/context/ThemeContext';

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <ThemeProvider>
            <TooltipProvider>
                <Toaster />
                <App />
                <Sonner />
            </TooltipProvider>
        </ThemeProvider>
    </QueryClientProvider>
);
