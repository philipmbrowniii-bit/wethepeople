import { ArticleForm } from "@/components/article-form";
import { requireWriter } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Category, Profile } from "@/lib/types";

export default async function NewArticlePage() {
  const profile = await requireWriter();
  const admin = createAdminClient();
  const [{ data: categories }, { data: authors }] = await Promise.all([
    admin.from("categories").select("*").order("name").returns<Category[]>(),
    admin.from("profiles").select("*").in("role", ["admin", "writer"]).order("display_name").returns<Profile[]>()
  ]);

  return (
    <section>
      <h1 className="mb-6 font-serif text-4xl font-bold">New article</h1>
      <ArticleForm categories={categories ?? []} authors={authors ?? []} currentAuthorId={profile.id} />
    </section>
  );
}
