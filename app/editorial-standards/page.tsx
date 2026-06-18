import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { MarkdownBody } from "@/components/markdown-body";
import { SiteHeader } from "@/components/site-header";
import { getSiteSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Editorial Standards",
  description: "The editorial principles guiding The People's Ledger."
};

export const dynamic = "force-dynamic";

export default async function EditorialStandardsPage() {
  const settings = await getSiteSettings();
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
        <header className="border-b-2 border-ink pb-7">
          <p className="text-xs font-bold uppercase text-gold-dark">How we work</p>
          <h1 className="mt-3 font-serif text-5xl font-bold sm:text-6xl">Editorial Standards</h1>
          <p className="mt-4 max-w-3xl font-serif text-2xl leading-9 text-muted">
            Trust is earned through discipline, clarity, and accountability to the public record.
          </p>
        </header>
        <div className="py-8">
          <MarkdownBody body={settings?.editorial_standards ?? ""} />
        </div>
      </main>
      <Footer />
    </>
  );
}
