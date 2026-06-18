import { notFound } from "next/navigation";
import { ArticleForm } from "@/components/article-form";
import { AdminPageHeader } from "@/components/admin-page-header";
import { requireWriter } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Article, Category, Profile } from "@/lib/types";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const profile = await requireWriter();
  const { id } = await params;
  const admin = createAdminClient();
  const [{ data: article }, { data: categories }, { data: authors }] = await Promise.all([
    admin.from("articles").select("*").eq("id", id).maybeSingle<Article>(),
    admin.from("categories").select("*").order("name").returns<Category[]>(),
    admin.from("profiles").select("*").in("role", ["admin", "writer"]).order("display_name").returns<Profile[]>()
  ]);

  if (!article) notFound();

  return (
    <section>
      <AdminPageHeader
        eyebrow="Article editor"
        title="Edit Article"
        description="Update the story text, image, author, section, tags, date, and publication status."
      />
      <div className="mt-6">
        <ArticleForm article={article} categories={categories ?? []} authors={authors ?? []} currentAuthorId={profile.id} />
      </div>
    </section>
  );
}
