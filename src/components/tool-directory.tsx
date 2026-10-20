"use client";

import { useId, useState } from "react";
import { ArrowLeft, Search, X } from "lucide-react";
import { ToolCard } from "@/components/tool-card";
import { openToolSearch } from "@/components/site-shell";
import { allTools, getSearchResults, type Category } from "@/lib/tool-data";
import { categoryMeta, getCategoryLabel } from "@/lib/site";
import { normalizeSearchText } from "@/lib/search-utils";
import { toPersianDigits } from "@/lib/tool-utils";

export function ToolDirectory({ category }: { category: Category }) {
  const [query, setQuery] = useState("");
  const resultsId = useId();
  const term = normalizeSearchText(query);

  const tools = (() => {
    const inCategory = allTools.filter(tool => tool.categoryUrl === category.url);
    if (!term) {
      const picks = categoryMeta[category.url]?.popular ?? [];
      return [...inCategory].sort((a, b) => rank(picks, a.url) - rank(picks, b.url));
    }
    const matches = term.length >= 2
      ? getSearchResults(term).tools
      : allTools.filter(tool => normalizeSearchText(`${tool.title} ${tool.sub}`).includes(term));
    return matches.filter(tool => tool.categoryUrl === category.url);
  })();

  return (
    <section className="tool-directory" aria-label={`ابزارهای ${getCategoryLabel(category.url)}`}>
      {category.item.length > 6 && (
        <div className="directory-search" role="search">
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            name="directory-search"
            autoComplete="off"
            aria-label="جستجو در این دسته"
            aria-controls={resultsId}
            placeholder={`جستجو در ${toPersianDigits(category.item.length)} ابزار ${getCategoryLabel(category.url)}…`}
            value={query}
            onChange={event => setQuery(event.target.value)}
            onKeyDown={event => { if (event.key === "Escape") setQuery(""); }}
          />
          {query && <button type="button" className="icon-button" aria-label="پاک کردن جستجو" onClick={() => setQuery("")}><X size={16} aria-hidden="true" /></button>}
        </div>
      )}

      {term && <p className="search-summary" role="status">{toPersianDigits(tools.length)} نتیجه برای «<bdi>{query.trim()}</bdi>»</p>}

      <div className="tools-grid" id={resultsId}>
        {tools.map(tool => <ToolCard tool={tool} key={tool.url} />)}
      </div>

      {term && !tools.length && (
        <div className="empty-state">
          <Search aria-hidden="true" />
          <strong>در این دسته ابزاری پیدا نشد</strong>
          <p>شاید ابزار مورد نظرت در دسته دیگری باشد.</p>
          <button type="button" className="text-link" onClick={() => { setQuery(""); openToolSearch(); }}>
            جستجو در همه ابزارها<ArrowLeft size={16} aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}

function rank(picks: string[], url: string) {
  const index = picks.indexOf(url);
  return index === -1 ? picks.length : index;
}
