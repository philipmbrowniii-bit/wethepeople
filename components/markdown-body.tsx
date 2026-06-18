import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownBody({ body }: { body: string }) {
  return (
    <div className="prose prose-lg prose-neutral max-w-none prose-headings:font-serif prose-headings:leading-tight prose-p:leading-8 prose-a:text-gold-dark prose-a:decoration-gold prose-blockquote:border-gold prose-blockquote:font-serif">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
    </div>
  );
}
