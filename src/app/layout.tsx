import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { AppProviders } from "@/components/app-providers";
import { SiteShell } from "@/components/site-shell";
import { siteName, siteTagline, siteUrl } from "@/lib/site";
import { allTools } from "@/lib/tool-data";
import { toPersianDigits } from "@/lib/tool-utils";
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

export const viewport: Viewport = { themeColor: "#f7f8f4" };

const description = `${toPersianDigits(allTools.length)} ابزار فارسی و رایگان برای تبدیل تاریخ، محاسبه قسط وام، درصد، تبدیل واحد و کارهای روزمره. سریع و بدون ثبت‌نام.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${siteName} | ${siteTagline}`, template: `%s | ${siteName}` },
  description,
  applicationName: siteName,
  icons: { icon: "/icon.svg", apple: "/icon.png" },
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "fa_IR", siteName, title: `${siteName} | ${siteTagline}`, description, images: ["/ToolBo.png"] },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={`h-full ${vazirmatn.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.getItem("dark")==="true")document.documentElement.classList.add("dark")}catch(e){}` }} />
      </head>
      <body className="min-h-full antialiased">
        <AppProviders>
          <SiteShell>{children}</SiteShell>
        </AppProviders>
      </body>
    </html>
  );
}
