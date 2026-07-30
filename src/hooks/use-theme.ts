import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "nemo-theme";
export type NemoTheme = "ocean" | "daylight";

/** Ocean (default dark) / Daylight theme switcher. Persists in this browser. */
export function useTheme() {
  const [theme, setThemeState] = useState<NemoTheme>("ocean");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as NemoTheme | null;
    if (stored === "daylight") {
      document.documentElement.classList.add("light");
      setThemeState("daylight");
    }
  }, []);

  const setTheme = useCallback((next: NemoTheme) => {
    setThemeState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.classList.toggle("light", next === "daylight");
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(document.documentElement.classList.contains("light") ? "ocean" : "daylight");
  }, [setTheme]);

  return { theme, setTheme, toggleTheme };
}
