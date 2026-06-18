import { ArticleForm } from "@/components/article-form";
import { AdminPageHeader } from "@/components/admin-page-header";
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
      <AdminPageHeader
        eyebrow="Article editor"
        title="Create a New Article"
        description="Write the story, assign its author and section, upload an image, then save it as a draft or publish it directly."
      />
      <div className="mt-6">
      <ArticleForm categories={categories ?? []} authors={authors ?? []} currentAuthorId={profile.id} />
      </div>
    </section>
  );
}
