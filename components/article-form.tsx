"use client";

import { useFormState, useFormStatus } from "react-dom";
import { saveArticle } from "@/lib/actions";
import type { Article, Category, Profile } from "@/lib/types";

type Props = {
  article?: Article | null;
  categories: Category[];
  authors: Profile[];
  currentAuthorId: string;
};

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className="border border-ink px-4 py-2 text-sm uppercase tracking-wide disabled:opacity-50">
      {pending ? "Saving..." : "Save article"}
    </button>
  );
}

export function ArticleForm({ article, categories, authors, currentAuthorId }: Props) {
  const [state, action] = useFormState(saveArticle, { ok: false, message: "" });

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="id" value={article?.id ?? ""} />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-bold uppercase tracking-wide" htmlFor="title">
            Title
          </label>
          <input id="title" name="title" defaultValue={article?.title} required className="mt-2 w-full border border-rule px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-bold uppercase tracking-wide" htmlFor="slug">
            Slug
          </label>
          <input id="slug" name="slug" defaultValue={article?.slug} className="mt-2 w-full border border-rule px-3 py-2" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-bold uppercase tracking-wide" htmlFor="subtitle">
          Subtitle
        </label>
        <input id="subtitle" name="subtitle" defaultValue={article?.subtitle ?? ""} className="mt-2 w-full border border-rule px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-bold uppercase tracking-wide" htmlFor="excerpt">
          Excerpt
        </label>
        <textarea id="excerpt" name="excerpt" rows={3} defaultValue={article?.excerpt} className="mt-2 w-full border border-rule px-3 py-2" />
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-bold uppercase tracking-wide" htmlFor="category_id">
            Category
          </label>
          <select id="category_id" name="category_id" defaultValue={article?.category_id} required className="mt-2 w-full border border-rule px-3 py-2">
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold uppercase tracking-wide" htmlFor="author_id">
            Author
          </label>
          <select id="author_id" name="author_id" defaultValue={article?.author_id ?? currentAuthorId} className="mt-2 w-full border border-rule px-3 py-2">
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.display_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold uppercase tracking-wide" htmlFor="status">
            Status
          </label>
          <select id="status" name="status" defaultValue={article?.status ?? "draft"} className="mt-2 w-full border border-rule px-3 py-2">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-bold uppercase tracking-wide" htmlFor="published_at">
          Publication date
        </label>
        <input
          id="published_at"
          name="published_at"
          type="datetime-local"
          defaultValue={article?.published_at?.slice(0, 16) ?? ""}
          className="mt-2 w-full border border-rule px-3 py-2 sm:max-w-sm"
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-bold uppercase tracking-wide" htmlFor="op_ed_label">
            Content label
          </label>
          <select
            id="op_ed_label"
            name="op_ed_label"
            defaultValue={article?.op_ed_label ?? "Opinion / Op-Ed"}
            className="mt-2 w-full border border-rule px-3 py-2"
          >
            <option>News</option>
            <option>News Analysis</option>
            <option>Opinion / Op-Ed</option>
            <option>Editorial</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold uppercase tracking-wide" htmlFor="tags">
            Tags
          </label>
          <input
            id="tags"
            name="tags"
            defaultValue={article?.tags?.join(", ") ?? ""}
            placeholder="transparency, local government"
            className="mt-2 w-full border border-rule px-3 py-2"
          />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-bold uppercase tracking-wide" htmlFor="featured_image_url">
            Featured image URL
          </label>
          <input
            id="featured_image_url"
            name="featured_image_url"
            defaultValue={article?.featured_image_url ?? ""}
            className="mt-2 w-full border border-rule px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-bold uppercase tracking-wide" htmlFor="featured_image">
            Upload featured image
          </label>
          <input id="featured_image" name="featured_image" type="file" accept="image/*" className="mt-2 w-full border border-rule px-3 py-2" />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm uppercase tracking-wide">
        <input type="checkbox" name="is_featured" defaultChecked={article?.is_featured} />
        Featured article
      </label>
      <label className="flex items-center gap-2 text-sm uppercase tracking-wide">
        <input type="checkbox" name="is_archived" defaultChecked={Boolean(article?.archived_at)} />
        Archived
      </label>
      <div>
        <label className="block text-sm font-bold uppercase tracking-wide" htmlFor="body">
          Body markdown
        </label>
        <textarea id="body" name="body" required rows={18} defaultValue={article?.body} className="mt-2 w-full border border-rule px-3 py-2 font-mono text-sm" />
      </div>
      <SaveButton />
      {state.message ? <p className="text-sm text-red-800">{state.message}</p> : null}
    </form>
  );
}
