import { motion, useReducedMotion } from 'framer-motion';
import { useTheme } from '@/shared/context/ThemeContext';

type FloatingPathsProps = {
    position: number;
    density?: number;
    intensity?: number;
};

function FloatingPaths({ position, density = 34, intensity = 1 }: FloatingPathsProps) {
    const reduceMotion = useReducedMotion();
    const paths = Array.from({ length: density }, (_, i) => {
        const offset = i * 5 * position;
        return {
            id: `${position}-${i}`,
            d: `M-${380 - offset} -${189 + i * 6}C-${380 - offset} -${189 + i * 6} -${312 - offset} ${216 - i * 6} ${152 - offset} ${343 - i * 6}C${616 - offset} ${470 - i * 6} ${684 - offset} ${875 - i * 6} ${684 - offset} ${875 - i * 6}`,
            width: 0.45 + i * 0.035,
            opacity: (0.06 + i * 0.017) * intensity,
            duration: 26 + (i % 8) * 2.4
        };
    });

    return (
        <svg className="h-full w-full text-[hsl(var(--foreground))]" viewBox="0 0 696 316" fill="none" aria-hidden>
            {paths.map((path) => (
                <motion.path
                    key={path.id}
                    d={path.d}
                    stroke="currentColor"
                    strokeWidth={path.width}
                    strokeOpacity={path.opacity}
                    initial={{ pathLength: 0.24, opacity: path.opacity * 0.75 }}
                    animate={
                        reduceMotion
                            ? { pathLength: 1, opacity: path.opacity * 0.9, pathOffset: 0 }
                            : { pathLength: 1, opacity: [path.opacity * 0.75, path.opacity * 1.25, path.opacity * 0.75], pathOffset: [0, 1, 0] }
                    }
                    transition={
                        reduceMotion
                            ? { duration: 0.8, ease: 'easeOut' }
                            : { duration: path.duration, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }
                    }
                />
            ))}
        </svg>
    );
}

const AuroraBackground = () => {
    const { colorMode } = useTheme();
    const isDark = colorMode === 'dark';

    return (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <div className={`absolute inset-0 ${isDark ? 'opacity-100' : 'opacity-85'}`}>
                <FloatingPaths position={1} intensity={3} />
                <div className={`absolute inset-0 ${isDark ? 'opacity-95' : 'opacity-70'}`}>
                    <FloatingPaths position={-1} density={28} intensity={1.35} />
                </div>
            </div>
            <div className={`absolute inset-0 ${isDark ? 'opacity-100' : 'opacity-90'} bg-[radial-gradient(circle_at_18%_16%,hsl(var(--primary)/0.34),transparent_44%),radial-gradient(circle_at_82%_2%,hsl(var(--accent-foreground)/0.18),transparent_40%),radial-gradient(circle_at_52%_100%,hsl(var(--primary)/0.14),transparent_50%)]`} />
            <div className={`absolute inset-0 ${isDark ? 'bg-[linear-gradient(to_bottom,hsl(var(--background)/0.06),hsl(var(--background)/0.42))]' : 'bg-[linear-gradient(to_bottom,hsl(var(--background)/0.24),hsl(var(--background)/0.62))]'}`} />
        </div>
    );
};

export default AuroraBackground;
