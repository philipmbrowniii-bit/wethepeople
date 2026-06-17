"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitComment } from "@/lib/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className="border border-ink px-4 py-2 text-sm uppercase tracking-wide disabled:opacity-50">
      {pending ? "Submitting..." : "Submit for review"}
    </button>
  );
}

export function CommentForm({ articleId }: { articleId: string }) {
  const [state, action] = useFormState(submitComment, { ok: false, message: "" });

  return (
    <form action={action} className="space-y-4 border-t border-rule pt-6">
      <input type="hidden" name="article_id" value={articleId} />
      <div>
        <label htmlFor="name" className="block text-sm font-bold uppercase tracking-wide">
          Name
        </label>
        <input id="name" name="name" required className="mt-2 w-full border border-rule bg-white px-3 py-2" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-bold uppercase tracking-wide">
          Comment
        </label>
        <textarea id="message" name="message" required rows={5} className="mt-2 w-full border border-rule bg-white px-3 py-2" />
      </div>
      <SubmitButton />
      {state.message ? <p className={state.ok ? "text-sm text-green-800" : "text-sm text-red-800"}>{state.message}</p> : null}
    </form>
  );
}
