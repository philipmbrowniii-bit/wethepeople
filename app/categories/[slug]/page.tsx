import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { getArticlesByCategory } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { category, articles } = await getArticlesByCategory(slug);
  if (!category) notFound();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <header className="border-b-2 border-ink pb-7">
          <p className="text-xs font-bold uppercase text-gold-dark">Section</p>
          <h1 className="mt-3 font-serif text-5xl font-bold sm:text-6xl">{category.name}</h1>
          <p className="mt-3 max-w-2xl text-lg leading-7 text-muted">{category.description}</p>
        </header>
        <div className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
