import rawData from "@/data/db.json";
import { normalizeSearchText } from "@/lib/search-utils";
import { getToolMetadata } from "@/lib/tool-metadata";

export type ToolItem = {
  title: string;
  sub: string;
  url: string;
};

export type Category = {
  title: string;
  icon: string;
  url: string;
  item: ToolItem[];
};

export type RecommendedItem = {
  title: string;
  icon: string;
  url: string;
  info: string;
};

type ToolDatabase = {
  dataBox: Category[];
  recomendend: RecommendedItem[];
};

const database = rawData as ToolDatabase;

export const categories = database.dataBox;
export const recommendedTools = database.recomendend;

export const allTools = categories.flatMap((category) =>
  category.item.map((tool) => ({
    ...tool,
    categoryTitle: category.title,
    categoryUrl: category.url,
    categorySlug: category.url.replace(/^\//, ""),
    slug: tool.url.split("/").filter(Boolean).at(-1) ?? "",
  }))
);

export type ToolWithCategory = (typeof allTools)[number];

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.url === `/${slug}`);
}

export function getToolByPath(category: string, tool: string) {
  return allTools.find((item) => item.url === `/${category}/${tool}`);
}

export function getSearchResults(query: string) {
  const term = normalizeSearchText(query);

  if (term.length < 2) {
    return {
      categories: [],
      tools: [],
      recommended: [],
    };
  }

  const rankedTools = allTools
    .map((tool) => {
      const metadata = getToolMetadata(tool.url);
      const normalizedTitle = normalizeSearchText(tool.title);
      const normalizedSub = normalizeSearchText(tool.sub);
      const normalizedCategory = normalizeSearchText(tool.categoryTitle);
      const aliases = metadata?.aliases?.map(normalizeSearchText) ?? [];
      const keywords = metadata?.keywords?.map(normalizeSearchText) ?? [];
      let score = 0;

      if (normalizedTitle === term) score = Math.max(score, 1000);
      if (normalizedTitle.startsWith(term)) score = Math.max(score, 900);
      if (normalizedTitle.includes(term)) score = Math.max(score, 800);
      if (aliases.some((alias) => alias === term)) score = Math.max(score, 750);
      if (aliases.some((alias) => alias.startsWith(term))) score = Math.max(score, 700);
      if (aliases.some((alias) => alias.includes(term))) score = Math.max(score, 650);
      if (normalizedCategory.includes(term)) score = Math.max(score, 500);
      if (normalizedSub.includes(term)) score = Math.max(score, 450);
      if (keywords.some((keyword) => keyword.includes(term))) score = Math.max(score, 400);

      return {
        tool,
        score: score > 0 ? score + (metadata?.priority ?? 0) : 0,
      };
    })
    .filter((item) => item.score > 0)
    .sort((first, second) => second.score - first.score)
    .map((item) => item.tool);

  return {
    categories: categories.filter((category) =>
      normalizeSearchText(category.title).includes(term)
    ),
    tools: rankedTools,
    recommended: recommendedTools.filter(
      (tool) =>
        normalizeSearchText(tool.title).includes(term) ||
        normalizeSearchText(tool.info).includes(term)
    ),
  };
}
