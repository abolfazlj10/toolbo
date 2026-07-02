import { toEnglishDigits } from "@/lib/tool-utils";

const persianVariantMap: Record<string, string> = {
  ي: "ی",
  ى: "ی",
  ك: "ک",
  ة: "ه",
 ۀ: "ه",
 ؤ: "و",
 إ: "ا",
 أ: "ا",
  آ: "ا",
};

export function normalizeSearchText(value: string) {
  return toEnglishDigits(value)
    .replace(/[يىكۀةؤإأآ]/g, (char) => persianVariantMap[char] ?? char)
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function includesSearchTerm(value: string, term: string) {
  return normalizeSearchText(value).includes(term);
}
