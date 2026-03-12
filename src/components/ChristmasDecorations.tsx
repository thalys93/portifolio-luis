
import { useTheme } from '@/shared/context/ThemeContext';
import { CandyCane, Gift, Snowflake, TreePine, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

export const ChristmasDecorations = () => {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || theme !== 'christmas') return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden font-poppins">
            <style>
                {`
          @keyframes swing {
            0% { transform: rotate(5deg); }
            50% { transform: rotate(-5deg); }
            100% { transform: rotate(5deg); }
          }
          .animate-swing {
            transform-origin: top center;
            animation: swing 3s ease-in-out infinite;
          }
          .animate-swing-delayed {
            transform-origin: top center;
            animation: swing 4s ease-in-out infinite;
            animation-delay: 1s;
          }
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
          }
           .animate-twinkle {
            animation: twinkle 3s ease-in-out infinite;
          }
        `}
            </style>
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />
            <div className="absolute -top-5 left-8 animate-swing">
                <div className="h-24 w-[2px] mx-auto bg-slate-400/50" />
                <div className="relative group">
                    <div className="absolute inset-0 bg-red-500 blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
                    <div className="relative bg-gradient-to-br from-red-500 to-red-700 p-2 rounded-full border-2 border-yellow-500/30 shadow-lg">
                        <Snowflake size={24} className="text-white" />
                    </div>
                </div>
            </div>

            <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
            <div className="absolute top-0 right-12 animate-swing-delayed">
                <div className="h-16 w-[2px] mx-auto bg-slate-400/50" />
                <div className="relative drop-shadow-xl transform translate-y-[-4px]">
                    <CandyCane size={42} className="text-red-500 fill-white" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))' }} />
                </div>
            </div>
            <div className="absolute top-0 right-28 animate-swing" style={{ animationDuration: '5s' }}>
                <div className="h-12 w-[2px] mx-auto bg-slate-400/50" />
                <Star size={24} className="text-yellow-400 fill-yellow-400 animate-twinkle" />
            </div>

            <div className="absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/3 w-80 h-80 bg-red-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-4 flex items-end gap-2 mb-4">
                <div className="relative transform hover:scale-110 transition-transform duration-300 origin-bottom">
                    <TreePine size={64} className="text-green-600 fill-green-900/40 drop-shadow-2xl" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Star size={16} className="text-yellow-400 fill-yellow-400 animate-pulse" />
                    </div>
                    <div className="absolute top-1/3 left-1/3 w-1 h-1 bg-red-500 rounded-full animate-pulse" />
                    <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-yellow-500 rounded-full animate-pulse delay-75" />
                    <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-blue-500 rounded-full animate-pulse delay-150" />
                </div>
                <Gift size={32} className="text-red-500 fill-red-900/20 mb-1 transform -rotate-12 hover:rotate-0 transition-transform" />
            </div>

            <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-80 h-80 bg-gold/10 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(251, 191, 36, 0.1)' }} />
            <div className="absolute bottom-6 right-6 flex items-end">
                <div className="group relative">
                    <div className="absolute -inset-4 bg-yellow-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="absolute bottom-0 right-8 transform translate-x-full">
                    <Gift size={40} className="text-green-600 fill-green-900/20 transform rotate-6" />
                </div>
            </div>
        </div>
    );
};
