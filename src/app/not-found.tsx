import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { NotFoundSearchButton } from "@/components/not-found-search";

export default function NotFound() {
  return (
    <div className="not-found">
      <span className="not-found-code" aria-hidden="true" dir="ltr">404<span className="brand-period">.</span></span>
      <h1>این صفحه پیدا نشد</h1>
      <p>شاید آدرس تغییر کرده باشد. ابزار مورد نظرت را جستجو کن یا از صفحه اصلی شروع کن.</p>
      <div className="not-found-actions">
        <NotFoundSearchButton />
        <Link href="/">صفحه اصلی<ArrowLeft size={18} aria-hidden="true" /></Link>
      </div>
    </div>
  );
}
