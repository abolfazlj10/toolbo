import { allTools, categories, recommendedTools, type ToolWithCategory } from "@/lib/tool-data";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://toolbo.ir").replace(/\/$/, "");
export const siteName = "تولبو";
export const siteTagline = "ابزارهای کوچک، زمان بیشتر";
export const creatorUrl = "https://abolfazljamshidi.ir/";

type CategoryMeta = { label: string; description: string; popular: string[] };

export const categoryMeta: Record<string, CategoryMeta> = {
  "/time": {
    label: "تاریخ و زمان",
    description: "تبدیل تاریخ، تقویم، محاسبه سن، تایمر و اوقات شرعی.",
    popular: ["/time/convertor", "/time/cleander", "/time/mathAge", "/time/religious"],
  },
  "/fiscal": {
    label: "مالی و بانکی",
    description: "قسط وام، سود سپرده، تبدیل ریال و تومان و شماره کارت.",
    popular: ["/fiscal/loanInterest", "/fiscal/Interest", "/fiscal/exchangeRial"],
  },
  "/numbers": {
    label: "درصد و اعداد",
    description: "درصد، افزایش و کاهش، عدد به حروف و عدد تصادفی.",
    popular: ["/numbers/percent", "/numbers/increasePercent", "/numbers/changePercent"],
  },
  "/conversions": {
    label: "تبدیل واحد",
    description: "طول، وزن، دما، مساحت، حجم، سرعت و ده‌ها واحد دیگر.",
    popular: ["/conversions/convert-length", "/conversions/convert-weight", "/conversions/convert-temperature"],
  },
  "/health": {
    label: "سلامت",
    description: "شاخص توده بدنی و اعدادی برای شناخت بهتر بدن.",
    popular: [],
  },
  "/math": {
    label: "ریاضی",
    description: "مساحت، محیط، میانگین، توان و محاسبات ریاضی.",
    popular: [],
  },
  "/technology": {
    label: "فناوری",
    description: "رمز عبور، آی‌پی من، تایم‌استمپ و کد باینری.",
    popular: ["/technology/password-random", "/technology/MyIP"],
  },
  "/text": {
    label: "متن",
    description: "شمارش کلمات، تبدیل اعداد متن و متن ساختگی.",
    popular: ["/text/counter-word"],
  },
  "/other": {
    label: "سایر ابزارها",
    description: "کد ملی و ابزارهای کوچک برای نیازهای متفاوت.",
    popular: [],
  },
};

export function getCategoryLabel(url: string) {
  return categoryMeta[url]?.label ?? categories.find((category) => category.url === url)?.title ?? "";
}

export function getCategoryDescription(url: string) {
  return categoryMeta[url]?.description ?? "";
}

export const popularPaths = [
  "/time/convertor",
  "/fiscal/loanInterest",
  "/numbers/percent",
  "/time/mathAge",
  "/conversions/convert-length",
  "/time/cleander",
  "/text/counter-word",
  "/technology/password-random",
];

export function toolsByPaths(paths: string[]) {
  return paths.flatMap((path) => allTools.find((tool) => tool.url === path) ?? []);
}

export const popularTools = toolsByPaths(popularPaths);

/** Category tools, with the editor's picks first. */
export function getCategoryPreview(url: string, limit = 4): ToolWithCategory[] {
  const picks = toolsByPaths(categoryMeta[url]?.popular ?? []);
  const rest = allTools.filter((tool) => tool.categoryUrl === url && !picks.includes(tool));
  return [...picks, ...rest].slice(0, limit);
}

export const recommendedProjects = recommendedTools;
