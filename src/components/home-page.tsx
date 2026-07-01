import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { categories, recommendedTools } from "@/lib/tool-data";
import { getCategoryIcon } from "@/lib/category-icons";

export function HomePage() {
  const toolCount = categories.reduce(
    (total, category) => total + category.item.length,
    0
  );

  return (
    <div className="space-y-10">
      <section className="grid gap-4 rounded-md border bg-card p-5 sm:grid-cols-3">
        <div>
          <div className="text-3xl font-bold">{categories.length}</div>
          <div className="text-sm text-muted-foreground">دسته بندی</div>
        </div>
        <div>
          <div className="text-3xl font-bold">{toolCount}</div>
          <div className="text-sm text-muted-foreground">ابزار</div>
        </div>
        <div>
          <div className="text-3xl font-bold">{recommendedTools.length}</div>
          <div className="text-sm text-muted-foreground">پیشنهادی</div>
        </div>
      </section>

      <section id="toolsUsage" className="space-y-4 scroll-mt-24">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-xl font-bold">ابزار های کاربردی</h1>
          <Badge variant="secondary">{toolCount}</Badge>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => {
            const Icon = getCategoryIcon(category.url);

            return (
              <Link key={category.url} href={category.url} className="group">
                <Card className="h-full transition-colors group-hover:bg-accent/50">
                  <CardHeader>
                    <span className="mb-2 flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                      <Icon className="size-5" />
                    </span>
                    <CardTitle>{category.title}</CardTitle>
                    <CardDescription>
                      {category.item.length} ابزار محاسباتی
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="line-clamp-2 text-sm text-muted-foreground">
                      {category.item
                        .slice(0, 3)
                        .map((tool) => tool.title)
                        .join("، ")}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <section id="toolsRecommended" className="space-y-4 scroll-mt-24">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold">ابزار های پیشنهادی</h2>
          <Badge variant="secondary">{recommendedTools.length}</Badge>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {recommendedTools.map((tool) => (
            <a
              key={tool.url}
              href={tool.url}
              target="_blank"
              rel="noreferrer"
              className="group"
            >
              <Card className="h-full transition-colors group-hover:bg-accent/50">
                <CardHeader>
                  <CardTitle className="text-base">{tool.title}</CardTitle>
                  <CardDescription>{tool.info}</CardDescription>
                </CardHeader>
                <CardFooter className="justify-between text-xs text-muted-foreground">
                  <span>باز کردن</span>
                  <ExternalLink className="size-4" />
                </CardFooter>
              </Card>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
