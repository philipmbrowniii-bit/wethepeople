import { requireAdmin } from "@/lib/auth";
import { saveProfile } from "@/lib/actions";
import { createAdminClient } from "@/lib/supabase/admin";
import { AdminPageHeader } from "@/components/admin-page-header";
import { AdminSaveNotice } from "@/components/admin-save-notice";
import type { Profile } from "@/lib/types";

export default async function AdminAuthorsPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const params = await searchParams;
  await requireAdmin();
  const admin = createAdminClient();
  const { data: authors } = await admin.from("profiles").select("*").in("role", ["admin", "writer"]).order("display_name").returns<Profile[]>();

  return (
    <section>
      <AdminSaveNotice saved={params.saved === "1"} />
      <AdminPageHeader
        eyebrow="Newsroom"
        title="Founder, Staff & Contributors"
        description="Edit names, titles, biographies, profile photos, author-page links, and social profiles."
      />
      <div className="mt-6 space-y-6">
        {(authors ?? []).map((author) => (
          <form key={author.id} action={saveProfile} className="space-y-4 border border-rule bg-white p-4">
            <input type="hidden" name="id" value={author.id} />
            <div className="grid gap-4 sm:grid-cols-2">
              <label><span className="text-xs font-bold uppercase">Name</span><input name="display_name" defaultValue={author.display_name} className="mt-2 w-full border border-rule px-3 py-2" /></label>
              <label><span className="text-xs font-bold uppercase">Title</span><input name="title" defaultValue={author.title ?? ""} className="mt-2 w-full border border-rule px-3 py-2" /></label>
              <label><span className="text-xs font-bold uppercase">Existing photo URL</span><input name="avatar_url" defaultValue={author.avatar_url ?? ""} className="mt-2 w-full border border-rule px-3 py-2" /></label>
              <label><span className="text-xs font-bold uppercase">Upload new photo</span><input name="avatar" type="file" accept="image/*" className="mt-2 w-full border border-rule px-3 py-2" /></label>
            </div>
            {author.avatar_url ? (
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={author.avatar_url} alt="" className="h-24 w-24 object-cover" />
              </div>
            ) : null}
            <label className="block"><span className="text-xs font-bold uppercase">Biography</span><textarea name="bio" rows={5} defaultValue={author.bio ?? ""} className="mt-2 w-full border border-rule px-3 py-2" /></label>
            <label className="block"><span className="text-xs font-bold uppercase">Author page URL</span><input name="author_page_url" defaultValue={author.author_page_url ?? ""} className="mt-2 w-full border border-rule px-3 py-2" /></label>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {["website", "x", "facebook", "instagram", "linkedin"].map((network) => (
                <input
                  key={network}
                  name={network}
                  defaultValue={author.social_links?.[network] ?? ""}
                  placeholder={`${network} URL`}
                  className="border border-rule px-3 py-2"
                />
              ))}
            </div>
            <input type="hidden" name="role" value={author.role} />
            <button className="border border-ink px-4 py-2 text-sm uppercase tracking-wide">Save author</button>
          </form>
        ))}
      </div>
    </section>
  );
}
