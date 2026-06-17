import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { getCategories } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="font-serif text-5xl font-bold">Categories</h1>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <a key={category.id} href={`/categories/${category.slug}`} className="border border-rule bg-white p-5 hover:border-ink">
              <h2 className="font-serif text-2xl font-bold">{category.name}</h2>
              <p className="mt-2 text-muted">{category.description}</p>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
