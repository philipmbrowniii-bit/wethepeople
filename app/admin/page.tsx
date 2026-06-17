import Link from "next/link";
import { deleteArticle } from "@/lib/actions";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatDate } from "@/lib/format";
import type { ArticleWithRelations } from "@/lib/types";

export default async function AdminPage() {
  const admin = createAdminClient();
  const { data: articles } = await admin
    .from("articles")
    .select("*, categories(*), profiles(*)")
    .order("updated_at", { ascending: false })
    .returns<ArticleWithRelations[]>();

  return (
    <section>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-serif text-4xl font-bold">Articles</h1>
        <Link href="/admin/articles/new" className="border border-ink px-4 py-2 text-sm uppercase tracking-wide">
          New article
        </Link>
      </div>
      <div className="mt-6 divide-y divide-rule border-y border-rule">
        {(articles ?? []).map((article) => (
          <div key={article.id} className="grid gap-4 py-4 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted">
                {article.status} · {article.categories?.name} · {formatDate(article.published_at)}
              </p>
              <h2 className="font-serif text-2xl font-bold">{article.title}</h2>
              <p className="text-sm text-muted">By {article.profiles?.display_name}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/articles/${article.id}`} className="border border-ink px-3 py-2 text-sm uppercase tracking-wide">
                Edit
              </Link>
              <form action={deleteArticle}>
                <input type="hidden" name="id" value={article.id} />
                <button className="border border-red-900 px-3 py-2 text-sm uppercase tracking-wide text-red-900">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
