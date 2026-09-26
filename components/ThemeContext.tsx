"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
  setTheme: () => {},
});

const STORAGE_KEY = "proflic_theme";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    let initial: Theme = "dark";

    if (saved === "light" || saved === "dark") {
      initial = saved;
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      initial = "light";
    }

    setThemeState(initial);
    applyThemeToDOM(initial);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const nextTheme = e.matches ? "light" : "dark";
        setThemeState(nextTheme);
        applyThemeToDOM(nextTheme);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const applyThemeToDOM = (t: Theme) => {
    const htmlEl = document.documentElement;
    if (t === "light") {
      htmlEl.classList.add("light");
      htmlEl.classList.remove("dark");
    } else {
      htmlEl.classList.add("dark");
      htmlEl.classList.remove("light");
    }
    localStorage.setItem(STORAGE_KEY, t);
    window.dispatchEvent(
      new CustomEvent("proflic:theme-changed", {
        detail: { theme: t },
      })
    );
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyThemeToDOM(newTheme);
  };

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
