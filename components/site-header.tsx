import Link from "next/link";
import { getCategories } from "@/lib/data";

export async function SiteHeader() {
  const categories = await getCategories();

  return (
    <header className="border-b border-rule bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex items-center justify-between gap-4 border-b border-ink pb-4">
          <Link href="/" className="font-serif text-5xl font-bold tracking-normal text-ink sm:text-7xl">
            We The People
          </Link>
          <Link href="/admin" className="hidden border border-ink px-3 py-2 text-sm uppercase tracking-wide sm:block">
            Admin
          </Link>
        </div>
        <p className="mt-3 font-serif text-xl text-muted">Transparent opinion for civic reform.</p>
        <nav className="mt-5 flex gap-4 overflow-x-auto border-y border-rule py-3 text-sm uppercase tracking-wide">
          <Link href="/about" className="shrink-0 hover:underline">
            About
          </Link>
          <Link href="/authors" className="shrink-0 hover:underline">
            Authors
          </Link>
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`} className="shrink-0 hover:underline">
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
