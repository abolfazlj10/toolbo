"use client";

import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import { useFavorites } from "@/components/favorites-provider";
import type { ToolItem } from "@/lib/tool-data";
import { ToolIcon } from "@/components/icons";

export function ToolCard({ tool }: { tool: ToolItem }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(tool.url);
  return (
    <article className="tool-card" data-category={tool.url.split("/")[1]}>
      <span className="tile-icon" aria-hidden="true"><ToolIcon url={tool.url} size={21} strokeWidth={1.7} /></span>
      <div className="tool-card-copy">
        <h3><Link href={tool.url} className="tool-card-link"><bdi>{tool.title.trim()}</bdi></Link></h3>
        <p>{tool.sub}</p>
      </div>
      <button
        type="button"
        className="favorite-button"
        aria-label={`${favorite ? "حذف از" : "افزودن به"} ذخیره‌شده‌ها: ${tool.title}`}
        aria-pressed={favorite}
        title={favorite ? "حذف از ذخیره‌شده‌ها" : "ذخیره ابزار"}
        onClick={() => toggleFavorite(tool)}
      >
        <Heart size={17} strokeWidth={1.8} fill={favorite ? "currentColor" : "none"} aria-hidden="true" />
      </button>
      <ArrowLeft className="card-arrow" size={16} aria-hidden="true" />
    </article>
  );
}
