import { createContext, useEffect, useState } from "react";
import { getStorage, setStorage } from "../utils/storage";
import { STORAGE_KEYS } from "../utils/constants";

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = getStorage(STORAGE_KEYS.THEME, null);
    if (saved !== null) return saved === "dark";
    return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    setStorage(STORAGE_KEYS.THEME, isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
