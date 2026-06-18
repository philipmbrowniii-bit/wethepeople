import Link from "next/link";
import { LoginForm } from "@/components/login-form";
import { getSiteSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const settings = await getSiteSettings();
  return (
    <main className="min-h-screen bg-paper px-4 py-12">
      <div className="mx-auto max-w-md">
        <div className="border-b-2 border-ink pb-6 text-center">
          <Link href="/" className="font-serif text-4xl font-bold">
            {settings?.site_name ?? "The People's Ledger"}
          </Link>
          <p className="mt-2 text-xs font-bold uppercase text-muted">{settings?.tagline}</p>
        </div>
        <div className="py-8">
          <p className="text-xs font-bold uppercase text-gold-dark">Newsroom access</p>
          <h1 className="mt-2 font-serif text-4xl font-bold">Sign in to manage the publication</h1>
          <p className="mt-3 leading-6 text-muted">
            Editors and writers can update articles and publish changes directly from this website.
          </p>
          <LoginForm />
          <Link href="/" className="mt-8 inline-block text-sm font-bold text-gold-dark hover:underline">
            Return to the live site
          </Link>
        </div>
      </div>
    </main>
  );
}
