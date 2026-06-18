import type { ReactNode } from "react";

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  action
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <header className="flex flex-col gap-4 border-b-2 border-ink pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-bold uppercase text-gold-dark">{eyebrow}</p>
        <h1 className="mt-2 font-serif text-4xl font-bold">{title}</h1>
        <p className="mt-2 max-w-2xl leading-6 text-muted">{description}</p>
      </div>
      {action}
    </header>
  );
}
