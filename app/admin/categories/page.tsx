import { requireAdmin } from "@/lib/auth";
import { saveCategory } from "@/lib/actions";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Category } from "@/lib/types";

export default async function AdminCategoriesPage() {
  await requireAdmin();
  const admin = createAdminClient();
  const { data: categories } = await admin.from("categories").select("*").order("name").returns<Category[]>();

  return (
    <section>
      <h1 className="font-serif text-4xl font-bold">Categories</h1>
      <form action={saveCategory} className="mt-6 grid gap-4 border border-rule bg-white p-4 md:grid-cols-[1fr_1fr_2fr_auto] md:items-end">
        <div>
          <label className="block text-sm font-bold uppercase tracking-wide" htmlFor="name">
            Name
          </label>
          <input id="name" name="name" required className="mt-2 w-full border border-rule px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-bold uppercase tracking-wide" htmlFor="slug">
            Slug
          </label>
          <input id="slug" name="slug" className="mt-2 w-full border border-rule px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-bold uppercase tracking-wide" htmlFor="description">
            Description
          </label>
          <input id="description" name="description" className="mt-2 w-full border border-rule px-3 py-2" />
        </div>
        <button className="border border-ink px-4 py-2 text-sm uppercase tracking-wide">Add</button>
      </form>
      <div className="mt-6 divide-y divide-rule border-y border-rule">
        {(categories ?? []).map((category) => (
          <form key={category.id} action={saveCategory} className="grid gap-4 py-4 md:grid-cols-[1fr_1fr_2fr_auto] md:items-end">
            <input type="hidden" name="id" value={category.id} />
            <input name="name" defaultValue={category.name} className="border border-rule px-3 py-2" />
            <input name="slug" defaultValue={category.slug} className="border border-rule px-3 py-2" />
            <input name="description" defaultValue={category.description ?? ""} className="border border-rule px-3 py-2" />
            <button className="border border-ink px-4 py-2 text-sm uppercase tracking-wide">Save</button>
          </form>
        ))}
      </div>
    </section>
  );
}
