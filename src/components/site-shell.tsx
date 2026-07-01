"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";
import {
  ExternalLink,
  Menu,
  Moon,
  Search,
  Star,
  Sun,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useFavorites } from "@/components/favorites-provider";
import { useTheme } from "@/components/theme-provider";
import { categories, getSearchResults } from "@/lib/tool-data";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme();
  const { favorites } = useFavorites();
  const [search, setSearch] = useState("");
  const results = useMemo(() => getSearchResults(search), [search]);
  const hasResults =
    results.categories.length > 0 ||
    results.tools.length > 0 ||
    results.recommended.length > 0;

  return (
    <header className="border-b bg-card/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            aria-label="تولبو"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-md border bg-background">
              <Image src="/ToolBo.png" alt="" width={34} height={34} priority />
            </span>
            <span className="hidden leading-none sm:block">
              <span className="block text-xl font-bold tracking-normal">
                TOOLBO
              </span>
              <span className="text-xs text-muted-foreground">تولبو</span>
            </span>
          </Link>

          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              type="search"
              placeholder="دنبال چی میگردی..."
              className="h-10 pe-9 text-right"
            />
            {search.trim().length > 1 && (
              <SearchPanel
                hasResults={hasResults}
                results={results}
                onSelect={() => setSearch("")}
              />
            )}
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon-lg"
            onClick={toggleTheme}
            aria-label={isDark ? "روشن" : "تیره"}
          >
            {isDark ? <Sun /> : <Moon />}
          </Button>

          <FavoritesSheet count={favorites.length} />
          <MobileMenu />
        </div>

        <nav className="hidden items-center gap-2 overflow-x-auto pb-1 md:flex">
          {categories.map((category) => (
            <Button
              key={category.url}
              asChild
              variant={pathname === category.url ? "secondary" : "ghost"}
              size="sm"
            >
              <Link href={category.url}>{category.title}</Link>
            </Button>
          ))}
          <Separator orientation="vertical" className="mx-1 h-5" />
          <Button asChild variant="ghost" size="sm">
            <Link href="/#toolsUsage">کاربردی</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/#toolsRecommended">پیشنهادی</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

type SearchResults = ReturnType<typeof getSearchResults>;

function SearchPanel({
  hasResults,
  results,
  onSelect,
}: {
  hasResults: boolean;
  results: SearchResults;
  onSelect: () => void;
}) {
  return (
    <div className="absolute left-0 right-0 top-12 z-40 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg">
      <ScrollArea className="max-h-96">
        <div className="space-y-1 p-2">
          {!hasResults && (
            <div className="px-3 py-4 text-center text-sm text-muted-foreground">
              پیدا نکردیم که ...
            </div>
          )}
          {results.categories.map((item) => (
            <SearchLink
              key={item.url}
              href={item.url}
              title={item.title}
              subtitle={`${item.item.length} ابزار محاسباتی`}
              onSelect={onSelect}
            />
          ))}
          {results.tools.map((item) => (
            <SearchLink
              key={item.url}
              href={item.url}
              title={item.title}
              subtitle={item.sub}
              onSelect={onSelect}
            />
          ))}
          {results.recommended.map((item) => (
            <a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              onClick={onSelect}
              className="flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm outline-none transition-colors hover:bg-accent focus-visible:bg-accent"
            >
              <span>
                <span className="block font-medium">{item.title}</span>
                <span className="text-xs text-muted-foreground">
                  {item.info}
                </span>
              </span>
              <ExternalLink className="size-4 text-muted-foreground" />
            </a>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function SearchLink({
  href,
  title,
  subtitle,
  onSelect,
}: {
  href: string;
  title: string;
  subtitle: string;
  onSelect: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onSelect}
      className="block rounded-md px-3 py-2 text-sm outline-none transition-colors hover:bg-accent focus-visible:bg-accent"
    >
      <span className="block font-medium">{title}</span>
      <span className="text-xs text-muted-foreground">{subtitle}</span>
    </Link>
  );
}

function FavoritesSheet({ count }: { count: number }) {
  const { favorites } = useFavorites();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button type="button" variant="outline" size="icon-lg" aria-label="مورد علاقه">
          <Star />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle>مورد علاقه</SheetTitle>
          <SheetDescription>{count} ابزار ذخیره شده</SheetDescription>
        </SheetHeader>
        <div className="px-4">
          <Separator />
        </div>
        <ScrollArea className="min-h-0 flex-1 px-4">
          <div className="space-y-2 py-4">
            {favorites.length === 0 && (
              <div className="rounded-md border border-dashed p-4 text-center text-sm text-muted-foreground">
                خالی
              </div>
            )}
            {favorites.map((item) => (
              <Link
                key={item.url}
                href={item.url}
                className="block rounded-md border bg-card p-3 text-sm transition-colors hover:bg-accent"
              >
                <span className="block font-medium">{item.title}</span>
                <span className="text-xs text-muted-foreground">
                  {item.sub}
                </span>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon-lg"
          className="md:hidden"
          aria-label="منو"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle>دسته بندی ها</SheetTitle>
          <SheetDescription>ToolBo</SheetDescription>
        </SheetHeader>
        <ScrollArea className="min-h-0 flex-1 px-4">
          <div className="space-y-2 py-4">
            {categories.map((category) => (
              <Link
                key={category.url}
                href={category.url}
                className="flex items-center justify-between rounded-md border bg-card p-3 text-sm transition-colors hover:bg-accent"
              >
                <span className="font-medium">{category.title}</span>
                <Badge variant="secondary">{category.item.length}</Badge>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t bg-card/60">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <span>ToolBo</span>
        <a
          href="https://j10-mi9b.vercel.app/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
        >
          درباره من
          <ExternalLink className="size-3.5" />
        </a>
      </div>
    </footer>
  );
}
