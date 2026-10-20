"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useMemo, useRef, useState } from "react";
import { CornerDownLeft, Search, X } from "lucide-react";
import { allTools, getSearchResults } from "@/lib/tool-data";
import { getToolIcon } from "@/lib/tool-icons";
import { normalizeSearchText } from "@/lib/search-utils";
import { getCategoryLabel } from "@/lib/site";
import { toPersianDigits } from "@/lib/tool-utils";

export function HomeSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const term = normalizeSearchText(query);
  const results = useMemo(() => {
    if (!term) return [];
    const tools = term.length >= 2 ? getSearchResults(term).tools
      : allTools.filter(tool => normalizeSearchText(`${tool.title} ${tool.sub}`).includes(term));
    return tools.slice(0, 7);
  }, [term]);
  const open = focused && term.length > 0;
  const clear = () => { setQuery(""); setActive(0); inputRef.current?.focus(); };

  return (
    <div className="home-search-wrap" onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <form className="home-search" role="search" onSubmit={event => {
        event.preventDefault();
        const target = results[active];
        if (target) router.push(target.url);
      }}>
        <Search size={21} aria-hidden="true" />
        <input ref={inputRef} type="search" name="q" aria-label="جستجوی ابزارها" placeholder="چه کاری می‌خواهی انجام بدهی؟ مثلاً تبدیل تاریخ"
          autoComplete="off" spellCheck={false} enterKeyHint="go" value={query}
          role="combobox" aria-expanded={open} aria-controls={listId} aria-autocomplete="list"
          aria-activedescendant={open && results.length ? `${listId}-${active}` : undefined}
          onFocus={() => setFocused(true)}
          onChange={event => { setQuery(event.target.value); setActive(0); setFocused(true); }}
          onKeyDown={event => {
            if (event.key === "Escape") { if (query) { event.preventDefault(); clear(); } }
            if ((event.key === "ArrowDown" || event.key === "ArrowUp") && results.length) {
              event.preventDefault();
              setActive(current => (current + (event.key === "ArrowDown" ? 1 : -1) + results.length) % results.length);
            }
          }} />
        {query && <button type="button" className="icon-button" aria-label="پاک کردن جستجو" onClick={clear}><X size={18} aria-hidden="true" /></button>}
        <button type="submit" className="home-search-submit">جستجو</button>
      </form>
      {open && (
        <div className="home-search-panel">
          <ul id={listId} role="listbox" aria-label="نتایج جستجو">
            {results.map((tool, index) => {
              const Icon = getToolIcon(tool.url);
              return (
                <li key={tool.url} role="presentation">
                  <Link id={`${listId}-${index}`} role="option" aria-selected={index === active} href={tool.url}
                    className={`search-result${index === active ? " search-result-active" : ""}`} onMouseMove={() => setActive(index)}>
                    <span className="search-result-icon" data-category={tool.categorySlug}><Icon size={19} aria-hidden="true" /></span>
                    <span className="search-result-copy"><strong>{tool.title}</strong><small>{tool.sub}</small></span>
                    <span className="search-result-meta">{getCategoryLabel(tool.categoryUrl)}</span>
                    <CornerDownLeft className="search-result-enter" size={15} aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
          {!results.length && <p className="home-search-empty">ابزاری برای «{query.trim()}» پیدا نشد. عبارت کوتاه‌تری را امتحان کن.</p>}
          <div className="sr-only" role="status">{toPersianDigits(results.length)} نتیجه</div>
        </div>
      )}
    </div>
  );
}
