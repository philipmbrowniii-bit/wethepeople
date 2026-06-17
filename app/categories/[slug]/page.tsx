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
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="font-serif text-5xl font-bold">{category.name}</h1>
        <p className="mt-3 max-w-2xl text-muted">{category.description}</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
