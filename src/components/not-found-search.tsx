"use client";

import { Search } from "lucide-react";
import { openToolSearch } from "@/components/site-shell";

export function NotFoundSearchButton() {
  return (
    <button type="button" onClick={openToolSearch}>
      <Search size={18} aria-hidden="true" />
      جستجوی ابزار
    </button>
  );
}
