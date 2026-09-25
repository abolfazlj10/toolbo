"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowLeftRight, ArrowUpLeft, Calculator, CalendarDays, Check, ChevronDown, History, Search, X } from "lucide-react";
import { useRecentTools } from "@/components/recent-tools-provider";
import { ToolDirectory } from "@/components/tool-directory";
import { allTools, categories, recommendedTools } from "@/lib/tool-data";
import { getCategoryIcon } from "@/lib/category-icons";
import { toPersianDigits } from "@/lib/tool-utils";

export function HomePage() {
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const { recentTools } = useRecentTools();

  function showResults(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const directory = document.getElementById("toolsUsage");
    directory?.focus({ preventScroll: true });
    directory?.scrollIntoView({ block: "start" });
  }

  return (
    <div className="home-page">
      <div className="container_m home-container">
        <section className="home-welcome" aria-labelledby="hero-title">
          <div className="home-label">
            <div className="home-emblem" aria-hidden="true">
            <span><Calculator size={22} strokeWidth={1.6} /></span>
            <span><ArrowLeftRight size={24} strokeWidth={1.6} /></span>
            <span><CalendarDays size={22} strokeWidth={1.6} /></span>
            </div>
            <p className="home-kicker">یک جعبه‌ابزار، برای هر روز</p>
          </div>
          <h1 id="hero-title">کارهای کوچک، <span>خیلی ساده‌تر<svg viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden="true"><path d="M4 10 Q145 0 296 7" /></svg></span><span className="home-period">.</span></h1>
          <p className="home-intro">محاسبه، تبدیل و کارهای روزمره؛ ابزارت همین‌جاست.</p>

          <form className="home-search" role="search" aria-label="پیدا کردن ابزار" onSubmit={showResults}>
            <Search size={22} aria-hidden="true" />
            <label className="sr-only" htmlFor="home-search">جستجو در همهٔ ابزارها</label>
            <input
              ref={searchRef}
              id="home-search"
              name="tool-search"
              type="search"
              autoComplete="off"
              spellCheck={false}
              placeholder="چه کاری داری؟ مثلاً تبدیل تاریخ…"
              aria-controls="toolsUsage"
              value={query}
              onChange={event => setQuery(event.target.value)}
              onKeyDown={event => { if (event.key === "Escape") setQuery(""); }}
            />
            {query && <button type="button" className="home-search-clear" aria-label="پاک کردن جستجو" onClick={() => { setQuery(""); searchRef.current?.focus(); }}><X size={18} aria-hidden="true" /></button>}
            <button type="submit" className="home-search-submit" aria-label="نمایش ابزارها"><ArrowLeft size={22} aria-hidden="true" /></button>
          </form>
          <div className="home-reassurance"><span>{toPersianDigits(allTools.length)} ابزار کاربردی</span><span><Check size={14} aria-hidden="true" />رایگان و بدون ثبت‌نام</span></div>
        </section>

        {!query.trim() && recentTools.length > 0 && (
          <nav className="home-recents" aria-label="آخرین ابزارهای استفاده‌شده">
            <span><History size={15} aria-hidden="true" />اخیراً استفاده کردی</span>
            <div>{recentTools.slice(0, 3).map(tool => <Link href={tool.url} key={tool.url}><bdi>{tool.title}</bdi><ArrowUpLeft size={13} aria-hidden="true" /></Link>)}</div>
          </nav>
        )}

        <ToolDirectory searchQuery={query} onSearchChange={setQuery} />

        <section className="home-categories" id="categories" aria-labelledby="categories-title">
          <div className="home-section-heading"><h2 id="categories-title">یا از یک دسته شروع کن</h2><span>{toPersianDigits(categories.length)} دسته، برای کارهای مختلف</span></div>
          <div className="home-category-grid">
            {categories.map(category => {
              const Icon = getCategoryIcon(category.url);
              return (
                <Link href={category.url} key={category.url} className="home-category" data-category={category.url.slice(1)}>
                  <Icon size={21} strokeWidth={1.6} aria-hidden="true" />
                  <span>{category.title}</span>
                  <small>{toPersianDigits(category.item.length)} ابزار</small>
                  <ArrowUpLeft className="home-category-arrow" size={15} aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </section>

        <details className="home-extras" id="toolsRecomendend">
          <summary><span>کمی بیشتر کشف کن <small>چند ابزار از پروژه‌های دیگر</small></span><ChevronDown size={18} aria-hidden="true" /></summary>
          <div className="home-extra-content">
            <p>این ابزارها در زبانهٔ جدید باز می‌شوند.</p>
            <div className="home-extra-links">{recommendedTools.map(tool => <a key={tool.url} href={tool.url} target="_blank" rel="noreferrer">{tool.title}<ArrowUpLeft size={15} aria-hidden="true" /></a>)}</div>
          </div>
        </details>

        <p className="home-signoff"><span aria-hidden="true">✳</span>وقتت برای کارهای مهم‌تر.</p>
      </div>
    </div>
  );
}
