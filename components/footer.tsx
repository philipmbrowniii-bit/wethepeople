import Link from "next/link";
import { getSiteSettings } from "@/lib/data";

export async function Footer() {
  const settings = await getSiteSettings();
  const socialLinks = Object.entries(settings?.social_links ?? {}).filter(([, url]) => Boolean(url));
  return (
    <footer className="border-t-2 border-ink bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="font-serif text-3xl font-bold">{settings?.site_name ?? "The People's Ledger"}</p>
            <p className="mt-2 text-sm uppercase text-muted">{settings?.tagline ?? "News for Citizens, Not Consumers."}</p>
            <p className="mt-4 max-w-2xl leading-7 text-muted">
              {settings?.footer_text ?? "Independent civic journalism and opinion focused on transparency and accountability."}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Link href="/about" className="hover:text-gold-dark">
              About
            </Link>
            <Link href="/authors" className="hover:text-gold-dark">
              Staff
            </Link>
            <Link href="/editorial-standards" className="hover:text-gold-dark">
              Editorial Standards
            </Link>
            <Link href="/admin" className="hover:text-gold-dark">
              Staff Login
            </Link>
            {socialLinks.map(([network, url]) => (
              <a key={network} href={url} target="_blank" rel="noreferrer" className="capitalize hover:text-gold-dark">
                {network}
              </a>
            ))}
          </div>
        </div>
        <p className="mt-8 border-t border-rule pt-4 text-xs text-muted">
          © {new Date().getFullYear()} {settings?.site_name ?? "The People's Ledger"}. Opinion pieces are clearly labeled.
        </p>
      </div>
    </footer>
  );
}
