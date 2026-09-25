"use client";

import Link from "next/link";
import { ArrowUpLeft, History, Trash2, Wrench } from "lucide-react";
import { useRecentTools } from "@/components/recent-tools-provider";
import { toolIcons } from "@/lib/tool-icons";

export function RecentToolsSection() {
  const { recentTools, clearRecentTools } = useRecentTools();

  if (recentTools.length === 0) {
    return null;
  }

  return (
    <section className="recent-tools-section" aria-label="ابزارهای اخیر">
      <div className="recent-tools-heading">
        <div className="recent-tools-title">
          <History size={18} aria-hidden="true" />
          <h2>ادامه از آخرین ابزارها</h2>
        </div>
        <button
          type="button"
          className="text-link"
          title="پاک کردن ابزارهای اخیر"
          aria-label="پاک کردن ابزارهای اخیر"
          onClick={clearRecentTools}
        >
          <Trash2 size={14} aria-hidden="true" />
          پاک کردن سابقه
        </button>
      </div>
      <div className="recent-tools-strip">
        {recentTools.map((tool) => {
          const Icon = toolIcons[tool.url] ?? Wrench;
          return (
            <Link key={tool.url} href={tool.url} className="recent-tool-pill">
              <span className="recent-tool-icon"><Icon size={17} strokeWidth={1.7} aria-hidden="true" /></span>
              <bdi>{tool.title}</bdi>
              <ArrowUpLeft className="recent-tool-arrow" size={14} aria-hidden="true" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
