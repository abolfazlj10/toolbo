import type { Metadata } from "next";
import { AppProviders } from "@/components/app-providers";
import { SiteShell } from "@/components/site-shell";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "تولبو | ToolBo",
  description: "جعبه ابزار فارسی برای محاسبه ها و تبدیل های روزمره",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={cn("h-full", "font-sans", geist.variable)}>
      <body className="min-h-full bg-background text-foreground antialiased">
        <AppProviders>
          <SiteShell>{children}</SiteShell>
        </AppProviders>
      </body>
    </html>
  );
}
