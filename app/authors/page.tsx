import Link from "next/link";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { createClient } from "@/lib/supabase/server";
import { getAuthors } from "@/lib/data";
import type { ArticleWithRelations } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AuthorsPage() {
  const supabase = await createClient();
  const authors = await getAuthors();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="font-serif text-5xl font-bold">Authors</h1>
        <div className="mt-8 space-y-8">
          {await Promise.all(
            authors.map(async (author) => {
              const { data } = await supabase
                .from("articles")
                .select("*, categories(*), profiles(*)")
                .eq("author_id", author.id)
                .eq("status", "published")
                .order("published_at", { ascending: false })
                .returns<ArticleWithRelations[]>();

              return (
                <section key={author.id} className="border-t border-rule pt-6">
                  <h2 className="font-serif text-3xl font-bold">{author.display_name}</h2>
                  <p className="mt-2 max-w-3xl leading-7 text-muted">{author.bio}</p>
                  <div className="mt-4 space-y-2">
                    {(data ?? []).map((article) => (
                      <Link key={article.id} href={`/articles/${article.slug}`} className="block font-serif text-xl hover:underline">
                        {article.title}
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
