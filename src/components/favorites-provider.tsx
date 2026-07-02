"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { ToolItem } from "@/lib/tool-data";

type FavoritesContextValue = {
  favorites: ToolItem[];
  isFavorite: (url: string) => boolean;
  toggleFavorite: (tool: ToolItem) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);
const storageKey = "favourite";
const favoritesEvent = "toolbo:favorites";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.addEventListener("storage", callback);
  window.addEventListener(favoritesEvent, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(favoritesEvent, callback);
  };
}

function getSnapshot() {
  if (typeof window === "undefined") {
    return "[]";
  }

  return localStorage.getItem(storageKey) ?? "[]";
}

function parseFavorites(snapshot: string) {
  try {
    const parsed = JSON.parse(snapshot) as ToolItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => "[]");
  const favorites = useMemo(() => parseFavorites(snapshot), [snapshot]);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favorites,
      isFavorite: (url) => favorites.some((tool) => tool.url === url),
      toggleFavorite: (tool) => {
        const next = favorites.some((item) => item.url === tool.url)
          ? favorites.filter((item) => item.url !== tool.url)
          : [...favorites, tool];

        localStorage.setItem(storageKey, JSON.stringify(next));
        window.dispatchEvent(new Event(favoritesEvent));
      },
    }),
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }

  return context;
}
