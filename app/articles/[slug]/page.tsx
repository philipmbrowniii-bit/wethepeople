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
      <main className="mx-auto max-w-3xl px-4 py-10">
        <article>
          <p className="text-sm font-bold uppercase tracking-wide text-muted">{article.op_ed_label}</p>
          <h1 className="mt-3 font-serif text-5xl font-bold leading-tight">{article.title}</h1>
          {article.subtitle ? <p className="mt-4 font-serif text-2xl text-muted">{article.subtitle}</p> : null}
          <div className="mt-5 border-y border-rule py-3 text-sm text-muted">
            By {article.profiles?.display_name ?? "Editorial Staff"} · {formatDate(article.published_at)} ·{" "}
            {article.categories?.name} · {article.reading_time} min read
          </div>
          <div className="mt-8">
            <MarkdownBody body={article.body} />
          </div>
        </article>

        <section className="mt-10 border-y border-rule py-6">
          <h2 className="font-serif text-2xl font-bold">About the author</h2>
          <p className="mt-2 text-muted">{article.profiles?.bio ?? "Author bio coming soon."}</p>
        </section>

        <section className="mt-10 space-y-6">
          <h2 className="font-serif text-3xl font-bold">Comments</h2>
          <div className="space-y-4">
            {comments.length ? (
              comments.map((comment) => (
                <div key={comment.id} className="border-t border-rule pt-4">
                  <p className="font-bold">{comment.name}</p>
                  <p className="mt-2 leading-7 text-muted">{comment.message}</p>
                </div>
              ))
            ) : (
              <p className="text-muted">No approved comments yet.</p>
            )}
          </div>
          <CommentForm articleId={article.id} />
        </section>
      </main>
      <Footer />
    </>
  );
}
