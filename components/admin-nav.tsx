import Link from "next/link";
import { signOut } from "@/lib/actions";

export function AdminNav({ role }: { role: "admin" | "writer" }) {
  return (
    <div className="border-b border-rule bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <Link href="/admin" className="font-serif text-2xl font-bold">
          The People&apos;s Ledger Admin
        </Link>
        <nav className="flex flex-wrap items-center gap-3 text-sm uppercase tracking-wide">
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
          <form action={signOut}>
            <button className="border border-ink px-3 py-1">Sign out</button>
          </form>
        </nav>
      </div>
    </div>
  );
}
