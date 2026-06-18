import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getSiteSettings } from "@/lib/data";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteName = settings?.site_name ?? "The People's Ledger";
  const tagline = settings?.tagline ?? "News for Citizens, Not Consumers.";
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    title: { default: siteName, template: `%s | ${siteName}` },
    description: tagline,
    icons: settings?.favicon_url ? { icon: settings.favicon_url } : undefined,
    openGraph: { title: siteName, description: tagline, type: "website" }
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
