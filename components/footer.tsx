import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="font-serif text-3xl font-bold">The People&apos;s Ledger</p>
            <p className="mt-2 text-sm uppercase text-muted">News for Citizens, Not Consumers.</p>
            <p className="mt-4 max-w-2xl leading-7 text-muted">
              Independent civic journalism and opinion focused on transparency, accountability, public discourse, and
              reform. Core journalism is free to read.
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
          </div>
        </div>
        <p className="mt-8 border-t border-rule pt-4 text-xs text-muted">
          © {new Date().getFullYear()} The People&apos;s Ledger. Opinion pieces are clearly labeled.
        </p>
      </div>
    </footer>
  );
}
