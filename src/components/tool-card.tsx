"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFavorites } from "@/components/favorites-provider";
import type { ToolItem } from "@/lib/tool-data";
import { cn } from "@/lib/utils";

export function ToolCard({ tool }: { tool: ToolItem }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(tool.url);

  return (
    <Card className="relative h-full transition-colors hover:bg-accent/50">
      <CardHeader>
        <CardTitle className="text-base">{tool.title}</CardTitle>
        <CardDescription>{tool.sub}</CardDescription>
        <CardAction>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={active ? "حذف از مورد علاقه" : "افزودن به مورد علاقه"}
            onClick={() => toggleFavorite(tool)}
          >
            <Star
              className={cn(
                active && "fill-primary text-primary"
              )}
            />
          </Button>
        </CardAction>
      </CardHeader>
      <CardFooter>
        <Button asChild variant="ghost" className="w-full justify-center">
          <Link href={tool.url}>باز کردن</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
