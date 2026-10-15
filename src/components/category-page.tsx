import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ToolDirectory } from "@/components/tool-directory";
import { categories, type Category } from "@/lib/tool-data";

export function CategoryPage({ category }: { category: Category }) {
  return (
    <div className="container_m category-page">
      <nav className="breadcrumbs" aria-label="مسیر صفحه">
        <Link href="/">خانه</Link><ChevronLeft size={13} aria-hidden="true" />
        <span aria-current="page">{category.title}</span>
      </nav>
      <header className="category-heading">
        <h1>{category.title}</h1>
      </header>
      <nav className="category-page-nav" aria-label="دسته‌بندی‌ها">
        <Link href="/#all-tools">همهٔ ابزارها</Link>
        {categories.map(item => <Link key={item.url} href={item.url} aria-current={item.url === category.url ? "page" : undefined}>{item.title}</Link>)}
      </nav>
      <ToolDirectory key={category.url} category={category} />
    </div>
  );
}
