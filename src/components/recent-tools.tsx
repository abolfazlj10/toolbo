"use client";

import Link from "next/link";
import { Clock, Trash2 } from "lucide-react";
import { useRecentTools } from "@/components/recent-tools-provider";
import { Button } from "@/components/ui/button";

export function RecentToolsSection() {
  const { recentTools, clearRecentTools } = useRecentTools();

  if (recentTools.length === 0) {
    return null;
  }

  return (
    <section className="recent-tools-section" aria-label="ابزارهای اخیر">
      <div className="recent-tools-heading">
        <h3 className="TS">ابزارهای اخیر</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          title="پاک کردن ابزارهای اخیر"
          aria-label="پاک کردن ابزارهای اخیر"
          onClick={clearRecentTools}
        >
          <Trash2 />
          پاک کردن
        </Button>
      </div>
      <div className="recent-tools-strip">
        {recentTools.map((tool) => (
          <Link key={tool.url} href={tool.url} className="recent-tool-pill">
            <Clock aria-hidden="true" />
            <span>{tool.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
