"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Dialog, Popover } from "radix-ui";
import { ArrowLeft, ArrowUp, ArrowUpLeft, ChevronDown, Clock3, CornerDownLeft, Heart, Menu, Moon, Search, Sparkles, Sun, X } from "lucide-react";
import { Brand } from "@/components/brand";
import { useFavorites } from "@/components/favorites-provider";
import { useRecentTools } from "@/components/recent-tools-provider";
import { useTheme } from "@/components/theme-provider";
import { allTools, categories, getSearchResults, type ToolItem } from "@/lib/tool-data";
import { getCategoryIcon } from "@/lib/category-icons";
import { getToolIcon } from "@/lib/tool-icons";
import { normalizeSearchText } from "@/lib/search-utils";
import { creatorUrl, getCategoryLabel, getCategoryPreview, popularTools, recommendedProjects } from "@/lib/site";
import { toPersianDigits } from "@/lib/tool-utils";

type LibraryView = "search" | "favorites";

export function openToolSearch() {
  window.dispatchEvent(new Event("toolbo:open-search"));
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">پرش به محتوای اصلی</a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>{children}</main>
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  const { isDark, toggleTheme } = useTheme();
  const { favorites } = useFavorites();
  const [view, setView] = useState<LibraryView | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const activeCategory = categories.find(category => pathname === category.url || pathname.startsWith(`${category.url}/`));

  useEffect(() => {
    const openSearch = () => setView("search");
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = target?.closest("input, textarea, select, [contenteditable='true']");
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openSearch();
      } else if (event.key === "/" && !typing) {
        event.preventDefault();
        openSearch();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("toolbo:open-search", openSearch);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("toolbo:open-search", openSearch);
    };
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="container_m header-inner">
          <button className="icon-button mobile-only" aria-label="باز کردن منو" onClick={() => setDrawerOpen(true)}><Menu size={21} /></button>
          <Brand />
          <nav className="desktop-nav" aria-label="ناوبری اصلی">
            <Popover.Root open={menuOpen} onOpenChange={setMenuOpen}>
              <Popover.Trigger className={`nav-link${activeCategory ? " nav-active" : ""}`}>دسته‌بندی‌ها <ChevronDown size={15} aria-hidden="true" /></Popover.Trigger>
              <Popover.Portal>
                <Popover.Content className="mega-menu" aria-label="دسته‌بندی ابزارها" sideOffset={14} align="start">
                  <div className="mega-grid">{categories.map(category => {
                    const Icon = getCategoryIcon(category.url);
                    return (
                      <div className="mega-column" key={category.url} data-category={category.url.slice(1)}>
                        <Link href={category.url} className="mega-title" onClick={() => setMenuOpen(false)}>
                          <span className="mega-icon"><Icon size={17} aria-hidden="true" /></span>
                          <span>{getCategoryLabel(category.url)}</span>
                          <small>{toPersianDigits(category.item.length)}</small>
                        </Link>
                        <ul>{getCategoryPreview(category.url, 3).map(tool => (
                          <li key={tool.url}><Link href={tool.url} onClick={() => setMenuOpen(false)}>{tool.title}</Link></li>
                        ))}</ul>
                      </div>
                    );
                  })}</div>
                  <div className="mega-footer">
                    <span>{toPersianDigits(allTools.length)} ابزار رایگان، بدون ثبت‌نام</span>
                    <button type="button" onClick={() => { setMenuOpen(false); setView("search"); }}>جستجو در همه ابزارها <ArrowLeft size={15} aria-hidden="true" /></button>
                  </div>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
            <Link href="/#popular" className="nav-link">پرکاربردها</Link>
          </nav>
          <button className="header-search" onClick={() => setView("search")} aria-label="جستجوی ابزارها">
            <Search size={17} aria-hidden="true" />
            <span>جستجوی ابزار…</span>
            <kbd dir="ltr">⌘K</kbd>
          </button>
          <div className="header-actions">
            <button className="icon-button mobile-only" aria-label="جستجوی ابزارها" onClick={() => setView("search")}><Search size={20} /></button>
            <button className="icon-button desktop-only" aria-label={isDark ? "فعال کردن حالت روشن" : "فعال کردن حالت تیره"} title={isDark ? "حالت روشن" : "حالت تیره"} onClick={toggleTheme}>{isDark ? <Sun size={19} /> : <Moon size={19} />}</button>
            <button className="saved-button" aria-label={`ابزارهای ذخیره‌شده (${toPersianDigits(favorites.length)})`} onClick={() => setView("favorites")}>
              <Heart size={17} aria-hidden="true" fill={favorites.length ? "currentColor" : "none"} />
              <span className="saved-label">ذخیره‌شده‌ها</span>
              {favorites.length > 0 && <span className="saved-count">{toPersianDigits(favorites.length)}</span>}
            </button>
          </div>
        </div>
      </header>
      <MobileDrawer open={drawerOpen} onOpenChange={setDrawerOpen} onSearch={() => { setDrawerOpen(false); setView("search"); }} onFavorites={() => { setDrawerOpen(false); setView("favorites"); }} />
      <LibraryDialog view={view} onViewChange={setView} onClose={() => setView(null)} />
    </>
  );
}

function MobileDrawer({ open, onOpenChange, onSearch, onFavorites }: { open: boolean; onOpenChange: (open: boolean) => void; onSearch: () => void; onFavorites: () => void }) {
  const { isDark, toggleTheme } = useTheme();
  const { favorites } = useFavorites();
  const pathname = usePathname();
  const close = () => onOpenChange(false);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="mobile-drawer">
          <div className="drawer-heading">
            <Dialog.Title className="sr-only">منوی تولبو</Dialog.Title>
            <Dialog.Description className="sr-only">دسته‌بندی‌ها، جستجو و تنظیمات</Dialog.Description>
            <Brand onClick={close} />
            <Dialog.Close className="icon-button" aria-label="بستن منو"><X size={20} /></Dialog.Close>
          </div>
          <button type="button" className="drawer-search" onClick={onSearch}><Search size={18} aria-hidden="true" />جستجو در {toPersianDigits(allTools.length)} ابزار…</button>
          <nav aria-label="دسته‌بندی ابزارها" className="drawer-nav">
            <span className="drawer-label">دسته‌بندی‌ها</span>
            {categories.map(category => {
              const Icon = getCategoryIcon(category.url);
              const active = pathname === category.url || pathname.startsWith(`${category.url}/`);
              return (
                <Link key={category.url} href={category.url} onClick={close} className="drawer-link" aria-current={active ? "page" : undefined} data-category={category.url.slice(1)}>
                  <span className="drawer-icon"><Icon size={18} aria-hidden="true" /></span>
                  {getCategoryLabel(category.url)}
                  <small>{toPersianDigits(category.item.length)}</small>
                </Link>
              );
            })}
          </nav>
          <div className="drawer-actions">
            <button type="button" onClick={onFavorites}><Heart size={18} aria-hidden="true" />ذخیره‌شده‌ها{favorites.length > 0 && <small>{toPersianDigits(favorites.length)}</small>}</button>
            <button type="button" onClick={toggleTheme}>{isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}{isDark ? "حالت روشن" : "حالت تیره"}</button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

type ResultGroup = { label: string; icon?: ReactNode; items: (ToolItem & { meta?: string })[] };

function LibraryDialog({ view, onViewChange, onClose }: { view: LibraryView | null; onViewChange: (view: LibraryView) => void; onClose: () => void }) {
  const { favorites, toggleFavorite } = useFavorites();
  const { recentTools } = useRecentTools();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const term = normalizeSearchText(query);

  const groups = useMemo<ResultGroup[]>(() => {
    if (view === "favorites") return [{ label: "ابزارهای ذخیره‌شده", items: favorites }];
    if (!term) {
      const recent = recentTools.slice(0, 4);
      return [
        ...(recent.length ? [{ label: "اخیراً استفاده‌شده", icon: <Clock3 size={14} />, items: recent }] : []),
        { label: "پرکاربردها", icon: <Sparkles size={14} />, items: popularTools.filter(tool => !recent.some(item => item.url === tool.url)).slice(0, 6) },
      ];
    }
    const results = term.length >= 2 ? getSearchResults(term) : null;
    const tools = results?.tools ?? allTools.filter(tool => normalizeSearchText(`${tool.title} ${tool.sub}`).includes(term));
    return [
      { label: "ابزارها", items: tools.map(tool => ({ ...tool, meta: getCategoryLabel(tool.categoryUrl) })) },
      ...(results?.categories.length ? [{ label: "دسته‌بندی‌ها", items: results.categories.map(category => ({ title: getCategoryLabel(category.url), sub: `${toPersianDigits(category.item.length)} ابزار`, url: category.url })) }] : []),
    ].filter(group => group.items.length);
  }, [view, term, favorites, recentTools]);

  const items = groups.flatMap(group => group.items);
  const close = () => { onClose(); setQuery(""); setActive(0); };
  const title = view === "favorites" ? "ابزارهای ذخیره‌شده" : "جستجوی ابزارها";
  let index = -1;

  return (
    <Dialog.Root open={view !== null} onOpenChange={open => { if (!open) close(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="library-dialog" onOpenAutoFocus={event => {
          if (view === "search") { event.preventDefault(); inputRef.current?.focus(); }
        }}>
          <Dialog.Title className="sr-only">{title}</Dialog.Title>
          <Dialog.Description className="sr-only">ابزار دلخواه را انتخاب کن تا صفحه آن باز شود.</Dialog.Description>
          <div className="dialog-tabs" role="tablist" aria-label="نما">
            <button role="tab" aria-selected={view === "search"} onClick={() => { onViewChange("search"); setActive(0); requestAnimationFrame(() => inputRef.current?.focus()); }}><Search size={15} aria-hidden="true" />جستجو</button>
            <button role="tab" aria-selected={view === "favorites"} onClick={() => { onViewChange("favorites"); setActive(0); }}><Heart size={15} aria-hidden="true" />ذخیره‌شده‌ها{favorites.length > 0 && <small>{toPersianDigits(favorites.length)}</small>}</button>
            <Dialog.Close className="icon-button dialog-close" aria-label="بستن"><X size={19} /></Dialog.Close>
          </div>
          {view === "search" && <div className="dialog-search"><Search size={20} aria-hidden="true" /><input
            ref={inputRef} aria-label="نام ابزار یا کاری که می‌خواهی انجام بدهی" name="tool-search" autoComplete="off" spellCheck={false} placeholder="مثلاً تبدیل تاریخ، قسط وام، درصد…" value={query}
            role="combobox" aria-expanded="true" aria-autocomplete="list" aria-controls="tool-search-results" aria-activedescendant={items.length ? `search-result-${active}` : undefined}
            onChange={event => { setQuery(event.target.value); setActive(0); }}
            onKeyDown={event => {
              if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                event.preventDefault();
                const next = (active + (event.key === "ArrowDown" ? 1 : -1) + items.length) % Math.max(items.length, 1);
                setActive(next);
                document.getElementById(`search-result-${next}`)?.scrollIntoView({ block: "nearest" });
              }
              if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById(`search-result-${active}`)?.click();
              }
            }}
          />{query && <button type="button" className="icon-button" aria-label="پاک کردن" onClick={() => { setQuery(""); inputRef.current?.focus(); }}><X size={16} /></button>}</div>}
          <div className="sr-only" role="status">{term ? `${toPersianDigits(items.length)} نتیجه` : ""}</div>
          <div className="dialog-results" id="tool-search-results" role={view === "search" ? "listbox" : undefined} aria-label={view === "search" ? "نتایج جستجو" : undefined}>
            {groups.map(group => (
              <div className="dialog-group" key={group.label} role={view === "search" ? "group" : undefined} aria-label={group.label}>
                <div className="dialog-group-label">{group.icon}{group.label}</div>
                {group.items.map(tool => {
                  index += 1;
                  const current = index;
                  const Icon = tool.url.split("/").length > 2 ? getToolIcon(tool.url) : getCategoryIcon(tool.url);
                  return (
                    <div className="search-result-row" key={tool.url}>
                      <Link id={`search-result-${current}`} href={tool.url} role={view === "search" ? "option" : undefined} aria-selected={view === "search" ? active === current : undefined}
                        className={`search-result${active === current ? " search-result-active" : ""}`} onClick={close} onMouseMove={() => setActive(current)}>
                        <span className="search-result-icon" data-category={tool.url.split("/")[1]}><Icon size={19} aria-hidden="true" /></span>
                        <span className="search-result-copy"><strong>{tool.title}</strong><small>{tool.sub}</small></span>
                        {tool.meta && <span className="search-result-meta">{tool.meta}</span>}
                        <CornerDownLeft className="search-result-enter" size={15} aria-hidden="true" />
                      </Link>
                      {view === "favorites" && <button type="button" className="icon-button" aria-label={`حذف ${tool.title} از ذخیره‌شده‌ها`} onClick={() => toggleFavorite(tool)}><X size={16} /></button>}
                    </div>
                  );
                })}
              </div>
            ))}
            {!items.length && <div className="empty-state">
              {view === "favorites" ? <Heart aria-hidden="true" /> : <Search aria-hidden="true" />}
              <strong>{view === "favorites" ? "هنوز ابزاری ذخیره نکرده‌ای" : `نتیجه‌ای برای «${query.trim()}» پیدا نشد`}</strong>
              <p>{view === "favorites" ? "در صفحه هر ابزار روی «ذخیره» بزن تا همیشه اینجا در دسترس باشد." : "عبارت کوتاه‌تر یا مترادف آن را امتحان کن؛ مثلاً «تاریخ» به جای «تبدیل تاریخ شمسی»."}</p>
              {view === "favorites" && <button type="button" className="text-link" onClick={() => onViewChange("search")}>پیدا کردن ابزار <ArrowLeft size={15} aria-hidden="true" /></button>}
            </div>}
          </div>
          <div className="dialog-footer" aria-hidden="true">
            <span><kbd>↑</kbd><kbd>↓</kbd> جابه‌جایی</span>
            <span><kbd>Enter</kbd> باز کردن</span>
            <span><kbd>Esc</kbd> بستن</span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container_m footer-grid">
        <div className="footer-about">
          <Brand />
          <p>جعبه‌ابزار فارسی برای کارهای روزمره؛ از تبدیل تاریخ و محاسبه قسط وام تا تبدیل واحد. رایگان، سریع و بدون ثبت‌نام. همه محاسبات در مرورگر خودت انجام می‌شود.</p>
        </div>
        <nav className="footer-column" aria-label="دسته‌بندی‌ها">
          <h2>دسته‌بندی‌ها</h2>
          <ul>{categories.map(category => <li key={category.url}><Link href={category.url}>{getCategoryLabel(category.url)}</Link></li>)}</ul>
        </nav>
        <nav className="footer-column" aria-label="ابزارهای پرکاربرد">
          <h2>پرکاربردها</h2>
          <ul>{popularTools.slice(0, 7).map(tool => <li key={tool.url}><Link href={tool.url}>{tool.title}</Link></li>)}</ul>
        </nav>
        <nav className="footer-column" aria-label="پروژه‌های دیگر">
          <h2>پروژه‌های دیگر سازنده</h2>
          <ul>{recommendedProjects.map(item => <li key={item.url}><a href={item.url} target="_blank" rel="noreferrer">{item.title}<ArrowUpLeft size={13} aria-hidden="true" /></a></li>)}</ul>
        </nav>
      </div>
      <div className="container_m footer-bottom">
        <span>© {toPersianDigits(new Date().getFullYear())} تولبو · ساخته‌شده توسط <a href={creatorUrl} target="_blank" rel="noreferrer">ابوالفضل جمشیدی</a></span>
        <button type="button" className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>بازگشت به بالا <ArrowUp size={15} aria-hidden="true" /></button>
      </div>
    </footer>
  );
}
