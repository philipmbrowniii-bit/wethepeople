export type ArticleStatus = "draft" | "published";
export type CommentStatus = "pending" | "approved" | "rejected";
export type ProfileRole = "admin" | "writer";

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
};

export type Profile = {
  id: string;
  email: string;
  display_name: string;
  bio: string | null;
  role: ProfileRole;
  avatar_url: string | null;
  title: string | null;
  social_links: Record<string, string>;
  author_page_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  body: string;
  excerpt: string;
  category_id: string;
  author_id: string;
  status: ArticleStatus;
  is_featured: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  reading_time: number;
  op_ed_label: string;
  featured_image_url: string | null;
  tags: string[];
  archived_at: string | null;
};

export type Comment = {
  id: string;
  article_id: string;
  name: string;
  message: string;
  status: CommentStatus;
  created_at: string;
  updated_at: string;
};

export type ArticleWithRelations = Article & {
  categories: Category | null;
  profiles: Profile | null;
};

export type ArticleFormState = {
  ok: boolean;
  message: string;
};

export type HomepageSection = {
  key: "latest" | "opinion" | "most_read";
  title: string;
  enabled: boolean;
  position: number;
};

export type SiteSettings = {
  id: string;
  site_name: string;
  tagline: string;
  logo_url: string | null;
  favicon_url: string | null;
  footer_text: string;
  social_links: Record<string, string>;
  founder_profile_id: string | null;
  hero_headline: string;
  featured_article_id: string | null;
  homepage_sections: HomepageSection[];
  about_mission: string;
  about_history: string;
  editorial_standards: string;
  contact_information: string;
  created_at: string;
  updated_at: string;
};
