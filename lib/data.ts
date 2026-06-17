import { createClient } from "@/lib/supabase/server";
import type { ArticleWithRelations, Category, Comment, Profile } from "@/lib/types";

const articleSelect = "*, categories(*), profiles(*)";

export async function getCategories() {
  const supabase = await createClient();
  const { data } = await supabase.from("categories").select("*").order("name").returns<Category[]>();
  return data ?? [];
}

export async function getPublishedArticles(limit?: number) {
  const supabase = await createClient();
  let query = supabase
    .from("articles")
    .select(articleSelect)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data } = await query.returns<ArticleWithRelations[]>();
  return data ?? [];
}

export async function getFeaturedArticle() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select(articleSelect)
    .eq("status", "published")
    .eq("is_featured", true)
    .order("published_at", { ascending: false })
    .limit(1)
    .maybeSingle<ArticleWithRelations>();
  return data;
}

export async function getArticleBySlug(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select(articleSelect)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle<ArticleWithRelations>();
  return data;
}

export async function getArticlesByCategory(slug: string) {
  const supabase = await createClient();
  const { data: category } = await supabase.from("categories").select("*").eq("slug", slug).maybeSingle<Category>();
  if (!category) return { category: null, articles: [] };

  const { data } = await supabase
    .from("articles")
    .select(articleSelect)
    .eq("status", "published")
    .eq("category_id", category.id)
    .order("published_at", { ascending: false })
    .returns<ArticleWithRelations[]>();

  return { category, articles: data ?? [] };
}

export async function getApprovedComments(articleId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("comments")
    .select("*")
    .eq("article_id", articleId)
    .eq("status", "approved")
    .order("created_at", { ascending: true })
    .returns<Comment[]>();
  return data ?? [];
}

export async function getAuthors() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .in("role", ["admin", "writer"])
    .order("display_name")
    .returns<Profile[]>();
  return data ?? [];
}
