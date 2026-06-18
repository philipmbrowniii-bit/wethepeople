import { requireAdmin } from "@/lib/auth";
import { updateCommentStatus } from "@/lib/actions";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatDate } from "@/lib/format";
import { AdminPageHeader } from "@/components/admin-page-header";
import type { Comment } from "@/lib/types";

type CommentRow = Comment & {
  articles: { title: string; slug: string } | null;
};

export default async function CommentsPage() {
  await requireAdmin();
  const admin = createAdminClient();
  const { data: comments } = await admin
    .from("comments")
    .select("*, articles(title, slug)")
    .order("created_at", { ascending: false })
    .returns<CommentRow[]>();

  return (
    <section>
      <AdminPageHeader
        eyebrow="Community"
        title="Comment Moderation"
        description="Review reader comments before they appear publicly. Approve, reject, return to pending, or permanently remove each submission."
      />
      <div className="mt-6 divide-y divide-rule border-y border-rule">
        {(comments ?? []).map((comment) => (
          <div key={comment.id} className="py-5">
            <p className="text-xs uppercase tracking-wide text-muted">
              {comment.status} · {formatDate(comment.created_at)} · {comment.articles?.title}
            </p>
            <p className="mt-2 font-bold">{comment.name}</p>
            <p className="mt-2 max-w-3xl leading-7 text-muted">{comment.message}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["approved", "rejected", "pending", "delete"].map((status) => (
                <form key={status} action={updateCommentStatus}>
                  <input type="hidden" name="id" value={comment.id} />
                  <input type="hidden" name="status" value={status} />
                  <button className={`border px-3 py-2 text-sm font-bold uppercase ${
                    status === "approved" ? "border-green-800 text-green-800" :
                    status === "delete" ? "border-red-900 text-red-900" :
                    "border-ink"
                  }`}>{status === "delete" ? "Remove" : status}</button>
                </form>
              ))}
            </div>
          </div>
        ))}
        {!comments?.length ? <p className="py-8 text-muted">There are no comments to review.</p> : null}
      </div>
    </section>
  );
}
