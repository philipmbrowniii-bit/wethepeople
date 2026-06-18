import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { ArticleWithRelations } from "@/lib/types";

type Props = {
  article: ArticleWithRelations;
  priority?: boolean;
  compact?: boolean;
  showExcerpt?: boolean;
};

export function ArticleCard({ article, priority = false, compact = false, showExcerpt = true }: Props) {
  return (
    <article className={priority ? "space-y-4" : "space-y-2 border-t border-rule pt-4"}>
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-bold uppercase text-muted">
        <span className="text-gold-dark">{article.op_ed_label}</span>
        <span>{article.categories?.name}</span>
        <span>{article.reading_time} min read</span>
      </div>
      <h2
        className={`font-serif font-bold leading-[1.05] ${
          priority ? "text-4xl sm:text-6xl" : compact ? "text-xl" : "text-2xl sm:text-3xl"
        }`}
      >
        <Link href={`/articles/${article.slug}`} className="hover:text-gold-dark">
          {article.title}
        </Link>
      </h2>
      {article.subtitle && !compact ? <p className="font-serif text-xl leading-7 text-muted">{article.subtitle}</p> : null}
      {showExcerpt && !compact ? <p className="text-base leading-7 text-ink">{article.excerpt}</p> : null}
      <p className="text-sm text-muted">
        By {article.profiles?.display_name ?? "The Ledger Staff"} · {formatDate(article.published_at)}
      </p>
    </article>
  );
}
