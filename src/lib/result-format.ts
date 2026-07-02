export type ResultLine = {
  label: string;
  value: string;
};

export type ToolResult = ResultLine[] | string | null;

export function resultToText(result: ToolResult) {
  if (!result) {
    return "";
  }

  if (typeof result === "string") {
    return result;
  }

  return result.map((line) => `${line.label}: ${line.value}`).join("\n");
}

export function slugifyFilename(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
