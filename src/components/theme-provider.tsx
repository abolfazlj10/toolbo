"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type ThemeContextValue = {
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const storageKey = "dark";
const themeEvent = "toolbo:theme";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.addEventListener("storage", callback);
  window.addEventListener(themeEvent, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(themeEvent, callback);
  };
}

function getSnapshot() {
  if (typeof window === "undefined") {
    return "false";
  }

  return localStorage.getItem(storageKey) ?? "false";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => "false");
  const isDark = snapshot === "true";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    document.body.classList.toggle("body_D", isDark);
  }, [isDark]);

  const value = useMemo(
    () => ({
      isDark,
      toggleTheme: () => {
        localStorage.setItem(storageKey, String(!isDark));
        window.dispatchEvent(new Event(themeEvent));
      },
    }),
    [isDark]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
