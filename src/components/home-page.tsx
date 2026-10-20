import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { HomeSearch } from "@/components/home-tools";
import { RecentToolsSection } from "@/components/recent-tools";
import { allTools, categories } from "@/lib/tool-data";
import { getCategoryIcon } from "@/lib/category-icons";
import { getToolIcon } from "@/lib/tool-icons";
import { getCategoryLabel, popularTools } from "@/lib/site";
import { toPersianDigits } from "@/lib/tool-utils";

export function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero" aria-labelledby="hero-title">
        <div className="container_m hero-inner">
          <h1 id="hero-title">هر محاسبه‌ای، در چند ثانیه<span className="brand-period">.</span></h1>
          <p className="hero-lead">{toPersianDigits(allTools.length)} ابزار رایگان فارسی؛ بدون ثبت‌نام، بدون تبلیغ.</p>
          <HomeSearch />
        </div>
      </section>

      <div className="container_m home-body">
        <RecentToolsSection />

        <section className="home-section" id="popular" aria-labelledby="popular-title">
          <h2 id="popular-title" className="home-label">پرکاربردها</h2>
          <ul className="popular-list">
            {popularTools.slice(0, 6).map(tool => {
              const Icon = getToolIcon(tool.url);
              return (
                <li key={tool.url}>
                  <Link href={tool.url} className="popular-row" data-category={tool.categorySlug}>
                    <span className="tile-icon small" aria-hidden="true"><Icon size={17} strokeWidth={1.8} /></span>
                    <span className="popular-copy"><strong>{tool.title}</strong><small>{tool.sub}</small></span>
                    <ArrowLeft className="popular-arrow" size={16} aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="home-section" aria-labelledby="categories-title">
          <h2 id="categories-title" className="home-label">دسته‌بندی‌ها</h2>
          <ul className="category-chips">
            {categories.map(category => {
              const Icon = getCategoryIcon(category.url);
              return (
                <li key={category.url}>
                  <Link href={category.url} data-category={category.url.slice(1)}>
                    <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
                    {getCategoryLabel(category.url)}
                    <small>{toPersianDigits(category.item.length)}</small>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}
