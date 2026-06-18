import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "About",
  description: "Why The People's Ledger exists and how it serves readers."
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
        <header className="border-b-2 border-ink pb-8">
          <p className="text-xs font-bold uppercase text-gold-dark">About the publication</p>
          <h1 className="mt-3 max-w-4xl font-serif text-5xl font-bold leading-tight sm:text-6xl">
            Journalism should help citizens understand power, not merely consume information.
          </h1>
        </header>

        <div className="grid gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="space-y-6 text-lg leading-8">
            <p className="font-serif text-2xl leading-9">
              The People&apos;s Ledger exists to make consequential public issues clearer, more accessible, and harder
              to ignore.
            </p>
            <p>
              We publish independent civic journalism, analysis, and opinion focused on transparency, accountability,
              governance, institutional effectiveness, and the decisions shaping American communities.
            </p>
            <p>
              Our mission is to share real news with the context citizens need to evaluate it. That means following the
              public record, explaining how institutions work, identifying where accountability breaks down, and
              separating verified facts from interpretation.
            </p>
            <p>
              A healthy public square requires disagreement conducted in good faith. The Ledger is committed to
              publishing diverse viewpoints and arguments that are grounded in evidence, clearly reasoned, and useful to
              readers across political and social lines.
            </p>
            <p>
              Core journalism is free to read. We do not believe essential reporting about public life should disappear
              behind a paywall.
            </p>
          </div>

          <aside className="border-t-2 border-ink pt-4 lg:border-l lg:border-t-0 lg:pl-6">
            <h2 className="font-serif text-2xl font-bold">Our commitments</h2>
            <ul className="mt-4 divide-y divide-rule border-y border-rule text-sm">
              <li className="py-3">Independent judgment</li>
              <li className="py-3">Fact-based reporting</li>
              <li className="py-3">Clearly labeled opinion</li>
              <li className="py-3">Transparent corrections</li>
              <li className="py-3">Free access to core journalism</li>
            </ul>
            <Link href="/editorial-standards" className="mt-5 inline-block text-sm font-bold text-gold-dark hover:underline">
              Read our editorial standards
            </Link>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
