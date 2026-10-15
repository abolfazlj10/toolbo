"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Dialog, Popover } from "radix-ui";
import { ArrowLeft, ArrowUpLeft, ChevronDown, Heart, Menu, Moon, Search, Sun, X } from "lucide-react";
import { Brand } from "@/components/brand";
import { useFavorites } from "@/components/favorites-provider";
import { useTheme } from "@/components/theme-provider";
import { allTools, categories, getSearchResults } from "@/lib/tool-data";
import { getCategoryIcon } from "@/lib/category-icons";
import { getToolIcon } from "@/lib/tool-icons";
import { normalizeSearchText } from "@/lib/search-utils";
import { featuredPaths } from "@/lib/design-data";
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
  const [view, setView] = useState<LibraryView | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const openSearch = () => setView("search");
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
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
          <Brand />
          <nav className="desktop-nav" aria-label="ناوبری اصلی">
            <Link href="/" className={pathname === "/" ? "nav-active" : ""} aria-current={pathname === "/" ? "page" : undefined}>خانه</Link>
            <Popover.Root open={menuOpen} onOpenChange={setMenuOpen}>
              <Popover.Trigger className="nav-categories">دسته‌بندی ابزارها <ChevronDown size={14} /></Popover.Trigger>
              <Popover.Portal>
                <Popover.Content className="category-popover" aria-label="دسته‌بندی ابزارها" sideOffset={24} align="center">
                  <div className="category-menu-grid">{categories.map(category => {
                    const Icon = getCategoryIcon(category.url);
                    return <Link href={category.url} key={category.url} onClick={() => setMenuOpen(false)}><Icon size={19} /><span>{category.title}</span><small>{toPersianDigits(category.item.length)}</small></Link>;
                  })}</div>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </nav>
          <div className="header-actions">
            <button className="icon-button header-search" aria-label="جستجوی ابزارها" onClick={() => setView("search")}><Search size={19} /></button>
            <button className="icon-button" aria-label={isDark ? "فعال کردن حالت روشن" : "فعال کردن حالت تیره"} onClick={toggleTheme}>{isDark ? <Sun size={19} /> : <Moon size={19} />}</button>
            <span className="header-divider" />
            <button className="saved-button" aria-label="ابزارهای من، ذخیره‌شده‌ها" onClick={() => setView("favorites")}><Heart size={17} aria-hidden="true" /><span>ابزارهای من</span></button>
            <Popover.Root>
              <Popover.Trigger className="icon-button mobile-menu-button" aria-label="باز کردن فهرست"><Menu size={22} /></Popover.Trigger>
              <Popover.Portal>
                <Popover.Content className="mobile-menu category-popover" aria-label="فهرست ابزارها" sideOffset={16} align="end">
                  <div className="category-menu-grid">{categories.map(category => {
                    const Icon = getCategoryIcon(category.url);
                    return <Popover.Close asChild key={category.url}><Link href={category.url}><Icon size={18} />{category.title}</Link></Popover.Close>;
                  })}</div>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </div>
        </div>
      </header>
      <LibraryDialog view={view} onClose={() => setView(null)} />
    </>
  );
}

function LibraryDialog({ view, onClose }: { view: LibraryView | null; onClose: () => void }) {
  const { favorites } = useFavorites();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(-1);
  const returnFocus = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const results = useMemo(() => getSearchResults(query), [query]);
  const suggestions = featuredPaths.flatMap(path => allTools.find(tool => tool.url === path) ?? []);
  const items = view === "favorites" ? favorites : query.trim().length >= 2
    ? [...results.tools, ...results.categories.map(category => ({ title: category.title, sub: `${toPersianDigits(category.item.length)} ابزار در این دسته`, url: category.url })), ...results.recommended.map(item => ({ title: item.title, sub: "پیشنهاد بیرونی · باز شدن در زبانه جدید", url: item.url }))]
    : query.trim() ? allTools.filter(tool => normalizeSearchText(`${tool.title} ${tool.sub} ${tool.categoryTitle}`).includes(normalizeSearchText(query))) : suggestions;
  const close = () => { onClose(); setQuery(""); setActive(-1); };
  const title = view === "favorites" ? "ابزارهای ذخیره‌شده" : "جستجوی ابزارها";

  return (
    <Dialog.Root open={view !== null} onOpenChange={open => { if (!open) close(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="library-dialog" onOpenAutoFocus={event => {
          returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
          event.preventDefault();
          const searchInput = window.matchMedia("(min-width: 768px)").matches ? document.querySelector<HTMLInputElement>(".dialog-search input") : null;
          (searchInput ?? titleRef.current)?.focus();
        }} onCloseAutoFocus={event => { event.preventDefault(); (returnFocus.current?.isConnected ? returnFocus.current : document.querySelector<HTMLButtonElement>(".header-search"))?.focus(); }}>
          <div className="dialog-heading"><Dialog.Title ref={titleRef} tabIndex={-1}>{title}</Dialog.Title><Dialog.Close className="icon-button" aria-label="بستن"><X size={20} /></Dialog.Close></div>
          <Dialog.Description className="sr-only">ابزار دلخواه را انتخاب کن تا صفحه آن باز شود.</Dialog.Description>
          {view === "search" && <div className="dialog-search"><Search size={21} /><input
            aria-label="نام ابزار" name="tool-search" autoComplete="off" spellCheck={false} placeholder="مثلاً تبدیل تاریخ، درصد، وام…" value={query}
            role="combobox" aria-expanded="true" aria-autocomplete="list" aria-controls="tool-search-results" aria-activedescendant={active >= 0 && active < items.length ? `search-result-${active}` : undefined}
            onChange={event => { setQuery(event.target.value); setActive(-1); }}
            onKeyDown={event => {
              if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                event.preventDefault();
                const next = Math.max(0, Math.min(items.length - 1, active + (event.key === "ArrowDown" ? 1 : -1)));
                setActive(next);
                document.getElementById(`search-result-${next}`)?.scrollIntoView({ block: "nearest" });
              }
              if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById(`search-result-${Math.max(0, active)}`)?.click();
              }
            }}
          /><kbd>ESC</kbd></div>}
          <div className="dialog-meta" role="status">{view === "search" && !query.trim() ? "ابزارهای پرکاربرد" : `${toPersianDigits(items.length)} نتیجه`}</div>
          <div className="dialog-results" id="tool-search-results" role={view === "search" ? "listbox" : undefined} aria-label={view === "search" ? "نتایج جستجو" : undefined}>
            {items.map((tool, index) => {
              const Icon = getToolIcon(tool.url);
              const external = tool.url.startsWith("https:");
              return <Link id={`search-result-${index}`} href={tool.url} key={tool.url} role={view === "search" ? "option" : undefined} aria-selected={view === "search" ? active === index : undefined} className={`search-result ${active === index ? "search-result-active" : ""}`} onClick={close} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}><span className="search-result-icon"><Icon size={21} aria-hidden="true" /></span><span><strong>{tool.title}</strong><small>{tool.sub}</small></span><ArrowLeft size={17} aria-hidden="true" /></Link>;
            })}
            {!items.length && <div className="empty-state">{view === "favorites" ? <Heart /> : <Search />}<strong>{view === "favorites" ? "هنوز ابزاری ذخیره نشده" : "ابزاری پیدا نشد"}</strong><p>{view === "favorites" ? "روی قلب کنار هر ابزار بزن تا اینجا در دسترس باشد." : "نام کوتاه‌تر یا عبارت دیگری را امتحان کن."}</p></div>}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container_m footer-compact">
        <span dir="ltr">© {new Date().getFullYear()} toolbo</span>
        <a href="https://j10-mi9b.vercel.app/" target="_blank" rel="noreferrer">درباره سازنده <ArrowUpLeft size={14} aria-hidden="true" /></a>
      </div>
    </footer>
  );
}
