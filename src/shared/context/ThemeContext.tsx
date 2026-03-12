
import React, { createContext, useContext, useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot, getDocs, doc, setDoc } from "firebase/firestore";

type Theme = string; // Allows dynamic strings

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme | null) => void;
  availableThemes: any[];
  globalTheme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const hexToHsl = (hex: string) => {
  // Basic hex to HSL/Tw format converter (H S% L%)
  let c = hex.substring(1).split('')
  if (c.length === 3) c = [c[0], c[0], c[1], c[1], c[2], c[2]]
  const cVal = parseInt(c.join(''), 16)
  let r = (cVal >> 16) & 255
  let g = (cVal >> 8) & 255
  let b = cVal & 255

  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0, l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }
  return `${(h * 360).toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%`
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Local state (override)
  const [localTheme, setLocalTheme] = useState<Theme | null>(() => {
    return localStorage.getItem("app-theme") as Theme | null;
  });

  // Global state (from firestore)
  const [globalTheme, setGlobalTheme] = useState<Theme>("default");

  // Computed active theme
  const theme = localTheme || globalTheme;

  const [availableThemes, setAvailableThemes] = useState<any[]>([])

  // Load themes from Firestore
  useEffect(() => {
    const db = getFirestore()
    const unsubThemes = onSnapshot(collection(db, 'themes'), (snap) => {
      const items = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      setAvailableThemes(items)
    })

    // Listen to Global Settings
    const unsubSettings = onSnapshot(doc(db, 'settings', 'global'), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        if (data.activeThemeId) {
          setGlobalTheme(data.activeThemeId)
        }
      }
    })

    return () => {
      unsubThemes();
      unsubSettings();
    }
  }, [])

  // Helper to update local theme
  const setTheme = (val: Theme | null) => {
    if (val === null) {
      localStorage.removeItem("app-theme");
      setLocalTheme(null);
    } else {
      localStorage.setItem("app-theme", val);
      setLocalTheme(val);
    }
  }

  // Apply Theme Logic including dynamic colors
  useEffect(() => {
    const root = window.document.documentElement;
    // Clear known/prev classes
    root.classList.remove("default", "christmas");
    availableThemes.forEach(t => {
      if (t.value) root.classList.remove(t.value)
    })

    root.classList.add(theme);

    // Apply Dynamic Colors
    const activeThemeData = availableThemes.find(t => t.value === theme)
    if (activeThemeData && activeThemeData.colors) {
      const { primary, secondary, background, foreground, accent } = activeThemeData.colors
      if (primary) {
        root.style.setProperty('--primary', hexToHsl(primary))
        root.style.setProperty('--gradient-start', `hsl(${hexToHsl(primary)})`)
      }
      if (secondary) {
        root.style.setProperty('--secondary', hexToHsl(secondary))
        root.style.setProperty('--gradient-end', `hsl(${hexToHsl(secondary)})`)
        root.style.setProperty('--border', hexToHsl(secondary))
        root.style.setProperty('--input', hexToHsl(secondary))
      }
      if (background) {
        root.style.setProperty('--background', hexToHsl(background))
        root.style.setProperty('--card', hexToHsl(background))
        root.style.setProperty('--popover', hexToHsl(background))
      }
      if (foreground) {
        root.style.setProperty('--foreground', hexToHsl(foreground))
        root.style.setProperty('--card-foreground', hexToHsl(foreground))
        root.style.setProperty('--popover-foreground', hexToHsl(foreground))
      }
      if (accent) root.style.setProperty('--accent', hexToHsl(accent))
    } else {
      // Reset inline styles
      root.style.removeProperty('--primary')
      root.style.removeProperty('--secondary')
      root.style.removeProperty('--background')
      root.style.removeProperty('--foreground')
      root.style.removeProperty('--accent')
      root.style.removeProperty('--card')
      root.style.removeProperty('--popover')
      root.style.removeProperty('--border')
      root.style.removeProperty('--input')
      root.style.removeProperty('--card-foreground')
      root.style.removeProperty('--popover-foreground')
      root.style.removeProperty('--gradient-start')
      root.style.removeProperty('--gradient-end')
    }

  }, [theme, availableThemes]);


  return (
    <ThemeContext.Provider value={{ theme, setTheme, availableThemes, globalTheme }}>
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
