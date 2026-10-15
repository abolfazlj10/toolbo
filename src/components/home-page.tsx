import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { HomeTools } from "@/components/home-tools";
import { categories } from "@/lib/tool-data";
import { getCategoryIcon } from "@/lib/category-icons";

const categoryLabels: Record<string, string> = {
  "/time": "تاریخ و زمان",
  "/fiscal": "پول و وام",
  "/numbers": "درصد و اعداد",
  "/conversions": "تبدیل واحدها",
  "/health": "سلامت",
  "/math": "ریاضی",
  "/technology": "فناوری",
  "/text": "متن",
  "/other": "سایر ابزارها",
};

export function HomePage() {
  return (
    <div className="home-page">
      <div className="container_m home-container">
        <HomeTools />

        <nav className="home-categories" id="categories" aria-label="دسته‌بندی ابزارها">
          <h2>دسته‌بندی ابزارها</h2>
          <div className="home-category-grid">
            {categories.map(category => {
              const Icon = getCategoryIcon(category.url);
              return <Link href={category.url} key={category.url} className="home-category">
                <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
                <span>{categoryLabels[category.url] ?? category.title}</span>
              </Link>;
            })}
          </div>
        </nav>

        <details className="home-all-tools" id="all-tools">
          <summary>فهرست کامل ابزارها <ChevronDown size={17} aria-hidden="true" /></summary>
          <div className="home-all-grid">
            {categories.map(category => (
              <section key={category.url} aria-labelledby={`home-category-${category.url.slice(1)}`}>
                <h3 id={`home-category-${category.url.slice(1)}`}>{categoryLabels[category.url] ?? category.title}</h3>
                <ul>{category.item.map(tool => (
                  <li key={tool.url}><Link href={tool.url}>{tool.title}</Link></li>
                ))}</ul>
              </section>
            ))}
          </div>
        </details>
      </div>
    </div>
  );
}
