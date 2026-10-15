"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { ArrowLeft, ChevronDown, Heart, Search, Sparkles, X } from "lucide-react";
import { ToolCard } from "@/components/tool-card";
import { useFavorites } from "@/components/favorites-provider";
import { allTools, categories, getSearchResults, type Category } from "@/lib/tool-data";
import { featuredPaths } from "@/lib/design-data";
import { normalizeSearchText } from "@/lib/search-utils";
import { toPersianDigits } from "@/lib/tool-utils";

type ToolDirectoryProps = {
  category?: Category;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
};

export function ToolDirectory({ category, searchQuery, onSearchChange }: ToolDirectoryProps) {
  const [filter, setFilter] = useState("featured");
  const [localQuery, setLocalQuery] = useState("");
  const query = searchQuery ?? localQuery;
  const setQuery = onSearchChange ?? setLocalQuery;
  const [expanded, setExpanded] = useState(false);
  const { favorites } = useFavorites();
  const resultsId = useId();
  const term = normalizeSearchText(query);
  const isSearching = term.length > 0;
  const selectedCategory = categories.find(item => item.url === filter);

  const tools = useMemo(() => {
    if (term) {
      const matches = term.length >= 2
        ? getSearchResults(term).tools
        : allTools.filter(tool => normalizeSearchText(`${tool.title} ${tool.sub} ${tool.categoryTitle}`).includes(term));

      return category
        ? matches.filter(tool => tool.categoryUrl === category.url)
        : matches;
    }

    if (category) return category.item;
    if (filter === "featured") return featuredPaths.flatMap(path => allTools.find(tool => tool.url === path) ?? []);
    if (filter === "saved") return favorites;
    if (filter === "all") return allTools;
    return allTools.filter(tool => tool.categoryUrl === filter);
  }, [category, filter, term, favorites]);

  const visibleTools = expanded || category || isSearching ? tools : tools.slice(0, 6);
  const activeLabel = category?.title ?? selectedCategory?.title ?? (filter === "saved" ? "ابزارهای ذخیره‌شده" : filter === "all" ? "همهٔ ابزارها" : "منتخب تولبو");
  const choose = (value: string) => {
    setFilter(value);
    setExpanded(false);
    setQuery("");
  };
  const clearSearch = () => {
    setQuery("");
    setExpanded(false);
  };

  return (
    <section className={`tool-directory${!category ? " home-directory" : ""}`} id="toolsUsage" tabIndex={-1} aria-label="فهرست ابزارها">
      {!category && (
        <div className="home-section-heading">
          <h2>{isSearching ? "نتیجهٔ جستجوی تو" : "ابزارت را انتخاب کن"}</h2>
          {isSearching && <button type="button" className="text-link" onClick={clearSearch}>بازگشت به ابزارها<ArrowLeft size={16} aria-hidden="true" /></button>}
        </div>
      )}

      {(!isSearching || category) && <div className="directory-toolbar">
        {!category ? (
          <div className="directory-views" role="group" aria-label="انتخاب فهرست">
            <button type="button" aria-pressed={!isSearching && filter === "featured"} aria-controls={resultsId} onClick={() => choose("featured")}>
              <Sparkles size={16} aria-hidden="true" />منتخب تولبو
            </button>
            <button type="button" aria-pressed={!isSearching && (filter === "all" || !!selectedCategory)} aria-controls={resultsId} onClick={() => choose("all")}>همهٔ ابزارها<span className="directory-view-count">{toPersianDigits(allTools.length)}</span></button>
            <button type="button" aria-pressed={!isSearching && filter === "saved"} aria-controls={resultsId} onClick={() => choose("saved")}>
              <Heart size={15} aria-hidden="true" />ذخیره‌شده‌ها
              {favorites.length > 0 && <span className="directory-view-count">{toPersianDigits(favorites.length)}</span>}
            </button>
          </div>
        ) : <h2 className="directory-result-title">ابزارهای این دسته</h2>}
        {category && <div className="directory-search" role="search">
          <Search size={17} aria-hidden="true" />
          <input
            type="search"
            name="directory-search"
            autoComplete="off"
            aria-label={category ? "جستجو در این دسته" : "جستجو در همهٔ ابزارها"}
            aria-controls={resultsId}
            placeholder={category ? "جستجو در این دسته…" : "نام ابزار یا کاری که داری…"}
            value={query}
            onChange={event => setQuery(event.target.value)}
            onKeyDown={event => { if (event.key === "Escape") clearSearch(); }}
          />
          {query && <button type="button" className="icon-button" aria-label="پاک کردن جستجو" onClick={clearSearch}><X size={15} aria-hidden="true" /></button>}
        </div>}
        {!category && !isSearching && (filter === "all" || selectedCategory) && (
          <label className="home-category-select">
            <span className="sr-only">فیلتر دسته‌بندی</span>
            <select name="tool-category" value={filter} aria-controls={resultsId} onChange={event => choose(event.target.value)}>
              <option value="all">همهٔ دسته‌ها</option>
              {categories.map(item => <option key={item.url} value={item.url}>{item.title}</option>)}
            </select>
            <ChevronDown size={15} aria-hidden="true" />
          </label>
        )}
      </div>}

      <div className={!category && !isSearching && filter === "featured" ? "sr-only" : "directory-results-heading"} role="status" aria-live="polite" aria-atomic="true">
        {isSearching ? (
          <p className="search-summary">
            {toPersianDigits(tools.length)} نتیجه برای «<bdi>{query.trim()}</bdi>»
            <span> · {category ? `در دستهٔ ${category.title}` : "در همهٔ ابزارها"}</span>
          </p>
        ) : (
          <>
            {!category && <h3 className="directory-result-title">{activeLabel}</h3>}
            <span className="directory-count">{visibleTools.length < tools.length ? `${toPersianDigits(visibleTools.length)} از ${toPersianDigits(tools.length)}` : toPersianDigits(tools.length)} ابزار</span>
          </>
        )}
      </div>

      <div className="tools-grid" id={resultsId}>
        {visibleTools.map(tool => <ToolCard tool={tool} key={tool.url} compact />)}
      </div>
      {!tools.length && (
        <div className="empty-state">
          {filter === "saved" && !isSearching ? <Heart aria-hidden="true" /> : <Search aria-hidden="true" />}
          <strong>{filter === "saved" && !isSearching ? "ابزارهای محبوبت را نزدیک نگه دار" : "ابزاری پیدا نشد"}</strong>
          <p>{filter === "saved" && !isSearching ? "روی قلب هر کارت بزن تا به این فهرست اضافه شود." : "نام کوتاه‌تر یا عبارت دیگری را امتحان کن."}</p>
          <button type="button" className="text-link" onClick={isSearching ? clearSearch : () => choose("featured")}>
            {isSearching ? "پاک کردن جستجو" : "دیدن ابزارهای پیشنهادی"}<ArrowLeft size={16} aria-hidden="true" />
          </button>
        </div>
      )}
      {!category && !isSearching && (tools.length > 6 || selectedCategory) && (
        <div className="directory-more">
          {tools.length > 6 && (
            <button type="button" className="outline-button" aria-expanded={expanded} aria-controls={resultsId} onClick={() => setExpanded(current => !current)}>
              {expanded ? "نمایش کمتر" : `نمایش ${toPersianDigits(tools.length - 6)} ابزار دیگر`}
              <ChevronDown size={17} aria-hidden="true" style={{ transform: expanded ? "rotate(180deg)" : undefined }} />
            </button>
          )}
          {selectedCategory && <Link href={selectedCategory.url} className="text-link">صفحهٔ ابزارهای {selectedCategory.title}<ArrowLeft size={16} aria-hidden="true" /></Link>}
        </div>
      )}
    </section>
  );
}
