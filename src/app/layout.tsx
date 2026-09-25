import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { AppProviders } from "@/components/app-providers";
import { SiteShell } from "@/components/site-shell";
import "./globals.css";

const vazirmatn = localFont({
  src: [
    { path: "../assets/Vazirmatn-Regular.ttf", weight: "400", style: "normal" },
    { path: "../assets/Vazirmatn-Medium.ttf", weight: "500", style: "normal" },
    { path: "../assets/Vazirmatn-Bold.ttf", weight: "700", style: "normal" },
    { path: "../assets/Vazirmatn-Black.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const viewport: Viewport = { themeColor: "#f8f9f5" };

export const metadata: Metadata = {
  title: "تولبو | ابزارهای کوچک، زمان بیشتر",
  description: "۷۰ ابزار فارسی و رایگان برای محاسبه، تبدیل واحد، زمان و کارهای روزمره. ساده، سریع و بدون ثبت‌نام.",
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={`h-full ${vazirmatn.variable}`}>
      <body className="min-h-full antialiased">
        <AppProviders>
          <SiteShell>{children}</SiteShell>
        </AppProviders>
      </body>
    </html>
  );
}
