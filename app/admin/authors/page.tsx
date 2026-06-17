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
      <h1 className="font-serif text-4xl font-bold">Authors</h1>
      <div className="mt-6 space-y-6">
        {(authors ?? []).map((author) => (
          <form key={author.id} action={saveProfile} className="space-y-4 border border-rule bg-white p-4">
            <input type="hidden" name="id" value={author.id} />
            <div className="grid gap-4 sm:grid-cols-3">
              <input name="display_name" defaultValue={author.display_name} className="border border-rule px-3 py-2" />
              <select name="role" defaultValue={author.role} className="border border-rule px-3 py-2">
                <option value="admin">admin</option>
                <option value="writer">writer</option>
              </select>
              <input name="avatar_url" defaultValue={author.avatar_url ?? ""} placeholder="Avatar URL" className="border border-rule px-3 py-2" />
            </div>
            <textarea name="bio" rows={4} defaultValue={author.bio ?? ""} className="w-full border border-rule px-3 py-2" />
            <button className="border border-ink px-4 py-2 text-sm uppercase tracking-wide">Save author</button>
          </form>
        ))}
      </div>
    </section>
  );
}
