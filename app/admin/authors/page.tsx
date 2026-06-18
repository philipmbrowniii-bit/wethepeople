import { requireAdmin } from "@/lib/auth";
import { saveProfile } from "@/lib/actions";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Profile } from "@/lib/types";

export default async function AdminAuthorsPage() {
  await requireAdmin();
  const admin = createAdminClient();
  const { data: authors } = await admin.from("profiles").select("*").in("role", ["admin", "writer"]).order("display_name").returns<Profile[]>();

  return (
    <section>
      <h1 className="font-serif text-4xl font-bold">Founder, Staff &amp; Contributors</h1>
      <div className="mt-6 space-y-6">
        {(authors ?? []).map((author) => (
          <form key={author.id} action={saveProfile} className="space-y-4 border border-rule bg-white p-4">
            <input type="hidden" name="id" value={author.id} />
            <div className="grid gap-4 sm:grid-cols-2">
              <input name="display_name" defaultValue={author.display_name} className="border border-rule px-3 py-2" />
              <input name="title" defaultValue={author.title ?? ""} placeholder="Title" className="border border-rule px-3 py-2" />
              <input name="avatar_url" defaultValue={author.avatar_url ?? ""} placeholder="Avatar URL" className="border border-rule px-3 py-2" />
              <input name="avatar" type="file" accept="image/*" className="border border-rule px-3 py-2" />
            </div>
            <textarea name="bio" rows={4} defaultValue={author.bio ?? ""} className="w-full border border-rule px-3 py-2" />
            <input
              name="author_page_url"
              defaultValue={author.author_page_url ?? ""}
              placeholder="Author page URL"
              className="w-full border border-rule px-3 py-2"
            />
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
