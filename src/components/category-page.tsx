import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ToolDirectory } from "@/components/tool-directory";
import { categories, type Category } from "@/lib/tool-data";
import { CategoryIcon } from "@/components/icons";
import { getCategoryDescription, getCategoryLabel } from "@/lib/site";
import { toPersianDigits } from "@/lib/tool-utils";

export function CategoryPage({ category }: { category: Category }) {
  return (
    <div className="category-page">
      <header className="page-hero" data-category={category.url.slice(1)}>
        <div className="container_m">
          <nav className="breadcrumbs" aria-label="مسیر صفحه">
            <Link href="/">خانه</Link><ChevronLeft size={13} aria-hidden="true" />
            <span aria-current="page">{getCategoryLabel(category.url)}</span>
          </nav>
          <div className="page-hero-row">
            <span className="tile-icon large" aria-hidden="true"><CategoryIcon url={category.url} size={28} strokeWidth={1.6} /></span>
            <div>
              <h1>ابزارهای {getCategoryLabel(category.url)}</h1>
              <p>{getCategoryDescription(category.url)} <span className="page-hero-count">{toPersianDigits(category.item.length)} ابزار</span></p>
            </div>
          </div>
        </div>
      </header>
      <div className="container_m">
        <nav className="category-tabs" aria-label="دسته‌بندی‌ها">
          {categories.map(item => (
            <Link key={item.url} href={item.url} aria-current={item.url === category.url ? "page" : undefined}>
              <CategoryIcon url={item.url} size={15} />{getCategoryLabel(item.url)}
            </Link>
          ))}
        </nav>
        <ToolDirectory key={category.url} category={category} />
      </div>
    </div>
  );
}
