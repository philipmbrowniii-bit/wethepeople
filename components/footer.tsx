import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-rule bg-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>We The People publishes free civic reform opinion writing. No ads, no subscriptions, no paywalls.</p>
        <div className="flex gap-4">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/authors" className="hover:underline">
            Authors
          </Link>
          <Link href="/admin" className="hover:underline">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
