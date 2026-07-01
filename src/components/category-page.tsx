import { ToolCard } from "@/components/tool-card";
import type { Category } from "@/lib/tool-data";

export function CategoryPage({ category }: { category: Category }) {
  return (
    <div className="container_m">
      <div className="c_secondPage">
        {category.item.map((tool) => (
          <ToolCard key={tool.url} tool={tool} />
        ))}
      </div>
    </div>
  );
}
