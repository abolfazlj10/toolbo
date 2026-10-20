import { createElement } from "react";
import type { LucideProps } from "lucide-react";
import { getCategoryIcon } from "@/lib/category-icons";
import { getToolIcon } from "@/lib/tool-icons";

export function ToolIcon({ url, ...props }: LucideProps & { url: string }) {
  return createElement(getToolIcon(url), { "aria-hidden": true, ...props });
}

export function CategoryIcon({ url, ...props }: LucideProps & { url: string }) {
  return createElement(getCategoryIcon(url), { "aria-hidden": true, ...props });
}
