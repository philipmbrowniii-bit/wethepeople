import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Editorial Standards",
  description: "The editorial principles guiding The People's Ledger."
};

const standards = [
  {
    title: "Independence",
    body: "Editorial decisions are made in service of readers and the public interest. Coverage, analysis, and conclusions are not dictated by advertisers, political parties, public officials, or outside institutions."
  },
  {
    title: "Fact-based reporting",
    body: "Reporting should rely on verifiable information, primary documents, direct observation, and clearly attributed sources. Material uncertainty is stated plainly, and factual errors are corrected transparently."
  },
  {
    title: "Clearly labeled opinion",
    body: "Opinion, commentary, and editorial analysis are labeled so readers can distinguish argument from straight reporting. Opinion writers remain responsible for factual accuracy and honest representation of opposing views."
  },
  {
    title: "Commitment to transparency",
    body: "We explain relevant sourcing, disclose meaningful conflicts, link to public records when practical, and tell readers what is known, what is inferred, and what remains unresolved."
  }
];

export default function EditorialStandardsPage() {
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
        <div className="divide-y divide-rule">
          {standards.map((standard, index) => (
            <section key={standard.title} className="grid gap-4 py-8 sm:grid-cols-[70px_1fr]">
              <span className="font-serif text-3xl text-gold-dark">0{index + 1}</span>
              <div>
                <h2 className="font-serif text-3xl font-bold">{standard.title}</h2>
                <p className="mt-3 text-lg leading-8 text-muted">{standard.body}</p>
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
