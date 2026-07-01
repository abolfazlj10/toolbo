import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolRunner } from "@/components/tool-runner";
import { allTools, getToolByPath } from "@/lib/tool-data";

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
    return {
      title: "تولبو | پیدا نشد",
    };
  }

  return {
    title: `تولبو | ${item.title}`,
    description: item.sub,
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

  return <ToolRunner tool={item} />;
}
