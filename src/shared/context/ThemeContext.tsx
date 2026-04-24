
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getFirestore, collection, onSnapshot, doc } from "firebase/firestore";

type Theme = string;

export type ColorMode = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme | null) => void;
  availableThemes: any[];
  globalTheme: Theme;
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const COLOR_MODE_KEY = "portfolio-color-mode";

/** Variáveis que o painel antigo aplicava em linha — removemos para o CSS (:root / data-color-mode) mandar. */
const INLINE_THEME_VAR_KEYS = [
  "--primary",
  "--secondary",
  "--background",
  "--foreground",
  "--accent",
  "--card",
  "--popover",
  "--border",
  "--input",
  "--card-foreground",
  "--popover-foreground",
  "--gradient-start",
  "--gradient-end",
] as const;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [localTheme, setLocalTheme] = useState<Theme | null>(() => {
    return localStorage.getItem("app-theme") as Theme | null;
  });

  const [globalTheme, setGlobalTheme] = useState<Theme>("default");

  const theme = localTheme || globalTheme;

  const [availableThemes, setAvailableThemes] = useState<any[]>([]);

  const [colorMode, setColorModeState] = useState<ColorMode>(() => {
    if (typeof window === "undefined") return "dark";
    const stored = localStorage.getItem(COLOR_MODE_KEY);
    return stored === "light" ? "light" : "dark";
  });

  useEffect(() => {
    const db = getFirestore();
    const unsubThemes = onSnapshot(collection(db, "themes"), (snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setAvailableThemes(items);
    });

    const unsubSettings = onSnapshot(doc(db, "settings", "global"), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        if (data.activeThemeId) {
          setGlobalTheme(data.activeThemeId);
        }
      }
    });

    return () => {
      unsubThemes();
      unsubSettings();
    };
  }, []);

  const setTheme = (val: Theme | null) => {
    if (val === null) {
      localStorage.removeItem("app-theme");
      setLocalTheme(null);
    } else {
      localStorage.setItem("app-theme", val);
      setLocalTheme(val);
    }
  };

  const setColorMode = useCallback((mode: ColorMode) => {
    localStorage.setItem(COLOR_MODE_KEY, mode);
    setColorModeState(mode);
  }, []);

  const toggleColorMode = useCallback(() => {
    setColorModeState((prev) => {
      const next: ColorMode = prev === "dark" ? "light" : "dark";
      localStorage.setItem(COLOR_MODE_KEY, next);
      return next;
    });
  }, []);

  /* Modo claro/escuro: atributo dedicado (evita conflito com tema Firestore cujo value é "light"). */
  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", colorMode);
  }, [colorMode]);

  /* Tema editorial (default / christmas / ids do Firestore): só data-app-theme + tokens em CSS — sem cores inline do dashboard. */
  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("default", "christmas", "light");
    availableThemes.forEach((t) => {
      if (t.value) root.classList.remove(t.value);
    });

    if (theme && theme !== "default") {
      root.setAttribute("data-app-theme", theme);
    } else {
      root.removeAttribute("data-app-theme");
    }

    INLINE_THEME_VAR_KEYS.forEach((key) => root.style.removeProperty(key));
  }, [theme, availableThemes]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        availableThemes,
        globalTheme,
        colorMode,
        setColorMode,
        toggleColorMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
