import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { ArticleWithRelations } from "@/lib/types";

type Props = {
  article: ArticleWithRelations;
  priority?: boolean;
};

export function ArticleCard({ article, priority = false }: Props) {
  return (
    <article className={priority ? "space-y-3" : "space-y-2 border-t border-rule pt-4"}>
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs uppercase tracking-wide text-muted">
        <span>{article.op_ed_label}</span>
        <span>{article.categories?.name}</span>
        <span>{article.reading_time} min read</span>
      </div>
      <h2 className={`font-serif font-bold leading-tight ${priority ? "text-4xl sm:text-5xl" : "text-2xl"}`}>
        <Link href={`/articles/${article.slug}`} className="hover:underline">
          {article.title}
        </Link>
      </h2>
      {article.subtitle ? <p className="font-serif text-xl text-muted">{article.subtitle}</p> : null}
      <p className="text-base leading-7 text-ink">{article.excerpt}</p>
      <p className="text-sm text-muted">
        By {article.profiles?.display_name ?? "Editorial Staff"} · {formatDate(article.published_at)}
      </p>
    </article>
  );
}
