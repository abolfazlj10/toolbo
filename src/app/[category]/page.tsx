import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryPage } from "@/components/category-page";
import { categories, getCategoryBySlug } from "@/lib/tool-data";
import { getCategoryDescription, getCategoryLabel } from "@/lib/site";

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
    return { title: "پیدا نشد" };
  }

  const title = `ابزارهای ${getCategoryLabel(category.url)}`;
  const description = `${getCategoryDescription(category.url)} ${category.item.map((tool) => tool.title.trim()).join("، ")}`;
  return {
    title,
    description,
    alternates: { canonical: category.url },
    openGraph: { title, description, url: category.url },
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
