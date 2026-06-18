import { saveBranding } from "@/lib/actions";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { AdminPageHeader } from "@/components/admin-page-header";
import { AdminSaveNotice } from "@/components/admin-save-notice";
import type { SiteSettings } from "@/lib/types";

export default async function AdminBrandingPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const params = await searchParams;
  await requireAdmin();
  const admin = createAdminClient();
  const { data: settings } = await admin.from("site_settings").select("*").eq("id", "main").single<SiteSettings>();
  if (!settings) throw new Error("Site settings are not initialized.");
  return (
    <section>
      <AdminSaveNotice saved={params.saved === "1"} />
      <AdminPageHeader
        eyebrow="Publication identity"
        title="Site Branding"
        description="Update the name, logo, favicon, tagline, footer copy, and social profiles used throughout the live website."
      />
      <form action={saveBranding} className="mt-6 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label><span className="text-xs font-bold uppercase">Publication name</span><input name="site_name" defaultValue={settings.site_name} className="mt-2 w-full border border-rule px-3 py-2" /></label>
          <label><span className="text-xs font-bold uppercase">Tagline</span><input name="tagline" defaultValue={settings.tagline} className="mt-2 w-full border border-rule px-3 py-2" /></label>
          <label><span className="text-xs font-bold uppercase">Existing logo URL</span><input name="logo_url" defaultValue={settings.logo_url ?? ""} className="mt-2 w-full border border-rule px-3 py-2" /></label>
          <label><span className="text-xs font-bold uppercase">Upload new logo</span><input name="logo" type="file" accept="image/*" className="mt-2 w-full border border-rule px-3 py-2" /></label>
          <label><span className="text-xs font-bold uppercase">Existing favicon URL</span><input name="favicon_url" defaultValue={settings.favicon_url ?? ""} className="mt-2 w-full border border-rule px-3 py-2" /></label>
          <label><span className="text-xs font-bold uppercase">Upload new favicon</span><input name="favicon" type="file" accept="image/*" className="mt-2 w-full border border-rule px-3 py-2" /></label>
        </div>
        {settings.logo_url ? (
          <div>
            <p className="text-xs font-bold uppercase">Current logo</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={settings.logo_url} alt="" className="mt-2 max-h-24 max-w-xs border border-rule bg-white p-3" />
          </div>
        ) : null}
        <label className="block"><span className="text-xs font-bold uppercase">Footer text</span><textarea name="footer_text" rows={4} defaultValue={settings.footer_text} className="mt-2 w-full border border-rule px-3 py-2" /></label>
        <h2 className="font-serif text-2xl font-bold">Social links</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {["website", "x", "facebook", "instagram", "linkedin"].map((network) => (
            <label key={network}><span className="text-xs font-bold uppercase">{network}</span><input name={network} defaultValue={settings.social_links?.[network] ?? ""} placeholder="https://" className="mt-2 w-full border border-rule px-3 py-2" /></label>
          ))}
        </div>
        <button className="border border-ink bg-ink px-4 py-2 text-sm uppercase text-white">Save branding</button>
      </form>
    </section>
  );
}
