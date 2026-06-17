import { notFound } from "next/navigation";
import { ArticleForm } from "@/components/article-form";
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
      <h1 className="mb-6 font-serif text-4xl font-bold">Edit article</h1>
      <ArticleForm article={article} categories={categories ?? []} authors={authors ?? []} currentAuthorId={profile.id} />
    </section>
  );
}
