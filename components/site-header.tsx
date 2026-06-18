import Link from "next/link";
import { getCategories } from "@/lib/data";
import { formatDate } from "@/lib/format";

export async function SiteHeader() {
  const categories = await getCategories();

  return (
    <header className="border-b border-ink bg-paper">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between border-b border-rule py-2 text-xs uppercase text-muted">
          <span>{formatDate(new Date().toISOString())}</span>
          <div className="flex items-center gap-4">
            <Link href="/editorial-standards" className="hover:text-gold-dark">
              Editorial Standards
            </Link>
            <Link href="/admin" className="hover:text-gold-dark">
              Staff Login
            </Link>
          </div>
        </div>
        <div className="py-6 text-center sm:py-8">
          <Link href="/" className="inline-block font-serif text-5xl font-bold text-ink sm:text-7xl">
            The People&apos;s Ledger
          </Link>
          <p className="mt-2 text-sm uppercase text-muted sm:text-base">News for Citizens, Not Consumers.</p>
        </div>
        <nav className="flex gap-5 overflow-x-auto border-t border-ink py-3 text-xs font-bold uppercase sm:justify-center sm:text-sm">
          <Link href="/" className="shrink-0 hover:text-gold-dark">
            Front Page
          </Link>
          <Link href="/about" className="shrink-0 hover:underline">
            About
          </Link>
          <Link href="/authors" className="shrink-0 hover:text-gold-dark">
            Staff
          </Link>
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`} className="shrink-0 hover:text-gold-dark">
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
