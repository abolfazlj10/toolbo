import type { MetadataRoute } from "next";
import { allTools, categories } from "@/lib/tool-data";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    ...categories.map((category) => ({ url: `${siteUrl}${category.url}`, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...allTools.map((tool) => ({ url: `${siteUrl}${tool.url}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
