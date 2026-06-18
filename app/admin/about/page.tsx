import { saveAboutContent } from "@/lib/actions";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { AdminPageHeader } from "@/components/admin-page-header";
import { AdminSaveNotice } from "@/components/admin-save-notice";
import type { SiteSettings } from "@/lib/types";

export default async function AdminAboutPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const params = await searchParams;
  await requireAdmin();
  const admin = createAdminClient();
  const { data: settings } = await admin.from("site_settings").select("*").eq("id", "main").single<SiteSettings>();
  if (!settings) throw new Error("Site settings are not initialized.");
  return (
    <section>
      <AdminSaveNotice saved={params.saved === "1"} />
      <AdminPageHeader
        eyebrow="Publication"
        title="About & Editorial Content"
        description="Edit the publication mission, history, standards, and contact information shown on the public website."
      />
      <form action={saveAboutContent} className="mt-6 space-y-5">
        <label className="block"><span className="text-sm font-bold uppercase">Mission statement</span><textarea name="about_mission" rows={5} defaultValue={settings.about_mission} className="mt-2 w-full border border-rule px-3 py-2" /></label>
        <label className="block"><span className="text-sm font-bold uppercase">Publication history</span><textarea name="about_history" rows={5} defaultValue={settings.about_history} className="mt-2 w-full border border-rule px-3 py-2" /></label>
        <label className="block"><span className="text-sm font-bold uppercase">Editorial standards (Markdown)</span><textarea name="editorial_standards" rows={14} defaultValue={settings.editorial_standards} className="mt-2 w-full border border-rule px-3 py-2 font-mono text-sm" /></label>
        <label className="block"><span className="text-sm font-bold uppercase">Contact information</span><textarea name="contact_information" rows={5} defaultValue={settings.contact_information} className="mt-2 w-full border border-rule px-3 py-2" /></label>
        <button className="border border-ink bg-ink px-4 py-2 text-sm uppercase text-white">Save content</button>
      </form>
    </section>
  );
}
