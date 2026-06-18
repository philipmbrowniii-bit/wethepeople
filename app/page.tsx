import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { getFeaturedArticle, getPublishedArticles, getSiteSettings } from "@/lib/data";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

function SectionHeading({ children, href, id }: { children: React.ReactNode; href?: string; id?: string }) {
  return (
    <div className="flex items-end justify-between border-b-2 border-ink pb-2">
      <h2 id={id} className="font-serif text-3xl font-bold">
        {children}
      </h2>
      {href ? (
        <Link href={href} className="pb-1 text-xs font-bold uppercase text-gold-dark hover:underline">
          View section
        </Link>
      ) : null}
    </div>
  );
}

export default async function HomePage() {
  const [featured, articles, settings] = await Promise.all([getFeaturedArticle(), getPublishedArticles(12), getSiteSettings()]);
  const selectedFeatured = articles.find((article) => article.id === settings?.featured_article_id);
  const lead = selectedFeatured ?? featured ?? articles[0];
  const remaining = articles.filter((article) => article.id !== lead?.id);
  const latest = remaining.slice(0, 4);
  const opinion = articles.filter((article) => article.op_ed_label.includes("Opinion")).slice(0, 3);
  const mostRead = [lead, ...remaining].filter(Boolean).slice(0, 5);
  const sectionConfig = [...(settings?.homepage_sections ?? [])].sort((a, b) => a.position - b.position);
  const sectionMap = {
    latest: (
      <section key="latest" aria-labelledby="latest-news">
        <SectionHeading id="latest-news">{sectionConfig.find((item) => item.key === "latest")?.title ?? "Latest News"}</SectionHeading>
        <div className="grid gap-x-7 gap-y-8 pt-5 sm:grid-cols-2">
          {latest.length ? latest.map((article) => <ArticleCard key={article.id} article={article} />) : <p className="text-muted">More reporting and analysis is coming soon.</p>}
        </div>
      </section>
    ),
    opinion: (
      <section key="opinion" aria-labelledby="opinion-editorial">
        <SectionHeading id="opinion-editorial">{sectionConfig.find((item) => item.key === "opinion")?.title ?? "Opinion & Editorial"}</SectionHeading>
        <div className="grid gap-6 pt-5 md:grid-cols-3">
          {opinion.map((article) => <ArticleCard key={article.id} article={article} compact showExcerpt={false} />)}
        </div>
      </section>
    ),
    most_read: (
      <section key="most_read" aria-labelledby="most-read">
        <SectionHeading id="most-read">{sectionConfig.find((item) => item.key === "most_read")?.title ?? "Most Read"}</SectionHeading>
        <ol className="grid gap-x-8 pt-3 md:grid-cols-2">
          {mostRead.map((article, index) =>
            article ? (
              <li key={article.id} className="grid grid-cols-[32px_1fr] gap-3 border-b border-rule py-5">
                <span className="font-serif text-2xl text-gold-dark">{index + 1}</span>
                <div>
                  <Link href={`/articles/${article.slug}`} className="font-serif text-xl font-bold leading-tight hover:text-gold-dark">
                    {article.title}
                  </Link>
                  <p className="mt-2 text-xs uppercase text-muted">
                    {article.categories?.name} · {formatDate(article.published_at)}
                  </p>
                </div>
              </li>
            ) : null
          )}
        </ol>
      </section>
    )
  };

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
        <section aria-labelledby="featured-story" className="border-b-2 border-ink pb-10">
          <SectionHeading id="featured-story">Featured Story</SectionHeading>
          <div className="grid gap-8 pt-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,.75fr)]">
            <div>{lead ? <ArticleCard article={lead} priority /> : <p>No published stories yet.</p>}</div>
            <aside className="border-t border-rule pt-4 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
              <p className="text-xs font-bold uppercase text-gold-dark">The Ledger Briefing</p>
              <h2 id="featured-story" className="mt-3 font-serif text-3xl font-bold leading-tight">
                {settings?.hero_headline ?? "Journalism built for public life"}
              </h2>
              <p className="mt-4 leading-7 text-muted">
                The People&apos;s Ledger examines the institutions, policies, and civic choices shaping American
                communities. We publish reporting, analysis, and clearly labeled opinion without placing core journalism
                behind a paywall.
              </p>
              <Link href="/about" className="mt-5 inline-block border-b border-gold pb-1 text-sm font-bold text-gold-dark">
                Read about our mission
              </Link>
            </aside>
          </div>
        </section>

        <div className="space-y-12 py-10">
          {sectionConfig
            .filter((item) => item.enabled)
            .map((item) => sectionMap[item.key as keyof typeof sectionMap])}
        </div>
      </main>
      <Footer />
    </>
  );
}
