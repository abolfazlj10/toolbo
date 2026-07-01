import { Badge } from "@/components/ui/badge";
import { ToolCard } from "@/components/tool-card";
import type { Category } from "@/lib/tool-data";

export function CategoryPage({ category }: { category: Category }) {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2 rounded-md border bg-card p-5">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-bold">{category.title}</h1>
          <Badge variant="secondary">{category.item.length} ابزار</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {category.item.map((tool) => tool.title).join("، ")}
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {category.item.map((tool) => (
          <ToolCard key={tool.url} tool={tool} />
        ))}
      </div>
    </div>
  );
}
