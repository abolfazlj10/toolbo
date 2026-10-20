"use client";

import Link from "next/link";
import { History, X } from "lucide-react";
import { useFavorites } from "@/components/favorites-provider";
import { useRecentTools } from "@/components/recent-tools-provider";
import { getToolIcon } from "@/lib/tool-icons";

/** Returning visitors get their recent and saved tools before anything else. */
export function RecentToolsSection() {
  const { recentTools, clearRecentTools } = useRecentTools();
  const { favorites } = useFavorites();
  const tools = [...favorites, ...recentTools.filter(tool => !favorites.some(item => item.url === tool.url))].slice(0, 8);

  if (tools.length === 0) {
    return null;
  }

  return (
    <section className="home-section recent-tools-section" aria-labelledby="recent-title">
      <div className="section-head">
        <div>
          <h2 id="recent-title"><History size={18} aria-hidden="true" />ادامه از جایی که بودی</h2>
        </div>
        {recentTools.length > 0 && (
          <button type="button" className="text-link muted" onClick={clearRecentTools}>
            <X size={14} aria-hidden="true" />پاک کردن سابقه
          </button>
        )}
      </div>
      <div className="recent-tools-strip">
        {tools.map((tool) => {
          const Icon = getToolIcon(tool.url);
          const saved = favorites.some(item => item.url === tool.url);
          return (
            <Link key={tool.url} href={tool.url} className="recent-tool-pill" data-category={tool.url.split("/")[1]}>
              <span className="tile-icon small" aria-hidden="true"><Icon size={16} strokeWidth={1.8} /></span>
              <bdi>{tool.title}</bdi>
              {saved && <span className="saved-dot" aria-label="ذخیره‌شده" />}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
