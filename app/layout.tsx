import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "The People's Ledger",
    template: "%s | The People's Ledger"
  },
  description: "Independent civic journalism and opinion. News for Citizens, Not Consumers.",
  openGraph: {
    title: "The People's Ledger",
    description: "Independent civic journalism and opinion. News for Citizens, Not Consumers.",
    type: "website"
  }
};

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
