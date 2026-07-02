"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { ToolItem } from "@/lib/tool-data";

type RecentToolsContextValue = {
  recentTools: ToolItem[];
  addRecentTool: (tool: ToolItem) => void;
  clearRecentTools: () => void;
};

const RecentToolsContext = createContext<RecentToolsContextValue | null>(null);
const storageKey = "toolbo:recent-tools";
const recentToolsEvent = "toolbo:recent-tools-updated";
const maxRecentTools = 8;

function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.addEventListener("storage", callback);
  window.addEventListener(recentToolsEvent, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(recentToolsEvent, callback);
  };
}

function getSnapshot() {
  if (typeof window === "undefined") {
    return "[]";
  }

  return localStorage.getItem(storageKey) ?? "[]";
}

function parseRecentTools(snapshot: string) {
  try {
    const parsed = JSON.parse(snapshot) as ToolItem[];
    return Array.isArray(parsed)
      ? parsed.filter(
          (tool) =>
            typeof tool?.title === "string" &&
            typeof tool?.sub === "string" &&
            typeof tool?.url === "string"
        )
      : [];
  } catch {
    return [];
  }
}

function emitRecentToolsChange() {
  window.dispatchEvent(new Event(recentToolsEvent));
}

export function RecentToolsProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => "[]");
  const recentTools = useMemo(() => parseRecentTools(snapshot), [snapshot]);

  const value = useMemo<RecentToolsContextValue>(
    () => ({
      recentTools,
      addRecentTool: (tool) => {
        const next = [
          tool,
          ...recentTools.filter((item) => item.url !== tool.url),
        ].slice(0, maxRecentTools);

        localStorage.setItem(storageKey, JSON.stringify(next));
        emitRecentToolsChange();
      },
      clearRecentTools: () => {
        localStorage.removeItem(storageKey);
        emitRecentToolsChange();
      },
    }),
    [recentTools]
  );

  return (
    <RecentToolsContext.Provider value={value}>
      {children}
    </RecentToolsContext.Provider>
  );
}

export function useRecentTools() {
  const context = useContext(RecentToolsContext);

  if (!context) {
    throw new Error("useRecentTools must be used within RecentToolsProvider");
  }

  return context;
}
