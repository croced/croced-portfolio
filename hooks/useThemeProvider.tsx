import { useEffect, useState } from "react";

/**
 * Keeps track of the current system theme (light or dark mode)
 */
const useThemeProvider = () => {

    const [theme, setTheme] = useState<"dark" | "light">("dark");

    useEffect(() => {
      // initial setting
      setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
      // listener
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => setTheme(e.matches ? 'dark' : 'light'));
  
      return () => {
        window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', () => {});
      }
    }, []);

    return theme;
}

export default useThemeProvider;