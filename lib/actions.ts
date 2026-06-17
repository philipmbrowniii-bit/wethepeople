"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin, requireWriter } from "@/lib/auth";
import { estimateReadingTime, excerptFromBody, slugify } from "@/lib/format";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import type { ArticleFormState, ArticleStatus, CommentStatus } from "@/lib/types";

export async function submitComment(_: ArticleFormState, formData: FormData): Promise<ArticleFormState> {
  const articleId = String(formData.get("article_id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!articleId || name.length < 2 || message.length < 5) {
    return { ok: false, message: "Please include your name and a comment before submitting." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("comments").insert({
    article_id: articleId,
    name,
    message,
    status: "pending"
  });

  if (error) {
    return { ok: false, message: "Something went wrong. Please try again." };
  }

  return { ok: true, message: "Thanks. Your comment is pending moderator approval." };
}

export async function signIn(_: ArticleFormState, formData: FormData): Promise<ArticleFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { ok: false, message: "Could not sign in with those credentials." };
  }

  redirect("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function saveArticle(_: ArticleFormState, formData: FormData): Promise<ArticleFormState> {
  const profile = await requireWriter();
  const admin = createAdminClient();
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const status = String(formData.get("status") ?? "draft") as ArticleStatus;
  const publishedAt = status === "published" ? new Date().toISOString() : null;

  if (!title || !body) {
    return { ok: false, message: "Title and article body are required." };
  }

  const payload = {
    title,
    slug: slugify(String(formData.get("slug") || title)),
    subtitle: String(formData.get("subtitle") ?? "").trim() || null,
    body,
    excerpt: String(formData.get("excerpt") ?? "").trim() || excerptFromBody(body),
    category_id: String(formData.get("category_id") ?? ""),
    author_id: String(formData.get("author_id") || profile.id),
    status,
    is_featured: formData.get("is_featured") === "on",
    published_at: publishedAt,
    reading_time: estimateReadingTime(body),
    op_ed_label: "Opinion / Op-Ed"
  };

  const { error, data } = id
    ? await admin.from("articles").update(payload).eq("id", id).select("id").single()
    : await admin.from("articles").insert(payload).select("id").single();

  if (error || !data) {
    return { ok: false, message: error?.message ?? "Unable to save article." };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteArticle(formData: FormData) {
  await requireWriter();
  const id = String(formData.get("id") ?? "");
  const admin = createAdminClient();
  await admin.from("articles").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateCommentStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "pending") as CommentStatus | "delete";
  const admin = createAdminClient();

  if (status === "delete") {
    await admin.from("comments").delete().eq("id", id);
  } else {
    await admin.from("comments").update({ status }).eq("id", id);
  }

  revalidatePath("/admin/comments");
}

export async function saveCategory(formData: FormData) {
  await requireAdmin();
  const admin = createAdminClient();
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;

  if (!name) return;

  const payload = { name, slug: slugify(String(formData.get("slug") || name)), description };
  if (id) {
    await admin.from("categories").update(payload).eq("id", id);
  } else {
    await admin.from("categories").insert(payload);
  }

  revalidatePath("/admin/categories");
}

export async function saveProfile(formData: FormData) {
  await requireAdmin();
  const admin = createAdminClient();
  const id = String(formData.get("id") ?? "");
  const display_name = String(formData.get("display_name") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim() || null;
  const role = String(formData.get("role") ?? "writer");
  const avatar_url = String(formData.get("avatar_url") ?? "").trim() || null;

  await admin.from("profiles").update({ display_name, bio, role, avatar_url }).eq("id", id);
  revalidatePath("/admin/authors");
  revalidatePath("/authors");
}
