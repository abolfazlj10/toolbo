import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryPage } from "@/components/category-page";
import { categories, getCategoryBySlug } from "@/lib/tool-data";

export function generateStaticParams() {
  return categories.map((category) => ({
    category: category.url.replace(/^\//, ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "تولبو | پیدا نشد",
    };
  }

  return {
    title: `تولبو | ${category.title}`,
    description: category.item.map((tool) => tool.title).join("، "),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return <CategoryPage category={category} />;
}
