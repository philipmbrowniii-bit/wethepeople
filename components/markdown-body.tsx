import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownBody({ body }: { body: string }) {
  return (
    <div className="prose prose-neutral max-w-none prose-headings:font-serif prose-p:leading-8 prose-a:text-ink">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
    </div>
  );
}
