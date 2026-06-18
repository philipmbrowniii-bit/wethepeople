import Link from "next/link";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { getCategories } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <header className="border-b-2 border-ink pb-7">
          <p className="text-xs font-bold uppercase text-gold-dark">Browse the Ledger</p>
          <h1 className="mt-3 font-serif text-5xl font-bold sm:text-6xl">Sections</h1>
        </header>
        <div className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`} className="border-t-2 border-ink pt-4">
              <h2 className="font-serif text-3xl font-bold hover:text-gold-dark">{category.name}</h2>
              <p className="mt-3 leading-7 text-muted">{category.description}</p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
