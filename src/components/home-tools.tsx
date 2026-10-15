"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowUpLeft, Search, X } from "lucide-react";
import { allTools, getSearchResults } from "@/lib/tool-data";
import { getToolIcon } from "@/lib/tool-icons";
import { normalizeSearchText } from "@/lib/search-utils";
import { toPersianDigits } from "@/lib/tool-utils";

const quickPaths = [
  "/time/cleander", "/time/convertor", "/numbers/percent",
  "/conversions/convert-length", "/fiscal/loanInterest", "/text/counter-word",
];
const quickTools = quickPaths.flatMap(path => allTools.find(tool => tool.url === path) ?? []);

export function HomeTools() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const term = normalizeSearchText(query);
  const tools = !term ? quickTools : term.length >= 2 ? getSearchResults(term).tools
    : allTools.filter(tool => normalizeSearchText(`${tool.title} ${tool.sub} ${tool.categoryTitle}`).includes(term));
  const clear = () => { setQuery(""); inputRef.current?.focus(); };

  return (
    <section className="home-tools" id="toolsUsage" aria-labelledby="hero-title">
      <div className="home-welcome">
        <h1 id="hero-title">ابزارهای روزمره</h1>
        <div className="home-search" role="search">
          <Search size={21} aria-hidden="true" />
          <input ref={inputRef} type="search" name="home-search" aria-label="جستجوی ابزارها" aria-controls="home-tool-results"
            placeholder="جستجوی ابزار؛ مثلاً درصد، وام، تاریخ…" autoComplete="off" spellCheck={false}
            value={query} onChange={event => setQuery(event.target.value)}
            onKeyDown={event => { if (event.key === "Escape") clear(); }} />
          {query && <button type="button" className="icon-button" aria-label="پاک کردن جستجو" onClick={clear}><X size={18} aria-hidden="true" /></button>}
        </div>
      </div>
      <h2 aria-live="polite" aria-atomic="true">{term ? `${toPersianDigits(tools.length)} ابزار پیدا شد` : "ابزارهای پرکاربرد"}</h2>
      <div className="home-tool-grid" id="home-tool-results">
        {tools.map(tool => {
          const Icon = getToolIcon(tool.url);
          return <Link href={tool.url} key={tool.url} className="home-tool">
            <span className="home-tool-icon" aria-hidden="true"><Icon size={21} strokeWidth={1.6} /></span>
            <span className="home-tool-copy"><strong>{tool.title}</strong>{term && <small>{tool.sub}</small>}</span>
            <ArrowUpLeft className="home-tool-arrow" size={16} aria-hidden="true" />
          </Link>;
        })}
      </div>
      {term && !tools.length && <div className="home-search-empty">
        <p>نام کوتاه‌تر یا عبارت دیگری را امتحان کن.</p>
        <button type="button" className="text-link" onClick={clear}>پاک کردن جستجو</button>
      </div>}
    </section>
  );
}
