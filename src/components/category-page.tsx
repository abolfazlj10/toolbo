import Link from "next/link";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { ToolDirectory } from "@/components/tool-directory";
import { categories, type Category } from "@/lib/tool-data";
import { getCategoryIcon } from "@/lib/category-icons";
import { categoryDescriptions } from "@/lib/design-data";
import { toPersianDigits } from "@/lib/tool-utils";

const categoryIcons = Object.fromEntries(categories.map(category => [category.url, getCategoryIcon(category.url)]));

export function CategoryPage({ category }: { category: Category }) {
  const Icon = categoryIcons[category.url];
  return (
    <div className="container_m category-page">
      <nav className="breadcrumbs" aria-label="مسیر صفحه">
        <Link href="/">خانه</Link><ChevronLeft size={13} aria-hidden="true" />
        <span aria-current="page">{category.title}</span>
      </nav>
      <header className="category-hero" data-category={category.url.slice(1)}>
        <div>
          <span className="eyebrow">یک جعبه‌ابزار، برای هر روز</span>
          <h1>ابزارهای {category.title}</h1>
          <p>{categoryDescriptions[category.url.slice(1)]}</p>
          <div className="category-hero-meta">
            <span>{toPersianDigits(category.item.length)} ابزار کاربردی</span>
            <span>رایگان و بدون ثبت‌نام</span>
          </div>
        </div>
        <div className="category-hero-art" aria-hidden="true"><span /><Icon size={68} strokeWidth={1.1} /></div>
      </header>
      <nav className="category-page-nav" aria-label="دسته‌بندی‌ها">
        <Link href="/#toolsUsage">همهٔ ابزارها</Link>
        {categories.map(item => <Link key={item.url} href={item.url} aria-current={item.url === category.url ? "page" : undefined}>{item.title}</Link>)}
      </nav>
      <ToolDirectory key={category.url} category={category} />
      <div className="category-help"><span>دنبال ابزار دیگری هستی؟</span><Link href="/#toolsUsage" className="text-link">همهٔ ابزارها را ببین<ArrowLeft size={17} aria-hidden="true" /></Link></div>
    </div>
  );
}
