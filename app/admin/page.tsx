import Link from "next/link";
import { archiveArticle, deleteArticle } from "@/lib/actions";
import { requireWriter } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatDate } from "@/lib/format";
import { AdminPageHeader } from "@/components/admin-page-header";
import { AdminSaveNotice } from "@/components/admin-save-notice";
import type { ArticleWithRelations } from "@/lib/types";

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const params = await searchParams;
  const profile = await requireWriter();
  const admin = createAdminClient();
  const [{ data: articles }, { count: pendingComments }] = await Promise.all([
    admin
      .from("articles")
      .select("*, categories(*), profiles(*)")
      .order("updated_at", { ascending: false })
      .returns<ArticleWithRelations[]>(),
    profile.role === "admin"
      ? admin.from("comments").select("*", { count: "exact", head: true }).eq("status", "pending")
      : Promise.resolve({ count: null })
  ]);
  const allArticles = articles ?? [];
  const publishedCount = allArticles.filter((article) => article.status === "published" && !article.archived_at).length;
  const draftCount = allArticles.filter((article) => article.status === "draft" && !article.archived_at).length;
  const archivedCount = allArticles.filter((article) => Boolean(article.archived_at)).length;

  return (
    <section>
      <AdminSaveNotice saved={params.saved === "article"} />
      <AdminPageHeader
        eyebrow="Newsroom"
        title="Content Dashboard"
        description="Write, publish, update, and organize the stories appearing on The People's Ledger."
        action={
          <Link href="/admin/articles/new" className="border border-ink bg-ink px-4 py-2 text-sm font-bold uppercase text-white">
          New article
          </Link>
        }
      />

      <div className="grid gap-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Published", publishedCount],
          ["Drafts", draftCount],
          ["Archived", archivedCount],
          ["Pending comments", profile.role === "admin" ? pendingComments ?? 0 : "Admin only"]
        ].map(([label, value]) => (
          <div key={label} className="border-t-2 border-ink bg-white px-4 py-4">
            <p className="text-xs font-bold uppercase text-muted">{label}</p>
            <p className="mt-2 font-serif text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      {profile.role === "admin" ? (
        <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/admin/homepage", "Edit homepage"],
            ["/admin/authors", "Edit staff bios"],
            ["/admin/about", "Edit About page"],
            ["/admin/branding", "Edit branding"]
          ].map(([href, label]) => (
            <Link key={href} href={href} className="border border-rule bg-white px-4 py-3 font-bold hover:border-gold hover:text-gold-dark">
              {label}
            </Link>
          ))}
        </div>
      ) : null}

      <div className="flex items-end justify-between border-b-2 border-ink pb-2">
        <div>
          <h2 className="font-serif text-3xl font-bold">Article Library</h2>
          <p className="mt-1 text-sm text-muted">Select an article to revise its text, image, author, category, or publication status.</p>
        </div>
      </div>
      <div className="mt-6 divide-y divide-rule border-y border-rule">
        {allArticles.map((article) => (
          <div key={article.id} className="grid gap-4 py-4 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted">
                {article.archived_at ? "archived" : article.status} · {article.categories?.name} · {formatDate(article.published_at)}
              </p>
              <h2 className="font-serif text-2xl font-bold">{article.title}</h2>
              <p className="text-sm text-muted">By {article.profiles?.display_name}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/articles/${article.id}`} className="border border-ink px-3 py-2 text-sm uppercase tracking-wide">
                Edit
              </Link>
              <form action={archiveArticle}>
                <input type="hidden" name="id" value={article.id} />
                <input type="hidden" name="restore" value={article.archived_at ? "true" : "false"} />
                <button className="border border-ink px-3 py-2 text-sm uppercase tracking-wide">
                  {article.archived_at ? "Restore" : "Archive"}
                </button>
              </form>
              {profile.role === "admin" ? (
                <form action={deleteArticle}>
                  <input type="hidden" name="id" value={article.id} />
                  <button className="border border-red-900 px-3 py-2 text-sm uppercase tracking-wide text-red-900">Delete</button>
                </form>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
