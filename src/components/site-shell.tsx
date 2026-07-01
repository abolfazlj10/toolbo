"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useFavorites } from "@/components/favorites-provider";
import { useTheme } from "@/components/theme-provider";
import { categories, getSearchResults } from "@/lib/tool-data";
import { cn } from "@/lib/utils";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  const { isDark, toggleTheme } = useTheme();
  const { favorites } = useFavorites();
  const [search, setSearch] = useState("");
  const [showTools, setShowTools] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [fixedNav, setFixedNav] = useState(false);
  const [containerNav, setContainerNav] = useState(true);
  const results = useMemo(() => getSearchResults(search), [search]);
  const hasResults =
    results.categories.length > 0 ||
    results.tools.length > 0 ||
    results.recommended.length > 0;

  useEffect(() => {
    const updateNavState = () => {
      setFixedNav(
        window.innerWidth > 1000 && document.documentElement.scrollTop >= 170
      );
      setContainerNav(window.innerWidth > 900);
    };

    updateNavState();
    window.addEventListener("resize", updateNavState);
    window.addEventListener("scroll", updateNavState);

    return () => {
      window.removeEventListener("resize", updateNavState);
      window.removeEventListener("scroll", updateNavState);
    };
  }, []);

  return (
    <div className={containerNav ? "container_m" : ""}>
      <div className="nav" id="top">
        <Link className="SB" href="/" title="تولبو" aria-label="تولبو">
          <div className={cn("N_T", isDark && "N_C_D")}>
            <Image src="/ToolBo.png" alt="icon brand" width={45} height={45} priority />
          </div>
        </Link>

        <div className={cn("N_C", isDark && "N_C_D")}>
          <Link href="/" title="تولبو">
            <h1 className="B">TOOLBO</h1>
          </Link>

          <div className="S">
            <input
              className={cn("S_I", isDark && "S_I_D")}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              type="search"
              name="searchTool"
              placeholder="دنبال چی میگردی..."
            />
            {search.trim().length > 1 && (
              <SearchPanel
                hasResults={hasResults}
                results={results}
                isDark={isDark}
                onSelect={() => setSearch("")}
              />
            )}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className={cn("T", isDark && "TD")}
            title={isDark ? "تیره" : "روشن"}
            aria-label={isDark ? "تیره" : "روشن"}
          >
            <span className="TI fontIconNew">&#xe900;</span>
            <span className="TI fontIconNew">&#xe901;</span>
            <span className={cn("MT", isDark && "MTD")} />
          </button>
        </div>

        <div className={cn("N_B", fixedNav && "fixNav container_m", isDark && "N_B_D")}>
          <div
            className="N_B_OM"
            onMouseEnter={() => setShowTools(true)}
            onMouseLeave={() => {
              setShowTools(false);
              setActiveCategory(null);
            }}
          >
            <span>دسته بندی ها</span>
            <span className={cn("fontIconNew OM_I", isDark && "OM_I_D")}>
              &#xe902;
            </span>
            {showTools && (
              <div className={cn("MD showBox", isDark && "MD_D")}>
                {categories.map((category, index) => (
                  <div
                    key={category.url}
                    className={cn("MD_I", isDark && "MD_ID")}
                    onMouseEnter={() => setActiveCategory(category.url)}
                    onFocus={() => setActiveCategory(category.url)}
                  >
                    <Link
                      className="MD_I_T"
                      href={category.url}
                      title={`${category.item.length} ابزار محاسباتی`}
                    >
                      {category.title}
                    </Link>
                    <span className="fontIconNew MD_I_I">&#xe903;</span>
                    {activeCategory === category.url && (
                      <div className={cn("MD_I_D", isDark && "MD_I_D_D")}>
                        {categories[index].item.map((tool) => (
                          <Link key={tool.url} href={tool.url} title={tool.sub}>
                            <div className={cn("MD_I_D_I", isDark && "MD_I_D_I_D")}>
                              {tool.title}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            className="N_B_OM"
            onMouseEnter={() => setShowFavorites(true)}
            onMouseLeave={() => setShowFavorites(false)}
          >
            <span>مورد علاقه</span>
            <span className={cn("fontIconNew OM_I", isDark && "OM_I_D")}>
              &#xe902;
            </span>
            {showFavorites && (
              <div className={cn("MDF showBox", isDark && "MDF_D")}>
                {favorites.length === 0 && <div className="MD_IFDI">خالی</div>}
                {favorites.map((item) => (
                  <Link
                    key={item.url}
                    href={item.url}
                    title={item.sub}
                    className={cn("MD_IF", isDark && "MD_IFD")}
                  >
                    <span className="MD_I_T">{item.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <button type="button" className="CP" onClick={() => scrollOrNavigate("toolsUsage")}>
            کاربردی
          </button>
          <button
            type="button"
            className="CP"
            onClick={() => scrollOrNavigate("toolsRecomendend")}
          >
            پیشنهادی
          </button>
          <a href="https://j10-mi9b.vercel.app/" target="_blank" rel="noreferrer">
            درباره من
          </a>
        </div>
      </div>
    </div>
  );
}

type SearchResults = ReturnType<typeof getSearchResults>;

function SearchPanel({
  hasResults,
  results,
  isDark,
  onSelect,
}: {
  hasResults: boolean;
  results: SearchResults;
  isDark: boolean;
  onSelect: () => void;
}) {
  if (!hasResults) {
    return (
      <div className={cn("S_Box S_Box_NotF", isDark && "S_Box_D")}>
        پیدا نکردیم که ... :(
      </div>
    );
  }

  return (
    <div className={cn("S_Box", isDark && "S_Box_D")}>
      {results.categories.map((item) => (
        <SearchLink
          key={item.url}
          href={item.url}
          title={item.title}
          subtitle={`${item.item.length} ابزار محاسباتی`}
          isDark={isDark}
          onSelect={onSelect}
        />
      ))}
      {results.tools.map((item) => (
        <SearchLink
          key={item.url}
          href={item.url}
          title={item.title}
          subtitle={item.sub}
          isDark={isDark}
          onSelect={onSelect}
        />
      ))}
      {results.recommended.map((item) => (
        <a
          key={item.url}
          href={item.url}
          target="_blank"
          rel="noreferrer"
          title={item.info}
          onClick={onSelect}
          className="S_Item"
        >
          <span className="S_Item_T">{item.title}</span>
          <span className={cn("S_Item_S", isDark && "S_Item_SD")}>{item.info}</span>
        </a>
      ))}
    </div>
  );
}

function SearchLink({
  href,
  title,
  subtitle,
  isDark,
  onSelect,
}: {
  href: string;
  title: string;
  subtitle: string;
  isDark: boolean;
  onSelect: () => void;
}) {
  return (
    <Link href={href} title={subtitle} onClick={onSelect} className="S_Item">
      <span className="S_Item_T">{title}</span>
      <span className={cn("S_Item_S", isDark && "S_Item_SD")}>{subtitle}</span>
    </Link>
  );
}

function SiteFooter() {
  const { isDark } = useTheme();

  return (
    <footer className="footer">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        title="بالا رفتن"
        className={cn("UP fontIconNew CP", isDark && "UP_D")}
      >
        &#xf077;
      </button>
      <div className="BC">
        <div className="TB">
          <div className="TBR">
            <Link href="/">
              <Image className="TBRI" src="/ToolBo.png" alt="icon brand" width={40} height={40} />
            </Link>
            <div className="TBRV">v 3.0.0</div>
          </div>
          <div className="TBC">
            اپلیکیشن تولبو جهت صرفه جویی در زمان کارهای روزمره با توسعه ابزار های
            کاربردی ایجاد شده است و میتوانید با انتخاب ابزار مورد نظر از آن استفاده
            کنید.
          </div>
          <div className="TBL">
            <button type="button" className="CP" onClick={() => scrollOrNavigate("toolsUsage")}>
              کاربردی
            </button>
            <button
              type="button"
              className="CP"
              onClick={() => scrollOrNavigate("toolsRecomendend")}
            >
              پیشنهادی
            </button>
            <a href="https://j10-mi9b.vercel.app/" className="AF" target="_blank" rel="noreferrer">
              درباره من
            </a>
          </div>
        </div>
        <div className="LC" />
        <div className="BD">
          <div>
            <Link href="/" title="تولبو">
              <h1 className="B">TOOLBO</h1>
            </Link>
          </div>
          <div title="ابوالفضل جمشیدی نژاد">توسعه داده شده توسط ابوالفضل جمشیدی نژاد</div>
        </div>
        <div className="BB">
          <h1 className="B">TOOLBO</h1>
        </div>
        <div className="CIS">
          <a
            style={{ color: "#2AABEE" }}
            href="http://t.me/abolfazl_j10"
            target="_blank"
            rel="noreferrer"
            className="icon"
            aria-label="Telegram"
            dangerouslySetInnerHTML={{ __html: "&#xea95;" }}
          />
          <a
            href="http://github.com/abolfazlj10"
            target="_blank"
            rel="noreferrer"
            className="icon"
            aria-label="GitHub"
            dangerouslySetInnerHTML={{ __html: "&#xeab0;" }}
          />
          <a
            style={{ color: "#0A66C2" }}
            href="http://linkedin.com/in/abolfazljamshidi/"
            target="_blank"
            rel="noreferrer"
            className="icon"
            aria-label="LinkedIn"
            dangerouslySetInnerHTML={{ __html: "&#xf0e1;" }}
          />
          <a
            style={{ color: "#FF5733" }}
            href="mailto:abolfazl.j.dev@gmail.com"
            target="_blank"
            rel="noreferrer"
            className="icon"
            aria-label="Email"
            dangerouslySetInnerHTML={{ __html: "&#xe903;" }}
          />
        </div>
      </div>
    </footer>
  );
}

function scrollOrNavigate(id: string) {
  const target = document.getElementById(id);

  if (target) {
    target.scrollIntoView();
    return;
  }

  window.location.href = `/#${id}`;
}
