import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolRunner } from "@/components/tool-runner";
import { allTools, getToolByPath } from "@/lib/tool-data";
import { getCategoryLabel, siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return allTools.map((tool) => {
    const [category, item] = tool.url.split("/").filter(Boolean);
    return { category, tool: item };
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; tool: string }>;
}): Promise<Metadata> {
  const { category, tool } = await params;
  const item = getToolByPath(category, tool);

  if (!item) {
    return { title: "پیدا نشد" };
  }

  const title = `${item.title.trim()} آنلاین`;
  const description = `${item.title.trim()} آنلاین و رایگان؛ ${item.sub}. سریع، دقیق و بدون ثبت‌نام در تولبو.`;
  return {
    title,
    description,
    alternates: { canonical: item.url },
    openGraph: { title, description, url: item.url },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string; tool: string }>;
}) {
  const { category, tool } = await params;
  const item = getToolByPath(category, tool);

  if (!item) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: item.title.trim(),
        description: item.sub,
        url: `${siteUrl}${item.url}`,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        inLanguage: "fa",
        offers: { "@type": "Offer", price: "0", priceCurrency: "IRR" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "خانه", item: siteUrl },
          { "@type": "ListItem", position: 2, name: getCategoryLabel(item.categoryUrl), item: `${siteUrl}${item.categoryUrl}` },
          { "@type": "ListItem", position: 3, name: item.title.trim(), item: `${siteUrl}${item.url}` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ToolRunner tool={item} />
    </>
  );
}
