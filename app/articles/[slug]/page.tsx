import { notFound } from "next/navigation";
import { CommentForm } from "@/components/comment-form";
import { Footer } from "@/components/footer";
import { MarkdownBody } from "@/components/markdown-body";
import { SiteHeader } from "@/components/site-header";
import { formatDate } from "@/lib/format";
import { getApprovedComments, getArticleBySlug } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const comments = await getApprovedComments(article.id);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <article className="mx-auto max-w-4xl">
          <header className="border-b-2 border-ink pb-7">
            <div className="flex flex-wrap gap-3 text-xs font-bold uppercase">
              <span className="text-gold-dark">{article.op_ed_label}</span>
              <span className="text-muted">{article.categories?.name}</span>
            </div>
            <h1 className="mt-4 font-serif text-5xl font-bold leading-[1.04] sm:text-7xl">{article.title}</h1>
            {article.subtitle ? <p className="mt-5 font-serif text-2xl leading-9 text-muted sm:text-3xl">{article.subtitle}</p> : null}
          </header>

          <div className="grid gap-8 py-7 md:grid-cols-[180px_minmax(0,1fr)]">
            <aside className="text-sm text-muted">
              <p className="font-bold text-ink">By {article.profiles?.display_name ?? "The Ledger Staff"}</p>
              <p className="mt-2">{formatDate(article.published_at)}</p>
              <p className="mt-1">{article.reading_time} min read</p>
            </aside>
            <div>
              <MarkdownBody body={article.body} />
            </div>
          </div>
        </article>

        <section className="mx-auto mt-8 grid max-w-4xl gap-4 border-y border-rule py-6 sm:grid-cols-[180px_1fr]">
          <h2 className="text-xs font-bold uppercase text-gold-dark">About the author</h2>
          <div>
            <p className="font-serif text-2xl font-bold">{article.profiles?.display_name ?? "The Ledger Staff"}</p>
            <p className="mt-2 leading-7 text-muted">{article.profiles?.bio ?? "Author bio coming soon."}</p>
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-4xl">
          <div className="border-b-2 border-ink pb-2">
            <h2 className="font-serif text-3xl font-bold">Reader Discussion</h2>
          </div>
          <p className="mt-4 text-sm leading-6 text-muted">
            Comments are moderated for relevance, civility, and good-faith participation before publication.
          </p>
          <div className="mt-6 space-y-5">
            {comments.length ? (
              comments.map((comment) => (
                <div key={comment.id} className="border-t border-rule pt-5">
                  <p className="font-bold">{comment.name}</p>
                  <p className="mt-2 leading-7 text-muted">{comment.message}</p>
                </div>
              ))
            ) : (
              <p className="text-muted">No approved comments yet.</p>
            )}
          </div>
          <div className="mt-8">
            <CommentForm articleId={article.id} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
