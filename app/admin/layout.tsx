import { AdminNav } from "@/components/admin-nav";
import { requireWriter } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireWriter();

  return (
    <>
      <AdminNav />
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </>
  );
}
