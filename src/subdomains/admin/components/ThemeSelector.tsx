
import { useTheme } from '@/shared/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Moon, TreePine, Palette, Check, Globe, UserPlus2, Sun } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function ThemeSelector() {
  const { setTheme, theme, availableThemes, globalTheme } = useTheme();

  const getIcon = (val: string) => {
    if (val === 'christmas') return <TreePine className="h-8 w-8 text-green-600" />
    if (val === 'default') return <Moon className="h-8 w-8" />
    if (val === 'new_year') return <Globe className="h-8 w-8 text-yellow-600" />
    if (val === 'thalys_2026') return <UserPlus2 className="h-8 w-8 text-blue-600" />
    if (val === 'light') return <Sun className="h-8 w-8" />
    return <Palette className="h-8 w-8" />
  }

  // Check if current view is desynced from global (i.e. we are previewing something else)
  const isPreviewing = theme !== globalTheme;

  // Fallback if no themes loaded yet (loading state or empty db)
  const displayThemes = availableThemes && availableThemes.length > 0
    ? availableThemes
    : [
      { name: 'Padrão', value: 'default' },
      { name: 'Natal', value: 'christmas' },
      { name: 'Ano Novo', value: 'new_year' },
      { name: 'Ano Novo 2026', value: 'new_year_2026' },
    ]

  return (
    <Card className="glass-effect">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground/80 font-poppins">Tema & Aparência</h3>
          {isPreviewing && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground hover:text-primary"
              onClick={() => setTheme(null)}
              title="Voltar para o tema global"
            >
              Resetar
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2">
          {displayThemes.map(t => (
            <Button
              key={t.value}
              variant="outline"
              className={`h-24 flex flex-col items-center justify-center gap-2 border-2 transition-all duration-300 relative ${theme === t.value
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-transparent bg-secondary/10 hover:border-primary/50 text-muted-foreground'
                }`}
              onClick={() => setTheme(t.value)}
            >
              {/* Check if active (local) */}
              {theme === t.value && (
                <div className="absolute top-2 right-2 p-1 bg-primary rounded-full text-white">
                  <Check size={12} />
                </div>
              )}

              {/* Check if Global */}
              {globalTheme === t.value && (
                <div className="absolute top-2 left-2 p-1 bg-green-600 rounded-full text-white" title="Tema Global Atual">
                  <Globe size={12} />
                </div>
              )}

              {getIcon(t.value)}
              <span className="font-medium text-xs text-center break-words w-full">{t.name}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
