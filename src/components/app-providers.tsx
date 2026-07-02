"use client";

import type { ReactNode } from "react";
import { FavoritesProvider } from "@/components/favorites-provider";
import { RecentToolsProvider } from "@/components/recent-tools-provider";
import { ThemeProvider } from "@/components/theme-provider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <RecentToolsProvider>{children}</RecentToolsProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
}
