import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { createClient } from "@/lib/supabase/server";
import { getAuthors } from "@/lib/data";
import type { ArticleWithRelations } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Staff",
  description: "Meet the editors and contributors of The People's Ledger."
};

export default async function AuthorsPage() {
  const supabase = await createClient();
  const authors = await getAuthors();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
        <header className="border-b-2 border-ink pb-7">
          <p className="text-xs font-bold uppercase text-gold-dark">The newsroom</p>
          <h1 className="mt-3 font-serif text-5xl font-bold sm:text-6xl">Editors &amp; Contributors</h1>
        </header>
        <div className="divide-y divide-rule">
          {await Promise.all(
            authors.map(async (author) => {
              const { data } = await supabase
                .from("articles")
                .select("*, categories(*), profiles(*)")
                .eq("author_id", author.id)
                .eq("status", "published")
                .order("published_at", { ascending: false })
                .returns<ArticleWithRelations[]>();
              const title = author.display_name === "Philip Brown" ? "Co-Founder & Editor" : "Editorial Contributor";

              return (
                <section key={author.id} className="grid gap-6 py-9 md:grid-cols-[220px_1fr]">
                  <div>
                    <div className="flex aspect-square max-w-[180px] items-center justify-center border border-rule bg-white font-serif text-5xl text-gold-dark">
                      {author.display_name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <p className="mt-4 text-xs font-bold uppercase text-gold-dark">{title}</p>
                  </div>
                  <div>
                    <h2 className="font-serif text-4xl font-bold">{author.display_name}</h2>
                    <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">{author.bio}</p>
                    {(data ?? []).length ? (
                      <div className="mt-7">
                        <h3 className="border-b border-ink pb-2 text-xs font-bold uppercase">Recent work</h3>
                        <div className="divide-y divide-rule">
                          {(data ?? []).map((article) => (
                            <Link
                              key={article.id}
                              href={`/articles/${article.slug}`}
                              className="block py-3 font-serif text-xl font-bold hover:text-gold-dark"
                            >
                              {article.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : null}
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
