import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import AuroraBackground from '@/subdomains/admin/pages/login/components/animated-shader-bg';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background text-foreground">
      <AuroraBackground />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-15 mix-blend-overlay bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-background to-slate-900/20" />
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-slate-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-slate-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-5 md:mx-auto w-full max-w-md glass-effect animate-fade-in select-none text-center p-8 rounded-2xl">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-300 mb-6">Oops! Page not found</p>
        <a href="/" className="inline-block px-6 py-3 bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white rounded-md">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
