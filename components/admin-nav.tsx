import Link from "next/link";
import { signOut } from "@/lib/actions";

export function AdminNav({ role }: { role: "admin" | "writer" }) {
  return (
    <div className="border-b border-ink bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule py-4">
          <div>
            <Link href="/admin" className="font-serif text-2xl font-bold">
              The People&apos;s Ledger
            </Link>
            <p className="text-xs uppercase text-muted">{role === "admin" ? "Administrator" : "Writer"} dashboard</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Link href="/" target="_blank" className="border border-rule px-3 py-2 font-bold text-gold-dark hover:border-gold">
              View live site
            </Link>
            <form action={signOut}>
              <button className="border border-ink px-3 py-2">Sign out</button>
            </form>
          </div>
        </div>
        <nav className="flex gap-5 overflow-x-auto py-3 text-xs font-bold uppercase">
          <Link href="/admin" className="shrink-0 hover:text-gold-dark">Articles</Link>
          <Link href="/admin/articles/new" className="hover:underline">
            New Article
          </Link>
          {role === "admin" ? (
            <>
              <Link href="/admin/homepage" className="hover:underline">Homepage</Link>
              <Link href="/admin/about" className="hover:underline">About</Link>
              <Link href="/admin/branding" className="hover:underline">Branding</Link>
              <Link href="/admin/categories" className="hover:underline">Categories</Link>
              <Link href="/admin/comments" className="hover:underline">Comments</Link>
              <Link href="/admin/authors" className="hover:underline">Staff</Link>
            </>
          ) : null}
        </nav>
      </div>
    </div>
  );
}
