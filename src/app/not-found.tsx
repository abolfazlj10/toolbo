import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="not-found">
      <span className="not-found-code" aria-hidden="true" dir="ltr">404<span className="brand-period">.</span></span>
      <h1>این مسیر به جایی نمی‌رسد.</h1>
      <p>اما ابزار بعدی‌ات همین نزدیکی است. از صفحهٔ اصلی شروع کن.</p>
      <Link href="/">برگردیم به خانه<ArrowLeft size={18} /></Link>
    </div>
  );
}
