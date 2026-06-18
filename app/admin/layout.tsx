import { AdminNav } from "@/components/admin-nav";
import { requireWriter } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const profile = await requireWriter();

  return (
    <>
      <AdminNav role={profile.role} />
      <main className="mx-auto min-h-[70vh] max-w-7xl px-4 py-8">{children}</main>
    </>
  );
}
