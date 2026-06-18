"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin, requireWriter } from "@/lib/auth";
import { estimateReadingTime, excerptFromBody, slugify } from "@/lib/format";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import type { ArticleFormState, ArticleStatus, CommentStatus } from "@/lib/types";

async function uploadImage(file: FormDataEntryValue | null, folder: string) {
  if (!(file instanceof File) || file.size === 0) return null;
  if (!file.type.startsWith("image/")) throw new Error("Only image uploads are supported.");
  if (file.size > 5 * 1024 * 1024) throw new Error("Images must be smaller than 5 MB.");

  const admin = createAdminClient();
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${folder}/${crypto.randomUUID()}.${extension}`;
  const { error } = await admin.storage.from("publication-assets").upload(path, file, {
    contentType: file.type,
    upsert: false
  });
  if (error) throw error;
  return admin.storage.from("publication-assets").getPublicUrl(path).data.publicUrl;
}

function socialLinks(formData: FormData, prefix = "") {
  return {
    website: String(formData.get(`${prefix}website`) ?? "").trim(),
    x: String(formData.get(`${prefix}x`) ?? "").trim(),
    facebook: String(formData.get(`${prefix}facebook`) ?? "").trim(),
    instagram: String(formData.get(`${prefix}instagram`) ?? "").trim(),
    linkedin: String(formData.get(`${prefix}linkedin`) ?? "").trim()
  };
}

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
  const publicationDate = String(formData.get("published_at") ?? "");
  const publishedAt = status === "published" ? (publicationDate ? new Date(publicationDate).toISOString() : new Date().toISOString()) : null;

  if (!title || !body) {
    return { ok: false, message: "Title and article body are required." };
  }

  let featuredImageUrl = String(formData.get("featured_image_url") ?? "").trim() || null;
  try {
    featuredImageUrl = (await uploadImage(formData.get("featured_image"), "articles")) ?? featuredImageUrl;
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "Unable to upload image." };
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
    op_ed_label: String(formData.get("op_ed_label") ?? "Opinion / Op-Ed"),
    featured_image_url: featuredImageUrl,
    tags: String(formData.get("tags") ?? "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    archived_at: formData.get("is_archived") === "on" ? new Date().toISOString() : null
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
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const admin = createAdminClient();
  await admin.from("articles").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function archiveArticle(formData: FormData) {
  await requireWriter();
  const id = String(formData.get("id") ?? "");
  const shouldRestore = formData.get("restore") === "true";
  const admin = createAdminClient();
  await admin.from("articles").update({ archived_at: shouldRestore ? null : new Date().toISOString() }).eq("id", id);
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
  let avatar_url = String(formData.get("avatar_url") ?? "").trim() || null;
  avatar_url = (await uploadImage(formData.get("avatar"), "profiles")) ?? avatar_url;
  const title = String(formData.get("title") ?? "").trim() || null;
  const author_page_url = String(formData.get("author_page_url") ?? "").trim() || null;

  await admin
    .from("profiles")
    .update({ display_name, bio, role, avatar_url, title, author_page_url, social_links: socialLinks(formData) })
    .eq("id", id);
  revalidatePath("/admin/authors");
  revalidatePath("/authors");
  revalidatePath("/");
}

export async function saveBranding(formData: FormData) {
  await requireAdmin();
  const admin = createAdminClient();
  let logo_url = String(formData.get("logo_url") ?? "").trim() || null;
  let favicon_url = String(formData.get("favicon_url") ?? "").trim() || null;
  logo_url = (await uploadImage(formData.get("logo"), "branding")) ?? logo_url;
  favicon_url = (await uploadImage(formData.get("favicon"), "branding")) ?? favicon_url;

  await admin
    .from("site_settings")
    .update({
      site_name: String(formData.get("site_name") ?? "").trim(),
      tagline: String(formData.get("tagline") ?? "").trim(),
      footer_text: String(formData.get("footer_text") ?? "").trim(),
      logo_url,
      favicon_url,
      social_links: socialLinks(formData)
    })
    .eq("id", "main");
  revalidatePath("/", "layout");
}

export async function saveHomepage(formData: FormData) {
  await requireAdmin();
  const admin = createAdminClient();
  const keys = ["latest", "opinion", "most_read"] as const;
  const homepage_sections = keys.map((key) => ({
    key,
    title: String(formData.get(`${key}_title`) ?? "").trim(),
    enabled: formData.get(`${key}_enabled`) === "on",
    position: Number(formData.get(`${key}_position`) ?? 1)
  }));

  await admin
    .from("site_settings")
    .update({
      hero_headline: String(formData.get("hero_headline") ?? "").trim(),
      tagline: String(formData.get("tagline") ?? "").trim(),
      featured_article_id: String(formData.get("featured_article_id") ?? "") || null,
      homepage_sections
    })
    .eq("id", "main");
  revalidatePath("/");
}

export async function saveAboutContent(formData: FormData) {
  await requireAdmin();
  const admin = createAdminClient();
  await admin
    .from("site_settings")
    .update({
      about_mission: String(formData.get("about_mission") ?? "").trim(),
      about_history: String(formData.get("about_history") ?? "").trim(),
      editorial_standards: String(formData.get("editorial_standards") ?? "").trim(),
      contact_information: String(formData.get("contact_information") ?? "").trim()
    })
    .eq("id", "main");
  revalidatePath("/about");
  revalidatePath("/editorial-standards");
}
