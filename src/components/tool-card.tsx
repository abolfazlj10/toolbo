"use client";

import Link from "next/link";
import { ArrowUpLeft, Heart, Wrench } from "lucide-react";
import { useFavorites } from "@/components/favorites-provider";
import { categories, type ToolItem } from "@/lib/tool-data";
import { toolIcons } from "@/lib/tool-icons";

export function ToolCard({ tool, compact = false }: { tool: ToolItem; compact?: boolean }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(tool.url);
  const category = categories.find(item => tool.url.startsWith(`${item.url}/`));
  const Icon = toolIcons[tool.url] ?? Wrench;
  return (
    <article className={`tool-card${compact ? " tool-card-compact" : ""}`} data-category={category?.url.slice(1)}>
      <div className="tool-card-top">
        <span className="tool-card-icon" aria-hidden="true"><Icon size={23} strokeWidth={1.6} /></span>
        <button
          type="button"
          className="favorite-button"
          aria-label={`${favorite ? "حذف از" : "افزودن به"} ذخیره‌شده‌ها: ${tool.title}`}
          aria-pressed={favorite}
          title={favorite ? "حذف از ذخیره‌شده‌ها" : "ذخیرهٔ ابزار"}
          onClick={() => toggleFavorite(tool)}
        >
          <Heart size={18} strokeWidth={1.7} fill={favorite ? "currentColor" : "none"} aria-hidden="true" />
        </button>
      </div>
      <h3><Link href={tool.url} className="tool-card-link"><bdi>{tool.title}</bdi></Link></h3>
      <p>{tool.sub}</p>
      {!compact && <div className="tool-card-bottom">
        <span>{category?.title ?? "ابزار کاربردی"}</span>
        <span className="tool-card-arrow" aria-hidden="true"><ArrowUpLeft size={18} /></span>
      </div>}
    </article>
  );
}
