export const TW_COLOR_FAMILIES = [
    'slate', 'gray', 'zinc', 'neutral', 'stone',
    'red', 'orange', 'amber', 'yellow', 'lime',
    'green', 'emerald', 'teal', 'cyan', 'sky', 'blue',
    'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'
];

export const TW_SHADES_CORE = [400, 500, 600, 700];

export function makeGradient(fromColor: string, fromShade: number, toColor: string, toShade: number) {
    return `from-${fromColor}-${fromShade} to-${toColor}-${toShade}`;
}

export function buildSuggestions() {
    const out: string[] = [];
    for (const c of TW_COLOR_FAMILIES) {
        for (let i = 0; i < TW_SHADES_CORE.length - 1; i++) {
            const s1 = TW_SHADES_CORE[i];
            const s2 = TW_SHADES_CORE[i + 1];
            out.push(makeGradient(c, s1, c, s2));
        }
    }
    return out;
}