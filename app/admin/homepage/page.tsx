import { saveHomepage } from "@/lib/actions";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Article, SiteSettings } from "@/lib/types";

export default async function AdminHomepagePage() {
  await requireAdmin();
  const admin = createAdminClient();
  const [{ data: settings }, { data: articles }] = await Promise.all([
    admin.from("site_settings").select("*").eq("id", "main").single<SiteSettings>(),
    admin.from("articles").select("*").eq("status", "published").is("archived_at", null).order("published_at", { ascending: false }).returns<Article[]>()
  ]);
  if (!settings) throw new Error("Site settings are not initialized.");
  const sections = settings.homepage_sections ?? [];

  return (
    <section>
      <h1 className="font-serif text-4xl font-bold">Homepage Content</h1>
      <form action={saveHomepage} className="mt-6 space-y-6">
        <label className="block">
          <span className="text-sm font-bold uppercase">Hero headline</span>
          <input name="hero_headline" defaultValue={settings.hero_headline} className="mt-2 w-full border border-rule px-3 py-2" />
        </label>
        <label className="block">
          <span className="text-sm font-bold uppercase">Homepage tagline</span>
          <input name="tagline" defaultValue={settings.tagline} className="mt-2 w-full border border-rule px-3 py-2" />
        </label>
        <label className="block">
          <span className="text-sm font-bold uppercase">Featured story</span>
          <select name="featured_article_id" defaultValue={settings.featured_article_id ?? ""} className="mt-2 w-full border border-rule px-3 py-2">
            <option value="">Use article marked featured</option>
            {(articles ?? []).map((article) => (
              <option key={article.id} value={article.id}>{article.title}</option>
            ))}
          </select>
        </label>
        <div>
          <h2 className="font-serif text-2xl font-bold">Homepage sections and ordering</h2>
          <div className="mt-4 space-y-4">
            {(["latest", "opinion", "most_read"] as const).map((key) => {
              const section = sections.find((item) => item.key === key);
              return (
                <div key={key} className="grid gap-3 border border-rule bg-white p-4 sm:grid-cols-[1fr_100px_auto] sm:items-end">
                  <label>
                    <span className="text-xs font-bold uppercase">Section title</span>
                    <input name={`${key}_title`} defaultValue={section?.title ?? key} className="mt-2 w-full border border-rule px-3 py-2" />
                  </label>
                  <label>
                    <span className="text-xs font-bold uppercase">Position</span>
                    <input name={`${key}_position`} type="number" min="1" max="3" defaultValue={section?.position ?? 1} className="mt-2 w-full border border-rule px-3 py-2" />
                  </label>
                  <label className="flex items-center gap-2 py-2 text-sm uppercase">
                    <input name={`${key}_enabled`} type="checkbox" defaultChecked={section?.enabled ?? true} />
                    Enabled
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <button className="border border-ink bg-ink px-4 py-2 text-sm uppercase text-white">Save homepage</button>
      </form>
    </section>
  );
}
