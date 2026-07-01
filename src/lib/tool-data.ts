import rawData from "@/data/db.json";

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
  const term = query.trim();

  if (term.length < 2) {
    return {
      categories: [],
      tools: [],
      recommended: [],
    };
  }

  return {
    categories: categories.filter((category) => category.title.includes(term)),
    tools: allTools.filter(
      (tool) => tool.title.includes(term) || tool.sub.includes(term)
    ),
    recommended: recommendedTools.filter((tool) => tool.title.includes(term)),
  };
}
