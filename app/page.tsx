import { ArticleCard } from "@/components/article-card";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { getCategories, getFeaturedArticle, getPublishedArticles } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featured, articles, categories] = await Promise.all([
    getFeaturedArticle(),
    getPublishedArticles(8),
    getCategories()
  ]);
  const lead = featured ?? articles[0];
  const remaining = articles.filter((article) => article.id !== lead?.id);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <section className="grid gap-8 border-b border-rule pb-8 lg:grid-cols-[1.5fr_1fr]">
          <div>{lead ? <ArticleCard article={lead} priority /> : <p>No published articles yet.</p>}</div>
          <aside className="space-y-5 border-t border-rule pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <h2 className="font-serif text-3xl font-bold">Featured Columns</h2>
            {remaining.slice(0, 3).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </aside>
        </section>

        <section className="grid gap-8 py-8 lg:grid-cols-[1fr_280px]">
          <div>
            <h2 className="border-b border-ink pb-2 font-serif text-3xl font-bold">Latest Op-Eds</h2>
            <div className="grid gap-6 pt-4 sm:grid-cols-2">
              {remaining.slice(3).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
          <aside>
            <h2 className="border-b border-ink pb-2 font-serif text-3xl font-bold">Sections</h2>
            <div className="divide-y divide-rule">
              {categories.map((category) => (
                <a key={category.id} href={`/categories/${category.slug}`} className="block py-3 font-serif text-xl hover:underline">
                  {category.name}
                </a>
              ))}
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}
