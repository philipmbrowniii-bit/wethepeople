import { saveBranding } from "@/lib/actions";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import type { SiteSettings } from "@/lib/types";

export default async function AdminBrandingPage() {
  await requireAdmin();
  const admin = createAdminClient();
  const { data: settings } = await admin.from("site_settings").select("*").eq("id", "main").single<SiteSettings>();
  if (!settings) throw new Error("Site settings are not initialized.");
  return (
    <section>
      <h1 className="font-serif text-4xl font-bold">Site Branding</h1>
      <form action={saveBranding} className="mt-6 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <input name="site_name" defaultValue={settings.site_name} placeholder="Site name" className="border border-rule px-3 py-2" />
          <input name="tagline" defaultValue={settings.tagline} placeholder="Tagline" className="border border-rule px-3 py-2" />
          <input name="logo_url" defaultValue={settings.logo_url ?? ""} placeholder="Logo URL" className="border border-rule px-3 py-2" />
          <input name="logo" type="file" accept="image/*" className="border border-rule px-3 py-2" />
          <input name="favicon_url" defaultValue={settings.favicon_url ?? ""} placeholder="Favicon URL" className="border border-rule px-3 py-2" />
          <input name="favicon" type="file" accept="image/*" className="border border-rule px-3 py-2" />
        </div>
        <textarea name="footer_text" rows={4} defaultValue={settings.footer_text} className="w-full border border-rule px-3 py-2" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {["website", "x", "facebook", "instagram", "linkedin"].map((network) => (
            <input key={network} name={network} defaultValue={settings.social_links?.[network] ?? ""} placeholder={`${network} URL`} className="border border-rule px-3 py-2" />
          ))}
        </div>
        <button className="border border-ink bg-ink px-4 py-2 text-sm uppercase text-white">Save branding</button>
      </form>
    </section>
  );
}
