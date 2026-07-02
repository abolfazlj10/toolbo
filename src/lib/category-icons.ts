import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Binary,
  Calculator,
  CircleEllipsis,
  Coins,
  HeartPulse,
  Ruler,
  TextCursorInput,
  Timer,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  time: Timer,
  fiscal: Coins,
  numbers: Calculator,
  conversions: Ruler,
  health: HeartPulse,
  math: Activity,
  technology: Binary,
  text: TextCursorInput,
  other: CircleEllipsis,
};

export function getCategoryIcon(url: string) {
  const slug = url.replace(/^\//, "");
  return icons[slug] ?? CircleEllipsis;
}
